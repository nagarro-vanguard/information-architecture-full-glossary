---
eval: brd
grades: a Business Requirements Document
input:
  artifact: the BRD file
  oracle: the BRD's own objectives + BR-xx (internal) for the coverage pass; the source/discovery docs where available
gate: any B → FAIL · else findings → PASS_WITH_FINDINGS · clean → PASS
runner: _shared/eval-runner.md
panel: 3   # high-stakes type — run a 3-auditor panel, majority vote
---

# R-BRD — Business Requirements Document (eval rubric)

**North-star:** *would a sponsor sign this — objectives that are outcomes with evidenced metrics
and no invented numbers — or does it dress features as goals and smuggle in unsourced targets?*
**Input:** grade the BRD; its **own objectives and BRs** are the **oracle** for the coverage pass
(internal — always runnable). Source docs sharpen B4/B9 where present.
**Stance:** adversarial on soundness & coverage; binary on shape.

## Pass 1 — Shape (intrinsic, binary)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| B1 | Business requirements numbered `BR-xx`, sequential | m | Fire on a missing/duplicate/non-sequential id |
| B2 | Scope in/out both explicit (out-of-scope not empty by default) | m | Fire if either list is absent or out-of-scope is empty |
| B3 | Release-level acceptance criteria present | m | Fire if no "done for this release" statement |
| B13 | **Lineage block** first (Previous · Primary source · Supporting · Next); Previous step plain text, links show the file name, missing marked `Does not exist`/`None` | m | Fire if the block is absent, not the first block, or a field is omitted rather than marked |

## Pass 2 — Soundness (intrinsic, judgment)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| B4 | Problem vs Opportunity classified, with the evidence that decides it | M | Fire if unclassified or classified with no baseline/source basis |
| B5 | Objectives are outcomes, not features restated as goals | M | Fire on an objective phrased as "build/add X" rather than a result — quote it |
| B6 | Each BR is atomic — one ask, no "and/or" bundle | M | Fire on a compound BR — quote it |
| B7 | Business language only — no implementation jargon | M | Scan G.3 prohibited terms; quote the term |
| B8 | Every metric/KPI carries a confidence tier | B | Fire on a bare metric (no CONFIRMED/TENTATIVE/AI-RECOMMENDED) |
| B9 | No invented numbers/targets/SLAs — each is cited or tagged AI-RECOMMENDED / TBD | B | Fire on a specific with no citation and no tag (G.1) — quote it |
| B10 | Risks named, each with a mitigation or owner | M | Fire on a risk with no response |
| B11 | AI-RECOMMENDED items sit in an Action-Required checklist; unknowns use the labels | m | Fire on an AI-RECOMMENDED item missing from the checklist, or a silently-omitted gap |

## Pass 3 — Coverage (oracle: the BRD's own objectives + BRs — internal)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| B12 | **Objective↔BR coverage** — every objective is served by ≥1 BR, and no BR serves no objective | M | Map objectives↔BRs; fire on an unserved objective or an orphan BR — quote it |

## Remediation routing
- **agent-fixable** — B1–B7, B10–B13: renumber, split, relabel, reframe an objective as an
  outcome, add the mitigation, wire the objective↔BR map.
- **needs-human** — B8 (metric-tier / AI-RECOMMENDED acceptance is a human call); B9 (an invented
  number needs a source or an owner's decision). Mark, ask, never fabricate.
