---
name: groom-stories
allowed-tools: Read, Write, Edit, Glob, Grep
description: >-
  Enrich shell user stories into development-ready groomed descriptions — intent,
  context, in/out scope, a 4–7 step happy-path flow, sourced business rules,
  roles/permissions, upstream/downstream dependencies, and metrics traceability —
  from provided sources, at most four stories per batch. Use whenever someone wants to
  groom, refine, elaborate, or add scope/rules/dependencies to user stories before
  development — e.g. "groom these three stories against the PRD", "flesh out this
  story for the team". Not for creating shells (use draft-stories) or writing
  acceptance criteria (use write-acceptance-criteria).
---

# Groom user stories

Turn shell stories plus their sources into buildable, evidence-based descriptions
with proven dependencies — everything a developer and QA need without asking. The
full prescription — the complete section structure, the dependency-evidence method,
and good/bad examples — is in `references/story-grooming.md`; this body is the
operating method.

Loads shared rules from `../_shared/` and templates from `../_shared/standard-formats.md`.
Paths are relative to the project root.

## Load first

Read `../_shared/system-prompt.md`, `../_shared/standard-formats.md` (Dependency,
Roles/Permissions, Scope, Key Rules, User Flow, Sizing Alert templates), and
`references/story-grooming.md`. If any is missing, stop and name it.

## Inputs & batch

Story files from `Output/06-stories/<epic-stem>/` (**max 4 per batch** — if more, ask to split), the
relevant PRD/BRD excerpts, and any prior groomed stories or tracker text for dependency context.

## The three gated steps

1. **Intake & confirm** — restate the stories; identify the source sections; confirm
   batch size ≤4; surface blocking ambiguities. Gate.
2. **Extract & write groomed description** — per story, produce the full structure:
   - **Intent** · **Context** · **In Scope** / **Out of Scope** (both explicit,
     sourced) · **User Flow** (4–7 consolidated steps) · **Key Rules/Decisions**
     (sourced, with status) · **Roles/Permissions** (or a PERMISSION GAP block) ·
     **Dependencies** (Upstream/Downstream, proven from text) · **Edge Cases** ·
     **Metrics Traceability** (to the EPIC's metrics) · **Open Questions**.
   Gate.
3. **Refine** — incorporate edits, tighten scope boundaries, finalize.

## Dependency evidence (no guessing)

Prove every dependency from the text — explicit sequencing ("requires", "after"),
data/state a story produces that another needs, a flow/entry point, or required
roles/config. If you can't prove it, **ask and stop** — never assert an inferred
dependency as fact.

## Rules

- **Derive everything from sources** (G.2); synthesize, don't copy large chunks.
- **State In and Out of scope explicitly**; no vague words ("properly", "as needed").
- **No acceptance criteria here** — that's `write-acceptance-criteria`.
- **One capability per story** — if grooming reveals a bundle, propose a split (SIZING ALERT).

## Output & handoff

Append each story's groomed description **into its existing story file** at
`Output/06-stories/<epic-stem>/<title-slug>.md`, under the `## Grooming` section (replace the `_Pending_`
placeholder). Do **not** create a new file or a `07-` folder — the story file **accretes in place**
(schema: `_shared/standard-formats.md` → *Story folder, index & file*). Set the file's `Status` to `groomed`,
and update that story's `Status` in the EPIC index. Hand off one story at a time to
`write-acceptance-criteria`, which appends AC into the same file.

> **Save early, update in place** (`_shared/system-prompt.md`): append into each story file as it is
> groomed — don't wait to finish the batch. Keep the file's `Status` current.
