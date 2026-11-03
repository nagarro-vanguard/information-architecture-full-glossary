---
name: write-acceptance-criteria
allowed-tools: Read, Write, Edit, Glob, Grep
description: >-
  Convert a groomed user story into 3–7 testable Given/When/Then acceptance-criteria
  scenarios, categorized under UI / Behavior / System, after a sufficiency gate, one
  story at a time. Use whenever someone wants acceptance criteria, AC, Given/When/Then
  scenarios, or test-ready conditions for a user story — e.g. "write the AC for the
  view-status story", "add Given/When/Then for this story". Not for grooming the story
  with scope, rules, and dependencies (use groom-stories) or creating shells (use
  draft-stories).
---

# Write acceptance criteria

Turn one groomed story into QA-ready Given/When/Then scenarios a tester can pick up
without asking. The full prescription — the coverage checklist, the categorization
decision tree, and good/bad examples — is in `references/acceptance-criteria.md`;
this body is the operating method.

Loads shared rules from `../_shared/` and templates from `../_shared/standard-formats.md`.
Paths are relative to the project root.

## Load first

Read `../_shared/system-prompt.md`, `../_shared/standard-formats.md`, and
`references/acceptance-criteria.md`. If any is missing, stop and name it.

## Step 1 — Sufficiency gate (first)

Check the story has: a persona, a clear capability, a stated outcome, and **at least
one** of business rules / permissions / explicit success+error handling. If anything
is missing, output **Missing Information + Questions to Clarify** and stop — do not
write AC from assumption.

- If sufficient: `HUMAN ACTION REQUIRED: Prerequisites met. Approve to generate AC.`
- If not: `HUMAN ACTION REQUIRED: Answer the clarifying questions so I can write testable AC.`

## Step 2 — Generate AC

Write **3–7 scenarios** in Given/When/Then, categorized under **UI / Behavior /
System** headers (use the decision tree in the reference to place each):

- **UI** — what the user sees (display, feedback, navigation).
- **Behavior** — functional outcomes (workflow, validation, permissions, state).
- **System** — behind the scenes (persistence, notifications, integrations, logs).

Formatting: bold the scenario line `**Scenario N - <title>**`; bold `**Given** /
**When** / **Then** / **And**`; each on its own bullet line. If 8+ scenarios are
needed, recommend a story split **before** listing them.

End with `HUMAN ACTION REQUIRED: Review the acceptance criteria — approve, edit, or
ask for more scenarios.`

## Rules

- **Each "Then" is verifiable** and user-observable — not an implementation step
  ("order status is 'Confirmed'", not "call OrderService.confirm()").
- **Never invent** a business rule to make a scenario testable — ask instead (G.1).
- **Reuse the groomed story's exact terminology** (roles, fields, statuses).
- Keep UI specifics minimal unless a design source mandates them.

## Output

Append the scenarios **into the groomed story file** at `Output/06-stories/<epic-stem>/<title-slug>.md`,
under the `## Acceptance Criteria` section (replace the `_Pending_` placeholder). Do **not** create a new
file or an `08-` folder — the story file **accretes in place** (schema: `_shared/standard-formats.md` →
*Story folder, index & file*). Set the file's `Status` to `AC-complete` and update that story's `Status` in
the EPIC index. This completes the pipeline — the `06-stories/` artifacts are ready for a tracker adapter.

> **Save early, update in place** (`_shared/system-prompt.md`): append into the story file as soon as the
> AC has reviewable content — don't wait for finalize. Keep the file's `Status` current.
