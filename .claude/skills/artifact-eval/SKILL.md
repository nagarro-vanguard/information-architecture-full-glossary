---
name: artifact-eval
allowed-tools: Read, Write, Edit, Glob, Grep
description: >-
  Author an eval — a human-authored, graded rubric that a machine grades an artifact
  against — for ANY artifact type or job. Use whenever someone wants to create, write,
  design, or improve an eval, rubric, quality gate, scorecard, or acceptance check for a
  kind of output — e.g. "write an eval for our PRDs", "I need a rubric to grade these
  summaries", "make a quality gate for this agent's output". Produces a callable eval that
  runs standalone or from a workflow through the shared eval-runner — never hardcoded, and
  never fired automatically by a skill. This authors the eval itself; to RUN an existing eval
  on one artifact, use the eval-runner (or the compliance-audit workflow to sweep many).
---

# Artifact Eval — author an eval for any artifact or job

You write an **eval**: a human-authored rubric that is the *ground truth* a machine grades
against. Not "does this look good" — a fixed, versioned, **checkable** test whose every
finding cites evidence. You are writing it **from the seat of a master specialist** in that
artifact's domain: someone who has shipped hundreds of them and knows which defects look fine
in review and detonate three steps downstream. The checks are that person's scar tissue.

The full method is in `references/method.md` — **load it first**. This body is the operating
procedure; the contract shape is in `references/eval-template.md`.

## When to use / not

- **Use** to create or rewrite an eval/rubric/quality-gate for an artifact *type* or a job.
- **Not** to run an eval on a specific artifact (that's `_shared/eval-runner.md`), and not to
  sweep a whole pack (that's the `compliance-audit` workflow). Those *consume* what you write.

## Inputs to gather first

1. **The artifact/job** — a type name and, ideally, one *good* and one *bad* real example.
2. **Its oracle** — what each check compares against (its own text? a same-file section? an
   upstream doc like `FR-xx`?). No oracle for a check ⇒ that check is a vibe; cut or re-aim it.
3. **Where it will run** — standalone, inside which skill, inside which workflow. (Determines
   what oracle the caller can realistically supply, and thus which checks degrade gracefully.)

If you can't get examples, ask for the one-line **north-star question** (below) and derive from it.

## Authoring steps

1. **North-star question.** Write the one question a master asks of this artifact — the form
   *"would this pass every check and still be wrong?"* For AC: *"Handed only this, would a dev
   build and a tester verify exactly the story's intent — and can all criteria pass while the
   story is still wrong?"* Every check is just **"what would make the answer no."**
2. **Enumerate failure modes, not features.** List the ways a *bad* one fails — especially the
   expensive-but-invisible ones a template author misses. Features-present measures completeness,
   which is the cheapest thing to fake.
3. **For each candidate check, pin five things** (drop it if you can't):
   - **plane** — shape / soundness / coverage
   - **oracle** — what it's compared against, and whether the caller can supply it
   - **firing rule + anchor** — exactly when it fails and *what verbatim text gets quoted*
   - **severity** — `B` (ships-wrong / traceability / invented fact, definite test) · `M`
     (required content missing/unfit) · `m` (drift). Calibrate by **downstream cost**, not by
     how central the section feels. Assign it now — the runner never invents severity.
   - **stance** — adversarial for soundness/coverage; binary for shape.
4. **Order into three passes**, cheapest first. Put **intrinsic** checks (always runnable) above
   **oracle-dependent** ones (flagged, degrade to `not-evaluable` when the oracle is absent). Cut
   any check that needs to see *sibling* artifacts — that belongs to a set-level gate, not here.
5. **Gate + remediation routing.** Gate = `any B → FAIL · else findings → PASS_WITH_FINDINGS ·
   clean → PASS`. For each check, note whether its fix is normally **agent-fixable** (an edit from
   existing sources) or **needs-human** (would require inventing a fact — must never enter the
   auto-loop).
6. **Emit in the Callable Eval Contract** (`references/eval-template.md`): frontmatter
   (`eval`, `grades`, `input.artifact`, `input.oracle`, `gate`, `runner`) + the three-pass check
   tables with a **"how to test — anchor the quote here"** column + a Remediation routing note.
7. **Self-check the eval** against `references/method.md`'s "tell": *could a stranger who never
   saw the artifact reach the same verdict from your rubric alone?* If not, the soft checks need
   sharper anchors. Keep it **few and lethal**, not many and shallow.

## What makes the eval callable (don't hardcode)

The eval you write is **pure data**. Every caller runs it through the one shared runner. Evals
are **manual** — a skill never runs one on its own (`_shared/system-prompt.md` → *Evals are
manual — never run automatically*). They are invoked only when a human asks:

- **Standalone (one artifact)** — load `_shared/eval-runner.md` + your `_shared/rubrics/<eval>.md`, point at an artifact.
- **From the `compliance-audit` workflow (a batch)** — an agent loads the runner + rubric (a thin
  loop over the runner). To add a new type there, drop a rubric file — no new code.
- **From the `auto-spec` workflow** — grades the BRD → PRD → features spine as part of its own design.

Because the caller names the eval and the runner reads the eval's own contract (input, gate),
adding or changing an eval is a **data edit**, never a code change in every caller.

## Output

Write the eval to `_shared/rubrics/<eval>.md` (the shared, versioned home all callers read).
Register it: add the `type → file` row wherever the callers map types (e.g. `compliance-audit.js`
`RUBRIC`), and tell the user the three call sites now available. One eval = one file = one
source of truth.
