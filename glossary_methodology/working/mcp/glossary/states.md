# States and Values

A state or value is a named condition a thing can be in, or a member of a closed set it can take - never a thing in its own right, always a property of an object or a step. This document lists all 28 value-sets, grouped under the **same six families** used everywhere else in the glossary (plus a Platform-Wide group for the few that belong to no single family), with the owning thing named in a column.

## How to read this document

- **value-set** - the agreed name for the set of conditions, in Title Case.
- **belongs to** - the exact object or step this set is a property of (defined in its own document).
- **values** - the allowed members of the set, in the source's own wording.
- **source** - the upstream document that defines it: **spec**, **req**, or **both**.
- **decision** - a link to the register row if the term was contested; otherwise `-`.

---

## Platform and Container

| value-set | belongs to | values | source | decision |
|---|---|---|---|---|
| Provider Presence | Project | has-provider, no-provider (no key) | req | - |
| Health Status | Source System | reachable, unreachable, auth-needed, not-tested | req | - |
| Document Scope | Document | whole-system, one-part | spec | - |
| Member Status | Person | active, inactive | req | - |

## Understanding

| value-set | belongs to | values | source | decision |
|---|---|---|---|---|
| Run State | Read State | running, paused, stopped, resumed, restarted, complete, incomplete | both | - |
| Baseline Authority | Read State | authoritative, partial / non-authoritative | both | - |
| Fact Status | Finding | settled, held-as-unknown | both | - |
| Held as Unknown | Fact Status | the honest not-known label for what the read could not establish, never inferred or padded | spec | [D-15](decisions.md#d-15) |
| Rule Quality | Rule | sound, defect, gap | both | - |
| Gap Severity | Gap | ranked by severity | both | - |
| Gap Category | Gap | tagged by category | both | - |

## Decisions and the To-Be

| value-set | belongs to | values | source | decision |
|---|---|---|---|---|
| Disposition Lean | Disposition | rewrite, lift-shift (provisional until decided in Plan) | both | - |
| Journey Change | Journey | changed, new, unchanged (against today) | both | - |
| Guardrail Standing | Guardrail | non-negotiable, must-have | req | - |
| Scope Mark | Scope Item | in, out (each with a reason) | req | - |
| Migration Approach Option | Migration Approach | big-bang, incremental, phased-by-domain | req | - |

## Plan

| value-set | belongs to | values | source | decision |
|---|---|---|---|---|
| Story Priority | Story | blocker, high, medium, low | req | - |

## Collaboration and Output

| value-set | belongs to | values | source | decision |
|---|---|---|---|---|
| Note State | Note | open, resolved, reopened | both | - |
| Collaboration State | Artifact | locked, empty, comments, ai-synthesis, history | spec | - |
| Claim Kind | Claim | measured-fact, diagnosis, decision, guarantee, estimate, open-item | spec | - |
| Verification Stance | Claim | verified, asserted (the platform holds every claim to "verified, not asserted") | spec | - |
| Section Currency | Summary Section | up-to-date, out-of-date | both | - |

## Cross-Cutting

| value-set | belongs to | values | source | decision |
|---|---|---|---|---|
| Surface Type | Surface | auth, landing, listing, detail | spec | - |
| Gate Type | Gating | work-gate, approval-gate, soft-gate, hard-condition | both | - |
| Lock State | Step or Surface | locked, unlocked | both | - |

## Platform-Wide

Value-sets that qualify the platform as a whole, not one thing.

| value-set | belongs to | values | source | decision |
|---|---|---|---|---|
| Access Model | Platform | no-access-control (everyone sees everything) | both | [D-14](decisions.md#d-14) |
| Scope Band | Platform | in-scope, deferred | both | - |
| Requirement Priority | Requirement | must, should, could (relative importance for the MVP cut) | req | - |

---

## Related pages

| page | why it relates |
|---|---|
| [objects.md](objects.md) | the things these value-sets are properties of |
| [map.md](map.md) | the whole hierarchy and flow in one picture |
