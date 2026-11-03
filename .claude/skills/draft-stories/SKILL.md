---
name: draft-stories
allowed-tools: Read, Write, Edit, Glob, Grep
description: >-
  Transform an EPIC's features (or a PRD slice) into INVEST-compliant user-story
  shells — Title + "As a / I want / So that" only, one capability each, sized ~1–2
  days — through a gated step-by-step flow with approval after each step. Use whenever
  someone wants to create, draft, split, or write user stories or story shells from
  requirements — e.g. "break this feature into user stories", "draft stories for the
  refunds epic". Produces shells only — no acceptance criteria (use
  write-acceptance-criteria) and no grooming detail (use groom-stories).
---

# Draft user-story shells

Slice an EPIC's features into single-capability, INVEST-compliant story shells —
titles and `As a / I want / So that` only, nothing more. The full prescription — the
eight-step workflow, the quality standard, and good/bad examples — is in
`references/story-creation.md`; this body is the operating method.

Loads shared rules from `../_shared/` and story formats from `../_shared/standard-formats.md`.
Paths are relative to the project root.

## Load first

Read `../_shared/system-prompt.md`, `../_shared/standard-formats.md` (Story Statement,
Story Title, and **Story folder, index & file** schemas), and `references/story-creation.md`.
If any is missing, stop and name it.

## First response

Before any work, list the eight steps you'll run and that you stop for approval after
each, then request the EPIC's feature list — from its **EPIC Register row** (or its detail
file, if one has been expanded) — or the requirement text.

## The eight gated steps

1. **Input intake** — confirm the requirement/feature text received.
2. **Restatement** — restate in plain language; quote ambiguities.
3. **Personas** — lock the `As a [persona]` candidates from the sources.
4. **Capabilities** — extract user-facing Verb+Object capabilities; split bundles; expand "manage".
5. **Splitting strategy** — present ≥4 options (CRUD-first, workflow-step, role-based,
   config-vs-usage), recommend one with INVEST rationale.
6. **Story list** — candidate table (Feature / Title / Description / Rationale).
7. **Draft stories** — one at a time: `Title` + `As a / I want / So that`.
8. **Consolidation** — write the **index** (fixed section order); on approval, create the title-named story files seeded from it.

Each step ends with its `HUMAN ACTION REQUIRED:` line and waits.

## Rules

- **One capability per story** — one Verb+Object. No "and/or/also", and no comma-enumeration of
  multiple objects or outcomes in the "I want" (a list of things is still bundling); split instead. (Q1)
- **One altitude** — the "I want" names the capability only. Enumerated outputs, mechanisms
  (`by …-ing`, dashed asides), and conditions are deferred to acceptance criteria — never inlined here.
- **Legible** — the "I want" states one idea and reads on the first pass: no stacked relative clauses,
  no em-dash/parenthetical aside. (Q10)
- **INVEST** — Independent, Negotiable, Valuable, Estimable, Small, Testable.
- **User-facing only** — what the *user* does, never "the system…"; developers aren't a persona.
- **Use only sourced capabilities/personas** — no invented "user can also export".
- **No AC, no rules, no estimates** here — those are later layers.

Before presenting each story in Step 7, self-check it against **Q1 (one capability)** and
**Q10 (legible, one altitude)**; a very long or multi-clause "I want" is the signal to split or thin it.

## Output & handoff

Create the EPIC's story folder `Output/06-stories/<epic-stem>/` — `<epic-stem>` = the source EPIC's
filename without extension (e.g. `EPIC-005-target-architecture`), **inherited verbatim, never re-composed**
(full schema: `_shared/standard-formats.md` → *Story folder, index & file*).

1. **Index** `<epic-stem>-stories-draft.md` — the approval gate + graded shell record + coverage view.
   Sections in fixed order: **Stories** (`# | Story (title, linked) | Statement | Req ID | Feature ID | Status`)
   → **Out of scope / routed** → **Coverage** (`Feature | Story(ies)`) → **Open Questions**.
2. **On approval of the index**, create one **story file per story**, named by its **title slug** (e.g.
   `set-target-direction.md`) — no `S1`/epic/feature prefix. Each holds the metadata block
   (`Status | Req ID | Feature ID | EPIC | Work Item ID`), `## Story` (seeded from the index, kept in sync),
   and empty `## Grooming` / `## Acceptance Criteria` sections to accrete into. **No empty scaffolds — create on approval.**
3. **Batch nav index** — add or update this EPIC's row in `Output/06-stories/epics-list-draft.md` (create the
   file if absent): `EPIC | Story Index (link to this folder's index) | Stories | Review Status`; a new row
   defaults to `Review Status: Pending review`.

The index **owns the statement**; the story file's `## Story` is its in-sync copy — what is approved flows forward.
Hand off to `groom-stories`, which appends grooming **into these same files** (no new folder), at most four per batch.

> **Save early, update in place** (`_shared/system-prompt.md`): write the index as soon as it has
> reviewable content and update it through the gates — don't wait for finalize. Carry a `STATUS:` line.
