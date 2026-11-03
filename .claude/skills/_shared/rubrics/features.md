---
eval: features
grades: a Feature Catalog
input:
  artifact: the feature catalog file
  oracle: the PRD/requirements it derives from — read it for the coverage pass
gate: any B → FAIL · else findings → PASS_WITH_FINDINGS · clean → PASS
runner: _shared/eval-runner.md
quality: _shared/quality-characteristics.md
---

# R-FEAT — Feature Catalog (eval rubric)

**North-star:** *does every requirement become a real, single-capability feature that is
observably complete and traces back with a real ID — or are there compound blobs, restated
completion fields, invented/bare IDs, and coverage merely asserted?*
**Input:** grade the catalog; the **PRD/requirements** is the **oracle** for Pass 3. Oracle
absent → mark F8 `not-evaluable`, don't guess.
**Bar:** the quality characteristics (Q1–Q9) in `_shared/quality-characteristics.md` and the
feature rules (FR-1–FR-4) in `define-features/references/feature-catalog.md`. This rubric
tests them — it does not redefine them.
**Stance:** adversarial on soundness & coverage; binary on shape.

## Pass 1 — Shape (intrinsic, binary)
| # | Check | Q/FR | Sev | How to test — anchor the quote here |
|---|-------|------|-----|--------------------------------------|
| F1 | Each feature has a name, a **Description**, and a **Done when** | Q2 | m | Fire on a feature missing any of the three — quote the row |
| F2 | MoSCoW priority on every feature | Q8 | m | Fire on a feature with no Must/Should/Could/Won't |
| F3 | Every feature's priority names a **basis** from the vocabulary (or `Proposed`) | FR-3 | m | Fire on a rank with no basis clause |
| F4 | Coverage rendered as the RTM (requirement → feature): one row per requirement, named from source, no collapsed ranges | FR-4 | m | Fire if the matrix is absent, uses collapsed ranges, or omits requirement names |
| F9 | **Template-only** — file is title + Lineage block + control block, grouped catalog, coverage check, Open Questions (if any); no Intake narration, approval prompts, or "what changed" notes | G.6 | m | Fire on any prose section outside the template — quote the stray heading/line |
| F10 | **Grouped by source category** — one sub-table per source category, names verbatim (when the source has categories) | FR-5 | m | Fire if the source has categories but the catalog is a single flat table, or a category name is not in the source |
| F11 | **Lineage block** first (Previous · Primary source · Supporting · Next); Previous step plain text, links show the file name, missing marked `Does not exist`/`None` | G.6 | m | Fire if the block is absent, not the first block, or a field is omitted rather than marked |

## Pass 2 — Soundness (intrinsic, judgment)
| # | Check | Q/FR | Sev | How to test — anchor the quote here |
|---|-------|------|-----|--------------------------------------|
| F5 | Each feature is one capability, not a compound blob | Q1 | M | Fire on a feature joining capabilities with `and`/`/` or two verb+object pairs — quote it |
| F6 | **Done when** is observable **and** distinct from the Description (⊆ test) | Q3·Q5 | M | Fire when the Done-when only rewords the Description, or uses intention verbs (supports/allows/handles) with no observable outcome — quote both fields |
| F7 | Business language | Q7·G.3 | m | Scan G.3 prohibited terms; quote the term |

## Pass 3 — Coverage & traceability (oracle: the PRD/requirements; if absent → not-evaluable)
| # | Check | Q/FR | Sev | How to test — anchor the quote here |
|---|-------|------|-----|--------------------------------------|
| F8 | Each feature's `Covers` uses **real tokens** — a verbatim `FR-xx` or a declared `REQ-<section>.<n>` that exists in the oracle; **no bare number, no invented token, no orphan feature** | FR-2 | B | Fire on a `Covers` cell that is blank, a bare `1.1`, or names a token absent from the oracle — quote it |

> **Set-level, not here:** 100% coverage (every in-scope requirement landing in ≥1 feature) is a
> *set* property — F4 only requires the coverage check to be *present*; the coverage gate (Plan 2)
> verifies it is *true*. Keep that check out of this per-artifact eval.

## Remediation routing
- **agent-fixable** — F1–F7, F9, F10, F11, and F8 when the token exists in the oracle (wire the
  real link / declare the scheme) or the feature splits cleanly.
- **needs-human** — F8 when a feature maps to no requirement at all (invented — needs a
  scope decision). Mark, ask, never invent a token to justify it.
