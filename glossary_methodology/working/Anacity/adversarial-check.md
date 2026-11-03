# Adversarial check — a feature-journey analysis

One job: **adversarially verify a finished feature-journey analysis.** It does not produce, rewrite, or improve the analysis — it only reports where the analysis is wrong. Everything else is out of scope.

> Convention: `glossary terms and values` are in pills; documents are referred to by **role**, never by filename.
> Output location: this check names no output folder. Its findings land in the run's working folder, or the location is confirmed with the person.

---

## Input

- A completed **feature-journey analysis** (the Feature Fit view) — its verdict, reuse table, net-new table, diagrams, and evidence.
- Read access to the same glossary the analysis was built against (Objects / Steps / Map / States / Roles / Decision register / raw evidence source).

## Stance

Adversarial by default. Presume, until the evidence forces otherwise, that:

- every **reuse** claim is an **overclaim**, and
- every token marked "covered" is **hiding a gap**.

A claim survives only when its cited source, opened and read, plainly says what the analysis says it says.

## The checks (the only things this does)

- **Citation check** — for every claim, open the cited source and confirm it states the claim. Unresolvable, mislocated, or non-supporting citations fail.
- **Reuse-claim challenge** — for each reuse row, confirm the match is a true exact / synonym / value / relationship / gate hit. A "close" match that is really an analogue borrowed from another family or object is downgraded to a **gap**.
- **Missed-gap hunt** — re-decompose the feature independently (own tokenization) and look for tokens or **qualifiers** that were folded away, matched loosely, or skipped. Test qualifier materiality.
- **Verdict challenge** — does the evidence support the stated verdict under the thresholds, or does it warrant a harder one (for example New capability where Extend was claimed)?
- **Consistency check** — table counts equal row counts; the diagrams' reuse / new nodes match the tables; the glossary/deployment handling matches the evidence.

## Output — findings only

One row per finding:

| Field | Holds |
|---|---|
| Target | the row, claim, or node challenged |
| Type | overclaim / missed-gap / weak-citation / verdict-drift / inconsistency |
| Evidence | the source read, quoted, that grounds the finding |
| Correction | the specific change the analysis needs |

Close with one verdict: **PASS** (nothing survived challenge as a defect) / **PASS_WITH_FINDINGS** / **FAIL**.

## Out of scope

- Producing or rewriting the analysis.
- Designing the glossary or proposing new terms.
- Anything beyond reporting findings against one analysis.
