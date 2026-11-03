# BRD — Notification Preferences (seeded CLEAN fixture)

## Problem / Opportunity
**Problem (primary).** Users miss important updates because notifications are all-or-nothing, which
drives opt-outs. `per Support tickets Q1 2026`

## Objectives
- Reduce notification opt-outs while keeping users informed.
  - KPI: monthly opt-out rate. Baseline `TBD`. Target −40% in 3 months. **AI-RECOMMENDED**

## Metrics Confidence Summary
- CONFIRMED: 0 · TENTATIVE: 0 · AI-RECOMMENDED: 1

## AI Recommendations — Action Required
| Metric | Decision | Owner | Due |
|--------|----------|-------|-----|
| −40% opt-outs target | Pending | PO | TBD |

## Scope
- In: per-category notification toggles; cross-device sync.
- Out: SMS channel; notification content redesign.

## Business Requirements
- BR-01: Users can enable/disable notifications per category.
- BR-02: Preferences persist across a user's devices.

## Risks
- Over-disabling reduces engagement. Mitigation: sensible category defaults. Owner: PO.

## Release Acceptance Criteria
- A user can set per-category preferences that persist across devices with no delivery regression.
