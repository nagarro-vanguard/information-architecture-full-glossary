---
name: define-features
allowed-tools: Read, Write, Edit, Glob, Grep
description: >-
  Turn a PRD's functional requirements into a prioritized, traceable feature catalog
  — each feature named, described, linked to the FR-xx/BR-xx it covers, given a
  MoSCoW priority, and checked so every in-scope FR lands in at least one feature.
  Use whenever someone wants to define, derive, list, or catalog features, or break a
  PRD into features — e.g. "what are the features here?", "turn this PRD into a
  feature list", "define the features for the refunds product". Not for grouping
  features into EPICs (use cluster-features) or writing the PRD itself (use write-prd).
---

# Define features (feature catalog)

Turn the PRD's `FR-xx` into a **feature catalog**: the prioritized, user-meaningful
units of capability that clustering will later group into EPICs. Deriving,
prioritizing, and linking happen together in one pass — a feature isn't defined until
you know what it covers and how much it matters.

This skill loads shared rules from `../_shared/` and its rules + checklist from
`references/`. Output paths are relative to the project root.

## Load first

Read `../_shared/system-prompt.md` (gating, G.1–G.6), `../_shared/quality-characteristics.md`
(Q1–Q9, the unit-level quality bar), and `../_shared/standard-formats.md` (Prioritization
basis vocabulary). If any is missing, stop and name it. The row-level rules, field
contract, and delivery checklist live in `references/feature-catalog.md`.

## What a "feature" is here

A **cohesive, user-meaningful unit of capability** — something a stakeholder would
name and value on its own ("Saved payment methods", "Bulk export"), realized by a set
of related `FR-xx`. Not a single FR (too granular), not a whole EPIC (too broad). If
a candidate feature needs an "and" to describe it, it's probably two.

## The gated flow

Take the approved PRD (from `Output/02-prd/` or pasted); the BRD helps for value
context. Then:

1. **Intake & ID normalization** — confirm the PRD and list the requirements in scope.
   If no PRD is provided, ask for it — features derive from requirements, not thin air.
   Then **declare the source's requirement-ID scheme and print it for approval** per
   `references/feature-catalog.md` → *FR-2*: `FR-<n>` used verbatim; section-numbered
   (`1.1`) rewritten as `REQ-<section>.<n>` with the mapping stated; no IDs → assign
   `REQ-001…` in order and show the map. Never emit a bare `1.1` and never mint an
   `FR-xx` the source lacks. BR links only if a BRD is provided, else `— (no BRD)`.
2. **Derive & name** — group related requirements into candidate features, **one
   capability each** (Q1 — split anything bundled). Give each a business name, a
   **Description** (*what it is*), and a **Done when** (*the observable signal it is
   realized*) — the two must not restate each other (the ⊆ test, `references/feature-catalog.md`
   → §1). Present the candidate list for review. End with `HUMAN ACTION REQUIRED: Approve
   or adjust the feature list, then I'll prioritize and link.`
3. **Prioritize & link** — for each feature: MoSCoW priority **plus a named basis** from
   the Prioritization-basis vocabulary (benefit / penalty / cost / risk / dependency /
   time-sensitivity / stability / regulatory), the requirement IDs it covers (verbatim /
   declared tokens only), and any feature-to-feature dependency proven from the sources.
   Never invent a priority the sources don't support — mark `Proposed (needs confirmation)`.
4. **Coverage check & finalize** — verify **every in-scope requirement maps to at least
   one feature** (FR-4); flag any orphan requirement as a gap. Assemble and mark the file `STATUS: FINAL`
   (it has been saved and updated in place since Step 2 — see *Save early, update in place*). End with
   `HUMAN ACTION REQUIRED: Review the feature catalog. Approve or edit, then hand off
   to cluster-features.`

## The catalog (output — this is the whole file)

The saved file contains **only** the sections below, in this order — nothing else (G.6).
The Intake ID declaration, approval prompts, and any "what changed" notes are **chat
output, never written to the file**.

### 1 — Title + Lineage + Catalog control
`# Feature Catalog — [feature-name]`, then the **Lineage block** as the first block
(per `_shared/standard-formats.md` -> *Lineage block*), then a minimal, fixed-field control block:

> - **ID scheme:** `REQ-<section>.<n>` (from the source's section numbering) — or verbatim `FR-xx`
> - **BR links:** per BRD — or `none (no BRD)`
> - **Status:** FINAL — or `Step 2 (candidate list) — interim`

### 2 — Feature catalog, grouped by source category
One `###` sub-table **per category in the preceding document**, the category name taken
**verbatim** from the source's sections. Feature IDs are **globally sequential** across
categories (never restart per category). If the source has no categories, use one
ungrouped table — never invent a category.

#### [1. Onboarding]  ← category heading, verbatim from the source

| Feature ID | Feature | Description (what it is) | Done when (observable) | Covers (source IDs) | Priority | Basis | Depends on | Notes |
|------------|---------|-------------------------|------------------------|---------------------|----------|-------|------------|-------|
| F-01 | [Business name] | [capability so that value — 1 line] | [observable end-state; not the Description reworded] | REQ-1.1 / — (no BRD) | Must | Benefit — [one clause] | — | [nuance or `Proposed`] |

> **Description vs. Done when** — the Description says *what the feature is*; the Done-when
> says *how you observe it is realized* and must add ≥1 condition the Description lacks (the
> ⊆ test). **Covers** uses only verbatim/declared source tokens (no bare `1.1`, no invented
> `FR-xx`). **Basis** names one item from the Prioritization-basis vocabulary. Full field
> contract: `references/feature-catalog.md` → §1.

### 3 — Coverage check (Requirements Traceability Matrix)

Render the **RTM template** (`../_shared/standard-formats.md` → *Requirements Traceability
Matrix*) with endpoints **Requirement → Feature**: one row per in-scope requirement, named
verbatim from the source, grouped by source category, no collapsed ranges. 100% must be
`Covered`; a `Gap` row is resolved or raised in Open Questions before hand-off.

### 4 — Open Questions *(only if any; omit the section entirely when there are none)*

Save to `Output/03-features/[feature-name]-features.md`.

> **Save early, update in place** (`_shared/system-prompt.md`): write the file at Step 2 and
> update it in place through Steps 3–4 — carry the control block's `Status` line. Interim
> saves are **still template-only** — no process narration in the file.

## Rules

Each row must satisfy the quality characteristics (`_shared/quality-characteristics.md`)
and the feature-specific rules (`references/feature-catalog.md`). The load-bearing few:

- **One capability per feature** (Q1) — split anything joined by `and` / `/` or bundling
  two verb+object pairs.
- **Description ≠ Done when** (Q3/Q5) — the Done-when is observable and adds a condition
  the Description lacks; if it only rewords the Description, the row is wrong.
- **Trace with real tokens** (FR-2) — `Covers` uses verbatim `FR-xx` or declared
  `REQ-<section>.<n>`; never a bare number, never an invented `FR-xx`; no BRD → `— (no BRD)`.
- **Priority + named basis** (Q8/FR-3) — a MoSCoW rank and one basis from the vocabulary,
  or `Proposed (needs confirmation)`.
- **Nothing invented** (Q9 / G.1-G.2) — every specific sourced or marked `TBD`.
- **100% coverage** (FR-4) — every in-scope requirement lands in ≥1 feature; a dropped
  requirement is a dropped scope item.
- **Group by source category** (FR-5) — one sub-table per category in the preceding
  document, names verbatim; globally sequential IDs; no source categories → one table.
- **Template only** (G.6) — the saved file is exactly the sections in *The catalog
  (output)*; process narration, approval prompts, and change notes stay in chat.

Before delivering, run the full checklist in `references/feature-catalog.md` → §3.

## Handoff

The catalog feeds `cluster-features`, which groups these features into EPIC options.
The `Feature → FR → BR` links carry the traceability spine forward.
