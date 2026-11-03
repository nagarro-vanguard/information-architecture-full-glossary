---
eval: clustering
grades: a feature-clustering document (features grouped into EPIC options + the chosen one)
input:
  artifact: the clustering file
  oracle: the feature catalog it clusters — read it for the coverage pass
gate: any B → FAIL · else findings → PASS_WITH_FINDINGS · clean → PASS
runner: _shared/eval-runner.md
---

# R-CLUS — Clustering (eval rubric)

**North-star:** *does this grouping give cohesive, independently-deliverable EPICs with every
feature placed exactly once — or does it split by convenience, leave orphans, and bury why it
beat the alternatives?*
**Input:** grade the clustering; the **feature catalog** is the **oracle** for Pass 3. Oracle
absent → mark C7 `not-evaluable`, don't guess.
**Stance:** adversarial on soundness & coverage; binary on shape.

## Pass 1 — Shape (intrinsic, binary)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| C1 | Chosen strategy stated + a one-line rationale surfaced | m | Fire if either is missing |
| C2 | ≥2 alternatives considered, each with a why-rejected | m | Fire on <2 alternatives, or an alternative with no rejection reason |
| C8 | **Lineage block** first (Previous · Primary source · Supporting · Next); Previous step plain text, links show the file name, missing marked `Does not exist`/`None` | m | Fire if the block is absent, not the first block, or a field is omitted rather than marked |

## Pass 2 — Soundness (intrinsic, judgment)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| C3 | The choice is justified on a stated criterion — why it beats the alternatives, not just asserted | M | Fire if the rationale names no comparison criterion — quote it |
| C4 | Cross-cutting features handled explicitly (named, not silently duplicated) | M | Fire on a feature appearing in >1 EPIC that isn't flagged cross-cutting — quote it |
| C5 | **EPIC cohesion/balance** — no 1-feature EPIC, no EPIC swallowing most features; each independently deliverable | M | Fire on a degenerate cluster — quote its feature count |
| C6 | Inter-cluster dependencies noted | M | Fire if clusters clearly depend but no dependency is stated |

## Pass 3 — Coverage (oracle: the feature catalog; if absent → not-evaluable)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| C7 | Every catalog feature is placed in exactly one primary EPIC — none unplaced, none double-counted | B | Diff clusters vs catalog; fire on an unplaced or double-counted feature — quote it |

## Remediation routing
- **agent-fixable** — C1–C6, C8 (surface the rationale/criterion, flag cross-cutting, rebalance the
  clusters, note the dependencies), and C7 (place the orphan / de-duplicate).
- **needs-human** — only when C7 exposes that the **catalog itself** is incomplete (a feature with
  no sensible home): raise it, don't force-fit.
