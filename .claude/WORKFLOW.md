# Execution detail — what happens at each phase

This is the gate-by-gate reference for how the pipeline actually runs. For what the
toolkit is and how to invoke it, see the [full guide](../README.md); this doc only covers
the mechanics the `specifier` skill (and its unattended twin `auto-spec`) follow.

Two modes, same phases underneath:

- **Gated (default) — the `specifier` skill.** Invokes one phase's skills at a time, stops
  at each human gate, advances only on your approval. The gates are the point.
- **Autonomous — the `auto-spec` workflow.** Runs every phase unattended and hands you the
  finished pack to review at the end.

Use the gated skill for control, `auto-spec` for a fast first draft.

---

## What the specifier does at each phase

Each skill ends `HUMAN ACTION REQUIRED:` and the `specifier` waits for approve / edit /
redo before advancing. (What each phase *requires as input* is the prerequisites table in
the [guide](../README.md#prerequisites--what-each-step-needs).)

### Phase 1 — Requirements
- **Invokes:** `probe-requirements` (only if the idea is thin) → `write-brd` → `write-prd`.
- **Produces:** BRD (`BR-xx`) and PRD (`FR-xx` traced to `BR-xx`).
- **Gate:** approve the BRD, then the PRD.

### Phase 2 — Features
- **Invokes:** `define-features` over the PRD's `FR-xx` (derives, prioritizes, links in one pass).
- **Produces:** Feature catalog with 100% coverage — each feature single-capability, with a
  Description, an observable **Done when**, verbatim/declared source IDs, and a MoSCoW rank + basis.
- **Gate:** approve the catalog.

### Phase 3 — EPICs
- **Invokes:** `cluster-features` (2–3 options — you pick one or go custom) → `generate-epics`.
- **Produces:** the **EPIC Register** (primary — one row per EPIC, copied from the clustering), then per-EPIC detail files **on demand** (MVP band first), plus sequencing + EPIC-to-feature mapping.
- **Gate:** pick a clustering; approve the Register; approve each detail file.

### Phase 4 — Stories
- **Invokes:** `draft-stories` (from the EPIC's Register row) → `groom-stories` → order within the EPIC → `write-acceptance-criteria`.
- **Produces:** Groomed stories with AC, ordered within their EPIC.
- **Gate:** approve stories per batch; AC one story at a time.

After each phase, snapshot with the `version-log` workflow if you want a version in the
audit trail.

---

## Evals are manual (skills never auto-grade)

Skills — and the `specifier` pipeline, which is a skill — **do not grade their own output**.
A skill produces its artifact and stops at your gate; no eval fires on its own. This is a
**single shared rule** (`_shared/system-prompt.md` → *Evals are manual — never run
automatically*) that every skill inherits.

When you *want* an artifact graded, you invoke the eval yourself against its human-authored
rubric (`_shared/rubrics/<type>.md`) through the shared `eval-runner`:
- **one artifact** — load the `eval-runner` + the rubric, point it at the file;
- **a batch** — run the `compliance-audit` workflow over an `Output/` pack.

The `auto-spec` workflow is the one caller that grades as it runs (a deterministic
workflow-level gate over the BRD → PRD → features spine). Full status:
[ARCHITECTURE.md](ARCHITECTURE.md) → *The eval layer*.

---

## Entry points (start anywhere)

Prerequisites tell you what a step needs; entry points tell you where to jump in if you
already have some of it. Point the `specifier` at whatever you have:

| You have | Start at |
|----------|----------|
| A feature idea | Requirements (optionally probe first) |
| An approved BRD + PRD | Features |
| A feature catalog | EPICs |
| Approved EPICs | Stories |
| Stories already in the tracker | invoke `groom-stories` / `write-acceptance-criteria` directly |

For handling a change to an already-approved artifact, see
[When a requirement changes](../README.md#when-a-requirement-changes).
