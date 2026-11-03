<!-- Assembled per glossary-assembly-principles.md - Part B: states -->
# States and values

The named conditions and closed value-sets in the ANACITY Community Management platform (DIEZ Dubai deployment), grouped by the thing each one qualifies. Terms are partitioned into the same families the objects use.

## How to read this document

- `term` - the condition or value-set word, kebab-case and backticked.
- `what it is` - one plain sentence naming the condition or value-set.
- `source` - the deployment that defines it; always `Res` here.
- `decision` - a link to the register when the value-set was contested, else `-`.
- `belongs to` - the object or stage this condition qualifies.
- `values` - the closed set of allowed values, comma-separated.

## Families at a glance

| family | root term(s) | what it covers | source |
|---|---|---|---|
| `platform-and-onboarding` | `relationship-type`, `community-portal-status` | onboarding reversibility, portal, account and permission states | Res |
| `people-roles-and-directory` | `maintenance-staff-member-status` | staff, committee, admin-role and contact states | Res |
| `communication-and-engagement` | `notice-visibility-audience`, `event-status` | notice, survey, poll, document, listing and event states | Res |
| `helpdesk-requests-and-incidents` | `complaint-status`, `incident-status` | complaint, request and incident lifecycles | Res |
| `access-visitors-and-security` | `visitor-request-status` | form, visitor, staff and patrol states | Res |
| `amenities-facilities-and-bookings` | `booking-status`, `slot-state` | booking, slot, amenity and holiday-home states | Res |
| `assets-inventory-and-maintenance` | `amc-status`, `action-item-status` | asset, stock and AMC states | Res |
| `accounting-and-finance` | `bill-status`, `accrual-status` | period, invoice, note, bill, accrual and reminder states | Res |
| `dashboards-reports-and-integrations` | `report-frequency` | report, notice and sync states | Res |

---

## platform-and-onboarding

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `relationship-type` | the relationship a resident holds to a unit | Res | [D-11](decisions.md#d-11) | `resident-master` | co-owner, registered-owner, owners-family, tenant, tenants-family |
| `residing-status` | whether the resident lives in the unit | Res | - | `resident-record` | yes, no |
| `onboarding-reversibility` | whether community onboarding can be undone | Res | - | `community-onboarding` | not-reversible |
| `community-portal-status` | the lifecycle of a community portal | Res | - | `community-portal` | created, deactivated |
| `mpd-permission-level` | the access level of an MPD user | Res | - | `mpd-user-account` | view-only, action-permitted |
| `activation-status` | whether an account is enabled | Res | - | `builder-account-master`, `mpd-user-account` | active, inactive |

## people-roles-and-directory

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `maintenance-staff-role-type` | whether a staff role is custom or system-default | Res | - | maintenance-staff role | custom-created, default |
| `maintenance-staff-member-status` | whether a staff member is active | Res | - | `staff-member-record` | active, deactivated |
| `oc-member-status` | whether the committee designation is set | Res | - | member or staff | assigned, removed |
| `administrator-role-status` | whether an admin role is granted | Res | - | `administrator-role` | assigned, revoked |
| `contact-record-access` | who may change a contact record | Res | - | `contact-record` | editable-by-admin, read-only-to-resident |
| `staff-role-name` | the named staff job categories | Res | - | maintenance-staff role | plumber, electrician, housekeeping, security |
| `community-member` | the kinds of community member | Res | [D-16](decisions.md#d-16) | `community` | owners, tenants, residents |

## communication-and-engagement

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `notice-visibility-audience` | who a notice targets | Res | - | `notice` | all, residing-only, owners-only, tenants-only, committee-members |
| `distribution-level` | the scope a notice is distributed at | Res | - | `notice` | community, block, unit |
| `notice-optional-flags` | the optional flags set on a notice | Res | - | `notice` | flash-notice, expiry-date, send-email-notification, special-notice |
| `response-type` | the answer type of a survey question | Res | - | `survey-question` | single-choice, multiple-choice, text |
| `voting-rights` | how many votes are allowed | Res | - | `poll` | one-per-user, one-per-unit |
| `poll-state` | whether a poll accepts votes | Res | - | `poll` | active, closed |
| `document-category` | the category a document is filed under (the value "notice" here is distinct from the communication `notice`) | Res | [D-18](decisions.md#d-18) | `document` | agreement, notice, invoice, policy, others |
| `document-target-audience` | who a document is visible to | Res | - | `document` | all-members, owners-only, tenants-only, committee-members |
| `document-status` | the lifecycle of a document | Res | - | `document` | expiring, expired, archived |
| `audit-action-type` | the logged interaction types | Res | - | `log-entry` | upload, view, download, edit, archive, delete, version-change |
| `export-format` | the format an audit log is exported in | Res | - | `export-file` | pdf, csv |
| `listing-status` | the lifecycle of a marketplace listing | Res | - | `product-listing` | pending-approval, published, rejected, archived, removed |
| `moderation` | whether listing moderation is on | Res | - | `marketplace` | enabled, disabled |
| `booking-type` | whether an event is paid | Res | - | `event` | paid, free |
| `pricing-model` | the pricing model of an event ticket | Res | - | `ticket-category` | standard-fixed, early-bird, dynamic |
| `event-status` | the lifecycle of an event | Res | - | `event` | draft, published, cancelled, completed |
| `event-capacity-state` | the sold-out condition of an event | Res | - | `event` | fully-booked |

## helpdesk-requests-and-incidents

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `complaint-status` | the complaint lifecycle | Res | [D-10](decisions.md#d-10) | `complaint` | open, in-progress, resolved, closed, cancelled, re-opened |
| `complaint-nature` | the kind a complaint is filed as | Res | - | `complaint` | complaint, service-request, inquiry |
| `request-status` | the member-request lifecycle | Res | - | `request` | in-review, closed, rejected |
| `request-category-status` | whether a request category is live | Res | - | `request-category` | active |
| `incident-status` | the incident lifecycle | Res | - | `incident` | open, in-progress, escalated, resolved |
| `escalation-level` | the level within an escalation matrix | Res | - | `escalation-matrix` | level-1, level-2, level-3 |

## access-visitors-and-security

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `hierarchy-type` | the shape of an approver list hierarchy | Res | - | `approver-list-hierarchy` | single-level, multi-level |
| `field-applicability` | who a move-in/out form field applies to | Res | - | `form-field` | owner, tenant, both |
| `visitor-request-status` | the state of a visitor entry request | Res | - | `visitor-entry-request` | waiting, approved, rejected |
| `service-staff-status` | the state of a service-staff profile | Res | - | `service-staff-profile` | active, exited, deactivated |
| `move-in-form-state` | whether a resident can fill the form | Res | - | `move-in-form` | locked, unlocked |
| `patrol-outcome` | how a patrol finished | Res | - | `patrol-report` | completed, missed-checkpoints |

## amenities-facilities-and-bookings

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `booking-status` | the amenity-booking lifecycle | Res | [D-13](decisions.md#d-13) | `amenity-booking` | pending-approval, confirmed, rejected, cancelled, auto-cancelled |
| `slot-state` | the availability of a slot | Res | [D-3](decisions.md#d-3) | `slot` | available, fully-booked, blocked, soft-held, released |
| `amenity-state` | whether an amenity is bookable | Res | [D-2](decisions.md#d-2) | `amenity` | active, deactivated, blocked-out |
| `hho-state` | whether a holiday-home operator is active | Res | - | `hho-record` | active, deactivated |
| `rate-type` | how an amenity is charged | Res | - | `amenity` | per-slot, per-hour, free |
| `facility-category` | the category an amenity belongs to | Res | - | `amenity` | sports, leisure, wellness |
| `access-category` | the booker group allowed on an amenity | Res | - | `amenity` | owners, tenants, guests-of-owners, guests-of-tenants |
| `calendar-view-mode` | the booking-calendar view | Res | - | `booking-calendar` | day, week, month |

## assets-inventory-and-maintenance

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `asset-status` | the working state of an asset | Res | [D-24](decisions.md#d-24) | `asset` | in-use |
| `action-item-status` | the state of a maintenance action item | Res | - | `action-item` | scheduled, overdue |
| `stock-movement-type` | the kind of a stock movement | Res | - | `stock-movement` | receipt, consumption |
| `amc-status` | the computed state of an AMC | Res | [D-14](decisions.md#d-14) | `amc` | active, expiring, expired |
| `stock-level-state` | whether stock is below its minimum | Res | - | `stock-item` | below-minimum-stock-level |

## accounting-and-finance

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `charge-category-stream` | the direction of a charge category | Res | - | `charge-category` | income, expenditure |
| `accounting-class` | the class of an account in the COA | Res | - | `chart-of-accounts` | assets, liabilities, revenues, expenses |
| `accounting-period-status` | the state of an accounting period | Res | - | `accounting-period` | current, prior, closed |
| `balance-sign` | what an uploaded balance means | Res | - | `closing-balance` | positive-outstanding, negative-advance |
| `tax-type` | the applicable tax types | Res | [D-23](decisions.md#d-23) | `tax-structure` | input-vat, output-vat, standard-rated |
| `frequency` | the cadence of a recurring invoice | Res | - | `recurring-invoice` | weekly, monthly, quarterly, half-yearly, yearly |
| `charge-type` | how a charge is computed | Res | - | `charge` | fixed-amount, variable-charge |
| `variable-charge-basis` | the area basis for a variable charge | Res | - | `charge` | super-built-up-area, plot-area, terrace-area |
| `calculation-type` | how a penalty is calculated | Res | - | `penalty-scheme` | percent-based, fixed |
| `non-member-invoice-status` | the non-member invoice lifecycle | Res | [D-15](decisions.md#d-15) | `non-member-invoice` | issued, partially-paid, paid, void |
| `note-status` | the approval state of a debit or credit note | Res | [D-22](decisions.md#d-22) | `credit-note`, `debit-note` | approved, rejected |
| `bill-status` | the vendor-bill lifecycle | Res | [D-15](decisions.md#d-15) | `bill` | submitted, pending-approval, ask-for-modification, approved, rejected, partially-paid, paid |
| `vendor-status` | whether a vendor is active | Res | [D-6](decisions.md#d-6) | `vendor-profile` | active, inactive |
| `accrual-status` | the accrual knock-off state | Res | - | `accrual` | open, partially-knocked-off, closed |
| `reconciliation-state` | whether a bank entry is reconciled | Res | - | `bank-book` | reconciled, unreconciled |
| `expense-type` | the fund an expense is attributed to | Res | - | `accrual` | gf, rf |
| `pr-po-approval-action` | the approver's decision on a PR or PO | Res | - | `purchase-request`, `purchase-order` | approve, reject, ask-for-modification |
| `approval-level` | the level within an ALH | Res | [D-7](decisions.md#d-7) | `approver-list-hierarchy` | l1, l2, l3 |
| `reminder-type` | the scope of a defaulter reminder | Res | - | `defaulter-reminder` | unit-level, invoice-level |
| `ageing-period` | the outstanding-invoice ageing bands | Res | - | `defaulter-reminder` | 30-days, 60-days, 90-days |
| `soa-period` | the period a statement of account covers | Res | [D-8](decisions.md#d-8) | `statement-of-account` | last-3-months, last-6-months, last-12-months, start-of-fy-till-date |
| `payment-sync-mode` | how a payment reaches Mollak | Res | - | `payment` | noqodi-auto-sync, offline-manual |

## dashboards-reports-and-integrations

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `report-type` | the kind of report the `report` object produces | Res | [D-17](decisions.md#d-17) | `report` | no-dues-certificate, rera-audit-annexure, visitor-report, patrol-report, consumption-report, defaulter-report, collection-report, and other per-module reports |
| `report-frequency` | how often a report runs | Res | [D-17](decisions.md#d-17) | `report` | daily, weekly, monthly, on-demand |
| `report-export-format` | the format a report exports in | Res | - | `report` | csv, pdf |
| `scheduled-report-outcome` | whether a scheduled report succeeded | Res | - | `report` | delivered, generation-failed |
| `mpd-notice-state` | the state of a notice in the MPD | Res | [D-18](decisions.md#d-18) | `notice` | draft, published, scheduled |
| `mpd-request-status` | the state of a lease or move-in/out request in the MPD | Res | - | `lease-record`, move-in/out request | pending, approved, rejected |
| `discrepancy-type` | the kind of owner-data discrepancy | Res | - | `discrepancy` | missing-records, mismatched-fields |

## Related pages

| page | why it relates |
|---|---|
| [objects.md](objects.md) | the things these conditions qualify |
| [steps.md](steps.md) | the stages that move objects between these conditions |
| [decisions.md](decisions.md) | why contested value-sets were split or kept |
