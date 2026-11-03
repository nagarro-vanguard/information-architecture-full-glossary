# Feature Catalog — rules, field contract & delivery checklist

The deep guidance for `define-features`. The SKILL.md carries the flow and the table
shape; this file carries the rules that make each row sound. It **inherits the nine
quality characteristics (Q1–Q9) from `../../_shared/quality-characteristics.md`** and adds
the four rules specific to a feature catalog. Do not restate Q1–Q9 — apply them.

---

## 1. The field contract (this is what makes Q2/Q3/Q5 concrete)

Every row has two prose fields that are easy to collapse into each other. Keep them
distinct:

| Field | Answers | Shape | Must NOT be |
|-------|---------|-------|-------------|
| **Category** | *Which part of the source does it belong to?* | The source section's name, **verbatim** (the row lives under that `###` sub-table) | A category the source does not have (invented) |
| **Description** | *What is this feature?* | `[capability] so that [value/outcome]` — one sentence | The feature name reworded |
| **Done when** | *How do we observe it is fully realized?* | An observable end-state an outside party could confirm, covering all the feature's requirements | The Description reworded |

**The ⊆ test (deterministic, Q3 + Q5).** Read the Done-when. If every condition in it is
already stated in the Description — i.e. Done-when ⊆ Description — the row **fails**. The
Done-when must add **at least one observable condition** the Description does not contain.

**Verifiability (Q5).** A Done-when built on *intention* verbs — "supports", "allows",
"can", "handles", "enables" — fails. Rephrase as an outcome: not "allows a key to be set"
but "AI capabilities stay unavailable until a key is set."

### Worked example — the collapse, and its fix

- ❌ **Rejected** (Done-when just rewords Description — fails the ⊆ test):
  > Description: *A project's name is fixed after creation.*
  > Done when: *the project name is fixed after creation.*

- ✅ **Correct** (Done-when adds an observable condition):
  > Description: *A project's name becomes fixed once it is created.*
  > Done when: *After creation, an attempt to change the project name is not accepted.*

---

## 2. Feature-specific rules (add to Q1–Q9)

### FR-1 — Stable feature ID (absolute reference)
Each feature gets `F-01`, `F-02`, … assigned in order. An ID is **unique and permanent**:
if a feature is dropped or merged, its number is **retired, never reused or reassigned**.
Renumbering the catalog silently breaks every downstream link — don't.

### FR-2 — Source IDs: verbatim or declared, never invented
The `Covers` column links each feature to the requirements it derives from. Run this
**once at Intake and print the result for approval** before deriving:

1. **Detect the source's requirement-ID style.**
   - Uses `FR-<n>` → use those tokens **verbatim**.
   - Section-numbered (`1.1`, `12.4`) → rewrite as **`REQ-<section>.<n>`** and state the
     mapping once (source `1.1` → `REQ-1.1`). **Never** emit a bare `1.1` (ambiguous —
     could be a section, a rule, a BR) and **never** mint an `FR-01` the source lacks
     (that is renumbering, not tracing).
   - No stable IDs at all → assign `REQ-001…` in document order, print the **full map**,
     get approval, *then* derive.
2. `Covers` may contain **only** tokens that exist in the source or the approved map. A
   token that appears nowhere in the source is a defect (invented traceability).
3. **BR links** only when a BRD is provided; otherwise write `— (no BRD)`. Never
   fabricate a `BR-xx`.

### FR-3 — Priority carries a named basis
Every feature has a MoSCoW rank (Q8) **and** a basis drawn from the fixed vocabulary in
`../../_shared/standard-formats.md` → *Prioritization basis*: **benefit, penalty, cost,
risk, dependency, time-sensitivity, stability, regulatory**. The basis cell names one and
states it in one clause. If the source does not support a rank, mark it
`Proposed (needs confirmation)` — never assert an unsupported priority.

### FR-4 — Complete coverage (set-level)
The catalog must **completely describe** the in-scope requirements: every in-scope source
requirement lands in **at least one** feature. Render the coverage check as the
**Requirements Traceability Matrix** (`../../_shared/standard-formats.md`) with endpoints
**Requirement → Feature** — one row per requirement, named verbatim, grouped by category, no
collapsed ranges — and flag any uncovered requirement as its own `Gap` row. (Per-row eval
checks the link is *present*; this set-level gate checks coverage is *true*.)

### FR-5 — Group by source category
Present the catalog as one `###` sub-table **per category in the preceding document**, the
category name taken **verbatim** from the source's sections. A feature belongs to **one**
category — its primary section; if it also covers a requirement from another section, note
the cross-reference in `Notes` rather than duplicating the feature. Feature IDs are
**globally sequential** across categories (F-01, F-02, …) and never restart per category
(FR-1). If the source has **no** categories, produce a single ungrouped table — never
invent a category (Q9/G.1).

### Template only (G.6)
The saved file contains **only** the template sections defined in `SKILL.md` → *The catalog
(output)*: title + Lineage block + control block, the grouped catalog, the coverage check, and Open
Questions (only if any). The Intake ID declaration, approval prompts, per-step narration,
and any "what changed / compared to a prior version" notes are **chat output** — they are
never written into the artifact.

---

## 3. Delivery checklist

Run before hand-off. Anything unchecked is fixed or raised as an Open Question.

### Each row
- [ ] **Q1** One capability — no `and` / `/` / bundled verbs; compound features split
- [ ] **Q2** Description gives capability **and** value; no blank required field
- [ ] **Q3 + Q5** Done-when is observable **and** passes the ⊆ test (adds a condition the Description lacks)
- [ ] **Q4** No unbounded vague terms; "is it met?" answerable from the row
- [ ] **Q7** Business language — no G.3 terms; domain nouns from the source
- [ ] **Q8** MoSCoW rank present
- [ ] **FR-3** Basis named from the fixed vocabulary (or `Proposed`)

### Traceability & IDs
- [ ] **FR-1** Feature IDs unique, sequential, none reused
- [ ] **FR-2** ID scheme declared at Intake; `Covers` uses only verbatim/declared tokens
- [ ] Every `Covers` token exists in the source or the approved map — none invented
- [ ] BR links present only if a BRD exists; else `— (no BRD)`

### Set level
- [ ] **FR-4** Coverage rendered as the RTM template (Requirement → Feature); every in-scope requirement in ≥1 feature, no collapsed ranges
- [ ] **FR-5** One sub-table per source category, names verbatim; IDs globally sequential; no invented category
- [ ] Gaps flagged in Open Questions, not hidden
- [ ] **Q6** No two features claim the same capability; none contradicts another or the source

### Artifact shape
- [ ] **G.6** File is template-only — title + Lineage block + control block, grouped catalog, coverage check, Open Questions (if any); no Intake narration, approval prompts, or "what changed" notes in the file
- [ ] Lineage block present as the first block (Previous step · Primary source · Supporting sources · Next step); existing refs linked, missing ones marked `Does not exist`/`None`
- [ ] Control block present with fixed fields (ID scheme · BR links · Status)

### Source integrity
- [ ] **Q9 (G.1/G.2)** Nothing invented; every specific sourced or marked `TBD` / `Proposed`
