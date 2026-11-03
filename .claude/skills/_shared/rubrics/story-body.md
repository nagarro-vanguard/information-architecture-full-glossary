---
eval: story-body
grades: the groomed body added to a story file (intent, scope, flow, rules, dependencies)
input:
  artifact: the story file — grade its groomed body
  oracle: the same file's shell (As a / I want / So that) + the PRD business rules & FR-xx it grooms from — read them for the coverage pass
gate: any B → FAIL · else findings → PASS_WITH_FINDINGS · clean → PASS
runner: _shared/eval-runner.md
---

# R-STORY-BODY — Groomed story body (eval rubric)

**North-star:** *could a developer build exactly the right slice from this body without asking —
or does it look complete while silently contradicting the story's own scope or inventing a rule?*
**Input:** grade the **body**; the **shell** and the **PRD rules/FRs** are your **oracle** (read
them for Pass 3). Oracle absent → mark G7–G10 `not-evaluable`, don't guess.
**Stance:** adversarial on soundness & coverage; binary on shape.

## Pass 1 — Shape (intrinsic, binary)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| G1 | Intent + context stated | m | Fire if either is missing |
| G2 | In-scope and out-of-scope both explicit | m | Fire if either list is absent |
| G3 | Happy path has 4–7 user-observable steps | m | Count; fire if <4, >7, or a step is not user-observable — quote it |

## Pass 2 — Soundness (intrinsic, judgment)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| G4 | Shell preserved — the As-a / I-want / So-that is intact; grooming only added | M | Fire if any shell clause is missing or reworded — quote the change |
| G5 | Roles/permissions stated where the flow gates on them | M | Fire on a step that implies a permission with no role named — quote the step |
| G6 | No invented specifics — every number/threshold/timeframe cited or AI-RECOMMENDED | B | Fire on an uncited specific (G.1/G.2); quote it |

## Pass 3 — Coverage (oracle: shell + PRD rules/FRs; if absent → not-evaluable)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| G7 | Every business rule stated is cited to a source | B | Fire on a rule with no `per …` and not AI-RECOMMENDED — quote the rule |
| G8 | Dependencies are proven against the sources, not guessed | B | Fire on a dependency with no evidence in the oracle — quote it |
| G9 | Metrics traceability — the body links to the KPI/objective it serves | M | Fire if no link to a PRD metric/objective |
| G10 | **Scope↔flow consistency** — every in-scope item has a happy-path step; no step enacts an out-of-scope item | M | List in-scope items; fire on one with no step, or a step touching the out-of-scope list — quote the mismatch |

## Remediation routing
- **agent-fixable** — G1–G5, G9, G10, and G7/G8 when the citation/evidence is already in the
  oracle: restore the shell, name the role, add the missing step or the missing citation, wire
  the metric, delete the out-of-scope step.
- **needs-human** — G6 when the specific is in no source (invented); G7 when the rule exists in no
  source; G8 when a dependency cannot be proven from available sources. Mark, ask, never fabricate.
