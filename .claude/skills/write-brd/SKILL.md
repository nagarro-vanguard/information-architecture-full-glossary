---
name: write-brd
allowed-tools: Read, Write, Edit, Glob, Grep
description: >-
  Turn a 1–2 line feature idea into an executive-ready Business Requirements
  Document through a gated two-phase flow: sharp discovery questions first, then a
  BRD with a Problem/Opportunity classification, objectives with confidence-tiered
  KPIs, scope, numbered business requirements (BR-xx), risks, and release-level
  acceptance criteria. Use whenever a BA/PO/PM wants to write, draft, or start a
  BRD or business case for a new feature — e.g. "draft a BRD for passwordless
  login", "start the business requirements for the refunds flow". Not for the
  detailed functional spec (use write-prd), grouping into EPICs (cluster-features,
  generate-epics), user stories (draft-stories), grooming, or acceptance criteria.
---

# Write a BRD (Business Requirements Document)

Turn a short feature idea into an executive-ready business case, through a gated
two-phase flow: ask the sharp questions first, then write the document. This skill
carries the working method. Load `../_shared/system-prompt.md` first and enforce
its global rules throughout — approval gates, G.1–G.6, citation, unknown labels,
and confidence tiers — rather than repeating them here.

Output lands at `Output/01-brd/[feature-name]-brd.md` (`[feature-name]`
= short kebab-case, e.g. `password-reset-brd.md`). Paths are relative to the
project root.

## Phase 1 — Discovery (ask first; do NOT write the BRD yet)

Your first job is to find the *smallest* set of questions that lets you write a
high-quality BRD — not to interrogate.

1. **Recap** the feature in one line so scope is agreed.
2. **Classify it — Problem or Opportunity — and say what could change your call:**
   - **Problem:** fixes measurable pain today (time, cost, errors, risk,
     complaints, revenue leakage).
   - **Opportunity:** unlocks new value (enterprise readiness, upsell, delight,
     differentiation) without strong existing pain.
   - **Both:** label **Problem (primary) / Opportunity (secondary)**.
3. **Ask only the minimum questions, grouped by the 9 sections below.** For each,
   name the decision it informs ("sets the scope boundary", "decides Problem vs
   Opportunity"). Keep them answerable in bullets.
4. Where I'm unlikely to know, **offer 2–3 options** to react to instead of an
   open question.
5. End with `HUMAN ACTION REQUIRED: Answer the discovery questions above so I can
   write the BRD.` and stop. Do not write any BRD content in Phase 1.

## Phase 2 — The BRD (after I answer)

Open the BRD with the **Lineage block** as the first block (per `_shared/standard-formats.md`):
Previous step and Primary source are the Discovery Brief (or `Does not exist` if none), Next step is the PRD.
Then write the 9 sections. Each section: a one-line business-language definition, crisp
bullets, a tailored example where it earns its place, and a **Mandatory/Optional**
label.

**Mandatory:** 1, 2, 3, 4, 5, 7, 9.  **Optional:** 6, 8 — but treat **6 (NFRs) as
mandatory** whenever security or compliance is in play.

1. **Executive Summary** — the "why" and the value clear in under 60 seconds.
2. **Background & Current State** — the pain/opportunity, with any baseline data.
3. **Objectives & Success Metrics** — KPIs with baseline, target, timeframe,
   measurement method, and owner. Tag every KPI `CONFIRMED` / `TENTATIVE` /
   `AI-RECOMMENDED` per the confidence tiers in `../_shared/system-prompt.md`, and
   place the Metrics Confidence Summary block *before* the KPI table.
4. **Scope (In / Out), Assumptions, Dependencies** — both In and Out explicit;
   label Assumptions and Dependencies separately. Never leave Out-of-Scope blank.
5. **Business Requirements** — numbered `BR-01, BR-02…`, each single, testable, and
   in business language. These are the anchors the whole downstream pipeline traces
   to, so make each one stand alone.
6. **Non-Functional Requirements** — performance, security, access, availability,
   data freshness, accessibility. Only what fits the feature; never invent a
   threshold — state it qualitatively or mark `TBD`.
7. **Risks, Constraints, Mitigations** — each risk with impact, likelihood, and a
   mitigation; constraints listed separately.
8. **User Journey / High-Level Flow** — the main path in business terms.
9. **Acceptance / Exit Criteria (release-level)** — measurable pass/fail for the
   feature *as a whole*. Keep these business-level; the detailed, story-level
   Given/When/Then AC is produced later by `write-acceptance-criteria` — do not
   duplicate that granularity here.

### Deliverables to include with the BRD

- **Problem/Opportunity statement** — one paragraph, final classification, examples
  aligned to the call.
- **RACI-light** — Owner / Approver / Contributors (propose defaults if roles
  aren't given, flagged `needs confirmation`).
- **KPI table** — `KPI | Baseline | Target | Measurement Method | Measurement
  Cadence | Owner | Confidence`. Measurement Method is the tool/report/data source
  (e.g. "GA checkout funnel", "quarterly NPS"); `TBD` if unknown.
- **Traceability mini-map** — Objectives → Key Requirements → Acceptance Criteria
  (3–6 rows). This seeds the BR→FR→Story→AC chain the pipeline depends on.

### Before you deliver

Run the full **BRD Quality Checklist** in `references/brd-checklist.md`. The
non-negotiables: no `[placeholders]` left; every BR numbered and testable; every
KPI carries a confidence tier and the AI-RECOMMENDED ones are flagged for sign-off;
In *and* Out of scope both present; nothing invented (unknowns are `TBD` or
`Proposed (needs confirmation)`); the Executive Summary reads in under a minute.

Save early and update in place (`_shared/system-prompt.md` → *Save early, update in place*): create
the BRD file at the first section you produce and update it in place through the phases, carrying a
`STATUS:` line — don't wait for the end. On finalize, mark it `STATUS: FINAL`, then end with
`HUMAN ACTION REQUIRED: Review the BRD. Approve, request edits, or hand off to write-prd (the
Product Requirements Document).`

## What this enforces (defined in ../_shared/system-prompt.md — load it, don't restate it)

Approval gates (one phase at a time; never write the BRD during Phase 1); G.1 no
invented numbers/limits/timeframes; G.2 cite every specific; G.3 business language;
G.4 label unknowns and ask; confidence tiers on every metric; Work Item IDs stay
`TBD` until a tracker creates them.
