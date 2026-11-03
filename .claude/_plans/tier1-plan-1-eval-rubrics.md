# Tier-1 · Plan 1 — Eval Model & Per-Artifact Rubrics

**Addresses:** Tier-1 hole #1 (eval has no ground truth). **Depends on:** nothing. **Enables:**
AD-1 (progressive eval), AD-4 (`compliance-audit` per-artifact auditor), Plan 2 (coverage gate).

## Context / problem
Eval today is an LLM freely judging another LLM's output — no rubric, no calibration, no anchored
findings. This plan makes eval *checkable*: a human-authored rubric per artifact type (the oracle),
plus the constrained auditor behaviour defined in [eval-model.md](../skills/_shared/eval-model.md).

## The change
1. Author the rubrics below into `_shared/rubrics/<artifact>.md` (one file per type).
2. Refactor `compliance-audit` into a **per-artifact auditor** (AD-4): input = one artifact + its type;
   it loads that type's rubric and the global rules (`_shared/system-prompt.md`), runs the checklist
   under the adversarial persona, and returns anchored findings + a PASS/PASS-WITH-FINDINGS/FAIL
   verdict. The old "sweep everything" mode becomes a thin loop over this core.
3. Every finding must carry **severity · location · rubric-item-id · verbatim quote · suggested fix**.
4. High-stakes types (BRD, PRD) run a **3-auditor panel, majority vote**.

## Acceptance criteria
- Given a seeded-defect artifact (e.g. an FR with no BR link), the auditor returns a **Blocker**
  finding anchored to the exact line, and verdict = FAIL.
- Given a clean artifact, verdict = PASS with zero un-anchored findings.
- Two runs over the same artifact return the **same severity** for the same defect.
- Verdicts + findings are written to `Output/_eval/<stage>-eval.md` in the structured shape above.

## How to run (separately)
Harden `compliance-audit` first (AD-4) using this plan's rubrics; validate against seeded defects before
wiring it into any generation workflow (that wiring is Plan for AD-1/AD-5, run later).

---

# The Rubrics

Severity legend: **B** = Blocker · **M** = Major · **m** = Minor. Global rules referenced: G.1 no
invented specifics · G.2 cite sources · G.3 business language · G.4 handle unknowns · G.6 exact
format. Confidence tiers: CONFIRMED / TENTATIVE / AI-RECOMMENDED.

## R-BRD — Business Requirements Document
| # | Check — good looks like | Sev | How to test |
|---|--------------------------|-----|-------------|
| B1 | Problem vs Opportunity classified, with the evidence that decides it | M | Classification statement present + tied to a baseline/source |
| B2 | Objectives are outcomes, not features; each measurable KPI carries a confidence tier | B | Every KPI has CONFIRMED/TENTATIVE/AI-RECOMMENDED; none bare |
| B3 | No invented numbers/targets/SLAs | B | Every specific has a citation OR is tagged AI-RECOMMENDED / TBD (G.1/G.2) |
| B4 | Scope in/out is explicit | M | Both lists present; out-of-scope not empty by default |
| B5 | Business requirements numbered `BR-xx`, atomic, one ask each | B | IDs present, sequential, no compound "and/or" requirements |
| B6 | Business language only | M | No implementation jargon (G.3 prohibited-terms list) |
| B7 | Risks named with a mitigation or owner | M | ≥1 risk; each has a response |
| B8 | Release-level acceptance criteria present | M | A "done for this release" statement exists |
| B9 | Every AI-RECOMMENDED item appears in an Action-Required checklist (Decision/Owner/Due) | M | Checklist present and complete |
| B10 | No silently-swallowed gaps | M | Unknowns use the labels (`[Not specified…]`, `TBD`), not omitted |

**Gate:** any B fails → FAIL. Provided/approved BRD → see Plan 3 (accept, don't rewrite).

## R-PRD — Product Requirements Document
| # | Check | Sev | How to test |
|---|-------|-----|-------------|
| P1 | Product overview + personas grounded in source (not invented) | M | Personas cite a source doc or user clarification |
| P2 | Functional requirements numbered `FR-xx`, atomic, testable | B | IDs present; each is a single verifiable capability |
| P3 | **Every FR traces to a `BR-xx`**; a traceability matrix is included | B | Matrix present; no FR with blank BR link |
| P4 | User flows present and coherent | M | ≥1 end-to-end flow per primary capability |
| P5 | Business rules captured, each cited | B | Any rule/threshold has `per [source]` or is AI-RECOMMENDED (G.2) |
| P6 | NFRs present where the BRD flagged them mandatory | M | Security/perf/compliance NFRs exist if BRD required them |
| P7 | Data requirements stated in business terms | M | Present; no schema/table jargon (G.3) |
| P8 | Metrics carry confidence tiers | B | As B2 |
| P9 | Release/acceptance criteria present | M | Present |

**Gate:** any B fails → FAIL. This is a 3-auditor panel type.

## R-FEAT — Feature Catalog
| # | Check | Sev | How to test |
|---|-------|-----|-------------|
| F1 | Each feature named + described as one capability | M | No compound features |
| F2 | **Each feature links to the `FR-xx` it covers** | B | No feature with blank FR link (no orphan/invented feature) |
| F3 | MoSCoW priority on every feature | M | Must/Should/Could/Won't present per row |
| F4 | Coverage-check table present in-artifact | M | Table mapping FR → feature(s) exists |
| F5 | Business language | m/M | G.3 |

> Note: **100% FR-coverage** (every in-scope FR in ≥1 feature) is a *set-level* property — enforced
> by Plan 2, not here. F4 only requires the check to be *present*; Plan 2 verifies it's *true*.

## R-CLUS — Clustering
| # | Check | Sev | How to test |
|---|-------|-----|-------------|
| C1 | Chosen strategy stated + 1-line rationale surfaced | M | Present (AD-6/J-6) |
| C2 | Alternatives considered, with why-rejected | M | ≥2 alternatives in an appendix |
| C3 | Every feature placed in exactly one primary EPIC | B | No unplaced feature; no feature double-counted |
| C4 | Cross-cutting features handled explicitly | M | Named as cross-cutting, not silently duplicated |
| C5 | Inter-cluster dependencies noted | M | Dependency list present |

## R-EPIC — EPIC document
| # | Check | Sev | How to test |
|---|-------|-----|-------------|
| E1 | Capability-prefixed title, business language | M | Prefix present; G.3 |
| E2 | Executive summary present | m | Present |
| E3 | Success metrics carry confidence tiers | B | As B2 |
| E4 | Scope in/out explicit | M | Both present |
| E5 | **Features listed each trace to the catalog (→ FR)** | B | No feature in the EPIC without a catalog link |
| E6 | Dependencies + sequencing stated | M | Present |
| E7 | NFRs referenced | M | Present or explicitly N/A with reason |
| E8 | Work Item IDs = `TBD` (never invented) | B | No fabricated tracker IDs (G.1) |

## R-STORY-SHELL — Placeholder story (INVEST)
| # | Check | Sev | How to test |
|---|-------|-----|-------------|
| S1 | Unique title | M | Present, distinct |
| S2 | Complete "As a [role] / I want [capability] / So that [value]" | B | All three clauses present |
| S3 | One capability, not compound (INVEST-I) | M | No "and/also" bundling |
| S4 | Role is a real persona from the PRD | M | Role matches a PRD persona (traceability) |
| S5 | Small — sized ~1–2 days | M | Not an epic-in-disguise |
| S6 | Valuable + Testable on their face | M | "So that" states real value; capability is verifiable |
| S7 | Traces to a feature/EPIC | B | Link present |
| S8 | Business language | M | G.3 |

## R-STORY-BODY — Groomed story body (updates the SAME file — AD-6)
| # | Check | Sev | How to test |
|---|-------|-----|-------------|
| G1 | Intent + context stated | M | Present |
| G2 | In/out scope explicit | M | Both present |
| G3 | Happy path, 4–7 user-observable steps | M | Step count in range; steps are user-visible |
| G4 | Business rules each cited | B | Uncited specific/threshold → fail (G.2) |
| G5 | Roles/permissions stated | M | Present |
| G6 | Dependencies are *proven*, not guessed | B | Any dependency has evidence; unproven → mark, don't assert (G.4) |
| G7 | Metrics traceability noted | M | Links to the KPI it serves |
| G8 | Shell preserved — grooming *added to*, didn't overwrite | M | Original As-a/I-want/So-that still intact in the file |
| G9 | No invented specifics | B | G.1 |

## R-AC — Acceptance Criteria (a section of the story file — AD-6)
| # | Check | Sev | How to test |
|---|-------|-----|-------------|
| A1 | 3–7 scenarios | M | Count in range |
| A2 | Given/When/Then, each testable and unambiguous | B | Each scenario is executable as a test; no vague verbs |
| A3 | Categorized UI / Behavior / System | M | Each AC tagged |
| A4 | Covers happy path **and** key negative/edge cases | M | ≥1 negative/edge scenario |
| A5 | Each in-scope rule has ≥1 AC; no AC for out-of-scope | M/B | Rule↔AC coverage holds both ways |
| A6 | Business-observable, no implementation leakage | M | G.3 |
| A7 | Lives in the same story file as a section | M | Not a separate document (AD-6) |

**Gate for the story artifact (shell+body+AC in one file):** FAIL if any of S2/S7, G4/G6/G9, A2/A5(B)
fails. The story is only "done" when all three stages pass.
