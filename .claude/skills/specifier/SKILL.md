---
name: specifier
description: >-
  The gated top orchestrator — take a feature idea through the whole specification
  pipeline (requirements → PRD → features → EPICs → stories → acceptance criteria),
  invoking each skill in turn and stopping for your approval at every phase. Use when
  someone wants to run the full pipeline with control, "spec this out end to end",
  "walk me through from idea to stories", or resume the pipeline from a mid-point.
  This is the interactive, human-gated run; for an unattended pass that produces the
  whole pack for review at the end, use the `auto-spec` workflow instead.
---

# Specifier (gated pipeline orchestrator)

Drive the whole specification pipeline, one phase at a time, invoking the atomic
skills and **stopping at every gate for your approval**. This orchestrator holds the
sequence and the traceability spine; the real work is done by the skills it calls —
it never re-implements them.

**Scope:** this skill only invokes the toolkit's own skills and writes artifacts under
`Output/`. It changes no skill files and never skips a human gate. For an unattended
run, use the `auto-spec` workflow; for a requirement change, use the
`blast-radius` workflow.

## How to run it

Work the phases in order. **Invoke the named skill for each step** (run it as its own
gated flow), wait for the human to approve its output, then carry the result into the
next step. Start at whichever phase matches what the human already has (see Entry
points). Never advance a phase until its artifact is approved.

### Phase 1 — Requirements → BRD + PRD
1. If the idea is thin or fuzzy, invoke **`probe-requirements`** first → Discovery Brief (gate).
2. Invoke **`write-brd`** → BRD with `BR-xx` (gate).
3. Invoke **`write-prd`** (feed it the approved BRD) → PRD with `FR-xx` traced to `BR-xx` (gate).

### Phase 2 — Features
4. Invoke **`define-features`** over the PRD's `FR-xx` → prioritized feature catalog, 100% FR coverage (gate).

### Phase 3 — EPICs
5. Invoke **`cluster-features`** over the catalog → 2–3 EPIC options; the human picks one or goes custom (gate).
6. Invoke **`generate-epics`** with the chosen clustering → the **EPIC Register** (copied from the clustering) — review it as the gate. On approval, expand per-EPIC detail files **on demand** (MVP band first, or the EPICs you name), one at a time (gate each), plus sequencing + mapping.

### Phase 4 — Stories
7. Invoke **`draft-stories`** for an EPIC's features (from its Register row) → INVEST shells (gate).
8. Invoke **`groom-stories`** (batches of ≤4) → groomed descriptions with dependencies (gate).
9. Order each groomed story within its EPIC (execution order lives on the stories / sequencing — the EPIC itself carries no story-centric mapping).
10. Invoke **`write-acceptance-criteria`** per story → Given/When/Then AC (gate).

At the end, the `Output/` tree holds the full spec pack, ready for a tracker adapter.

## Carry the spine forward

Thread the traceability spine through every hand-off so nothing is orphaned:

`BR-xx` (BRD) → `FR-xx` (PRD) → Feature (catalog) → EPIC → Story → AC

When you hand an artifact to the next skill, pass the IDs it must trace to.

## Entry points (start anywhere)

| The human has | Start at |
|---------------|----------|
| a feature idea | Phase 1 (optionally probe first) |
| an approved BRD + PRD | Phase 2 (features) |
| a feature catalog | Phase 3 (epics) |
| approved EPICs | Phase 4 (stories) |

## Gates

Every invoked skill ends with its own `HUMAN ACTION REQUIRED:` line — honor it. After
each phase, confirm the artifact is approved before moving on. If the human edits,
re-run that step; do not carry an unapproved artifact forward.
