# Tier-3 · Plan 1 — Pipeline Contract & Run Manifest (AD-7 moves 1, 2, 5)

**Addresses:** Tier-3 hole #9 (alignment) at its root. **Depends on:** nothing — this is the
foundation. **Enables:** Tier-1 eval (writes verdicts into the manifest), Tier-1 coverage gate
(reads links), Plan 3 (records provenance), thin drivers (Tier-3 Plan 2), story-index (AD-9).

## Why this is first
Alignment isn't achieved by editing five workflows to match by hand — it's achieved by giving them
**one thing to conform to**. That thing is a **manifest** (machine-readable inventory of a run) plus a
**contract** (the pipeline's shape). Build these before wiring eval or refactoring drivers, so eval
writes status *into* the manifest and every workflow reads it there — no retrofitting.

## The key feasibility fact
Workflow *scripts* (auto-spec) have **no filesystem access**. But the **step subagents do** (Read/Write).
So the manifest is **maintained by the agents at each step**, never by the script:

> read manifest → do the step's work → write the artifact → update this artifact's manifest row.

The auto-spec script only *sequences* agents; specifier (agent-run) updates the manifest as it goes.
This is what makes a shared, always-current index feasible across both execution models.

## Part A — The Run Manifest
One file per run: `Output/manifest.json` (machine) with an optional rendered `Output/manifest.md`
(human). Every artifact gets a row.

**Per-artifact row**
| Field | Meaning |
|-------|---------|
| `id` | Stable id — `BR-xx`, `FR-xx`, `FEAT-xx`, `EPIC-00X`, `STORY-00Y`, `AC-…` |
| `type` | brd \| prd \| feature \| clustering \| epic \| story \| … |
| `stage` | producing stage (`01-brd`, …) |
| `path` | file on disk |
| `provenance` | `provided-normalized` \| `generated` \| `reconstructed-stub` (Plan 3) |
| `eval` | `{ status: PASS\|PASS_WITH_FINDINGS\|FAIL\|BLOCKED_HUMAN, loops: n, findings: path }` |
| `tracesTo` | up-links (e.g. a story → its feature/epic/FR) |
| `produces` | down-links |

**Run-level header**
`featureName · startedAt (entry stage) · status (ok | blocked-human-needed) · kpi (eval pass-rate %)`.

- **The story-index (AD-9) is just the `type: story` rows** — assign `STORY-00Y` once at shell
  creation, and every later stage (body, AC) locates the file by looking up its row. No runtime name
  guessing, no duplicates, resume-safe.
- The manifest **is** the run manifest for resume: "what exists and what passed" lives here.

## Part B — The Pipeline Contract
The single definition of the pipeline's shape. **Format is open question #1** (see below). Contents:
- **Ordered steps**, each: `id · skill · inputs (by manifest id/type) · output folder + naming ·
  forward-IDs · rubric id · manifest-writes`.
- **Decision-points** as first-class (e.g. clustering = choose-one): defined once; each *driver*
  resolves them (auto-spec auto-selects, specifier asks the human).
- **Naming + provenance labels** (aligns AD-3).
It does **not** re-describe skill internals — the skills own those; the contract wires steps together.

## Part C — Conformance check (AD-7 move 5)
A validator run after any workflow: does the produced pack match the contract + manifest?
- Every file on disk has a manifest row and vice-versa (no orphans, no ghosts).
- Every `id` referenced in `tracesTo`/`produces` resolves.
- Provenance present on every artifact; naming matches the contract.
- Manifest is well-formed; run `status`/`kpi` computed.
Deterministic, cheap, reusable in CI. This is what *keeps* the workflows aligned over time.

## Acceptance criteria
- A run produces a valid `Output/manifest.json`; every artifact has a row with provenance + eval.
- Looking up a story by `STORY-00Y` returns its file; renaming/duplication is impossible.
- The conformance check passes on a clean pack and fails (naming the offending id) on a pack with a
  missing row, dangling link, or absent provenance.
- A resumed run reads the manifest and skips artifacts already `PASS` without regenerating them.

## Decisions (resolved with the user)
1. **Contract format — human-first.** The contract is a plain **markdown document the user can read
   and edit**; the machine view is generated from it. Single source = the markdown. The user stays in
   control of the pipeline's shape.
2. **Manifest location — `Output/manifest.json`** at the pack root (easy to find).
3. **Granularity — one row per story.** Shell → body → AC are sub-states of that one row, matching
   AD-6's one-evolving-file.
4. **Scope / order — manifest FIRST, alone.** Build and review the manifest by itself (it unlocks
   story-index, resume, and a slot for eval status) before the contract + conformance check. Smaller
   first step, faster feedback, less risk.

## Build sequence for this plan (per decision 4)
- **Step 1a — Manifest only.** Schema + agents maintain rows + story-index + resume-skip. *Review gate.*
- **Step 1b — Contract (human-first markdown) + generated machine view.**
- **Step 1c — Conformance check.**
