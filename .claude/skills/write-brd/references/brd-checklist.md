# BRD Quality Checklist

Run this before delivering the BRD. It is the battle-tested acceptance bar for the
document — work top to bottom; anything unchecked is either fixed or surfaced as an
Open Question before hand-off. Grouped so you can scan by concern.

## Content completeness
- [ ] All mandatory sections (1–5, 7, 9) complete — no `[placeholders]` remain
- [ ] NFRs (6) included where security/compliance/performance matter
- [ ] Problem/Opportunity statement present with a clear classification
- [ ] Scope lists both In and Out explicitly (Out-of-Scope never blank)
- [ ] Assumptions labelled and separated from requirements
- [ ] Dependencies identified and listed
- [ ] Business Requirements numbered (`BR-01, BR-02…`)
- [ ] Release-level Acceptance Criteria present and measurable
- [ ] Deliverables present: Problem/Opportunity statement, RACI-light, KPI table, Traceability mini-map

## Classification & alignment
- [ ] Classification justified against the rule (Problem = measurable pain; Opportunity = new value)
- [ ] Examples and language throughout align with the classification
- [ ] Background supports the classification; no contradictions with content

## Executive summary
- [ ] "Why" (business value) is immediately clear
- [ ] "What" (scope preview) summarised crisply
- [ ] Stands alone for an executive decision; readable in under 60 seconds
- [ ] No vague terms ("enhance", "improve") without a measurable outcome

## Requirements quality
- [ ] Each Business Requirement is single, testable, and uniquely IDed
- [ ] Requirements are in business language, not implementation
- [ ] Each requirement traces to an objective
- [ ] Each Acceptance Criterion is measurable pass/fail and maps back to a requirement
- [ ] No ambiguous language in requirements or acceptance criteria

## Metrics & success criteria
- [ ] KPI table complete: Baseline, Target, Measurement Method, Measurement Cadence, Owner, Confidence
- [ ] Baselines quantified or marked `TBD (proposed: X)`; targets specific; timeframes realistic
- [ ] Every KPI has a Measurement Method (or `TBD` with rationale)
- [ ] Every KPI carries a confidence tier (CONFIRMED / TENTATIVE / AI-RECOMMENDED)
- [ ] AI-RECOMMENDED KPIs flagged with rationale and marked for owner sign-off
- [ ] KPIs directly support the stated objectives
- [ ] Traceability mini-map links Objectives → Requirements → Acceptance Criteria

## Scope clarity
- [ ] In-Scope items concrete and specific
- [ ] Out-of-Scope explicitly stated
- [ ] Boundaries clear and defensible; no scope creep hidden in other sections
- [ ] Dependencies won't block In-Scope items

## Non-functional (if applicable)
- [ ] NFRs cover the areas that matter (performance, security, availability, data freshness, accessibility)
- [ ] Thresholds included only where sourced; otherwise qualitative or `TBD`
- [ ] NFRs are testable, not vague

## Risk management
- [ ] Key risks identified (technical, business, resource)
- [ ] Each risk has impact, likelihood, and a mitigation
- [ ] Constraints documented separately
- [ ] Open questions surfaced with owners

## Traceability & RACI
- [ ] RACI-light present (Owner, Approver, Contributors); decision rights unambiguous
- [ ] Traceability mini-map links 3–6 key objectives to requirements and acceptance criteria

## Source integrity (G.1 / G.4)
- [ ] Nothing fabricated to fill a gap
- [ ] All assumptions explicitly called out
- [ ] Missing values marked `TBD`; proposed values labelled `Proposed (needs confirmation)`
- [ ] Open questions documented, not hidden

## Executive readiness
- [ ] Readable top-to-bottom in 10–15 minutes; value obvious to non-technical readers
- [ ] Decision points and next steps/approval needs stated
- [ ] Document Information complete (Owner, Version, Status, Approvers)
- [ ] Lineage block present as the first block (Previous step · Primary source · Supporting sources · Next step); existing refs linked, missing ones marked `Does not exist`/`None`
