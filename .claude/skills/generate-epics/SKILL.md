---
name: generate-epics
allowed-tools: Read, Write, Edit, Glob, Grep
description: >-
  Turn a chosen clustering into EPICs in two steps: first an EPIC Register (the primary
  deliverable — a one-row-per-EPIC table copied straight from the clustering: name, outcome,
  features, band, persona, dependencies), reviewed as the gate; then, on demand, a lean per-EPIC
  detail file (description, business value, fitness criteria, scope, features table, dependencies,
  NFRs, references). Use whenever someone wants to generate, write, or produce EPICs or an EPIC
  register from a clustering — e.g. "generate the epics from this clustering", "turn this
  clustering into epics". Not for deciding how to group features (use cluster-features) or writing
  user stories (use draft-stories).
---

# Generate EPICs

Turn an approved clustering into EPICs in **two steps**, cheap decision before expensive detail:

1. **EPIC Register** — the primary deliverable. One row per EPIC, **copied** from the clustering
   (nothing re-invented). This is the gate: a human recalibrates 19 rows here before any detail
   file is written. One cheap file to change now beats reworking N detail files later.
2. **Per-EPIC detail files** — a lean document per EPIC, generated **on demand** (the MVP band
   first, or the specific EPICs asked for), not all at once.

This body is the operating method. The exact schemas live in the single sources below — this file
does not restate them.

## Load first

- `../_shared/system-prompt.md` — global rules (gating, G.1–G.6, confidence tiers, TBD handling).
- `../_shared/standard-formats.md` — **EPIC naming and title**, and the **EPIC Register** and
  **EPIC detail file** schemas. This is the authority for shape and per-field provenance.
- `references/epic-generation.md` — the fill-in skeleton and one in-domain example per section.

If any is missing, stop and name it.

## Inputs

The **chosen clustering** (`Output/04-clustering/…-clustering.md`) — the source every Register field
is copied from. For detail files, also the PRD/feature catalog for `REQ`/`FR` traceability and any
design/technical context. **If no clustering is provided, ask for it** — EPICs are copied from a
clustering, not invented; without one, run `cluster-features` first.

## The flow

**Step 1 — Register (copy, then gate).** Build `EPIC-REGISTER.md` by transcribing the clustering per
the Register schema in `standard-formats.md`: each field is **copy / enum / derive**, never composed.
Write one manifest row per EPIC (`type: epic`, its `EPIC-<NNN>` id, its feature traces) so the
coverage gate can prove every feature is placed. End with the register gate (below).

**Step 2 — detail files (on demand, one at a time).** After the register is approved, expand EPICs
into detail files — **MVP-band first, or the specific EPICs requested** — following the detail-file
schema in `standard-formats.md` and the skeleton in `references/epic-generation.md`. One file at a
time, approval gate between each.

## Rules (all defined once elsewhere — do not restate, follow)

- **Naming, Register schema, detail schema, per-field provenance** → `standard-formats.md`. Copy from
  the clustering verbatim wherever the provenance says *transcribe*; never re-invent a copied field.
- **Features are a table**, one row per feature (never a per-feature prose block).
- **No acceptance criteria and no story-centric mapping in an EPIC** — ACs and stories live on the
  stories; the feature list already seeds forward traceability.
- **Never invent** metrics/baselines/targets — confidence-tier every metric (CONFIRMED / TENTATIVE /
  AI-RECOMMENDED); genuinely generated fields (recommended NFRs, fitness measures) are labeled
  AI-RECOMMENDED so the reader knows which parts are not reproducible copies.
- **All Work Item IDs = `TBD`**; never invent tracker IDs.
- **Readability:** one idea per sentence, active voice, no stacked compound clauses.

## Output & handoff

- **Lineage block first** — the Register, every detail file, and the sequencing/mapping summaries each open with the **Lineage block** (per `_shared/standard-formats.md`) as the first block under the title.
- **Register:** `Output/05-epics/EPIC-REGISTER.md`.
- **Detail files:** `Output/05-epics/EPIC-<NNN>-<name-slug>.md` (naming per `standard-formats.md`).
- **Summaries:** `[batch-name]-epic-sequencing.md` and `[batch-name]-epic-mapping.md`.

End the register with `HUMAN ACTION REQUIRED: Review the EPIC Register — approve, or recalibrate
titles / outcomes / feature placement / capability grouping / open decisions. On approval I expand
the detail files (MVP band first, or the ones you name).` End each detail file with
`HUMAN ACTION REQUIRED: Review EPIC-<NNN> — approve, edit, or say "next".` Hand off to `draft-stories`,
which reads a Register row's feature list (plus the detail file if one exists).

> **Save early, update in place** (`_shared/system-prompt.md`): write the register as soon as it has
> reviewable rows, and each detail file as it is produced — update in place, don't batch.
