<!-- Assembled per glossary-assembly-principles.md - Part A + Part B: decisions -->
# Decisions

The decision register for the Commercial glossary - one row per contested term, keyed by a global id (`D-1`, `D-2`, ...), append-only. Rows are dated 2026-09-29, with Gate 2 rulings applied 2026-09-30 (see D-18, D-35). It is the one place operational reasoning lives; every other document links here by anchor. Because the deliverable is a two-dialect split, most rows record either a within-Commercial collapse/split or a Commercial-versus-Residential dialect drift; the Residential word is never retired (two-dialects policy) - it is named as the `Other deployment` pointer.

## How to read this document

- `ID` - the stable decision id other pages link to.
- `Term` - the Commercial word that was settled.
- `Where` - the module area (and Commercial BRD locator) the term was found in.
- `Decided` - the question that was answered.
- `Chosen` - the word kept in the Commercial glossary.
- `Retired / Overrides` - within-Commercial synonyms collapsed, or a note that the other dialect's word is kept (never retired).
- `Basis` - the evidence and the cross-dialect pointer.
- `Date` - when the decision was recorded.

## Register

| ID | Term | Where | Decided | Chosen | Retired / Overrides | Basis | Date |
|---|---|---|---|---|---|---|---|
| <a id="d-1"></a>D-1 | `campus` | platform-and-onboarding (Com 1.2) | word for the managed site | `campus` (also `property`) | drift only; other dialect kept | "a multi-tenant commercial campus like Embassy SYNC"; Other deployment: `community` (Res) | 2026-09-29 |
| <a id="d-2"></a>D-2 | `building` | platform-and-onboarding (Com 1.3) | word for the structural sub-container | `building` | drift only; other dialect kept | "management ... at building level"; Other deployment: `block` (Res) | 2026-09-29 |
| <a id="d-3"></a>D-3 | `portfolio` | platform-and-onboarding (Com 1.2) | word for the owner grouping | `portfolio` | drift only; other dialect kept | "multiple parks and buildings under one portfolio"; Other deployment: `builder account` (Res) | 2026-09-29 |
| <a id="d-4"></a>D-4 | `asset-owner-portal` | platform-and-onboarding (Com 1.4, 3) | name of the web admin portal | `asset-owner-portal` | collapsed: `building-admin-portal` (explicit synonym); drift | "the Asset Owner Portal (also referred to as the Building Admin Portal)"; Other deployment: `Admin Portal` (Res) | 2026-09-29 |
| <a id="d-5"></a>D-5 | `mobile-app` | platform-and-onboarding (Com 1.3) | name of the employee app | `mobile-app` | drift only; other dialect kept | "Mobile App (iOS and Android)"; Other deployment: `ANACITY app` (Res) | 2026-09-29 |
| <a id="d-6"></a>D-6 | `employee` | people-roles-and-directory (Com 1.2.1) | word for the end-user persona | `employee` | drift; `occupant` treated as `employee` | "register their employees"; Other deployment: `resident` (Res) | 2026-09-29 |
| <a id="d-7"></a>D-7 | `activation-email` | platform-and-onboarding (Com 1.2.2) | name of the onboarding email | `activation-email` | drift only; other dialect kept | "a system-generated activation email"; Other deployment: `welcome email` (Res) | 2026-09-29 |
| <a id="d-8"></a>D-8 | `tenant` (sense) | people-roles-and-directory (Com 1.10) | which meaning of "tenant" applies | `tenant` = a leasing organization | one word, two meanings across deployments | "all tenant organizations within the building"; Other deployment: `tenant` = a renting resident (Res) | 2026-09-29 |
| <a id="d-9"></a>D-9 | `amenity` | amenities-and-bookings (Com 1.6) | word for the bookable space | `amenity` | retired within Com: `facility` | "the Amenity module ... manage all facilities"; Other deployment: `facility` leads (Res) | 2026-09-29 |
| <a id="d-10"></a>D-10 | `slot` | amenities-and-bookings (Com 1.6) | word for the bookable time window | `slot` | retired within Com: `time slot`, `booking slot` | "generates all available booking slots" / "time slots" | 2026-09-29 |
| <a id="d-11"></a>D-11 | `booking` (split) | amenities / communication (Com 1.6, 1.8, 1.11) | one word covering several things | split into `amenity-booking`, `event-registration`, `booking-calendar` (tool) | - | "Bookings section ... across both Amenities and Events" | 2026-09-29 |
| <a id="d-12"></a>D-12 | `visitor` | access-visitors-and-security (Com 1.5, 1.17) | word for the entrant | `visitor` (walk-in and `guest` are kinds of visitor) | folded: walk-in / pre-invited / guest as kinds, not separate personas | "various types of guests: personal guests, interview candidates, and contractors"; Other deployment: `visitor` (Res) | 2026-09-29 |
| <a id="d-13"></a>D-13 | `security-team` | people / access (Com 1.3, 2.4) | word for the security person | `security-team` / `security-guard` | collapsed: security personnel, reception staff | "Security Personnel", "Security Guard"; Other deployment: `security guard` / `gatekeeper` (Res) | 2026-09-29 |
| <a id="d-14"></a>D-14 | `vendor` | people / helpdesk (Com 2.3, AO 1.3) | word for the external provider | `vendor` | retired within Com: `supplier`, `service vendor` | "the appropriate facility staff member or service vendor" | 2026-09-29 |
| <a id="d-15"></a>D-15 | `announcement` | communication-and-engagement (Com 1.2) | word for the broadcast | `announcement` | drift; `Announcements module` = `Communication` (Res) | "broadcast structured communications"; Other deployment: `notice` (Res) | 2026-09-29 |
| <a id="d-16"></a>D-16 | `service-request` | helpdesk-and-incidents (Com AO 1.3, Ten 1.4) | word for the ticket object | `service-request` (= `ticket`) | collapsed: `service desk` = `service requests`; `ticket` is the in-flow name | "raise and track service requests ... the full ticket lifecycle"; Other deployment: `complaint` (Res) | 2026-09-29 |
| <a id="d-17"></a>D-17 | `escalation-path` | helpdesk-and-incidents (Com AO 1.3) | word for the escalation config | `escalation-path` | drift only; other dialect kept | "Define Escalation Paths and configure the escalation matrix"; Other deployment: `escalation matrix` (Res) | 2026-09-29 |
| <a id="d-18"></a>D-18 | `seating-category` / `rate-card` | communication (Com 1.8) + accounting (Com 7.2) | words for the event ticket tier and pricing | `seating-category`; one `rate-card` object used in two contexts | drift only; other dialect kept | Gate 2 (C3): `rate-card` is a single pricing-schedule object, cross-referenced under both `event` (paid-event pricing) and `payment-gateway` (gateway settlement pricing), not two separate terms; "seating categorization and rate card"; Other deployment: `ticket category` / `pricing model` (Res) | 2026-09-30 |
| <a id="d-19"></a>D-19 | `registration-form` / `registration-field` | communication-and-engagement (Com 1.8) | words for the event form | `registration-form`, `registration-field` | drift only; other dialect kept | "Configure registration fields"; Other deployment: `participation form` (Res) | 2026-09-29 |
| <a id="d-20"></a>D-20 | `report` | dashboards-reports-and-notifications (Com AO 1.9, Ten 1.7) | one object or many | one `report` object with a typed `report-type` value-list | retired: an entry per report type | "access to all operational reports across every module"; Other deployment: `report` (Res) | 2026-09-29 |
| <a id="d-21"></a>D-21 | `tenant-organization` / `tenant-admin` | platform / people (Com 1.4, 1.10) | status of the tenant model | `tenant-organization` and `Tenant Admin` first-class | - | Commercial-exclusive: "The authorized representative of a tenant organization" | 2026-09-29 |
| <a id="d-22"></a>D-22 | `group-member` | people-roles-and-directory (Com 1.7 Clubs) | which "member" sense applies | `group-member` (club) kept distinct | one word, two meanings | "immediately added as a member"; Other deployment: `member` = resident/owner (Res) | 2026-09-29 |
| <a id="d-23"></a>D-23 | `download` | dashboards-reports-and-notifications (Com AO 1.9) | keep the tool or the action | keep `download` step and `download-format` (CSV/Excel) | dropped: `download-manager` object (per brief) | "Downloads the report in the configured format"; Other deployment: `export` CSV/PDF (Res) | 2026-09-29 |
| <a id="d-24"></a>D-24 | `onboarding` (split) | platform / people (Com 1.2, 1.10) | one word covering several | split into `employee-onboarding`, `tenant-onboarding`, `onboarding-model` | - | "Employee Onboarding" / "Tenant Onboarding" / "two distinct onboarding models" | 2026-09-29 |
| <a id="d-25"></a>D-25 | `payment-gateway` / `cancellation-refund` | accounting-and-finance (Com 7.2) | words for collection and refund | `payment-gateway`; `cancellation-refund` | drift only; other dialect kept | "Payment Gateway Integration (Pine labs or RazorPay)"; Other deployment: `Mollak`/`Noqodi` escrow and `Credit Note` refund (Res) | 2026-09-29 |
| <a id="d-26"></a>D-26 | `parking-slot` | access-visitors-and-security (Com 7.5) | word for the parking space | `parking-slot` | drift only; other dialect kept | "Real-time parking slot availability"; Other deployment: `parking lot` (Res) | 2026-09-29 |
| <a id="d-27"></a>D-27 | `work-order` | helpdesk-and-incidents (Com AO 1.3, 7.4) | word for the work item | `work-order` (= `job card`) | collapsed: `job card` = `work order` | "work orders/job cards are generated from service requests"; Other deployment: `maintenance action item` (Res) | 2026-09-29 |
| <a id="d-28"></a>D-28 | `guard-app` | access-visitors-and-security (Com VMS 5) | name of the guard app | `guard-app` | drift only; other dialect kept | "the Guard App for security team operations"; Other deployment: `Gatekeeper App` (Res) | 2026-09-29 |
| <a id="d-29"></a>D-29 | `home-screen` | communication / dashboards (Com 7.3, 8) | word for the employee landing surface | `home-screen` | drift only; other dialect kept | "the Mobile App home screen"; Other deployment: `dashboard` / MPD home (Res) | 2026-09-29 |
| <a id="d-30"></a>D-30 | `occupant` | people / access (Com 1.7, 1.4) | the directory persona | `occupant` = `employee` | - | "all registered occupants (employees)"; Other deployment: `resident` (Res) | 2026-09-29 |
| <a id="d-31"></a>D-31 | `asset-owner-admin` (role-group) | people-roles-and-directory (Com 2) | how to record admin roles | `asset-owner-admin` role-group | collapsed: 45+ granular admin roles into one persona (listed as values) | Gate 1 role-group collapse; Other deployment: `Community Administrator` / sub-admins (Res) | 2026-09-29 |
| <a id="d-32"></a>D-32 | `facility-and-maintenance-staff` (role-group) | people-roles-and-directory (Com 2.3) | how to record staff roles | `facility-and-maintenance-staff` role-group | collapsed: maintenance / facility / store / field-staff roles | Gate 1 role-group collapse; Other deployment: `maintenance staff` (Res) | 2026-09-29 |
| <a id="d-33"></a>D-33 | `anacity-configuration-team` | platform-and-onboarding (Com 1.1, 1.4) | word for the setup team | `anacity-configuration-team` | drift only; other dialect kept | "the ANACITY configuration team"; Other deployment: `ANACITY Implementation Team` (Res) | 2026-09-29 |
| <a id="d-34"></a>D-34 | dropped terms | cross-cutting (per brief) | which candidates are not terms | dropped from the glossary | dropped: `widget`, `KPI`, `PPM`, `case`, `job` (cron/system-job sense), `download-manager` object; merged: `equipment` into `asset` | Gate 1 drops; none of `widget`/`KPI`/`case`/`equipment` is attested in the Commercial ranges, so the drop is confirmed by absence | 2026-09-29 |
| <a id="d-35"></a>D-35 | Gate 2 confirmations | cross-cutting | items confirmed at Gate 2 | roles kept as ~8 role-groups (not family-partitioned); CAFM work-orders folded into `helpdesk-and-incidents` (no standalone assets family); `home-dashboard` (admin) kept distinct from `home-screen` (employee); `contact-list` kept distinct from `sos-emergency-directory`; README title em-dash normalized to a plain hyphen | - | Gate 2 (C1, C2, C4, C5): confirmed as built | 2026-09-30 |

## Related pages

| page | why it relates |
|---|---|
| [objects.md](objects.md) | the object entries these decisions settle |
| [roles.md](roles.md) | the role-group collapses recorded in D-31, D-32 |
| [states.md](states.md) | the value-set words these decisions settle |
| [map.md](map.md) | the joined picture the settled terms populate |
