# Workflow Fixes Register

A running log of changes the spec-pipeline workflows need. Each entry records **the change**,
**why it's needed**, and **what to do**. We harden **auto-spec** first; the other three
(`version-log`, `blast-radius`, `compliance-audit`) get their own sections (or split files) as we get to them.

**Status legend:** ✅ done · 🔄 in progress · 🔲 to do
**Priority:** P1 (blocks correct output) · P2 (quality/UX) · P3 (nice-to-have)
**Live build trail:** [BUILD-LOG.md](BUILD-LOG.md) · order: [BUILD-ORDER.md](BUILD-ORDER.md).
Done: **Step 1 (manifest)** ✅ · **Step 2 (contract + conformance)** ✅ · **Step 3 (eval rubrics +
auditor)** ✅ · **Step 4 (coverage gate)** ✅. **Eval foundation + eval-wiring done** (commits
`af638dd`, `5eb0273`: grade-on-formation, `gradeAndFix`, panel voting, artifact-eval layer).
**Package hardening done** (uncommitted): one `_shared` (root archive removed), `SKILLS` portability,
`eval-model.md`→`_shared`, docs swept accurate.
**Remaining = Step 5 structure half:** manifest-during-run · one-evolving-story · provided-docs ·
thin-drivers · auto-run checkers. Then real run (on hold) + `version-log`/`blast-radius`.

> **How to apply & test workflow edits (read first):** Editing `.claude/workflows/*.js` does **not**
> take effect when the workflow is launched by name (e.g. `/auto-spec`) in an already-running session —
> the harness runs a **cached registry copy**. To run your edits, launch via
> `Workflow({ scriptPath: ".../.claude/workflows/auto-spec.js", args })`, or restart the session so the
> registry reloads. (Logged as [X-1] below — it bit us this session.)

---

## Architecture decisions (proposed — from the hardening discussion)

Direction for hardening **all** the workflows, not just auto-spec. Marked *proposed* until confirmed.
Grouped by tier: **Tier-1** = AD-1…AD-5 (eval foundation) · **Tier-2** = AD-9, AD-10, AD-6 (story
model + determinism) · **Tier-3** = AD-7, AD-8 (alignment + KPI).

### AD-1 — Progressive eval (quality gate per layer), not an end sweep
Audit each artifact **the moment its step produces it**, before the next step consumes it — so a
defect is caught where it's born instead of after the whole pack is built on top of it. Where a step
yields many artifacts (e.g. the groomed stories), **fan out** the audit in parallel (per artifact or
per EPIC). This replaces the single, overwhelming end-of-run `compliance-audit` sweep.

- **Autonomous-run policy:** record every finding to the eval doc and **continue**; **hard-stop only
  on a Breaking/P1 finding** (don't build a pack on a broken PRD). Gated `specifier` can instead
  pause at the gate.
- **Implies AD-4** (compliance-audit refactor).

### AD-2 — Three separate record types (don't conflate them)
1. **Decision log** — the run's chain-of-thought: phases skipped & why, clustering chosen & why,
   eval findings, auto-fixes. One per run. *(new — see AD-3 for location)*
2. **Eval doc** — progressive audit findings, accumulated per layer. *(compliance-audit output)*
3. **Version snapshots** — before/after diffs across versions. *(`version-log` — already exists)*

### AD-3 — Logical `Output/` layout; stories are ONE evolving file (revised)
Current names are inconsistent (mixed with/without EPIC ids, drift from `standard-formats.md`).
Adopt one logical layout. **Stories are not epic-prefixed** and are **not** split across three
folders — see AD-6. Story naming is **decided at runtime** (AD-6), so it's shown here as a
placeholder, not a fixed scheme.
```
Output/
  artifacts/                                     # AD-5: raw docs the user provided, dropped as-is
  00-run-log/<feature>-decisions.md              # decision log (keyed on feature name — scripts have no clock)
  01-brd/<feature>-brd.md
  02-prd/<feature>-prd.md
  03-features/<feature>-features.md
  04-clustering/<feature>-clustering.md
  05-epics/EPIC-00X-<slug>.md  +  <feature>-epic-sequencing.md  +  <feature>-epic-mapping.md
  06-stories/<runtime-logical-story-name>.md     # AD-6: ONE file per story; evolves shell → body → AC
  _eval/<stage>-eval.md                          # progressive eval findings
```
Enforce by passing the exact target filename into each stage's agent prompt (as J-4 already does for
epics). Epic↔story linkage lives as traceability **inside** the story file, never in its name.

### AD-4 — Refactor `compliance-audit` into a per-artifact auditor
Expose a **per-artifact audit** entrypoint that auto-spec/specifier call inline (AD-1); keep the
"sweep the whole pack" mode as a thin loop over that same core. Today it only does the end sweep.

### AD-5 — Never skip a step; provided docs are evaled-and-placed (never rewritten)
**Resolved — see [tier1-plan-3-provided-docs-and-no-skip.md](tier1-plan-3-provided-docs-and-no-skip.md).**
You can **start at any stage**, but **no step is skipped**. A step with a user-provided input is
satisfied by **drop → eval(findings) → place normalized**, never by rewriting an approved source:
1. Drop every provided doc as-is into `Output/artifacts/` (immutable source of record).
2. **Eval in accept/normalize mode** — rubric raises findings only; it does not gate the doc out.
3. **An approved doc passes through**: place a *format-normalized* copy in its stage folder
   (substance unchanged); gaps become open-questions. **Never auto-override an approved source.**
4. Rewrite is reserved for artifacts the workflow itself **generated**.
5. **No upstream fabrication:** a missing upstream artifact becomes a `reconstructed-stub`
   (citation-tagged, `[unverified]`), never a confident invented BRD/PRD.
- **Supersedes the old J-2 "skip" behavior.** Each placed artifact is labelled `provided-normalized`
  | `generated` | `reconstructed-stub`.

### AD-6 — One evolving story artifact (shell → body → AC in the same file)
A story is a single file that **grows in place**, mirroring how a real tracker holds a story:
1. **Shell** (draft-stories) — Title + As a / I want / So that. A moderatable placeholder.
2. **Grooming** (groom-stories) **updates the same file** with the story **body**.
3. **Acceptance criteria** (write-acceptance-criteria) **updates the same file** — AC is a **section
   of the story**, not a separate artifact.
- Collapses today's `06-story-shells` / `07-groomed-stories` / `08-acceptance-criteria` into one
  `06-stories/` folder, one file per story.
- **Story naming is decided at runtime** — a logical, engagement-appropriate scheme (story's own id
  or title slug), chosen once and applied consistently; **never** carries the epic name.
- The workflow must **edit** the story file at each grooming step, not emit a new one.
- **Realized in the driver/contract, not by rewriting skills** (decided during Step 5 planning): the
  one-evolving-file is a *placement* concern the driver owns (draft writes the file, groom/AC append
  in place). The atomic skills' method is untouched — at most a **one-line save-location tweak** so
  standalone use matches. This dropped the old standalone "edit the story skills" step.

### AD-7 — All workflows aligned to one shared pipeline (Tier-3, user directive)
auto-spec, specifier, version-log, blast-radius, compliance-audit must all read/write the **same structure**. No
per-workflow divergence: one shared pipeline definition + one `Output/` shape. auto-spec and specifier
produce the *same artifacts* — they differ only in assurance (autonomous draft vs human-gated).

**How (five moves):**
1. **Pipeline contract** — one doc = source of truth: `Output/` layout, naming + provenance labels,
   ID scheme (`BR→FR→Feature→EPIC→Story-id→AC`), record formats.
2. **Run manifest** — a machine-readable index listing every artifact (id · type · path · provenance
   · eval status · links up/down). The linchpin: everything reads/writes it → aligned by
   construction. **AD-9's story index is the stories slice of this manifest.**
3. **Thin drivers** — skills hold all step logic (do/where/name); auto-spec (unattended) and specifier
   (gated) just drive the same steps. No step logic lives only in auto-spec.
4. **Readers consume the manifest** — version-log snapshots it, blast-radius follows its links, compliance-audit
   audits each listed artifact by declared type. No hardcoded filename assumptions.
5. **Conformance check** — a gate that verifies a pack matches the contract (folders, valid manifest,
   IDs resolve, provenance present). Keeps them aligned over time.

**Sequencing note:** AD-7 is a *precondition*, not a finale — the contract + manifest should exist
before Tier-1 eval is wired into the generators, so eval writes its verdicts into the manifest and
every workflow reads them there.

### AD-8 — Eval loop policy + quality KPI (user directive)
- Fix a failing generated artifact in **≤3 loops**; still failing → **stop and require a human**.
- Never rewrite a provided/approved doc (Plan 3).
- **KPI: ≥95% of a run's artifacts must PASS eval** within the loop budget, else the pack is stamped
  *not ready — human fixes needed*. This is the toolkit's quality bar and generator-health metric.

### AD-9 — Story index / registry (Tier-2 — fixes runtime-naming determinism)
Names are assigned **once** and written to a persisted index (`story-id → filename → epic → FR`).
Every later stage looks the file up instead of re-deciding a name. Reconciles AD-6's runtime naming
with determinism, makes "update the same story file" reliable, and lets `blast-radius` answer "which
stories belong to EPIC-003?" without scanning every file. Doubles as the seed of a **run manifest**
(what exists, what passed eval) for clean resumes.

### AD-10 — Stage snapshots as the review anchor (Tier-2)
Because a story is one evolving file (AD-6), freeze a snapshot at each stage (shell → groomed → +AC)
via `version-log`, so a human has a stable "shell v1 / groomed v2 / with-AC v3" to diff and approve
against. The live file evolves; the snapshots preserve the reviewable record and keep the gates
meaningful.

| ID | Decision | Priority | Status |
|----|----------|----------|--------|
| AD-1 | Progressive eval / quality gate per layer, fan-out where many artifacts | P1 | ✅ wired (grade-on-formation + `gradeAndFix`) |
| AD-2 | Three record types: decision log · eval doc · version snapshots (structured) | P2 | 🔲 proposed |
| AD-3 | Logical `Output/` layout (stories = one evolving file, not epic-prefixed) | P1 | 🔲 proposed |
| AD-4 | `compliance-audit` becomes a per-artifact auditor (sweep = loop over it) | P1 | ✅ done (+ panel voting brd/prd) |
| AD-5 | Never skip a step; approved docs pass through (never rewritten) | P1 | 🔲 resolved (Plan 3) |
| AD-6 | One evolving story artifact (shell → body → AC in place); runtime naming | P1 | 🔲 proposed |
| AD-7 | **Tier-3:** all workflows aligned to one shared pipeline + structured records | P1 | 🔲 proposed |
| AD-8 | **Eval:** ≤3 loops then stop-for-human; KPI ≥95% pass rate | P1 | ✅ loop built (`gradeAndFix` + shared rule); KPI ≥95% pending the run manifest |
| AD-9 | **Tier-2:** story index/registry (assign-once names, run manifest) | P1 | 🔲 proposed |
| AD-10 | **Tier-2:** stage snapshots (version-log) as the review anchor | P2 | 🔲 proposed |

---

## auto-spec

Autonomous full-pipeline runner. Twin of the gated `specifier`.

| ID | Change | Priority | Status |
|----|--------|----------|--------|
| J-1 | Normalize `args` (string\|object) + intake agent reads file paths + fail-loud on empty input | P1 | ✅ |
| J-2 | ~~Start-anywhere by *skipping* covered phases~~ → **reopened**, replaced by AD-5 (never skip; eval-and-place) | P1 | ⚠️ reopened |
| J-3 | Stories fan-out per EPIC (`pipeline`) instead of one mega-agent | P2 | ✅ (revisit under AD-6) |
| J-4 | Persist EPIC docs to `Output/05-epics/` (+ sequencing + mapping) | P1 | ✅ |
| J-5 | ~~Deterministic per-EPIC *shell* filenames~~ → **superseded** by AD-6 (one evolving story file, runtime naming) | P1 | ⚠️ superseded |
| J-6 | Surface the chosen clustering + 1-line rationale in the run summary | P2 | ✅ |
| J-7 | ~~Decide eval/QA story~~ → superseded by **AD-1** (progressive eval) | P2 | 🔲 |
| J-8 | Resume/checkpoint robustness for long fan-outs | P3 | 🔲 |
| J-9 | Call the per-artifact eval (AD-1/AD-4) inline after each layer; hard-stop on Breaking | P1 | 🔲 |
| J-10 | Write the decision log (AD-2) as the run proceeds | P2 | 🔲 |
| J-11 | Adopt the AD-3 layout across all stages auto-spec writes | P1 | 🔲 |
| J-12 | Implement AD-5 in auto-spec: `artifacts/` drop → eval → place-or-rewrite per provided doc | P1 | 🔲 |
| J-13 | Implement AD-6 in auto-spec: one evolving story file (shell→body→AC in place), runtime naming | P1 | 🔲 |

> **State note.** J-1/J-4/J-6 stand. **J-2 and J-5 are overturned** by the new AD-5/AD-6 model and
> must be reworked (J-12/J-13). The current `auto-spec.js` still contains the old skip logic and
> per-EPIC shell filenames — to be replaced, not extended. The existing messy `Output/` pack
> (duplicate shells, empty `05-epics`, split groomed/AC) will be regenerated cleanly once AD-5/AD-6
> land; no point hand-cleaning it now. **Stories/AC generation is owned by the user** — the workflow
> rework changes the *output model*, but the user runs AC completion.

### J-1 — Input handling & no-fabrication ✅
- **Change:** Accept `args` as string OR object; add a first **intake agent** that Reads any file
  paths (scripts have no filesystem access, so an agent must do it); refuse to run and return an
  error if there's no usable source.
- **Why:** The `/auto-spec` slash command passes `args` as a **string**, but the old script read
  `args.idea` (object field) → `undefined` → fell back to a placeholder → **fabricated a
  "passwordless login" BRD** unrelated to the user's docs.
- **What was done:** Implemented in `auto-spec.js` (`raw` normalizer, `INTAKE_SCHEMA`, `startPhase:"ERROR"`
  guard). **Verified:** re-run on the real docs read all three and did not fabricate.

### J-2 — Start-anywhere ✅
- **Change:** Intake classifies which upstream artifacts already exist (vision≈BRD,
  requirements/spec≈PRD, feature list, epics) and auto-spec skips the phases already covered.
- **Why:** The user already had vision + requirements + spec; regenerating a BRD/PRD from scratch is
  redundant and lossy. Matches the toolkit's own "start anywhere" design (`specifier` SKILL.md,
  `WORKFLOW.md`).
- **What was done:** Conditional phase execution keyed on `intake.haveBRD/havePRD/haveFeatures/haveEpics`.
  **Verified:** run reported `startedAt: "features"`.

### J-3 — Stories fan-out ✅
- **Change:** Replace the single agent that did draft→groom→AC for *all* EPICs with a `pipeline()`
  that runs each EPIC's draft→groom→AC independently.
- **Why:** One agent for the whole story layer blows context and produces shallow output; no
  per-EPIC isolation.
- **What was done:** `pipeline(epicList.epics, draft, groom, ac)` with per-EPIC labels. **Note:**
  exposed J-5 (filename collisions) once resumes started re-running stages.

### J-4 — Persist EPIC documents ✅
- **Change:** After `generate-epics`, write each EPIC to `Output/05-epics/` using the
  `standard-formats` naming (`[capability]-EPIC-[XXX]-[title].md`), plus the sequencing and mapping
  files. Previously the EPIC markdown was generated and consumed **in-memory** for the story fan-out
  but never saved — `05-epics/` was **empty**.
- **Why:** EPICs are a required, reviewable deliverable and the traceability anchor between features
  and stories. Their absence on disk was the "step 5 is missing" gap.
- **What was done:** Added an explicit SAVE instruction to the `generate-epics` agent prompt (each
  EPIC + sequencing + mapping, overwrite if present). **Not yet verified by a run.**

### J-5 — Deterministic filenames (idempotent resumes) ✅
- **Change:** The draft stage now SAVES to `Output/06-story-shells/${e.id}-stories-draft.md` and is
  told to overwrite rather than create a differently-named second file.
- **Why:** Runs get interrupted and resumed often. Non-deterministic names made resumes write
  *new* files → `06-story-shells/` accumulated duplicates (`goal-and-target-stories-draft.md` **and**
  `goal-and-target-EPIC-003-stories-draft.md`, same for collaboration/evidence).
- **What was done:** Stable `${e.id}-...` filename in the draft prompt. **Still to do:** delete the
  pre-existing duplicates already on disk (the fix only prevents *new* ones).

### J-6 — Surface clustering choice + rationale ✅
- **Change:** `cluster-features` now returns a structured `{ strategyName, rationale, clustering }`;
  auto-spec `log()`s the chosen strategy + why, and returns `clusterStrategy` / `clusterRationale`.
- **Why:** auto-spec auto-selects one clustering (by design — it's the autonomous twin). The full
  rationale *is* written (clustering doc "Appendix B"), but it wasn't surfaced, so the choice looked
  arbitrary. (If the user wants to *choose*, that's the gated `specifier`, not auto-spec.)
- **What was done:** `CLUSTER_SCHEMA` + log line + return fields. **Not yet verified by a run.**

### J-7 — Eval / QA story 🔲
- **Change:** Decide and implement how evaluation happens. auto-spec currently emits **no eval report**.
- **Why:** The user expected an eval/quality report at the end. Eval lives in the separate
  `compliance-audit` audit-sweep workflow, which auto-spec doesn't invoke.
- **What to do:** Either (a) add an optional final `compliance-audit` audit phase to auto-spec behind a
  flag, or (b) keep auto-spec generation-only and document "run `compliance-audit` after auto-spec" as the
  standard QA step. Recommend (b) + a pointer in the run summary. (Depends on `compliance-audit` being
  runnable — see its own section when we get there.)

### J-8 — Resume / checkpoint robustness 🔲
- **Change:** Make long fan-outs survive interruptions better (smaller batches, or a checkpoint the
  run can report).
- **Why:** Several runs were stopped by the process exiting mid-run; the AC stage (7 per-EPIC agents)
  never completed (only 2 of ~47 stories have AC). Cache-resume recovers, but completion is fragile.
- **What to do:** Mostly environmental; consider capping concurrent AC agents and logging a
  per-EPIC "AC done" checkpoint so partial completion is obvious.

---

## Cross-cutting (all workflows)

| ID | Change | Priority | Status |
|----|--------|----------|--------|
| X-1 | `/name` launch runs a **cached** copy — edits need `scriptPath` or a session restart | P1 (process) | 🔲 doc |
| X-2 | All four scripts read structured `args` fields but slash passes a **string** | P1 | ✅ auto-spec · 🔲 others |
| X-3 | No script can read files/`Output/` (no fs) — each needs an intake agent to ingest | P1 | ✅ auto-spec · 🔲 others |
| X-4 | Empty-input handling: fail loud, never fabricate | P1 | ✅ auto-spec · 🔲 others |

---

## version-log · blast-radius · compliance-audit — pending

Same X-2/X-3/X-4 pattern applies (documented in the approved plan
`~/.claude/plans/give-me-a-plan-shimmering-blanket.md`). Not yet started. When we pick one up, give
it its own section here — or split into `FIXES-<workflow>.md` if a section gets large.

- **version-log** — accept a string; intake agent reads `Output/` (or given paths); require/derive a
  version `stamp` (runtime has no clock); fail loud if nothing to record.
- **blast-radius** — accept a string; make the **"Locate" phase real** (follow `BR→FR→…→AC` IDs across
  `Output/` to find affected artifacts instead of requiring them inlined).
- **compliance-audit** — accept empty/string; intake agent reads the whole `Output/` pack and infers
  each artifact's `type` from its folder (`01-brd`→brd, …) before the parallel audit.
