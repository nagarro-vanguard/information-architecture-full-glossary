---
eval: ac
grades: the Acceptance Criteria section of a story file
input:
  artifact: the story file — grade its AC section
  oracle: the same file's groomed body (in-scope business rules, happy path, scope) — read it for the coverage pass
gate: any B → FAIL · else findings → PASS_WITH_FINDINGS · clean → PASS
runner: _shared/eval-runner.md
---

# R-AC — Acceptance Criteria (eval rubric)

**North-star:** *handed only this, would a developer build and a tester verify **exactly** the
story's intent with zero questions — and can every criterion pass while the story is still wrong?*
**Input:** you grade the **AC section**, but the story body's rules & scope are your **oracle** —
read them for Pass 3. Body absent (AC audited standalone) → mark A8–A10 `not-evaluable`, don't guess.
**Stance:** adversarial on soundness & coverage (fail if unsure); binary on shape (present or not).

## Pass 1 — Shape (intrinsic, binary)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| A1 | 3–7 scenarios | m | Count scenarios; fire if <3 or >7 |
| A2 | Each scenario in Given/When/Then form | m | Fire on any scenario missing a Given, When, or Then clause |
| A3 | Each AC tagged UI / Behavior / System | m | Fire on any scenario with no category tag |
| A4 | AC is a section of the same story file, not a separate doc | m | Fire if AC lives outside the story file (AD-6) |

## Pass 2 — Soundness (intrinsic, judgment)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| A5 | Each **Then** is a single, observable, unambiguous outcome | B | Fire on vague/unfalsifiable verbs — "works", "is fast", "handled correctly" — or a Then with no checkable result; quote the verb |
| A6 | One behaviour per scenario | M | Fire if a scenario chains multiple When→Then covering >1 rule; quote the second When/Then |
| A7 | Business-observable — no implementation leakage | M | Scan for G.3 prohibited terms; quote the term |
| A8 | ≥1 negative/edge scenario; every rule **threshold** tested at its boundary | M | For each limit/threshold in the body, an AC exists at/over the boundary; fire on the uncovered threshold |

## Pass 3 — Coverage (oracle: the story body; if absent → not-evaluable)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| A9 | Every in-scope rule & happy-path flow in the body has ≥1 AC | B | List rules/flows from the body; fire on any with no scenario — quote the uncovered rule |
| A10 | No AC tests out-of-scope behaviour | B | Each scenario maps back to an in-scope rule/flow; an orphan AC = invented scope — quote it |

## Remediation routing
- **agent-fixable** — A1–A7, A10, and A9 when the missing rule is already in the body: rewrite the
  vague Then, split a compound scenario, strip the jargon, add the missing AC from the body rule,
  delete the out-of-scope AC. Feeds the ≤3-loop.
- **needs-human** — A8/A9 when closing the gap needs a fact **not in any source** (e.g. a rule
  states "large refunds require approval" with no threshold): mark `[Not specified in provided
  sources]`, raise the question, **never invent the number** (G.1). Never enters the auto-loop.
