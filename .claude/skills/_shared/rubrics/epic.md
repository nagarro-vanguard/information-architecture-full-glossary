---
eval: epic
grades: an EPIC Register or an EPIC detail file
input:
  artifact: the EPIC Register (EPIC-REGISTER.md) or a per-EPIC detail file
  oracle: the chosen clustering (the copy source) + the feature catalog (→ FR-xx); BRD/PRD objectives if present
gate: any B → FAIL · else findings → PASS_WITH_FINDINGS · clean → PASS
runner: _shared/eval-runner.md
---

# R-EPIC — EPIC Register & detail file (eval rubric)

**North-star:** *is the Register a faithful copy of the clustering with every feature placed, and is
each detail file a lean, table-driven document — named as a short capability, carrying the outcome as
an epic hypothesis — with no invented facts, no ACs, and no story mapping?*
**Input:** detect which artifact you're grading. Run **Pass R** on the Register; run **Pass 1–3** on a
detail file. The **clustering** is the oracle for transcription fidelity; the **feature catalog** for
coverage. Oracle absent → mark those checks `not-evaluable`, don't guess.
**Stance:** adversarial on transcription fidelity, soundness & coverage; binary on shape.

## Pass R — Register (transcription + coverage)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| R1 | Every EPIC row has all required columns | m | Fire if any of EPIC · Name · Outcome · Features · Band · Persona · Depends-on is missing |
| R2 | Fields are copied from the clustering, not altered | B | Compare each row to the clustering; fire on a name/outcome/feature-list/band/persona/dependency that does not match its source — quote both |
| R3 | Name is a short capability phrase; outcome lives in the hypothesis | M | Fire if an EPIC **Name** is a full outcome sentence rather than a short capability/theme phrase, or if it carries a capability prefix/`>` separator |
| R4 | Every catalog feature placed in exactly one EPIC | B | Fire on a feature placed twice or not at all — name it |
| R5 | **Lineage block** first (Previous · Primary source · Supporting · Next); Previous step plain text, links show the file name, missing marked `Does not exist`/`None` | m | Fire if the Register has no Lineage block, it isn't first, or a field is omitted |

## Pass 1 — Detail file shape (intrinsic, binary)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| E1 | Standard EPIC naming (per `standard-formats.md`) | m | Fire if the heading isn't `EPIC-<NNN>: <Epic Name>` (3-digit; short capability phrase), if it carries a capability prefix/`>` separator, or if the filename isn't `EPIC-<NNN>-<name-slug>.md` with slug = name kebab-cased |
| E2 | **Lineage block** first, then the lean section set present, in order | m | Fire if the Lineage block is missing/not first, or if any of Description · Business Value · Success/Fitness Criteria · Scope · Features · Dependencies · NFRs · References is missing |
| E3 | Features are a TABLE, one row per feature | M | Fire on a per-feature prose block instead of the `Feature ID \| Feature \| <Req/BR/FR ID> \| What it delivers \| Band` table (Feature ID separated from the name; column 3 uses the applicable id label) |
| E4 | No acceptance criteria and no story-centric mapping | B | Fire if the EPIC contains ACs or a story/work-item mapping table — quote the heading |

## Pass 2 — Detail file soundness (intrinsic, judgment)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| E5 | Short capability name + outcome in the hypothesis | M | Scan G.3 prohibited terms in the name (quote it); fire if the **Name** is a full outcome sentence rather than a short capability phrase, if it names a technical component, or if the Description is missing the **Epic Hypothesis** (`As a … I need … so that …`) that carries the outcome |
| E6 | Readable — one idea per sentence | m | Fire on stacked compound sentences (3+ independent clauses joined) — quote the sentence |
| E7 | Fitness measures confidence-tiered; generated ones labeled AI-RECOMMENDED | B | Fire on a bare measure, or an invented baseline/target not labeled AI-RECOMMENDED |
| E8 | Scope, Dependencies, Features transcribed from sources (not invented) | M | Fire on a scope/dependency/feature item with no basis in the clustering/catalog |
| E9 | Work Item IDs = `TBD` — no fabricated tracker IDs | B | Fire on any non-`TBD` invented id (G.1) |

## Pass 3 — Coverage (oracle: feature catalog + BRD/PRD objectives; if absent → not-evaluable)
| # | Check | Sev | How to test — anchor the quote here |
|---|-------|-----|--------------------------------------|
| E10 | Every feature listed traces to the catalog (→ FR/REQ) | B | Fire on a feature not in the catalog, or with no FR/REQ link |
| E11 | Each *evidenced* fitness measure ties to a real BRD/PRD objective | M | Fire on an evidenced (non-AI-RECOMMENDED) measure with no upstream objective — quote it |

## Remediation routing
- **agent-fixable** — R1, R2 (re-copy the field), R3, R5, E1–E3, E5, E6, E8, E9 (set `TBD`), E10 (wire or drop the feature), plus removing any AC/story-mapping (E4).
- **needs-human** — R4 (a genuine placement gap is a clustering decision), E7 (accepting an AI-RECOMMENDED measure is a human call), E11 when no upstream objective exists. Mark, ask, never fabricate.
