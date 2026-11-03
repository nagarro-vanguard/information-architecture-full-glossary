export const meta = {
  name: 'auto-spec',
  description: 'auto-spec — the autonomous specifier workflow. Runs the full spec pipeline (BRD → PRD → features → EPICs → stories → AC) from a feature idea OR from existing source docs, unattended and non-gated: the hands-off twin of the gated specifier skill. Reads any file paths you pass, starts at whichever phase your inputs already cover, and refuses to fabricate a subject. Invoke as "auto-spec". Review the output at the end.',
  phases: [
    { title: 'Ingest' },
    { title: 'Requirements' },
    { title: 'Features' },
    { title: 'EPICs' },
    { title: 'Stories' },
  ],
}

// Where the skill package lives, relative to the run's working directory. If you install this
// package somewhere other than `.claude/`, change this ONE line.
const SKILLS = '.claude/skills'

// ---------------------------------------------------------------------------
// Input normalization (S1/J1): the harness passes `args` as a plain STRING for
// slash-command invocations, but a caller can also pass a structured object.
// Accept string | object | undefined without ever reading a bare `args.idea`
// off a string.
// ---------------------------------------------------------------------------
const raw =
  typeof args === 'string' ? args
  : (args && (args.idea || args.text)) ? String(args.idea || args.text)
  : ''
const nameOverride = (args && typeof args === 'object' && args.featureName) ? args.featureName : ''

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------
const INTAKE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    featureName: { type: 'string', description: 'Short, real name of the product/feature drawn from the sources — never a stock placeholder.' },
    startPhase: { type: 'string', enum: ['requirements', 'features', 'epics', 'stories', 'ERROR'],
      description: 'Earliest pipeline phase not already satisfied by the inputs. ERROR if there is no usable source at all.' },
    haveBRD: { type: 'boolean', description: 'A business-case / vision doc was provided that can stand in for the BRD.' },
    havePRD: { type: 'boolean', description: 'A requirements/spec doc with (or readily numbered as) FR-xx functional requirements was provided.' },
    haveFeatures: { type: 'boolean', description: 'A feature catalog was provided.' },
    haveEpics: { type: 'boolean', description: 'EPIC documents were provided.' },
    brdText: { type: 'string', description: 'Verbatim/lightly-normalized BRD content if haveBRD, else empty.' },
    prdText: { type: 'string', description: 'Verbatim/lightly-normalized PRD content if havePRD, else empty.' },
    featuresText: { type: 'string', description: 'Feature catalog content if haveFeatures, else empty.' },
    epicsText: { type: 'string', description: 'EPIC content if haveEpics, else empty.' },
    rawSourceText: { type: 'string', description: 'Consolidated raw text of ALL sources actually read, so any phase that must GENERATE has the real content to work from. Empty only when no source was readable.' },
    sourcesRead: { type: 'array', items: { type: 'string' }, description: 'Paths successfully read.' },
    notes: { type: 'string', description: 'Anything the pipeline should know: gaps, conflicts, why a phase was/ wasn\'t marked satisfied.' },
  },
  required: ['featureName', 'startPhase', 'haveBRD', 'havePRD', 'haveFeatures', 'haveEpics',
    'brdText', 'prdText', 'featuresText', 'epicsText', 'rawSourceText', 'sourcesRead', 'notes'],
}

const CLUSTER_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    strategyName: { type: 'string', description: 'The chosen clustering strategy, e.g. "By Business Capability".' },
    rationale: { type: 'string', description: 'One sentence on why it beat the alternatives.' },
    clustering: { type: 'string', description: 'The full chosen-clustering markdown (with the alternatives-considered appendix).' },
  },
  required: ['strategyName', 'rationale', 'clustering'],
}

const EPIC_LIST_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    epics: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: { type: 'string', description: 'EPIC id, e.g. EPIC-001.' },
          title: { type: 'string' },
          slug: { type: 'string', description: "Kebab-case of the EPIC's short Name — the `<slug>` in its detail filename `EPIC-<NNN>-<slug>.md` (e.g. target-architecture). Same transform generate-epics uses, so it matches the EPIC file stem." },
          text: { type: 'string', description: "The EPIC's row from the Register — its feature list, outcome, band, persona, and dependencies (enough to draft stories). Not the full detail doc." },
        },
        required: ['id', 'title', 'slug', 'text'],
      },
    },
  },
  required: ['epics'],
}

// ---------------------------------------------------------------------------
// Eval schema + workflow-level grade-on-formation.
// The skills already self-eval in-agent (they inherit the shared rule), but that verdict is
// invisible to the workflow. gradeAndFix is the DETERMINISTIC gate the workflow can see and act
// on: produce → eval via the shared runner → auto-fix the agent-owned findings (≤3 passes) →
// carry the result, so a failing artifact doesn't silently feed the next stage. needs-human
// findings are never auto-fixed (that would invent facts); they're surfaced.
// ---------------------------------------------------------------------------
const EVAL_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          severity: { type: 'string', enum: ['B', 'M', 'm'] },
          item: { type: 'string' },
          location: { type: 'string' },
          quote: { type: 'string' },
          fix: { type: 'string' },
          fixOwner: { type: 'string', enum: ['agent', 'human'] },
        },
        required: ['severity', 'item', 'location', 'quote', 'fix', 'fixOwner'],
      },
    },
  },
  required: ['findings'],
}

const evalStatus = (findings) =>
  findings.some((f) => f.severity === 'B') ? 'FAIL'
  : findings.length ? 'PASS_WITH_FINDINGS'
  : 'PASS'

async function gradeAndFix(type, label, oracle, produce) {
  let text = await produce('')
  let result = null
  for (let pass = 1; pass <= 3; pass++) {
    const v = await agent(
      `You are running an eval. Follow \`${SKILLS}/_shared/eval-runner.md\` exactly. ` +
      `Eval = \`${SKILLS}/_shared/rubrics/${type}.md\`. Grade the ARTIFACT below against every check in its three ` +
      `passes; the SOURCE below is the oracle (if a check needs an oracle you weren't given, mark it not-evaluable, ` +
      `don't guess). Return findings in the runner's schema (severity·item·location·verbatim quote·fix·fixOwner); ` +
      `drop any finding without a real quote.\n\nARTIFACT:\n${text}\n\nSOURCE:\n${oracle || '(none)'}`,
      { label: `eval:${label}`, phase: 'Eval', schema: EVAL_SCHEMA })
    const findings = (v && v.findings) || []
    const st = evalStatus(findings)
    result = { status: st, findings }
    if (st !== 'FAIL') {
      log(`auto-spec: ${label} eval → ${st}${findings.length ? ` (${findings.length} finding(s) carried)` : ''}.`)
      return { text, eval: result }
    }
    const agentFix = findings.filter((f) => f.fixOwner === 'agent')
    const human = findings.filter((f) => f.fixOwner === 'human')
    if (agentFix.length === 0) {
      log(`auto-spec: ${label} eval FAIL — ${human.length} human-owned finding(s), nothing auto-fixable. Surfacing for a person.`)
      return { text, eval: result }
    }
    log(`auto-spec: ${label} eval FAIL (pass ${pass}/3) — auto-fixing ${agentFix.length} finding(s).`)
    text = await produce(
      `Your previous draft FAILED its eval. Fix ONLY these agent-owned findings and return the corrected FULL artifact:\n` +
      `${JSON.stringify(agentFix, null, 2)}\n` +
      `Do NOT invent facts to close these human-owned gaps — leave them flagged: ${JSON.stringify(human.map((f) => f.item))}.`)
  }
  log(`auto-spec: ${label} eval still FAIL after 3 passes — surfacing for a person.`)
  return { text, eval: result }
}

// ---------------------------------------------------------------------------
// Phase 0 — Ingest & classify (J2/J3/S2). The script has no filesystem access,
// so an AGENT reads the paths and tells us where to start.
// ---------------------------------------------------------------------------
phase('Ingest')
const intake = await agent(
  `You are the INTAKE step of a specification pipeline. Load _shared/system-prompt.md first for the global rules.\n\n` +
  `The INPUT below may contain file paths, a free-text feature idea, or both.\n` +
  `1. Read EVERY path you can find in INPUT with the Read tool (resolve absolute Windows paths as-is). List what you read in sourcesRead.\n` +
  `2. Classify what upstream artifacts already exist and map each source to a pipeline layer:\n` +
  `   - vision / business-case / objectives  => BRD  (set haveBRD, fill brdText)\n` +
  `   - requirements / functional spec / PRD  => PRD  (set havePRD only if it already has, or can be read 1:1 as, numbered functional requirements; fill prdText)\n` +
  `   - explicit feature list/catalog         => features\n` +
  `   - EPIC documents                        => epics\n` +
  `3. Put the consolidated raw text of everything you read into rawSourceText, so later phases that must GENERATE have the real content.\n` +
  `4. Extract the REAL featureName from the sources. NEVER invent a subject or use a stock example.\n` +
  `5. Set startPhase to the earliest phase NOT already covered by the inputs. If INPUT has no readable source AND no concrete idea, set startPhase="ERROR".\n\n` +
  `INPUT:\n${raw || '(empty)'}`,
  { label: 'intake', schema: INTAKE_SCHEMA })

if (!intake || intake.startPhase === 'ERROR') {
  log('auto-spec: no usable source found. Pass a concrete feature idea or readable doc paths — refusing to fabricate a subject.')
  return {
    error: 'No usable source. Nothing was produced (auto-spec will not invent a subject).',
    inputSeen: raw || '(empty)',
    notes: intake && intake.notes,
  }
}

const featureName = nameOverride || intake.featureName || 'feature'
log(`auto-spec: subject = "${featureName}". Sources read: ${(intake.sourcesRead || []).join(', ') || '(none — idea-only run)'}. Starting phase: ${intake.startPhase}.`)

// Real content for any GENERATE step; falls back to the raw idea for from-scratch runs.
const sourceBlock = intake.rawSourceText || raw

// ---------------------------------------------------------------------------
// Phase 1 — Requirements (start-anywhere: skip what the inputs already cover)
// ---------------------------------------------------------------------------
phase('Requirements')
let brd = intake.brdText || ''
let brdEval = null
if (!intake.haveBRD) {
  const r = await gradeAndFix('brd', 'BRD', sourceBlock, (fb) => agent(
    `Follow the write-brd skill (${SKILLS}/write-brd/SKILL.md) and its shared rules. ` +
    `Auto-answer Phase-1 discovery yourself from the SOURCE below (mark anything you infer as ` +
    `Assumed — needs confirmation; never invent numbers). Produce the COMPLETE BRD for "${featureName}" and return the full markdown.` +
    `${fb ? `\n\n${fb}` : ''}\n\nSOURCE:\n${sourceBlock}`,
    { label: 'write-brd' }))
  brd = r.text; brdEval = r.eval
} else {
  log('auto-spec: BRD supplied — using it as-is (skipping write-brd; provided artifacts are not rewritten).')
}

let prd = intake.prdText || ''
let prdEval = null
if (!intake.havePRD) {
  const r = await gradeAndFix('prd', 'PRD', `BRD (oracle for FR→BR tracing):\n${brd}\n\nRAW SOURCE:\n${sourceBlock}`, (fb) => agent(
    `Follow the write-prd skill (${SKILLS}/write-prd/SKILL.md). Produce the COMPLETE PRD for "${featureName}"; ` +
    `number FR-xx and trace each to a BR-xx; include the traceability matrix. Draw functional detail from BOTH the BRD ` +
    `and the raw source. Return the full markdown.` +
    `${fb ? `\n\n${fb}` : ''}\n\nBRD:\n${brd || '(none — derive from source)'}\n\nRAW SOURCE:\n${sourceBlock}`,
    { label: 'write-prd' }))
  prd = r.text; prdEval = r.eval
} else {
  log('auto-spec: PRD supplied — using it as-is (skipping write-prd; provided artifacts are not rewritten).')
}

// ---------------------------------------------------------------------------
// Phase 2 — Features
// ---------------------------------------------------------------------------
phase('Features')
let features = intake.featuresText || ''
let featuresEval = null
if (!intake.haveFeatures) {
  const r = await gradeAndFix('features', 'Features', `PRD (oracle for FR coverage):\n${prd}`, (fb) => agent(
    `Follow the define-features skill (${SKILLS}/define-features/SKILL.md). Produce the feature catalog from this PRD's FR-xx ` +
    `with priorities and 100% FR coverage; include the coverage check. Return the markdown.` +
    `${fb ? `\n\n${fb}` : ''}\n\nPRD:\n${prd}`,
    { label: 'define-features' }))
  features = r.text; featuresEval = r.eval
} else {
  log('auto-spec: feature catalog supplied — using it as-is (skipping define-features; provided artifacts are not rewritten).')
}

// ---------------------------------------------------------------------------
// Phase 3 — EPICs
// ---------------------------------------------------------------------------
phase('EPICs')
let epics = intake.epicsText || ''
let clustering = ''
let clusterStrategy = ''
let clusterRationale = ''
if (!intake.haveEpics) {
  // J-6: auto-select the clustering but surface WHICH option and WHY (not buried in the doc).
  const cluster = await agent(
    `Follow the cluster-features skill. Evaluate 2–3 clustering strategies and auto-select the single strongest one. ` +
    `Return the chosen clustering markdown (keep the "alternatives considered" appendix), the strategyName, and a one-line rationale.\n\nFEATURES:\n${features}`,
    { label: 'cluster-features', schema: CLUSTER_SCHEMA })
  clustering = cluster.clustering
  clusterStrategy = cluster.strategyName
  clusterRationale = cluster.rationale
  log(`auto-spec: clustering = "${clusterStrategy}" — ${clusterRationale}`)

  // J-4: the EPIC Register is the primary deliverable AND the story fan-out anchor — copied from the clustering, persisted to disk.
  epics = await agent(
    `Follow the generate-epics skill. Build the EPIC Register by COPYING from this clustering per _shared/standard-formats.md -> "EPIC Register": one row per EPIC with EPIC-<NNN> (3-digit), the epic Name (a short capability phrase, verbatim from the clustering), the Outcome (hypothesis), feature list, band, persona, dependencies. Transcribe — never re-invent a copied field. ` +
    `SAVE it to Output/05-epics/EPIC-REGISTER.md (overwrite if it exists) and write one manifest row per EPIC. ` +
    `Then expand the MVP-band EPICs into lean detail files EPIC-<NNN>-<name-slug>.md (8-section detail schema; features as a TABLE; NO acceptance criteria and NO story-centric mapping), and save the epic-sequencing and epic-mapping files (overwrite if they exist). All Work Item IDs = TBD. ` +
    `Then return the full EPIC Register markdown.\n\nCLUSTERING:\n${clustering}\n\nPRD:\n${prd}`,
    { label: 'generate-epics' })
} else {
  log('auto-spec: EPICs supplied — using them as-is (skipping cluster/generate-epics).')
}

// ---------------------------------------------------------------------------
// Phase 4 — Stories (J5: fan out over the Register rows — each row's feature list is the story anchor)
// ---------------------------------------------------------------------------
phase('Stories')
const epicList = await agent(
  `Split the EPIC Register below into a structured array. One entry per EPIC row: its id (e.g. EPIC-001), title, its slug (kebab-case of the EPIC's short Name — the \`<slug>\` in its detail filename \`EPIC-<NNN>-<slug>.md\`, e.g. target-architecture), and its row detail (feature list, outcome, band, persona, dependencies). ` +
  `Do not drop features.\n\nEPIC REGISTER:\n${epics}`,
  { label: 'split-epics', schema: EPIC_LIST_SCHEMA })

const epicsArr = (epicList && Array.isArray(epicList.epics)) ? epicList.epics : []
if (epicsArr.length === 0) {
  log('auto-spec: could not split EPICs into a list — running stories as a single pass over the whole pack.')
}

const perEpicStories = epicsArr.length > 0
  ? await pipeline(
      epicsArr,
      (e) => agent(
        `Follow the draft-stories skill. For EPIC ${e.id} ("${e.title}") draft INVEST-compliant story shells (Title + As a/I want/So that), one capability each, sized ~1–2 days, each carrying its Req ID + Feature ID trace. ` +
        `WRITE the folder Output/06-stories/${e.id}-${e.slug}/ : the index ${e.id}-${e.slug}-stories-draft.md (sections in order — Stories | Out of scope / routed | Coverage | Open Questions; Stories table columns: # | Story(title, linked) | Statement | Req ID | Feature ID | Status) AND one title-slug story file per story (metadata block + ## Story seeded from the index and kept in sync + empty ## Grooming / ## Acceptance Criteria to accrete into). Overwrite in place; never create files with other names. Schema: _shared/standard-formats.md -> "Story folder, index & file". ` +
        `Return the index.\n\nEPIC (Register row — its feature list):\n${e.text}\n\nPRD (for traceability):\n${prd}`,
        { label: `draft:${e.id}`, phase: 'Stories' }),
      (shells, e) => agent(
        `Follow the groom-stories skill. Groom the stories in Output/06-stories/${e.id}-${e.slug}/ in batches of at most 4: add intent, in/out scope, a 4–7 step happy path, sourced business rules, roles, dependencies, and metrics traceability. ` +
        `APPEND each story's grooming INTO its own file under ## Grooming (accrete in place — no 07- folder); set each file's Status to groomed and update the index Status column. ` +
        `Return a summary.\n\nEPIC (Register row):\n${e.text}`,
        { label: `groom:${e.id}`, phase: 'Stories' }),
      (groomed, e) => agent(
        `Follow the write-acceptance-criteria skill. For each groomed story in Output/06-stories/${e.id}-${e.slug}/, write 3–7 Given/When/Then scenarios categorized UI / Behavior / System. ` +
        `APPEND them INTO each story file under ## Acceptance Criteria (accrete in place — no 08- folder); set each file's Status to AC-complete and update the index Status column. ` +
        `Return a summary.`,
        { label: `ac:${e.id}`, phase: 'Stories' }),
    )
  : [await agent(
      `Follow, in order, draft-stories → groom-stories → write-acceptance-criteria over the EPIC Register below (one pass across all EPIC rows). ` +
      `For each EPIC, write Output/06-stories/<epic-stem>/ (index + title-slug story files), then groom and add AC by APPENDING into each story file in place (## Grooming, then ## Acceptance Criteria — no 07-/08- folders); keep each file's Status and the index current. ` +
      `Return a summary.\n\nEPIC REGISTER:\n${epics}\n\nPRD:\n${prd}`,
      { label: 'stories', phase: 'Stories' })]

const stories = perEpicStories.filter(Boolean)

// J5b: after the per-EPIC fan-out completes, write the batch navigation index in ONE pass
// (a single writer — the per-EPIC drafts run in parallel and must not race on this shared file).
if (epicsArr.length > 0) {
  await agent(
    `Write the batch navigation index Output/06-stories/epics-list-draft.md (overwrite). ` +
    `One row per EPIC folder under Output/06-stories/: columns "EPIC | Story Index | Stories | Review Status". ` +
    `The Story Index cell links to that folder's <epic-stem>-stories-draft.md; Stories = the number of story files in the folder; Review Status defaults to "Pending review". ` +
    `Schema: _shared/standard-formats.md -> "Story folder, index & file" (Batch navigation index). ` +
    `EPICs:\n${epicsArr.map(e => `${e.id} ${e.title} -> ${e.id}-${e.slug}`).join('\n')}`,
    { label: 'stories-nav-index', phase: 'Stories' })
}

return {
  name: featureName,
  startedAt: intake.startPhase,
  sourcesRead: intake.sourcesRead || [],
  evals: { brd: brdEval, prd: prdEval, features: featuresEval },
  brd,
  prd,
  features,
  clustering,
  clusterStrategy,
  clusterRationale,
  epics,
  stories,
}
