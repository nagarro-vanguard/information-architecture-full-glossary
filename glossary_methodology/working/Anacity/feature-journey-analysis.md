# Feature → Glossary fit — the mental model

A project-agnostic method for placing a feature against an existing glossary (one produced by the OTC method) and classifying it, with every claim attributable and gaps stated honestly.

> Convention:
> - `glossary terms and values` are in pills; kinds are tagged in [square brackets]
> - document names are referred to by **role**, never by filename
> - the method names no output folder — the view lands in the run's working folder, or the location is confirmed with the person
> - companion (separate file): an adversarial verification pass, `adversarial-check.md` — it checks a finished analysis and does only that

---

## The four reading layers

Every glossary this method reads can be worked at four layers. Each one unravels a different thing and helps in a different way; the reading order runs top to bottom.

| Layer | What it unravels | How it helps |
|---|---|---|
| Layer 1 — Family | which part of the product a feature belongs to | narrows the search to one family, so you don't read the whole glossary |
| Layer 2 — Term & kind | the agreed word, and whether it's an object, role, step or state | gives the exact word to match, and points to the right document |
| Layer 3 — Structure & movement | how the term connects, and the step-by-step flow with its gates | shows whether the feature can reuse existing rails, and where it plugs in |
| Layer 4 — Proof & close calls | the exact quotes, the deployment differences, the reuse-vs-missing call | lets you cite every claim and settle the tricky calls honestly |

Plain rule: use Layers 1–3 (the high-level docs) to **find and match**; drop into Layer 4 (the section deep-dives) to **prove and settle**. The high-level layers alone are not enough — the citations and the close calls live in Layer 4.

---

## 1. Purpose & scope

- **Input:** any feature, requirement, or change request — stated neutrally.
- **Output:** the **verdict** (Fits / Extend / New capability / Blocked), where the feature sits, and how it moves.
- Whether a feature is "new" is an **answer the method produces**, never an assumption it starts with. The pipeline runs identically whether the result is "you already have this" or "this is net-new."

## 2. When to use it

- Before stories or estimates — as a grounded triage gate against an existing glossary.
- On a single feature at a time; roll the token results up into one verdict.

## 3. The taxonomy (the map you navigate)

- **Glossary** (level 1) — one per deployment / dialect. If the feature names none, carry all and mark it an open question.
- **Family** (= Section, level 2) — the module group; identified by its **root term**.
- **Kind** (level 3) — Object / Role / Step / State-value.
- **Term** (level 4) — the individual entry.
- Attaching to a term: **Relationship**, **Gate**, **Value**, **Decision**.
- **Cross-cutting objects** — terms owned by no single family; check this list before declaring a gap.

## 4. The documents — by role (name-agnostic)

Filenames vary by project and skill version. Match each document by its **job**, not its name:

- the **Objects** document — the things the product stores, shows, or acts on.
- the **Steps** document — the stages / actions, in order.
- the **Relationships / Map** document — the hierarchy and how terms connect.
- the **States & Values** document — the named conditions and closed value-sets.
- the **Roles** document — the kinds of person.
- the **Decision register** — synonyms retired, terms split, and why a word was chosen.
- the **raw evidence source** — whatever folder holds the verbatim source quotes (the evidence layer).

**Which document serves which layer** (see The four reading layers above):

- Layer 1 (family): the Map / families overview.
- Layer 2 (term & kind): the Objects, Roles, Steps and States documents; the Decision register settles synonyms.
- Layer 3 (structure & movement): the Map (connections) and the Steps (flow and gates).
- Layer 4 (proof & close calls): the section deep-dives.

Use Layers 1–3 to find and match; use Layer 4 to prove and settle. The high-level layers alone are not enough — the citations and the close calls live in Layer 4.

## 5. Operating procedure (the phases)

- **Frame** — fix the definition of done: every claim cites a source; land on a real term or declare a gap.
- **Decompose** — apply the tokenization rule (§10).
- **Choose the entry point** — rank tokens by specificity; prefer a family-owned noun over a cross-cutting one; enter at the **primary object of the main verb**. Run secondary tokens (qualifiers, cross-cutting nouns) as a second pass — they catch alternate readings and cross-family seams.
- **Travel the taxonomy per token** — Glossary → Family (via root term) → Kind picks the document → match the Term.
- **Three-lens read** (§7).
- **Classify & roll up** — token results roll into one verdict via the thresholds (§8).
- **Output** — the Feature Fit view (§9).

## 6. The match ladder (strict, per token)

Try the rungs in order; stop at the first hit:

- exact term
- synonym in the decision register (points to the canonical term)
- value in a value-set
- relationship / gate
- cross-cutting object
- none → **gap**

Rule: **family narrowing is loose (topical); term matching is strict** (exact, or a decision-register synonym). That strictness is what prevents invention.

## 7. The three-lens read

- **Ontology** — does the term exist? (Objects / States / Decisions)
- **Topology** — where does it sit / how does it connect? (Map)
- **Choreography** — how does it move / what gates? (Steps)
- **Roles** — who acts? (Roles)

Rule: a "where does it sit / how does it move" question is answered by **topology + choreography**, not ontology alone.

## 8. Verdict vocabulary + thresholds

- **Fits** — every token resolves to an existing term, value, or relationship; nothing net-new.
- **Extend** — the primary object exists; only a **value, attribute, or single step** is missing.
- **New capability** — the primary object's **core relationship or step is absent** (the capability is not modelled), even if the component nouns exist.
- **Blocked** — a decision (glossary, reading, surface) must be settled before the verdict can be fixed.

## 9. Output — the "Feature Fit view"

- **Verdict-first** — the business answer on top, attribution underneath.
- **Two diagrams**:
  - **Movement** (from the Steps document) — how the feature would flow.
  - **Model** (from the Map document) — where it sits in the term graph.
  - Both coloured: green = reuse, red = new, blue = decision.
- **Tables** for Reuse and Net-new; **counts = row counts**.
- Plus: Roles, a **Steps followed** operation trace, an Evidence & traceability table, and a **Files-drawn-on** roster near the header — the **specific** files actually referenced (deployment path + the section deep-dive used), **grouped by the four reading layers** (one small table per layer), derived from the evidence citations, never a generic or wildcard list. It is the narrowed reading list for a re-read or a re-run.
- The view is written to the run's working folder, or its location is confirmed with the person — no hardcoded path.

## 10. Determinism rules (the inputs that fix the output)

- **Tokenization rule** — one token per noun phrase (things), one per verb (actions), one per qualifier / constraint (scope, time, state); drop pure connectors; test each token independently.
- **Kind decision rule** — person → Role; a thing the system stores/shows/acts on → Object; an action / stage → Step; a status or fixed value-set → State; a link between two things → Relationship / Gate. A token may be more than one Kind — test each, and give each its own row.
- **Verdict thresholds** — as in §8; the verdict follows the rule, not a feel.
- **Evidence discipline** — every claim cites a source; **no invention; a gap is a valid answer**; never borrow an analogue from another family or object to fill a gap.
- **Glossary is a variable** — if the deployment is unset, carry all and ask; never silently pick one.
- **Qualifier materiality** — a qualifier (for example "visitor" in "visitor parking") is tested as its own link, not folded into the head noun.
- **Split by Kind → new row; differ by Glossary → same row, dialect columns.**
- **Counts derive from tables** — so the claim cannot drift from the output.
- **Presentation** — uniform diagram prefixes (Kind for glossary nodes, flow role for flow-only nodes: Trigger / Actor / Decision / Outcome); colours green = reuse, red = new, blue = decision; portable pills (`terms & values` pilled, file names italic, `[Kind]` tags); one item per line (no dot- or slash-separated inline lists).
- **Surface undecidables as questions before stories.**

## 11. Worked examples (illustrations only)

- **Extend** — "show slots for the next 5 days": the whole flow is reuse; the one net-new piece is a display window that is not an existing value.
- **New capability** — "allocate visitor parking for a period": the component nouns are reused, but the capability (allocate a space to a visitor for a period) is not modelled — the core link and steps are absent.

## 12. One-page recap

- **Rule:** pick the Glossary → narrow to the Family by its root term → let the Kind pick the document → match the Term strictly → reuse with a citation, or gap.
- **Ladder:** exact → synonym → value → relationship/gate → cross-cutting → gap.
- **Verdict:** Fits / Extend / New capability / Blocked, by the §8 thresholds.
- **Guarantee:** the process, structure, vocabulary, and evidence are repeatable and auditable; judgment is narrowed to a few named points (decomposition grain, the loose family match, the reuse-vs-gap boundary). That is the honest ceiling — not "fully deterministic."

---

## 13. Blank template

Copy this skeleton and fill it; keep the section order. It is the shape every Feature Fit view takes — filling it the same way each time is what makes the output repeatable.

```markdown
# Feature fit — "<feature>"

- Date: <date>
- Glossary: <deployment, or "unset (list the options)">
- Family: <family>

> Convention:
> - `terms & values` in pills
> - *file names* in italics
> - kinds in [square brackets]

## How this was read — the four layers
| Layer | What it unravels | How it helps |
(the four-layer table, unchanged)

## Files this view drew on
### Layer 1 — Family
| File | What it gave |
### Layer 2 — Term & kind
| File | What it gave |
### Layer 3 — Structure & movement
| File | What it gave |
### Layer 4 — Proof & close calls
| File | What it gave |

## Verdict — <Fits | Extend | New capability | Blocked>
<one plain sentence>

At a glance
- Reuse: <n> elements
- Net-new: <n> elements
- Decisions that block: <n>

Reuse — already in the glossary
| Concept | Kind | <Deployment A> | <Deployment B> |

Net-new — the build
| Net-new element | Kind | Why it's new |

Decisions that block
- <one per line>

## Diagram 1 — Movement
Colours: green = reuse, red = new, blue = decision.
(mermaid: prefix each node with its Kind, or a flow role — Trigger / Actor / Decision / Outcome)

## Diagram 2 — Model
(mermaid: the term graph; a dashed edge marks the gap)

Values referenced
- <value-set> [State] values: one value per line

## Who acts (roles)
| Step | Who | Kind | Source |

## Steps followed (the operation trace)
Decomposed tokens: one per line
(per token) | Input | What you did | Processing | Output |

## Evidence & traceability
| Claim | Element | Kind | Source |
```

## 14. Golden examples

Two worked outputs — one per verdict class — to copy the shape and depth from:

- **Extend** — *feature-fit-booking-slots.md* ("show slots for the next 5 days"): the whole flow is reuse; one net-new value.
- **New capability** — *feature-fit-visitor-parking.md* ("allocate visitor parking for a period"): the nouns are reused; the capability is not modelled.
