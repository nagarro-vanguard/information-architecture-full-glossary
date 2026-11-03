# Tier-1 · Plan 3 — Provided-Document Handling & No-Skip Semantics

**Addresses:** Tier-1 holes #3 (auto-rewrite is a governance landmine) and #4 (no-skip forces
backward fabrication). **Decisions confirmed by the user:** an *approved* document passes through
(no rewrite); no-skip is right but must not fabricate upstream.

## Context / problem
Two failure modes in the original AD-5 draft:
- **#3 — rewriting a provided doc.** Judging a client's *signed-off* BRD against our template,
  finding it "non-compliant," and autonomously replacing it with a machine paraphrase silently
  overrides an authoritative source and risks inventing content (violates G.1).
- **#4 — no-skip applied upward.** If a PRD is supplied but no BRD, "never skip the BRD step" would
  reverse-engineer a business case that never existed — manufacturing the most political artifact in
  the stack.

## The decisions

### D1 — An approved document passes through; never rewrite it
1. Drop every provided doc as-is into `Output/artifacts/` (the immutable source of record).
2. Run eval in **accept/normalize mode**, not rewrite mode:
   - The rubric (Plan 1) runs **only to raise findings**, not to gate-out the doc.
   - If the doc is fit-for-purpose, **place a normalized copy** in its stage folder
     (`01-brd/`, `02-prd/`, …). *Normalize = formatting/headings/ID tags only — never content.*
   - If the doc has gaps, **record them as findings/open-questions** attached to the placed artifact
     and continue. Downstream consumes it; the human resolves the open questions.
3. **The workflow never overrides an approved source.** The original in `artifacts/` is canonical;
   the placed copy is marked *"provided by user — normalized, not rewritten,"* with a link back.
4. Rewrite is reserved for artifacts the workflow itself **generated** (Plan 1's bounded remediation).

> Net: a good provided doc *makes it through* untouched in substance. That was the user's call, and
> it's also the correct governance posture.

### D2 — Never skip a step, but never fabricate upstream either
No-skip protects *forward* integrity (don't jump to features leaving `03-features` the only thing on
disk). It must not force *backward* invention.

| Situation | Behaviour |
|-----------|-----------|
| Provided artifact exists for a step | D1: drop → eval(findings) → place normalized |
| A step's artifact is missing but **derivable forward** from provided inputs | Generate it normally (e.g. features from a provided PRD) |
| An **upstream** artifact is missing (e.g. PRD given, no BRD) | Do **not** synthesize a confident BRD. Create a **reconstructed stub**: only what is *derivable with citation* from the provided doc, every line tagged `[reconstructed — unverified]`, flagged for human confirmation. It exists so the chain is unbroken — it does **not** assert business rationale that no source supports. |

- The **run enters at the stage matching the highest provided artifact**; earlier stages are
  satisfied by provided docs (D1) or reconstructed stubs (D2), never skipped, never fabricated.
- This supersedes the old auto-spec "skip covered phases" behaviour (register J-2, reopened).

## New `Output/` structure this introduces
```
Output/
  artifacts/        # raw provided docs, immutable source of record (D1 step 1)
  01-brd/ …         # provided-normalized OR generated OR reconstructed-stub, each labelled
```
Each placed artifact carries a one-line provenance header: `provided-normalized` | `generated` |
`reconstructed-stub`. Provenance feeds the decision log and any later `blast-radius` diff.

## Acceptance criteria
- Give it an approved BRD in a non-standard format → the BRD lands in `01-brd/` with substance
  unchanged, provenance `provided-normalized`, and any gaps listed as open questions. The original
  is intact in `artifacts/`.
- Give it a PRD and no BRD → `01-brd/` holds a `reconstructed-stub` with every line citation-tagged
  or marked `[reconstructed — unverified]`; no invented KPIs; run proceeds from PRD onward.
- Give it a genuinely weak *generated* draft → bounded rewrite (Plan 1), not a pass.

## How to run (separately)
Depends on Plan 1's per-artifact eval (to produce the findings in accept/normalize mode). Wire into
the generation workflows (auto-spec, then specifier) after Plan 1 lands. Touches the workflow scripts
and the intake step; does **not** change the atomic skills' content, only how the workflow places
their inputs/outputs.
