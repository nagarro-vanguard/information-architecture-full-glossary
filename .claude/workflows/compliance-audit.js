export const meta = {
  name: 'compliance-audit',
  description: 'compliance-audit — the per-artifact auditor. Grades each artifact against its human-authored rubric (_shared/rubrics/<type>.md) under an adversarial persona; every finding is anchored (rubric-item · location · verbatim quote · fix). Returns a verdict per artifact (PASS / PASS_WITH_FINDINGS / FAIL). The "sweep the whole pack" mode is just this run over many artifacts in parallel.',
  phases: [
    { title: 'Audit' },
  ],
}

// Where the skill package lives, relative to the run's working directory. If you install this
// package somewhere other than `.claude/`, change this ONE line and every path below follows.
const SKILLS = '.claude/skills'

// args: { artifacts: [{ id: string, type: string, path: string }] }
//   type ∈ brd | prd | features | clustering | epic | story-shell | story-body | ac
const artifacts = (args && Array.isArray(args.artifacts)) ? args.artifacts : []

// type -> rubric file under `${SKILLS}/_shared/rubrics/`
const RUBRIC = {
  brd: 'brd.md', prd: 'prd.md', features: 'features.md', clustering: 'clustering.md',
  epic: 'epic.md', 'story-shell': 'story-shell.md', 'story-body': 'story-body.md', ac: 'ac.md',
}

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: { type: 'string' },
    type: { type: 'string' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          severity: { type: 'string', enum: ['B', 'M', 'm'], description: 'B blocker · M major · m minor (copied from the rubric item)' },
          item: { type: 'string', description: 'rubric item id, e.g. B3' },
          location: { type: 'string', description: 'where in the artifact (section/line)' },
          quote: { type: 'string', description: 'verbatim quote of the offending text' },
          fix: { type: 'string', description: 'a concrete edit traced to the oracle' },
          fixOwner: { type: 'string', enum: ['agent', 'human'], description: 'agent = an edit from existing sources (feeds the ≤3-loop); human = closing it needs an invented fact (G.1) — never auto-fix' },
        },
        required: ['severity', 'item', 'location', 'quote', 'fix', 'fixOwner'],
      },
    },
  },
  required: ['id', 'type', 'findings'],
}

// High-stakes types are graded by an N-auditor panel; the verdict is the majority. Others run
// a single auditor. (An eval also declares `panel: N` in its own frontmatter; this map is the
// workflow-side source of truth so the script needn't parse the rubric.)
const PANEL = { brd: 3, prd: 3 }

const auditPrompt = (a, rubric) =>
  `You are running an eval. Follow \`${SKILLS}/_shared/eval-runner.md\` exactly. ` +
  `Eval = \`${SKILLS}/_shared/rubrics/${rubric}\`; artifact = \`${a.path}\` (id ${a.id}, type ${a.type}). ` +
  `Read the runner, the eval, and \`${SKILLS}/_shared/system-prompt.md\`, then grade the artifact ` +
  `against every check in the eval's three passes. If the eval names an oracle you were not given, mark ` +
  `those checks not-evaluable rather than guessing. Emit anchored findings in the runner's schema ` +
  `(severity·item·location·verbatim quote·fix·fixOwner); drop any finding without a real quote. ` +
  `Save to \`Output/_eval/${a.id}-eval.md\` and return the verdict object (id=${a.id}, type=${a.type}, findings=[...]).`

// Majority vote across a panel: keep a finding only if a majority of the auditors who returned
// flagged the same rubric item — dropping the solo-hallucinated findings the panel exists to catch.
const reconcile = (a, runs) => {
  const good = runs.filter(Boolean)
  if (good.length === 0) return null
  if (good.length === 1) return { id: a.id, type: a.type, findings: good[0].findings || [] }
  const need = Math.ceil(good.length / 2)
  const byItem = {}
  for (const r of good) {
    const seen = new Set()
    for (const f of (r.findings || [])) {
      if (seen.has(f.item)) continue          // count each rubric item at most once per auditor
      seen.add(f.item)
      ;(byItem[f.item] = byItem[f.item] || []).push(f)
    }
  }
  const findings = Object.values(byItem).filter((l) => l.length >= need).map((l) => l[0])
  return { id: a.id, type: a.type, findings }
}

phase('Audit')
if (artifacts.length === 0) {
  log('compliance-audit: no artifacts supplied. Pass { artifacts:[{id,type,path}] }.')
  return { verdicts: [], note: 'Nothing to audit.' }
}
log(`compliance-audit: auditing ${artifacts.length} artifact(s) against their rubrics.`)

const raw = await parallel(artifacts.map((a) => async () => {
  const rubric = RUBRIC[a.type]
  if (!rubric) return null
  // Don't inline the eval brain — load the shared runner + the eval (data). Adding a new
  // artifact type here is a data edit (a rubric file + a RUBRIC/PANEL row), never a prompt rewrite.
  const n = PANEL[a.type] || 1
  const runs = n === 1
    ? [await agent(auditPrompt(a, rubric), { label: `audit:${a.id}`, schema: VERDICT_SCHEMA })]
    : await parallel(Array.from({ length: n }, (_, i) => () =>
        agent(auditPrompt(a, rubric), { label: `audit:${a.id}#${i + 1}`, schema: VERDICT_SCHEMA })))
  if (n > 1) log(`compliance-audit: ${a.id} — ${n}-auditor panel, majority vote.`)
  return reconcile(a, runs)
}))

// Deterministic status from severities (don't trust the model to compute the gate).
const status = (findings) =>
  findings.some((f) => f.severity === 'B') ? 'FAIL'
  : findings.length ? 'PASS_WITH_FINDINGS'
  : 'PASS'

const verdicts = raw.filter(Boolean).map((v) => ({ ...v, status: status(v.findings) }))
const fails = verdicts.filter((v) => v.status === 'FAIL').length
log(`compliance-audit: ${verdicts.length} verdict(s) — ${fails} FAIL, ${verdicts.length - fails} pass/with-findings.`)
return { verdicts }
