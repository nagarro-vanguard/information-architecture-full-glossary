---
name: probe-requirements
allowed-tools: Read, Write, Edit, Glob, Grep
description: >-
  Elicitation — interrogate a fuzzy feature idea or an existing artifact (BRD, PRD,
  story) to surface the gaps, hidden assumptions, edge cases, and risks *before*
  they get baked into a document, and produce a Discovery Brief. Use whenever
  someone wants to probe, elicit, clarify, or pressure-test requirements, dig into
  a thin idea, or find what's missing — e.g. "help me flesh out this feature",
  "what are we missing here?", "interrogate this BRD for gaps". Re-runnable on any
  artifact at any stage. Not for writing the BRD or PRD themselves (use write-brd,
  write-prd) — this surfaces what those documents will need.
---

# Probe requirements (elicitation)

Dig into a thin idea — or an artifact that looks finished — and surface what a first
description always leaves out: the unstated users, the untested edge cases, the
numbers nobody sourced. The output is a **Discovery Brief** that separates what's
*known* from what's *assumed* from what's *missing*, so the next document is built on
fact, not guesswork. This is re-runnable: point it at a BRD, a story, or a change
request whenever you need to find the holes.

This skill loads shared rules from `../_shared/` and its question bank from
`references/probe-dimensions.md`. Output paths are relative to the project root.

## Mandatory steps

1. **Load the authority.** Read `../_shared/system-prompt.md` (gating, G.1–G.6,
   unknown-handling labels, confidence tiers) and `references/probe-dimensions.md`
   (the nine dimensions and their questions). If either is missing, stop and name it.
2. **Take the input:** a feature idea, or an existing artifact to interrogate. If
   given an artifact, read it fully first.
3. **Restate and classify** what you have, without inventing anything:
   - **Known** — explicitly stated (cite the source).
   - **Assumed** — implied but not confirmed. Label it; do not promote it to fact.
4. **Probe.** Walk the dimensions in `references/probe-dimensions.md` that fit the
   input. Ask only the questions whose answers are *missing and material* — the ones
   that would change the design or the scope. Group by dimension, **rank by
   blocker-first**, explain why each matters in one line, and offer 2–3 options
   wherever you can (reacting beats inventing). End with
   `HUMAN ACTION REQUIRED: Answer the priority questions above (or say "assume X") so
   I can finish the Discovery Brief.` Then stop.
5. **Produce the Discovery Brief** from the answers, save it, and end with
   `HUMAN ACTION REQUIRED: Review the Discovery Brief. Approve, or answer remaining
   gaps, then hand off to write-brd.`

## Discovery Brief (output structure)

```
# Discovery Brief — [feature name]

> **Lineage** (per _shared/standard-formats.md)
> - **Previous step:** Entry point (no upstream artifact)
> - **Primary source:** [the idea or artifact probed]
> - **Supporting sources:** [attached references] — or None
> - **Next step:** These findings are written up as a BRD -> `Output/01-brd/`

## Known (stated, sourced)
- [fact] — per [source]

## Assumed (implied — needs confirmation)
- [assumption] — why we think so; confirm before relying on it

## Missing — prioritized questions
| # | Question | Why it matters | Options to react to |
|---|----------|----------------|---------------------|
| 1 | [blocker question] | [design/scope decision it drives] | A / B / C |

## Risks & edge cases surfaced
- [risk or unhappy path] — [consequence]

## Recommended next
- Ready for write-brd, OR: these gaps must close first — [list]
```

Save to `Output/discovery/[feature-name]-discovery-brief.md`.

> **Save early, update in place** (`_shared/system-prompt.md`): write this file as soon as it has
> reviewable content and update it in place — don't wait for finalize. Carry a `STATUS:` line.

## What this enforces (from ../_shared/system-prompt.md — load it, don't restate it)

Never invent specifics to close a gap (G.1) — a surfaced gap is the *point*. Label
the unknowns (G.4: `Assumed`, `TBD`, `[Not specified in provided sources]`). Cite
every fact (G.2). Confidence-tier any metric you elicit. Stop at the gate and wait.

## Handoff

The Discovery Brief feeds `write-brd` (and, later, `write-prd`). Re-run this skill on
any downstream artifact — or on a change request — to interrogate it for fresh gaps.
