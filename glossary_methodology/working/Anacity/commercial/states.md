<!-- Assembled per glossary-assembly-principles.md - Part A + Part B: states -->
# States and values

The named conditions and closed value-sets on the ANACITY Business platform ("Embassy SYNC", Embassy REIT), grouped by the module area (`family`) whose objects they qualify. Each entry names the thing it belongs to and lists its values from the Commercial BRD, with an `Other deployment:` note where the Residential value-set differs.

## How to read this document

- `term` - the state or value-set word, kebab-case and backticked.
- `what it is` - one plain sentence naming the condition or value-set.
- `source` - the deployment that attests it; always `Com` here.
- `decision` - a link to the register row that settled a contested word, else `-`.
- `belongs to` - the object (in [objects.md](objects.md)) this condition or value-set qualifies.
- `values` - the members of the set, one per line.

## Families at a glance

| family | what it covers | source |
|---|---|---|
| `platform-and-onboarding` | onboarding model, account, and password conditions | Com |
| `people-roles-and-directory` | group, T&C, account, and privacy conditions | Com |
| `communication-and-engagement` | announcement, poll, survey, event, booking, and order conditions | Com |
| `helpdesk-and-incidents` | ticket, escalation, and feedback conditions | Com |
| `access-visitors-and-security` | access, visitor, device, and patrol conditions | Com |
| `amenities-and-bookings` | booking, slot, amenity, and calendar conditions | Com |
| `accounting-and-finance` | payment outcome and slot-hold conditions | Com |
| `dashboards-reports-and-notifications` | report and notification conditions | Com |

---

## Family: `platform-and-onboarding`

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `onboarding-model` | the data-privacy model an organization onboards its employees under | Com | [D-24](decisions.md#d-24) | `employee-onboarding` | With PII<br>Without PII |
| `employee-account-status` | whether an employee's access is enabled | Com | - | `employee-account` | activated<br>deactivated |
| `password-type` | the kind of password on an account | Com | - | `employee-account` | temporary<br>personal |
| `pre-invite-enablement` | whether an employee may create visitor pre-invites | Com | - | `employee-account` | enabled<br>disabled |
| `building-tenant-association` | how many buildings or tenants an email is tied to | Com | - | `employee-account` | single association<br>multiple associations |

## Family: `people-roles-and-directory`

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `interest-group-type` | whether a group is open or gated | Com | - | `interest-based-group` | Open Group<br>Invitation-Only Group |
| `join-request-status` | where a join request stands | Com | - | `join-request` | sent (pending approval)<br>approved<br>rejected |
| `terms-and-conditions-status` | the T&C publication and acceptance state | Com | - | `tenant-terms-and-conditions` | uploaded<br>published (live)<br>accepted |
| `account-status` | whether the employee account is live | Com | - | `profile` | active<br>deleted (irreversible) |
| `privacy-setting` | field visibility on the profile | Com | - | `privacy-settings` | visible<br>hidden |
| `in-app-calling` | whether in-app calling is allowed | Com | - | `privacy-settings` | enabled<br>disabled |

## Family: `communication-and-engagement`

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `announcement-state` | whether an announcement shows to users | Com | - | `announcement` | active (visible)<br>past / expired (hidden) |
| `communication-type-template-value` | the format applied to an announcement | Com | - | `communication-type-template` | General Notification<br>Campus Event Update<br>Emergency Alert |
| `announcement-target-audience` | the recipient scope of an announcement. Other deployment: notice visibility audience (Res) | Com | - | `announcement` | entire organisation<br>specific tenant offices<br>selected user groups |
| `survey-response-type` | the answer type of a survey question. Other deployment: response type (Res) | Com | - | `survey` | single select<br>multi-select<br>open text<br>star rating |
| `voting-rights` | who may vote and how often | Com | - | `poll` | one per employee<br>one per unit |
| `poll-state` | whether a poll accepts votes | Com | - | `poll` | active / live<br>closed (at expiry) |
| `event-type` | whether an event is chargeable | Com | - | `event` | Free<br>Paid |
| `registration-type` | how an employee registers for an event | Com | - | `registration-form` | Audience<br>Participant |
| `ticket-area` | the seating tier of an event. Other deployment: VIP / Standard / Early Bird (Res) | Com | [D-18](decisions.md#d-18) | `seating-category` | Platinum Area<br>Gold Area<br>Silver Area |
| `order-status` | where a food order stands | Com | - | `order` | Order Received<br>Preparing<br>Ready for Pickup / Delivery |
| `newsletter-frequency` | how often a newsletter publishes | Com | - | `newsletter` | weekly<br>monthly<br>quarterly |

## Family: `helpdesk-and-incidents`

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `ticket-status` | the lifecycle state of a service request. Other deployment: complaint status Open/In Progress/Resolved/Closed (Res) | Com | [D-16](decisions.md#d-16) | `service-request` | Open / Submitted<br>Assigned<br>In Progress<br>On Hold<br>Resolved<br>Closed<br>Reopened<br>Cancelled |
| `ticket-resolution-value` | the resolution marker at completion | Com | - | `service-request` | Resolved<br>Completed |
| `escalation-level` | the level a ticket has escalated to | Com | [D-17](decisions.md#d-17) | `escalation-path` | Level 1<br>Level 2<br>Level 3 |
| `qr-status` | whether a feedback QR is live | Com | - | `qr-based-feedback` | Active<br>Inactive |
| `star-rating` | the feedback rating scale | Com | - | `feedback` | 1 to 5 |

## Family: `access-visitors-and-security`

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `access-event-type` | the direction of an access event (device orientation, not movement) | Com | - | `occupant-access-log` | Entry<br>Exit |
| `access-method` | how entry was presented | Com | - | `access-credential` | QR Code<br>NFC<br>Bluetooth<br>Tap Access |
| `access-enabled-state` | whether an employee's smart access is on | Com | - | `smart-access-permissions` | enabled<br>not enabled (Permission Required) |
| `unlock-result` | the outcome of an access attempt | Com | - | `access-point` | Device Unlocked<br>Failed to Unlock (retry) |
| `visitor-visit-status` | where a visitor's visit stands | Com | - | `visitor` | checked-in<br>completed / checked-out |
| `host-approval-status` | the host's decision on a visitor | Com | - | `approval-workflow` | pending<br>approved<br>rejected |
| `visitor-pass-validity` | the validity of a visitor pass | Com | - | `visitor-pass` | single-use<br>time-bound<br>expired (invalidated) |
| `visitor-type` | the kind of guest invited | Com | [D-12](decisions.md#d-12) | `visitor` | personal guest<br>interview candidate<br>contractor |
| `invite-duration` | the span an invite covers | Com | - | `visitor-pass` | single-day<br>multi-day |
| `maintenance-staff-access-status` | the state of a staff access pass | Com | - | `maintenance-staff-directory` | All (active)<br>Expiring Soon<br>Expired<br>Inactive |
| `attendance-device-status` | the health of an attendance device | Com | - | `attendance-device` | online<br>offline<br>error |
| `patrol-progress` | checkpoint progress during a patrol | Com | - | `patrol-route` | scanned<br>pending |
| `qr-code-validity` | whether a visitor QR is still usable | Com | - | `qr-code` | valid (within validity period)<br>expired |

## Family: `amenities-and-bookings`

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `booking-status` | the lifecycle state of an amenity booking. Other deployment: booking status (Res) | Com | [D-11](decisions.md#d-11) | `amenity-booking` | Pending Approval<br>Confirmed<br>Rejected<br>Cancelled<br>auto-cancelled |
| `booking-state` | how a booking is grouped on the home screen | Com | - | `bookings-section` | Active<br>Past<br>Cancelled |
| `slot-state` | whether a slot can be booked | Com | [D-10](decisions.md#d-10) | `slot` | Available<br>Fully Booked<br>Blocked |
| `amenity-state` | whether an amenity is bookable | Com | [D-9](decisions.md#d-9) | `amenity` | active (bookable)<br>deactivated |
| `amenity-payment-type` | whether an amenity charges | Com | - | `amenity` | free<br>paid |
| `calendar-view-mode` | the calendar zoom level | Com | - | `booking-calendar` | Day<br>Week<br>Month |

## Family: `accounting-and-finance`

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `payment-outcome` | the result of a gateway payment | Com | - | `payment-gateway` | successful<br>failed (retry) |
| `booking-slot-hold` | the temporary hold on a slot during payment | Com | - | `slot` | held temporarily (during payment) |

## Family: `dashboards-reports-and-notifications`

| term | what it is | source | decision | belongs to | values |
|---|---|---|---|---|---|
| `report-type` | the typed value-list of report kinds (one `report` object, not one entry per type) | Com | [D-20](decisions.md#d-20) | `report` | Occupant Access Logs<br>Service Request Reports<br>Guard Patrol Reports<br>Visitor Reports<br>Amenity Booking Reports |
| `report-frequency` | how a report runs | Com | - | `report` | Daily<br>Weekly<br>Monthly<br>On-demand |
| `download-format` | the file format of a downloaded report. Other deployment: CSV / PDF (Res) | Com | [D-23](decisions.md#d-23) | `report` | CSV<br>Excel |
| `report-generation-state` | where report generation stands | Com | - | `report` | queued (background)<br>ready for download<br>downloaded |
| `notification-read-state` | whether a notification has been read | Com | - | `notification` | unread<br>read<br>cleared |
| `notification-toggle` | whether a notification type is on | Com | - | `notification` | on<br>off |
| `notification-category` | the kinds of notification a user receives | Com | - | `notification` | Visitor Approvals<br>Service Ticket Updates<br>Announcement Alerts<br>Event Reminders<br>Booking Confirmations<br>Access Alerts |
| `integration-rollout-phase` | the delivery phase of an integration | Com | - | `f-and-b-platform` | Phase 1<br>Phase 2<br>future phase |

## Related pages

| page | why it relates |
|---|---|
| [objects.md](objects.md) | the things these conditions and value-sets belong to |
| [steps.md](steps.md) | the stages that move objects between these states |
| [decisions.md](decisions.md) | why contested value words were chosen and how they map to the Residential dialect |
