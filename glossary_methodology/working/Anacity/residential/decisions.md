<!-- Assembled per glossary-assembly-principles.md - Part B: decisions -->
# Decisions

The decision register for the Residential glossary (ANACITY Community Management, DIEZ Dubai). One row per contested term, keyed by a global id (`D-1`, `D-2`, ...), append-only. It is the one place operational reasoning lives; every other document links here by anchor from its `decision` column. `Where` is the Residential module the term was found in. Rows are dated 2026-09-29, with Gate 2 rulings applied 2026-09-30. This is a two-dialect build: the Commercial deployment keeps its own words, so no cross-deployment word is retired here - only within-Residential synonyms are collapsed.

## How to read this document

- `ID` - the stable decision key (`D-n`); entries in other files link to it.
- `Term` - the word that was chosen, kebab-case and backticked.
- `Where` - the Residential BRD module the term was harvested from.
- `Decided` - the question that was settled.
- `Chosen` - the word kept for this glossary.
- `Retired / Overrides` - within-Residential words dropped in favour of the chosen word (never the Commercial dialect word), or a reversed decision id.
- `Basis` - the reason, with source evidence where it helps.
- `Date` - when the decision was recorded.

| ID | Term | Where | Decided | Chosen | Retired / Overrides | Basis | Date |
|---|---|---|---|---|---|---|---|
| D-1 | two-dialects | all modules | whether to unify Residential and Commercial vocabulary | keep two dialects, one folder each | retired: nothing (neither dialect word is dropped) | Gate 1 decision: same platform, two deployments; each glossary uses its own words and cross-references the other via `Other deployment:` | 2026-09-29 |
| D-2 | `amenity` | 4.15 Amenities / Facilities | the word for a bookable space | `amenity` | retired: `facility`, `bookable-space` | within-Residential synonym collapse; module titled "Amenities / Facilities" uses both, "Facility appears in amenity list" (Res 4.15). The role name `facility-booking-administrator` is kept verbatim | 2026-09-29 |
| D-3 | `slot` | 4.15 Amenities | the word for a bookable time window | `slot` | retired: `time-slot`, `booking-slot` | synonym collapse; "Define fixed booking slot duration" (Res 4.15) | 2026-09-29 |
| D-4 | `visitor` | 4.14 Gatekeeper | the word for a non-resident entrant | `visitor` | retired: `walk-in` (a kind of visitor), `guest` (folded as a value) | synonym collapse; "Enter the visitor's mobile number" (Res 4.14) | 2026-09-29 |
| D-5 | `security-guard` | 4.14 Gatekeeper, 4.23 Guard Patrolling | the word for the on-ground security person | `security-guard` | retired: `guard`, `security-personnel` | synonym collapse; "allow guards to record visitor entry" (Res 4.14) | 2026-09-29 |
| D-6 | `vendor` | 7.7 Vendor Portal | the word for an external supplier | `vendor` | retired: `supplier` | synonym collapse; "Vendor" used throughout, "Vendor / Supplier Reports" in report names only (Res 7.11) | 2026-09-29 |
| D-7 | `approver-list-hierarchy` | 4.9, 7.6, 7.10 | the word for the approval chain | `approver-list-hierarchy` (ALH) | retired: `approval-hierarchy`, `approval-list`, `approver-list`, `approval-chain` | synonym collapse; "Create Approver List Hierarchy" (Res 4.9); "Approver List > Create Approval List" (Res 7.10) | 2026-09-29 |
| D-8 | `statement-of-account` | 7.5, 7.11, 7.14 | the word for a unit account statement | `statement-of-account` (SOA) | retired: `unit-statement`, `unit-wise-transaction-statement` | synonym collapse; "Statement of Account (SOA)" (Res 7.14); "Unit-Wise Transaction Statements" (Res 7.11) | 2026-09-29 |
| D-9 | `request-box` | 4.13 Request Box | admin-config area vs member-facing area for the same feature | `request-box` | retired: `request-desk` | synonym collapse; admin "Request Box" vs member-facing "Request Desk" name one feature (Res 4.13) | 2026-09-29 |
| D-10 | `complaint` | 4.12 Helpdesk / Complaint Box | the word for the raise-route-resolve helpdesk item | `complaint` | retired: `ticket` (Residential lifecycle label for the same object) | Residential logs a "complaint" but titles its lifecycle "Ticket Lifecycle and Audit Trail" (Res 4.12); complaint is the Residential dialect word. Other deployment: `service-request` | 2026-09-29 |
| D-11 | `tenant` | 4.1 BR-ON-016, 4.5, 4.9 | one word, two meanings across deployments | `tenant` = a renting resident (a relationship type) | retired: nothing | Residential sense fixed as a person who rents a unit, "community members (owners, tenants, residents)" (Res 4.5.4). Other deployment: `tenant-organization` (a leasing company) | 2026-09-29 |
| D-12 | `community-onboarding` | 4.1 Onboarding | split of the overloaded word `onboarding` | `community-onboarding` | retired: bare `onboarding` for this sense | split decision; Residential onboarding is whole-community setup (Res 4.1). `employee-onboarding` and `onboarding-model` (PII / non-PII) are Commercial-only and are not in this glossary | 2026-09-29 |
| D-13 | `booking` split | 4.10, 4.15, 4.16 | split of the overloaded word `booking` | `amenity-booking`, `event-booking`, `holiday-home-stay`, `booking-calendar` (tool) | retired: bare `booking` as a single term | split decision; Residential has an amenity slot reservation (Res 4.15), an event reservation ("Resident Booking Flow", Res 4.16), a holiday-home short stay (Res 4.10), and an admin Booking Calendar tool (Res 4.15). Other deployment (event side): `event-registration` | 2026-09-29 |
| D-14 | `maintenance` split | 4.17, 4.19 | split of the overloaded word `maintenance` | `preventive-maintenance` (via `maintenance-schedule` / `action-item`), `amc`, `maintenance-staff` (role) | retired: bare `maintenance` as a single term | split decision; asset preventive maintenance (Res 4.17), the AMC contract (Res 4.19), and the staff role (Res 4.2) are three things | 2026-09-29 |
| D-15 | `invoice` vs `bill` | 7.2, 7.5 vs 7.7, 7.8 | whether receivable and payable documents are one term | two objects: `invoice` (receivable) and `bill` (payable) | retired: treating them as synonyms | split decision; `invoice` bills a member/unit (money owed to the community, Res 7.2); `bill` / `expense-bill` is a vendor's invoice (money owed by the community, Res 7.7, 7.8) | 2026-09-29 |
| D-16 | `member` | 4.3 Members | one word, two meanings | `member` = a resident/owner in the Members directory | retired: nothing | Residential sense fixed as a community resident/owner, "Directory > Members" (Res 4.3.2). The group/club `group-member` sense is Commercial-only and is not in this glossary | 2026-09-29 |
| D-17 | `report` | 4.21 Reports, 7.11 | whether each report type is its own term | one object `report` with a typed `report-type` value-list; `balance-sheet` and `income-expenditure-statement` kept as standalone objects | retired: one object per report type (`no-dues-certificate`, `rera-audit-annexure` etc. are now values, in `states.md`) | Gate 2 (R1): report types are values of one `report`; the two financial statements stand alone as structured accounting deliverables (Res 4.21, 7.11) | 2026-09-30 |
| D-18 | `notice` | 4.6 Communication | the word for a broadcast community communication | `notice` | retired: nothing | Residential dialect leads with "notice" and "Noticeboard" (Res 4.6). Other deployment: `announcement`. Distinct from the document-category value "Notice" (a value in `states.md`) and from `notification` (a system alert, D-19) | 2026-09-29 |
| D-19 | `notification` | 4.12, 4.14, 4.20 | notice vs notification | `notification` = a system-generated alert | retired: nothing | distinct from `notice` (an admin broadcast, D-18); "Send notification to assigned staff" (Res 4.12) | 2026-09-29 |
| D-20 | roles collapse | 2, 4.2-4.5, and all modules | role granularity | ~8 persona role-groups; granular roles listed as values | retired: one entry per granular role | Gate 1 decision; the platform records dozens of named roles - they are collapsed to personas (see `roles.md`) | 2026-09-29 |
| D-21 | `journal-voucher` | 7.6, 7.13 | JV vs journal entry | `journal-voucher` (JV) | retired: `journal-entry` | synonym collapse; "accounting journal entry (JV)" (Res 7.6) and "Journal entries" (Res 7.13) name one posting | 2026-09-29 |
| D-22 | `credit-note` | 7.6 | the Residential refund instrument | `credit-note` | retired: nothing | Residential refunds and adjustments use credit notes (Res 7.6). Other deployment: `cancellation-refund` (via payment gateway) | 2026-09-29 |
| D-23 | `tax-structure` | 7.1 | tax structure vs tax slab | `tax-structure` | retired: `tax-slab` | synonym collapse; "Tax structures are created" vs "each created tax slab is mapped" (Res 7.1) | 2026-09-29 |
| D-24 | drops | various | words that are not glossary terms | none added | dropped: `widget`, `KPI`, `PPM`, `case`, `job` (cron / system-job sense), the `download-manager` object, `fit-gap` (an assessment marker, not a product thing); `equipment` merged into `asset`; future / change-request items (Sealed Bid, NDA, Tejari, MT-940) kept out of scope | Gate 1 + Gate 2 (R3, R4); `fit-gap` dropped as a non-product assessment label; the CR items are future / out-of-scope (Res 9) | 2026-09-30 |
| D-25 | `maid-profile` | 4.5.6 Contact List | whether to include the service-maid concept | dropped | retired: `maid-profile` | Gate 2 (R2): source marks it "a Change request. Not a part of the current project deliverable" (Res 4.5.6), so it is excluded from the glossary | 2026-09-30 |

## Related pages

| page | why it relates |
|---|---|
| [objects.md](objects.md) | object entries link here from their `decision` column |
| [roles.md](roles.md) | the role-group collapse (D-20) and persona entries link here |
| [states.md](states.md) | value-set entries link here for split and drop decisions |
| [steps.md](steps.md) | step entries link here for split decisions (onboarding, booking, maintenance) |
