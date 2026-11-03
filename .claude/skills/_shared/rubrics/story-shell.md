---
eval: story-shell
grades: the placeholder (shell) stage of a story file — Title + As a / I want / So that
input:
  artifact: the story file — grade its shell
  oracle: the PRD persona list + the feature/EPIC it traces to — read them for the coverage pass
gate: any B → FAIL · else findings → PASS_WITH_FINDINGS · clean → PASS
runner: _shared/eval-runner.md
---

# R-STORY-SHELL — Placeholder story, INVEST (eval rubric)

**North-star:** *is this a thin vertical slice of real user value that traces to a feature — or a
technical task / epic-in-disguise with a "so that" that just restates the "I want"?*
**Input:** grade the shell; the **PRD personas** and the **feature/EPIC map** are the **oracle**
for Pass 3. Oracle absent → mark S8–S9 `not-evaluable`, don't guess.
**Stance:** adversarial on soundness, coverage & phrasing; binary on shape. A sentence that is
grammatical, sourced, and keyword-clean can still fail on legibility (S11) — do not clear it just
because no banned word appears.

## Pass 1 — Shape (intrinsic, binary)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| S1 | Unique, distinct title | m | Fire on a missing or duplicate title |
| S2 | Complete "As a [role] / I want [capability] / So that [value]" | B | Fire if any of the three clauses is missing |
| S12 | **Lineage block** first (Previous · Primary source · Supporting · Next); Previous step plain text, links show the file name, missing marked `Does not exist`/`None` | m | Fire if the block is absent, not the first block, or a field is omitted rather than marked |

## Pass 2 — Soundness (intrinsic, judgment)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| S3 | One capability, not compound (INVEST-I, Q1) | M | Fire on "and/also/or" bundling of capabilities, **or** an enumeration of multiple objects/outcomes in one "I want" (a comma-list of things is still bundling, in any domain) — quote it |
| S4 | Small — a ~1–2 day slice, not an epic-in-disguise | M | Fire if the capability spans multiple flows/screens |
| S5 | **Vertical slice of user value, not a technical task** | M | Fire if the "I want" is an implementation step with no user-facing outcome — quote it |
| S6 | **"So that" is a real benefit, not a restatement of the want (non-circular)** | M | Fire if So-that ≈ I-want — quote both clauses |
| S7 | Business language | M | Scan G.3 prohibited terms; quote the term |
| S10 | **No reified label — every noun/structure traces to the cited capability text** (LPS) | M | Fire when the story asserts a noun, container, layout, or behaviour not present in the cited feature/capability text — a label promoted into structure the source never defined. Quote the invented noun. Cited capability text absent → `not-evaluable`, don't guess |
| S11 | **Legible — one idea, reads on the first pass, at one altitude** (Q10) | M | Fire when the "I want" **stacks 2+ nested relative clauses** (e.g. *…as one that…it…from*), **or** buries detail in an **em-dash/parenthetical aside** or a `by …-ing` mechanism clause, **or** inlines enumerated outputs/mechanisms/conditions that belong in acceptance criteria — quote it. A long clause alone (past the layer's word-flag threshold) is an **advisory flag, not a fire** — note it, don't fail on length. |

## Pass 3 — Coverage (oracle: PRD personas + feature/EPIC map; if absent → not-evaluable)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| S8 | Role is a real persona from the PRD | M | Fire on a role not in the PRD persona list — quote it |
| S9 | Traces to a feature/EPIC | B | Fire on a missing or blank trace link |

## Remediation routing
- **agent-fixable** — S1–S7, S10, S11, S12, and S9 when a covering feature exists: rewrite the title, complete
  the clauses, split the compound, reframe as a user-valued slice, de-circularize the "so that",
  strip a reified label-noun back to the sourced capability, unstack clauses / lift inlined detail to
  AC to make the "I want" legible, wire the trace.
- **needs-human** — S8 when no matching PRD persona exists (needs a PRD decision); S9 when no
  feature/EPIC covers the story (an upstream gap). Mark, ask, never invent.
