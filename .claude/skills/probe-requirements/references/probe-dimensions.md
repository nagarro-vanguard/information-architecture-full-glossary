# Probe Dimensions — the question bank

The nine dimensions `probe-requirements` interrogates, with the sharp questions that
surface what a first description usually leaves out. Work the dimensions that fit the
input; skip the ones that plainly don't. For every question, prefer to offer 2–3
concrete options the person can react to over an open "what do you want?" — reacting
is easier than inventing.

## Contents

1. Users & context
2. Problem & value
3. Scope edges
4. Rules & constraints
5. Data & states
6. Edge cases & failure modes
7. Dependencies & integrations
8. Success & acceptance
9. Non-functional

---

## 1. Users & context
- Who is the primary user, and who else touches this (approver, admin, downstream consumer)?
- What are they doing *today* to get this done — the workaround we're replacing?
- Where are they when they do it (device, channel, in-the-flow-of-what)?
- How often — daily, per-transaction, once a quarter? Volume changes everything.
- What's their expertise? Expert-daily vs novice-occasional pull opposite designs.

## 2. Problem & value
- What breaks or costs money *right now* if we do nothing?
- Is this fixing measurable pain (a Problem) or unlocking new value (an Opportunity)? What's the evidence?
- Who feels the pain, and how do they quantify it (time, errors, revenue, risk, complaints)?
- If we shipped only *one* slice, which slice removes the most pain?
- What does "clearly better" look like in a number?

## 3. Scope edges
- What is explicitly **out** of scope for this round?
- What's the adjacent thing people will *assume* is included but isn't?
- Is this net-new, or a change to an existing capability? (Changes carry migration/back-compat.)
- One persona or several? One channel or several? Each extra one is scope.
- Where does this hand off to another team/system — and is that boundary in or out?

## 4. Rules & constraints
- What business rules, policies, eligibility, or limits govern this? (Get the *source*, not a guess.)
- Any compliance/regulatory constraint (privacy, financial, accessibility, retention)?
- Are there approvals, thresholds, or states that gate the action?
- What must *never* happen (hard constraints, safety rails)?
- Which numbers are real vs assumed? Anything unsourced is a TBD, not a fact.

## 5. Data & states
- What are the core entities, and what states can each be in (Draft → Submitted → Approved → …)?
- Who owns each piece of data; where does it originate; how fresh must it be?
- What transitions are allowed, and who can trigger them?
- Any history/audit requirement (who changed what, when)?
- What's the source of truth when two systems disagree?

## 6. Edge cases & failure modes
- What happens on empty state (nothing yet), and on the very first use?
- What happens when the input is invalid, partial, or duplicated?
- What happens when a dependency is down or slow?
- Concurrency: two people acting on the same thing at once — who wins?
- Permissions: what does an unauthorized attempt see/experience?

## 7. Dependencies & integrations
- What must exist *before* this can work (auth, roles, data, another feature)?
- What other features/teams depend on *this* once it exists?
- Any third party/vendor/external system involved, with its own timeline?
- Is there a sequencing constraint (X must ship before Y)?
- Which dependencies are proven from a source vs assumed?

## 8. Success & acceptance
- How will we *know* it worked — the specific observable outcome?
- What's the KPI, its baseline, target, timeframe, and how it's measured? (Confidence-tier each.)
- What's the release/exit criterion — the pass/fail for "done enough to ship"?
- What would make us roll it back?
- Whose sign-off is required?

## 9. Non-functional
- Performance/latency expectations, if the feature is interactive or data-heavy.
- Security/access: who can see/do what; anything sensitive?
- Availability/reliability expectations.
- Accessibility (if user-facing) and localization (if multi-market).
- Scale/capacity now and expected growth.

> **Rule for every dimension:** capture answers as sourced facts (`per [source]`),
> mark anything inferred as **Assumed — needs confirmation**, and never invent a
> number to fill a gap (G.1). A surfaced gap is a *success* of probing, not a failure.
