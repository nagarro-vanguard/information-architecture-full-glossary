# Tier-1 · Plan 2 — Set-Level Traceability & Coverage Gate

**Addresses:** Tier-1 hole #2 (per-artifact eval can't see set-level defects). **Depends on:** the
traceability spine IDs existing (they do). **Complements:** Plan 1 (intrinsic eval).

## Context / problem
Progressive, per-artifact eval audits an artifact in isolation. But the toolkit's core promise is a
**set-level** property: *every requirement is covered, everything traces, nothing is orphaned or
duplicated.* No single-artifact audit can see "FR-07 is covered by no feature" or "two EPICs both
claim Feature X." Auditing one-at-a-time gives false confidence about completeness — the most
dangerous kind of miss, because the pack *looks* finished.

## The change
Add a **relational gate** that runs on the *whole set* at each layer boundary — a deterministic
graph check over the traceability spine, not an LLM vibe:

`BR-xx → FR-xx → Feature → EPIC → Story → AC`

At each boundary, verify both directions:

| Boundary | Forward (nothing dropped) | Backward (nothing orphaned/invented) |
|----------|---------------------------|--------------------------------------|
| BR → FR | every in-scope `BR-xx` has ≥1 `FR-xx` | every `FR-xx` links to a real `BR-xx` |
| FR → Feature | every in-scope `FR-xx` in ≥1 feature | every feature links to a real `FR-xx` |
| Feature → EPIC | every feature placed in exactly one primary EPIC | every EPIC feature exists in the catalog |
| Story → Feature/EPIC | every feature has ≥1 story (or explicit deferral) | every story links up |
| AC → Story | every story has AC; every in-scope rule has ≥1 AC | no AC for out-of-scope |

Also flags: **duplicates** (a feature in two EPICs), **dangling IDs** (referenced but undefined),
and **Must/Won't integrity** (a `Must` requirement dropped, a `Won't` item silently built).

## How it works (mostly not an LLM)
- An agent **extracts the ID graph** from the artifacts (the only LLM step — parsing IDs + links
  from markdown into a structured edge list).
- A **deterministic check** over that graph produces the coverage report — pass/fail per boundary,
  with the exact missing/orphaned IDs. Determinism = reproducible, defensible to a client.
- Output → `Output/_eval/traceability-<boundary>.md` and a rollup `coverage-summary.md`.

## Autonomous vs gated
- A coverage **Blocker** (a dropped `Must`, an orphan) → per the eval model, **quarantine + banner**,
  never a silent pass. Gated specifier stops at the boundary.
- Runs as its own gate **after** a layer's artifacts all exist, distinct from the per-artifact eval
  in Plan 1 — the two are complementary, not substitutes.

## Acceptance criteria
- Seed a PRD where `FR-07` is covered by no feature → the FR→Feature gate reports FAIL naming exactly
  `FR-07`.
- Seed a feature placed in two EPICs → duplicate flagged with both EPIC ids.
- A fully-traced pack → all boundaries PASS, `coverage-summary.md` shows 100% both directions.
- Re-running on the same pack yields identical results (deterministic).

## How to run (separately)
Build after Plan 1's auditor exists (shares the `_eval/` output shape and severity model), but it is
otherwise independent — it reads the produced `Output/` pack and needs no generation workflow changes.
