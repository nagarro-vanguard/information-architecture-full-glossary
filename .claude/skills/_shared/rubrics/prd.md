---
eval: prd
grades: a Product Requirements Document
input:
  artifact: the PRD file
  oracle: the BRD (BR-xx) it derives from + the PRD's own persona list (same file) — read them for the coverage pass
gate: any B → FAIL · else findings → PASS_WITH_FINDINGS · clean → PASS
runner: _shared/eval-runner.md
panel: 3   # high-stakes type — run a 3-auditor panel, majority vote
---

# R-PRD — Product Requirements Document (eval rubric)

**North-star:** *could a team build the right product from this PRD alone — and does every
requirement trace to a real business need, with no invented rule and no persona that pays off nowhere?*
**Input:** grade the PRD; the **BRD** and the PRD's **own personas** are the **oracle** for Pass 3.
Oracle absent → mark P8–P11 `not-evaluable`, don't guess.
**Stance:** adversarial on soundness & coverage; binary on shape.

## Pass 1 — Shape (intrinsic, binary)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| P1 | FRs numbered `FR-xx`, sequential; a BR→FR traceability matrix (RTM: one row per BR, named, no collapsed ranges) is present | m | Fire on a missing/duplicate/non-sequential id, no matrix, or a matrix that collapses BRs into ranges |
| P2 | Release/acceptance criteria present | m | Fire if absent |
| P12 | **Lineage block** first (Previous · Primary source · Supporting · Next); Previous step plain text, links show the file name, missing marked `Does not exist`/`None` | m | Fire if the block is absent, not the first block, or a field is omitted rather than marked |

## Pass 2 — Soundness (intrinsic, judgment)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| P3 | Each FR is atomic + testable — a single verifiable capability | B | Fire on a compound "and/or" FR or an unverifiable one — quote it |
| P4 | Product overview + personas are grounded, not invented | M | Fire on a persona/claim with no basis in source — quote it |
| P5 | User flows present and coherent — ≥1 end-to-end per primary capability | M | Fire on a primary capability with no coherent flow |
| P6 | Business/data language — no implementation jargon | M | Scan G.3 prohibited terms; quote the term |
| P7 | Every metric carries a confidence tier | B | Fire on a bare metric (no CONFIRMED/TENTATIVE/AI-RECOMMENDED) |

## Pass 3 — Coverage (oracle: the BRD + the PRD's personas; if absent → not-evaluable)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| P8 | Every FR traces to a real `BR-xx` that exists in the BRD | B | Fire on an FR whose BR link is blank or names a BR absent from the BRD — quote the FR |
| P9 | Every business rule/threshold is cited to a source or AI-RECOMMENDED | B | Fire on an uncited rule — quote it |
| P10 | NFRs present where the BRD flagged them mandatory | M | Fire on a BRD-required NFR class missing from the PRD |
| P11 | **No dead persona** — every persona defined is referenced by ≥1 FR or flow | M | List personas; fire on one used nowhere — quote its definition |

## Remediation routing
- **agent-fixable** — P1–P6, P10–P12 (drop or wire the persona), and P8 when the BR exists
  (add the link).
- **needs-human** — P7 (accepting an AI-RECOMMENDED metric is a human decision); P8 when the BR
  does not exist (needs a BRD change); P9 when the rule is in no source. Mark, ask, never invent.
