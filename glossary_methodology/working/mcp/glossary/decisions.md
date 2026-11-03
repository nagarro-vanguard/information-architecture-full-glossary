# Decisions

The decision register: one row per contested term, keyed by a global id (D-1, D-2, ...), append-only. It is the audit trail behind the glossary - why each contested word was chosen and what it overrode. Entries in the other documents link here from their **decision** column.

> **Auto-decided run.** These calls were made by the runtime (not a person), per the method's own rules, because the run was delegated to complete unattended. Each is a **recommendation to ratify** - review the *basis* and override any you disagree with. Date: 2026-09-29.

## How to read this document

- **id** - the decision's stable id; other documents link to it (e.g. `decisions.md#d-7`).
- **term** - the contested term, in Title Case.
- **where** - the section of the source the term was found in.
- **decided** - the question that was settled.
- **chosen** - the word (or split) that won.
- **retired / overrides** - the words dropped, or the earlier decision reversed.
- **basis** - the reason, quoting or citing the source.

| id | term | where | decided | chosen | retired / overrides | basis | date |
|---|---|---|---|---|---|---|---|
| <a id="d-1"></a>D-1 | Note | collaboration-and-output | the word for a reviewer's anchored comment | Note | retired: comment | spec section 2.5 names the object "Notes"; req section 9 uses note/comment interchangeably - pick the object-model word | 2026-09-29 |
| <a id="d-2"></a>D-2 | Source System | inputs | the word for the legacy codebase | Source System | retired: repository, repo, source (as the codebase) | spec section 2.2 object name; "Repositories/Repo" are its setup surfaces, not separate objects | 2026-09-29 |
| <a id="d-3"></a>D-3 | Document / Context | inputs | the written material vs its engagement-wide home | Document (the material); Context (engagement-wide placement) | retired: reference material | keep the object (Document) distinct from where it is placed (Context = engagement scope) | 2026-09-29 |
| <a id="d-4"></a>D-4 | Provider / Provider Key | inputs | the AI provider and its credential | Provider + Provider Key | retired: AI provider, the key; API kept only as the surface tab | one object plus its credential; "API" is a surface, not the provider | 2026-09-29 |
| <a id="d-5"></a>D-5 | Person | personas | the generic attributable actor | Person | retired: user, reviewer, team member (as the actor) | one actor word; roles stay SME/C-Level/Admin; "team" kept as the collective | 2026-09-29 |
| <a id="d-6"></a>D-6 | Quick Analysis / Deep Analysis | understanding | the two analysis passes | Quick Analysis, Deep Analysis | retired: quick scan, deep read | spec surface names; req's "scan"/"read" are the drift - keep The Read for the overall act | 2026-09-29 |
| <a id="d-7"></a>D-7 | Slice | decisions-and-plan | the atomic movable unit of work | Slice (unit) carries a User Story; Story = its Plan work item | retired: "migration unit" as a separate object (it is the set of slices) | spec section 2.4 defines slice as smallest movable/reversible piece; req's "story" is the same unit at Plan | 2026-09-29 |
| <a id="d-8"></a>D-8 | Goal Synthesis | decisions-and-plan | disambiguate synthesis-of-notes from the goal record | Goal Synthesis (the goal record) vs Synthesis (notes) | overrides bare "synthesis" for the goal record | one word had two meanings; qualify the goal one | 2026-09-29 |
| <a id="d-9"></a>D-9 | Conflict | collaboration-and-output | keep the product's "two opposing notes" sense | Conflict | note: collides with the method's own "conflict" (tooling, out of scope) | product term stands; flag the collision for tool authors | 2026-09-29 |
| <a id="d-10"></a>D-10 | Gate | governance-gating | keep the product's readiness-lock sense | Gate / Gating | note: collides with the method's own "gate" (decision checkpoint) | product term stands; flag the collision for tool authors | 2026-09-29 |
| <a id="d-11"></a>D-11 | Goal / Target / Summary | multiple | split step/surface from object/record | the step/surface and the object it produces are separate entries (one in steps, one in objects) | overrides one-word-for-both | the docs use one word for two things; the document you are in marks which | 2026-09-29 |
| <a id="d-12"></a>D-12 | History | collaboration-and-output | the word for the append-only per-artifact record | History | retired: record, append-only record (as the object) | spec section 2.5 object name | 2026-09-29 |
| <a id="d-13"></a>D-13 | Update Linked Items / Re-Check | governance-gating | the impact behaviour and its noun | Update Linked Items (behaviour), Re-Check (the transient act) | retired: ripple, impact propagation | req section 12.2 uses "update linked items"; keep one noun for the act | 2026-09-29 |
| <a id="d-14"></a>D-14 | Access Control | governance-gating | the word for permission enforcement | Access Control | retired: RBAC | req/spec say "no access control"; RBAC is the same, spelt twice | 2026-09-29 |
| <a id="d-15"></a>D-15 | Held as Unknown | understanding | the honest not-known label | Held as Unknown | retired: open question; note: "open item" kept as a Claim Kind value | one label for the unverified state; spec's core phrase | 2026-09-29 |
| <a id="d-16"></a>D-16 | Block / Section | governance-gating | the case-driven unit vs a named section | Block (generic unit); Section = a block that is a goal/summary section | none (kept both, block as parent) | req section 11 "blocks"; a section is a kind of block | 2026-09-29 |
| <a id="d-17"></a>D-17 | Thread | surfaces-and-navigation | the word for the forward path | Thread | retired: walk, forward thread | one word for the path through the steps | 2026-09-29 |
| <a id="d-18"></a>D-18 | Approval / Sign-Off | governance-gating | the one sanction vs the absent gate | Approval (target architecture, exists); Sign-Off (deliverable, deliberately absent) | none (kept both, distinct) | they are different things: one enforced, one named to say it is absent | 2026-09-29 |
| <a id="d-19"></a>D-19 | Engagement / Project | inputs | whether "engagement" is its own object | folded Engagement into Project scope | retired: engagement (as an object) | "the whole engagement" is the project's scope, not a separate thing | 2026-09-29 |

## Related pages

| page | why it relates |
|---|---|
| [objects.md](objects.md) | the object terms these decisions settled |
| [steps.md](steps.md) | the step terms these decisions settled |
| [states.md](states.md) | the value-set terms these decisions settled |
