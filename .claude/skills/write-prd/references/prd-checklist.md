# PRD Quality Checklist

Run before delivering the PRD. Anything unchecked is fixed or raised as an Open
Question before hand-off.

## Traceability & coverage
- [ ] Every `FR-xx` traces to a `BR-xx` (or carries `Derived — needs PO confirmation`)
- [ ] Every in-scope `BR-xx` appears in the RTM (one row each, named from the BRD, no collapsed ranges; status `Covered / Partial / Gap`)
- [ ] Gaps (a BR with no FR) are flagged in Open Questions, not hidden

## Functional requirements
- [ ] Each FR is a single, testable, observable behaviour — no bundled "and/or"
- [ ] Each FR has an ID, a MoSCoW priority, and a status
- [ ] FRs grouped by capability (each group maps cleanly to a future feature/EPIC)
- [ ] Business language throughout — no implementation or architecture terms (G.3)
- [ ] Solution-agnostic — *what*, not *how*; no screen design unless a design source mandates it

## Personas, scope, rules, data
- [ ] Actors/roles locked; Roles/Permissions grid populated from sources (or PERMISSION GAP block added)
- [ ] In-Scope and Out-of-Scope both explicit and traced to the BRD
- [ ] Business rules listed in the Key Rules table, each sourced with a status
- [ ] Data requirements at business level (entities, states/lifecycle) — no schema/tech

## Flows & NFRs
- [ ] Key user flows use the User Flow table (4–7 consolidated steps, each mapped to an FR)
- [ ] NFRs split Evidenced vs Recommended, each confidence-tiered
- [ ] No invented thresholds — sourced, qualitative, or `TBD`

## Source integrity (G.1 / G.4)
- [ ] Nothing invented to fill a gap; unknowns are `TBD` / `Proposed (needs confirmation)`
- [ ] Every specific carries a citation (G.2)
- [ ] Open Questions documented, not buried

## Document readiness
- [ ] Lineage block present as the first block (Previous step · Primary source · Supporting sources · Next step); existing refs linked, missing ones marked `Does not exist`/`None`
- [ ] Document Control complete (Owner, Version, Status, Source BRD)
- [ ] Product Overview references the BRD without repeating the business case
- [ ] A delivery team could decompose this into features/stories without re-reading the BRD
