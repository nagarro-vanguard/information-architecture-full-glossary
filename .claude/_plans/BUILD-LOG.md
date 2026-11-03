# Build Log — trail of what we're doing

Chronological record of the hardening build (newest at the bottom). Each entry: what we did, files
touched, test result, and the review-gate outcome. Plan of record: [BUILD-ORDER.md](BUILD-ORDER.md).

---

## Step 1 — The index (manifest) · status: ✅ built & self-verified · awaiting your gate

**Goal:** define the run manifest (the shared index every workflow reads/writes) and prove the
contract works on a tiny fixture — before any real skill/driver touches it.

**What we did**
1. Added a `## RUN MANIFEST` section to `.claude/skills/_shared/system-prompt.md` — the manifest
   shape, who writes it, story sub-states, and its uses (lookup / resume / KPI). *New section; the
   existing output-location table was not touched (per the rework rule).*
2. Built a throwaway fixture pack under `.claude/_plans/fixtures/mini-spec/` — a "dark-mode toggle"
   feature: BRD, PRD, features, 1 EPIC, 2 stories — plus an example `manifest.json`.
3. Wrote `.claude/_plans/fixtures/validate-manifest.mjs` (pure Node, no LLM) to test the contract.

**Files touched**
- Edited: `.claude/skills/_shared/system-prompt.md` (new RUN MANIFEST section)
- Created: `.claude/_plans/fixtures/mini-spec/**` (6 stub artifacts + `manifest.json`)
- Created: `.claude/_plans/fixtures/validate-manifest.mjs`

**Test result — `node validate-manifest.mjs` → ALL PASS (18/18, exit 0)**
- Every row has the required fields incl. `provenance` + `eval`; stories carry `subStates`.
- Every artifact `path` exists on disk.
- Story lookup by id (`STORY-001` → its file) works.
- Resume: healthy run skips all 6; with `STORY-002` mutated to `FAIL`, only `STORY-002` is re-run.
- KPI recomputed matches the header (6/6 = 1.00); readiness (`≥0.95 → ok`) consistent.

**Self-review vs Step-1 acceptance criteria**
- ✅ Valid `manifest.json`; every artifact has a row with provenance + eval.
- ✅ Look up a story by id → its file; duplication/rename impossible (id is the key).
- ✅ Resume skips PASS artifacts, re-runs the rest.
- ✅ KPI + readiness computed and consistent.

**Honest residual (not a Step-1 failure — later steps)**
- This proves the **schema and the logic** on a hand-authored manifest. It does **not** yet prove a
  real workflow *agent* produces such a manifest — that's exercised when we wire it into skills/
  drivers (Steps 5–6) and run end-to-end.
- The schema now lives in two places (the `_shared` prose + the fixture example); the **Step-2
  conformance check** will enforce that real output matches the contract, closing that gap.

**Gate:** ✅ approved ("go") — proceeded to Step 2.

---

## Step 2 — Contract + conformance check · status: ✅ built & self-verified · awaiting your gate

**Goal:** write the human-readable pipeline contract (the shape both drivers follow) and a checker
that proves a produced pack matches the contract + manifest.

**Design correction (caught before building):** the conformance check is *deterministic file
validation* → it needs filesystem access → **Workflow scripts can't do fs**, so it's a plain **Node
script in `.claude/tools/`**, not a `.claude/workflows/*.js`. BUILD-ORDER + name-map updated.

**What we did**
1. Wrote `.claude/skills/_shared/pipeline.md` — the human-first contract: the 6 ordered steps
   (skill · input · output path · forward-IDs · rubric), the clustering decision-point, the
   entry/no-skip/provided-doc rule, and the three (and only three) ways the two drivers differ.
2. Wrote `.claude/tools/conformance-check.mjs` — validates a pack: required fields, no ghost rows,
   **no orphan files**, **no dangling trace links**, KPI/readiness consistency. Exposes `checkPack()`
   + a CLI.
3. Wrote `.claude/tools/conformance-check.test.mjs` — clean / orphan / dangling scenarios.

**Files touched**
- Created: `.claude/skills/_shared/pipeline.md`
- Created: `.claude/tools/conformance-check.mjs`, `.claude/tools/conformance-check.test.mjs`
- Edited: `.claude/_plans/BUILD-ORDER.md` (checkers are Node tools, not Workflows)

**Test result**
- CLI on the clean fixture → **CONFORMS (9/9, exit 0)**.
- Test suite → **ALL PASS (3/3)**: clean pack conforms; an orphan file is caught **and named**
  (`stray-note.md`); a dangling link is caught **and named** (`FR-999`).

**Self-review vs Step-2 acceptance criteria**
- ✅ Conformance passes on a clean pack.
- ✅ Fails, naming the offending id/path, on a missing/orphan file and a dangling link.
- ✅ Contract is human-readable and editable; it's the single source for pipeline shape.

**Honest residual**
- The contract (`pipeline.md`) is not yet *enforced* on a real run — that binds in Step 6 when the
  drivers become thin and follow it. Today it's the agreed shape + a checker that can police any pack.

**Gate:** awaiting your OK to proceed to Step 3 (eval rubrics + the auditor).

---

## Checkpoint — "are the workflows still OK / are docs in line?" (before Step 3)

**Verified (nothing broken):**
- All 4 workflow scripts parse clean; both tooling test suites (manifest 18/18, conformance 3/3) green.
- `_shared/system-prompt.md` intact (12 sections; RUN MANIFEST added, existing sections untouched).
- **Zero stale old workflow names** anywhere in the repo — the rename is clean; main docs
  (`README.md`, `.claude/README.md`, `ARCHITECTURE.md`, `WORKFLOW.md`) already use the new names.

**Safety refinement made:** added a **rollout-status note** to the RUN MANIFEST section — it's
driver-orchestrated from Step 6, so *current* runs behave exactly as before (skills save to their
stage folders; no standalone manifest writes). Keeps us "in line like before."

**Scheduled doc updates (so main docs stay accurate as infra goes live — do NOT do early):**
- **At Step 5 (AD-6):** root `README.md` line ~36 lists `06-story-shells / 07-groomed-stories /
  08-acceptance-criteria` → change to the single `06-stories/`.
- **At Step 6:** add the manifest + pipeline-contract + `.claude/tools/` to `ARCHITECTURE.md` /
  `README.md` (they're deliberately absent until the workflows actually use them).

---

## Step 3 — Eval rubrics + auditor · status: ✅ built & self-verified · awaiting your gate

**Goal:** author the rubrics (the "oracle") and refactor the auditor to grade against them; prove it
catches a seeded defect (with an anchor) and passes a clean artifact.

**What we did**
1. Wrote **8 rubrics** in `.claude/skills/_shared/rubrics/` — brd, prd, features, clustering, epic,
   story-shell, story-body, ac — each a checklist with a severity per item and a gate rule.
2. Refactored `.claude/workflows/compliance-audit.js` into the **per-artifact auditor**: it loads the
   type's rubric + `_shared/system-prompt.md`, grades under an adversarial persona, returns **anchored**
   findings (`item · location · verbatim quote · fix`), writes `Output/_eval/<id>-eval.md`, and the
   script computes the verdict deterministically (any `B` → FAIL). The "sweep" is just this run over
   many artifacts. Syntax-clean.
3. Seeded fixtures: `fixtures/seeded/brd-clean.md`, `brd-defect.md`.

**Files touched**
- Created: `.claude/skills/_shared/rubrics/*.md` (8), `fixtures/seeded/brd-{clean,defect}.md`
- Edited: `.claude/workflows/compliance-audit.js`

**Test result — live run (2 agents, 0 errors, ~85s)**
- **BRD-DEFECT → FAIL.** Two **Blockers** anchored to the exact planted quote *"Cut notification
  opt-outs by 40% within 3 months."* — B3 (invented number, no citation) + B2 (KPI no confidence
  tier) — plus 5 Majors. `_eval` findings file written.
- **BRD-CLEAN → PASS, zero findings** — no false positives.

**Self-review vs Step-3 acceptance**
- ✅ Seeded defect flagged with severity **and** a verbatim anchor.
- ✅ Clean artifact passes.
- ~ "rerun = same severity": reproducibility is **structural** (severity is fixed by the rubric item;
  the gate is computed deterministically in-script), not empirically re-run — say the word if you
  want the empirical re-run.

**Honest residual**
- Only the **BRD** rubric was exercised live; the other 7 are authored but not yet run against seeded
  defects (cheap to add per type when we want).
- The auditor writes `_eval` + returns verdicts; **writing verdicts into `manifest.json`** binds with
  the drivers (Step 6).
- Cleaned up the fixture `_eval` files from `Output/` (test artifacts, removed).

**Gate:** awaiting your OK to proceed to Step 4 (coverage / traceability gate).

---

## Step 4 — Coverage / traceability gate · status: ✅ built & self-verified · awaiting your gate

**Goal:** the deterministic **set-level** check the per-artifact auditor cannot see — does every id
flow down the spine, and is anything orphaned or double-placed?

**What we did**
- Wrote `.claude/tools/coverage-gate.mjs` — reads the manifest's `defines`/`tracesTo` and checks 4
  boundaries: BR→FR, FR→Feature, Feature→EPIC (exclusive placement), Feature→Story. Exposes
  `checkCoverage()` + a CLI. Pure Node (fs), like the conformance check.
- Wrote `.claude/tools/coverage-gate.test.mjs` — clean / uncovered-FR / duplicate-feature scenarios.

**Files touched**
- Created: `.claude/tools/coverage-gate.mjs`, `.claude/tools/coverage-gate.test.mjs`

**Test result**
- CLI on the clean fixture → **FULLY TRACED (4/4 boundaries)**.
- Test suite → **ALL PASS (3/3)**: clean pack traces; an **FR covered by no feature is named**
  (`FR-07`); a **feature placed in two EPICs is flagged** (`FEAT-01` placed in 2).

**Self-review vs Step-4 acceptance**
- ✅ An FR covered by no feature → named.
- ✅ A feature in two EPICs → flagged.
- ✅ A fully-traced pack → passes; deterministic (re-run = identical).

**Honest residual**
- Works at the **set level** from the manifest's `defines`/`tracesTo` (which id-sets each artifact
  defines/covers). It does **not** verify fine-grained per-pair links (which FR maps to which BR) —
  that granularity isn't in the file-level manifest by design; the per-artifact PRD rubric (P3)
  checks the traceability matrix *exists* inside the PRD.
- Story→AC coverage becomes meaningful once stories carry `subStates` in real runs (Steps 5–6).

**Gate:** ✅ eval foundation (Steps 1–4) complete.

---

## Plan revision — AD-6 moves to the driver; atomic skills stay untouched

**Trigger:** "without disturbing the atomic skills, is there a way to achieve the one-evolving-story?"

**Decision:** yes. The one-evolving-file is a **placement** concern (where output lands, append vs
new) — it belongs to the **driver/contract**, not the skills' method. So:
- The **old standalone Step 5** ("rewrite the story skills' logic") is **dropped**.
- AD-6 is realized in the **driver refactor** (now **Step 5**): draft writes `06-stories/<story-id>.md`,
  groom + AC **append in place**.
- The atomic skills get at most a **one-line save-location tweak** (placement only) so standalone use
  matches — their tested method is untouched.
- The `_shared` output-table rename to `06-stories` is a shared-convention edit (not an atomic skill).

**Net:** 6 steps → **5 steps**; fewer edits, lower risk. BUILD-ORDER / README / FIXES updated.

---

## Update — eval-wiring landed via commits (`af638dd`, `5eb0273`)

Work advanced **outside** the step-by-step loop (committed directly). Recorded here so the trail
matches the code. Old `old-ref/` was deleted by the user.

**`af638dd` — Add artifact-eval layer + fix package portability**
- New **`artifact-eval`** skill (authors evals/rubrics) + **`_shared/eval-runner.md`** — the shared
  "brain" that grades an artifact against any rubric.
- Rubrics upgraded to **3-pass** (Shape / Soundness / Coverage) with frontmatter
  (`eval·grades·input/oracle·gate·runner`) and **remediation routing** (agent-fixable vs needs-human).
- `SKILLS` path constant for portability (all 3 workflow scripts); `.gitignore` anchored so the
  toolkit's `_shared/` ships. *(The `eval-model.md` move came later — see the cleanup entry below.)*

**`5eb0273` — Wire eval-on-formation into skills + workflows**
> **⚠️ Superseded (historical record):** the skill-side "grade-on-formation" described in this entry
> was later **removed** — evals are now **manual**, and skills never auto-grade
> (`_shared/system-prompt.md` → *Evals are manual — never run automatically*). Only the `auto-spec`
> workflow's `gradeAndFix` (below) still grades as it runs. This entry documents what was built at
> the time; it is **not** current behaviour.
- **Grade-on-formation** as a shared rule in `_shared/system-prompt.md` — every skill grades its own
  output before the gate (agent-fix ≤3, needs-human surfaced); includes the skill→rubric map.
- `auto-spec` gains **`gradeAndFix`**: produce → eval via the runner → auto-fix agent-owned findings
  (≤3) → carry, so a failing artifact doesn't feed the next stage. Applied to BRD→PRD→features.
- `compliance-audit` **panel voting** (brd/prd = 3, majority vote).
- ARCHITECTURE / README / WORKFLOW rollout status updated.

**Effect on the plan:** the **eval half of Step 5 is now DONE.** Remaining Step 5 = the **structure
half** (see BUILD-ORDER Step 5): manifest-during-run · one-evolving-story file · provided-docs/no-skip
· thin-drivers · auto-run the two checkers. Plus the real run (on hold) and `version-log`/`blast-radius`.

---

## Session cleanup — one `_shared`, portability, docs swept · status: ✅ done · **uncommitted**

Post-commit tidy — staged/unstaged in the working tree, **not yet committed**:
- **`eval-model.md` → `skills/_shared/`** (git mv, staged) — the eval *philosophy* now ships beside
  `eval-runner.md`; the two links in `_plans/` were repointed.
- **One `_shared`** — the stale root `./_shared/` (an old `system-prompt.md` + a duplicate
  `standard-formats.md`) and the empty `./old-ref/` were **deleted by the user**; the `.gitignore`
  archive lines were removed. *(That broad `_shared/` ignore was the cause of the earlier
  "toolkit `_shared` never ships" bug — now moot.)*
- **Docs swept for accuracy** — ARCHITECTURE (self-eval is the shared rule, not AC Step 3; the
  `SKILLS` constant caveat; `_shared` file list + `eval-model.md`), root `README` skill count
  12 → 13 + eval-layer pointer, `artifact-eval` SKILL's stale "Step 3" reference. WORKFLOW and the
  package `README` verified clean.

**Next commit** captures this cleanup plus these plan-status edits.
