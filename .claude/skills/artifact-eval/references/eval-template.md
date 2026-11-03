# Callable Eval Contract — the shape every eval is written in

Copy this into `_shared/rubrics/<eval>.md`. The frontmatter is what makes the eval
**self-describing** so the shared runner and any caller can execute it without hardcoding.

```markdown
---
eval: <slug>                     # e.g. ac — matches the filename and the caller's type key
grades: <what this eval judges>  # e.g. the AC section of a story file
input:
  artifact: <what the runner reads and grades>
  oracle: <the upstream slice the coverage checks compare against — may be same-file, or "none">
gate: any B → FAIL · else findings → PASS_WITH_FINDINGS · clean → PASS
runner: _shared/eval-runner.md
---

# R-<TYPE> — <name> (eval rubric)

**North-star:** <the one "could this pass every check and still be wrong?" question>
**Input:** <the runner reads X; the oracle is Y — read it for the coverage pass>

## Pass 1 — Shape (intrinsic, binary)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| X1 | … | m | … |

## Pass 2 — Soundness (intrinsic, judgment)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| X4 | … | B | Fire on … ; quote the … |

## Pass 3 — Coverage (oracle: <name>; if absent → not-evaluable)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| X9 | … | B | … |

## Remediation routing
- **agent-fixable:** <checks whose fix is an edit from existing sources — feed the ≤3-loop>
- **needs-human:** <checks whose fix would require inventing a fact (G.1) — never auto-fix>
```

Rules of thumb:
- **Few and lethal.** If a table has 8 rows, ask which three actually catch real defects.
- **Every row's "How to test" names the quote.** No quote to point at ⇒ the check is too soft.
- **Severity is pre-set**, calibrated by downstream cost. The runner copies it, never invents it.
- **Intrinsic passes first**, oracle pass last and clearly degradable.
- **No cross-sibling checks** — those live in a set-level gate, not a per-artifact eval.
