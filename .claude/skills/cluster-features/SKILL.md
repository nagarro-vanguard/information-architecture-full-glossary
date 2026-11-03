---
name: cluster-features
allowed-tools: Read, Write, Edit, Glob, Grep
description: >-
  Take a feature catalog and propose 2–3 genuinely different ways to group its
  features into EPICs — each with pros/cons and a recommendation — then, on request,
  deep-dive the chosen option to firm up boundaries, borderline features, and
  inter-EPIC dependencies. Use whenever someone wants to cluster or group features
  into EPICs, decide EPIC boundaries, or choose how to slice a backlog before EPIC
  generation — e.g. "how should we split these features into epics?", "cluster the
  checkout features". Not for producing the feature catalog (use define-features) or
  writing the EPIC documents (use generate-epics).
---

# Cluster features into EPICs

Give a human 2–3 credible ways to group the feature catalog into EPICs, honestly
compared, and let them choose. The full prescription — every template, example, and
exit-criterion — is in `references/feature-clustering.md`; this body is the operating
method. Read the reference when you need the exhaustive detail.

Loads shared rules from `../_shared/`; paths are relative to the project root.

## Load first

Read `../_shared/system-prompt.md`, `../_shared/standard-formats.md` (the **EPIC naming and
title** format — each EPIC's short **name** is authored here and carried forward verbatim), and
`references/feature-clustering.md`. If any is missing, stop and name it.

## Inputs

The **feature catalog** (from `Output/03-features/`), plus the BRD/PRD for value and
dependency context, and any roadmap/team constraints. If no catalog is provided, ask
for it — clustering groups *features*, it doesn't invent them.

## The gated flow

1. **Intake** — confirm the catalog; restate the features in scope as a flat
   inventory, each traced to its `FR-xx`/`BR-xx`. End with a gate.
2. **Propose 2–3 options** — apply genuinely different strategies (below); every
   feature appears in exactly one EPIC per option; each option has pros **and** cons;
   recommend one with a cited rationale; include a comparison table. Gate.
3. **Deep-dive (only if asked)** — refine EPIC boundaries, flag borderline features
   with a recommended placement + alternative, and list inter-EPIC dependencies drawn
   from the sources (never invented). Gate.
4. **Finalize** — package the chosen option into the output document.

## Clustering strategy menu (pick the 2–3 that fit)

By Business Capability (default) · By User-Journey Stage · By Persona/Role · By
Value Stream/Outcome · By Delivery Sequence (foundational→enhancement) · By
Complexity/Risk. See the reference for when each fits.

## Rules

- **Never invent** features — group only what the catalog contains.
- **EPIC name = a short capability/theme phrase** (an agile epic name), per
  `_shared/standard-formats.md` → *EPIC naming and title* — never an outcome sentence. The
  **outcome/value** is the **Epic Hypothesis** in the Description, never the name.
- **100% coverage** — no feature left un-clustered in any option.
- **Options must genuinely differ** — different strategy, not cosmetic re-labels.
- **Recommend honestly** — if one option is clearly better, say so, and still show the alternatives.
- **No sliver EPICs; band-split only into meaningful increments.** An EPIC is a coherent capability increment, not a lone leftover feature (prefer ≥2–3). You may split a capability into MVP (Core) and Later (Advanced) EPICs when each half is meaningful; keep one **Mixed** EPIC with an MVP spine only when the Later remainder is 1–2 trivial features (band: MVP=all-Must · Later=all-Should/Could · Mixed=both).
- **Always deliver borderline features + inter-EPIC dependencies for the chosen option** at finalize (not gated behind a deep-dive), and flag any mutual/cyclic edge for generate-epics.
- **Cross-band dependency check.** After banding, flag every MVP/Must feature that depends on a Later (Should/Could) feature — the MVP is silently blocked otherwise. Resolve each (promote it into the MVP band, or record the coupling as an open decision). Never leave one unflagged.

## Output contract (the chosen clustering feeds generate-epics by copy)

`generate-epics` builds the EPIC Register by **copying** from the chosen clustering, so the finalized
clustering **must** carry, per EPIC, every field the Register transcribes:

**short EPIC name · outcome (hypothesis) · feature `F-xx` list · band (MVP/Later/Mixed) ·
persona (SME/C-Level/Both) · inter-EPIC dependencies.**

If a field is absent, the copy hits a gap — so populate all of them (mark `TBD` only when the source
genuinely lacks it, and raise it as an open decision). The reference's output format already lays out
these tables; keep every column present.

## Output & handoff

Open the file with the **Lineage block** as the first block (per `_shared/standard-formats.md`).
Save to `Output/04-clustering/[batch-name]-clustering.md`. End with
`HUMAN ACTION REQUIRED: Pick an option (or request a deep-dive), then hand off to
generate-epics with this file plus the PRD/feature catalog.`

> **Append-only, update in place** (`_shared/system-prompt.md`): write this file as soon as it has
> reviewable content and **build it up across the gates — never rewrite or discard**. Step 1 (Intake, with the
> Feature Inventory) and Step 2 (Options) stay verbatim as the audit trail; finalize **appends** sections 1–5
> below them. Serve the Feature Inventory and the options **once** (reference, don't reprint); update only the
> `STATUS:` line in place.
