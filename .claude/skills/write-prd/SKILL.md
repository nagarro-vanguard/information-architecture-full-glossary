---
name: write-prd
allowed-tools: Read, Write, Edit, Glob, Grep
description: >-
  Turn an approved BRD into a Product Requirements Document — the "what to build":
  product overview, personas, numbered functional requirements (FR-xx) each traced
  to a business requirement (BR-xx), user flows, business rules, data requirements,
  NFRs, and release/acceptance criteria — through a gated, step-by-step flow. Use
  whenever someone wants a PRD, functional spec, FRD, SRS, or the detailed/functional
  requirements from a BRD — e.g. "write the PRD from this BRD", "spec out the
  functional requirements for the refunds feature". Not for the business case (use
  write-brd), the feature catalog (use define-features), or EPICs (use
  cluster-features, generate-epics).
---

# Write a PRD (Product Requirements Document)

Turn an approved BRD into a delivery-ready product spec. The BRD says *why*; the PRD
says *what the product must do*, as numbered `FR-xx` each traced to a `BR-xx`. It is
solution-agnostic — behaviour, not architecture or screen design (unless a design
source mandates specifics).

This skill loads shared rules from `../_shared/` and its quality checklist from
`references/`. Output paths are relative to the project root.

## Load first

Read `../_shared/system-prompt.md` (gating, G.1–G.6, confidence tiers) and
`../_shared/standard-formats.md` (User Flow, Roles/Permissions, Scope, Key Rules, and the
Requirements Traceability Matrix templates). If either is missing, stop and name it.

## The gated flow

Take the approved BRD (from `Output/01-brd/` or pasted) plus any design
/ process / data sources. If no BRD is provided, ask for it — the PRD derives from
the BRD and must not run ahead of one. Then work these steps, ending each with its
`HUMAN ACTION REQUIRED:` line and waiting for approval:

1. **Intake & restate** — confirm the BRD; restate purpose and boundaries in 3–8
   lines; list the `BR-xx` you will spec against; quote any gaps/ambiguities.
2. **Personas & scope** — lock the actors/roles (Roles/Permissions grid) and explicit
   In/Out scope, each traced to the BRD.
3. **Functional requirements** — derive `FR-xx` grouped by capability. Present **one
   group at a time**. Each FR: single, testable, observable behaviour; traced to a
   `BR-xx`; MoSCoW priority; status.
4. **Rules, data, flows & NFRs** — business rules (Key Rules table), data
   requirements (business-level entities, states/lifecycle — no schema), key user
   flows (User Flow table), NFRs (evidenced vs recommended, confidence-tiered).
5. **Traceability & finalize** — build the `BR-xx → FR-xx` matrix (flag any BR with
   no FR as a gap), list Open Questions, assemble, and mark the file `STATUS: FINAL`
   (it has been saved and updated in place since the first step — see *Save early, update in place*).

## The document (sections)

1. **Document Control** — Owner, Version, Status, Source BRD.
2. **Product Overview** — 3–5 sentences on what this is and the value (references the
   BRD; does not repeat the business case).
3. **Personas & Roles** — who uses it and what each role may do (Roles/Permissions grid).
4. **Functional Requirements** — grouped FR tables (the core).
5. **Business Rules & Validations** — Key Rules table, each sourced with a status.
6. **Data Requirements** — entities, key attributes (business terms), states/lifecycle.
7. **Key User Flows** — User Flow table (4–7 consolidated steps each).
8. **Non-Functional Requirements** — Evidenced + Recommended tables, confidence-tiered.
9. **Dependencies & Assumptions**.
10. **Traceability Matrix** — `BR-xx → FR-xx`.
11. **Open Questions**.

### Functional Requirement table

| FR ID | Functional Requirement (single, testable, observable) | Traces To | Priority | Status |
|-------|-------------------------------------------------------|-----------|----------|--------|
| FR-01 | [What the product must do, in business language] | BR-01 | Must | Confirmed |

**Status:** Confirmed (fully specified) · TBD — [what's missing] · Needs Verification.
**Priority:** MoSCoW — Must / Should / Could / Won't (this release).

### Traceability matrix

Render the **RTM template** (`../_shared/standard-formats.md` → *Requirements Traceability
Matrix*) with endpoints **BR → FR**: one row per in-scope `BR-xx`, named verbatim from the
BRD, `Covered by` its `FR-xx`, and a `Covered / Partial / Gap` status — no collapsed ranges.
A `Gap` row (a BR with no FR) is raised in Open Questions; the PRD covers 100% of in-scope
BRs or explicitly defers them.

## Rules that make it a PRD, not a guess

- **Trace every FR** to a `BR-xx`, or mark `Derived — needs PO confirmation`.
- **One capability per FR** — no bundled "and/or"; split instead.
- **Business language** — describe behaviour; "the system displays the order status"
  is fine, implementation/architecture terms are not (G.3).
- **Solution-agnostic** — *what*, not *how*; no design detail unless a design source mandates it.
- **Never invent** limits, thresholds, or rules (G.1) — mark `TBD` and ask.

Before delivering, run the full checklist in `references/prd-checklist.md`.

## Output & handoff

Open the PRD with the **Lineage block** as the first block (per `_shared/standard-formats.md`); its Previous step and Primary source are the BRD.
Save to `Output/02-prd/[feature-name]-prd.md` (same `[feature-name]` as the BRD). End
with `HUMAN ACTION REQUIRED: Review the PRD. Approve, request edits, or hand off to
define-features — which turns the FR-xx into the feature catalog.`

> **Save early, update in place** (`_shared/system-prompt.md`): create this file at the first step
> that has reviewable content and update it in place through the gates — don't wait for finalize.
> Carry a `STATUS:` line.
