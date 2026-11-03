# Feature to Glossary fit - the mental model

A project-agnostic method for placing a feature against an existing glossary (one produced by the OTC method) and classifying it, with every claim attributable and gaps stated honestly.

> Convention:
> - glossary terms and values are in pills; kinds are tagged in [square brackets]
> - document names are referred to by role, never by filename
> - LOB means line of business; it is the glossary's own deployment or dialect (for a two-dialect glossary, each LOB is one dialect)
> - the method names no output folder: the analysis lands beside the glossary it reads, or the location is confirmed with the person
> - companion (separate file): an adversarial verification pass, adversarial-check.md, which checks a finished analysis and does only that

---

## The four reading layers

Every glossary this method reads can be worked at four layers. Each one unravels a different thing and helps in a different way; the reading order runs top to bottom.

| Layer | What it unravels | How it helps |
|---|---|---|
| Layer 1 - Family | which part of the product a feature belongs to | narrows the search to one family, so you do not read the whole glossary |
| Layer 2 - Term and kind | the agreed word, and whether it is an object, role, step or state | gives the exact word to match, and points to the right document |
| Layer 3 - Structure and movement | how the term connects, and the step-by-step flow with its gates | shows whether the feature can reuse existing rails, and where it plugs in |
| Layer 4 - Proof and close calls | the exact quotes, the LOB differences, the reuse-vs-missing call | lets you cite every claim and settle the tricky calls honestly |

Plain rule: use Layers 1 to 3 (the high-level docs) to find and match; drop into Layer 4 (the section deep-dives) to prove and settle. The high-level layers alone are not enough: the citations and the close calls live in Layer 4.

---

## 1. Purpose and scope

- Input: any feature, requirement, or change request, stated neutrally.
- Output: the verdict (Fits, Extend, New capability, or Blocked), where the feature sits, and how it moves.
- Whether a feature is "new" is an answer the method produces, never an assumption it starts with. The pipeline runs identically whether the result is "you already have this" or "this is net-new".

## 2. When to use it

- Before stories or estimates, as a grounded triage gate against an existing glossary.
- On a single feature at a time; roll the token results up into one verdict.

## 3. The taxonomy (the map you navigate)

- Glossary (level 1): one per LOB. If the feature names no LOB, carry all and mark it an open question.
- Family (level 2, also called a section): the module group; identified by its root term.
- Kind (level 3): Object, Role, Step, or State-value.
- Term (level 4): the individual entry.
- Attaching to a term: Relationship, Gate, Value, Decision.
- Cross-cutting objects: terms owned by no single family; check this list before declaring a gap.

How the LOBs are determined: the feature-fit method does not decide them, it reads them. The LOBs were fixed when the glossary was built, from its sources, and they show up as the LOB folders under the glossary (or in the project manifest). One LOB means there is no LOB level at all. If the LOB is unset for a feature, carry all and ask.

## 4. The documents (by role, name-agnostic)

Filenames vary by project and skill version. Match each document by its job, not its name:

- the Objects document: the things the product stores, shows, or acts on.
- the Steps document: the stages and actions, in order.
- the Relationships or Map document: the hierarchy and how terms connect.
- the States and Values document: the named conditions and closed value-sets.
- the Roles document: the kinds of person.
- the Decision register: synonyms retired, terms split, and why a word was chosen.
- the reconciliation document: the joined view that stitches the sections and the LOBs into one coherent model and records the resolved conflicts (synonyms, one-word-two-meanings, part-vs-whole, and the cross-LOB drift). This is where "same concept across LOBs" is settled, so it carries the cross-LOB notes a feature-fit call needs.
- the raw evidence source: whatever folder holds the verbatim source quotes (the evidence layer, the section deep-dives). In a glossary built by the OTC harvest skill this is `deep-dives/`, beside the glossary files: one folder per section, each with its draft and a decisions file that maps the source's words to the glossary's words.

Which document serves which layer (see The four reading layers above):

- Layer 1 (family): the Map or families overview.
- Layer 2 (term and kind): the Objects, Roles, Steps and States documents; the Decision register settles synonyms.
- Layer 3 (structure and movement): the Map (connections) and the Steps (flow and gates).
- Layer 4 (proof and close calls): the section deep-dives, and the reconciliation document for cross-LOB calls.

Use Layers 1 to 3 to find and match; use Layer 4 to prove and settle.

## 5. Operating procedure (the steps)

- Step 1 (prerequisite and location): confirm a glossary exists. Resolve where the glossary is (the input) and where the analysis will be written (the output). If no glossary is present, stop and ask for it; a feature-fit cannot run without one. If the output location is unclear, default to a feature-fit folder beside the glossary, and ask if that is wrong.
- Step 2 (frame): fix the definition of done: every claim cites a source; land on a real term or declare a gap.
- Step 3 (decompose): apply the tokenization rule (section 10).
- Step 4 (choose the entry point): rank tokens by specificity; prefer a family-owned noun over a cross-cutting one; enter at the primary object of the main verb. Run secondary tokens (qualifiers, cross-cutting nouns) as a second pass; they catch alternate readings and cross-family seams.
- Step 5 (travel the taxonomy per token): Glossary -> Family (via root term) -> Kind (which picks the document) -> Term.
- Step 6 (three-lens read): section 7.
- Step 7 (classify and roll up): token results roll into one verdict via the thresholds (section 8).
- Step 8 (output): the Feature Fit view (section 9).

## 6. The match ladder (strict, per token)

Try the rungs in order; stop at the first hit:

- exact term
- synonym in the decision register (points to the canonical term)
- value in a value-set
- relationship or gate
- cross-cutting object
- none: a gap

Rule: family narrowing is loose (topical); term matching is strict (exact, or a decision-register synonym). That strictness is what prevents invention.

## 7. The three-lens read

- Ontology: does the term exist? (Objects, States, Decisions)
- Topology: where does it sit, and how does it connect? (Map)
- Choreography: how does it move, and what gates? (Steps)
- Roles: who acts? (Roles)

Rule: a "where does it sit, how does it move" question is answered by topology and choreography, not ontology alone.

## 8. Verdict vocabulary and thresholds

- Fits: every token resolves to an existing term, value, or relationship; nothing net-new.
- Extend: the primary object exists; only a value, attribute, or single step is missing.
- New capability: the primary object's core relationship or step is absent (the capability is not modelled), even if the component nouns exist.
- Blocked: a decision (LOB, reading, surface) must be settled before the verdict can be fixed.

## 9. Output (the Feature Fit view)

- Verdict-first: the business answer on top, attribution underneath.
- Two diagrams:
  - Movement (from the Steps document): how the feature would flow.
  - Model (from the Map document): where it sits in the term graph.
  - Both coloured: green for reuse, red for new, blue for a decision.
- Tables for Reuse and Net-new; counts equal the row counts.
- Plus: Roles, a Steps-followed operation trace, an Evidence and traceability table, and a Files-drawn-on roster near the header, grouped by the four reading layers (one small table per layer), listing only the specific files actually referenced.
- Where it lands: the analysis is written beside the glossary (a feature-fit folder in the project), or where the person specified. No path is hardcoded here.

## 10. Determinism rules (the inputs that fix the output)

- Tokenization rule: one token per noun phrase (things), one per verb (actions), one per qualifier or constraint (scope, time, state); drop pure connectors; test each token independently.
- Kind decision rule: person is a Role; a thing the system stores, shows, or acts on is an Object; an action or stage is a Step; a status or fixed value-set is a State; a link between two things is a Relationship or Gate. A token may be more than one Kind: test each, and give each its own row.
- Verdict thresholds: as in section 8; the verdict follows the rule, not a feel.
- Evidence discipline: every claim cites a source; no invention; a gap is a valid answer; never borrow an analogue from another family or object to fill a gap.
- LOB is a variable: if the LOB is unset, carry all and ask; never silently pick one.
- Qualifier materiality: a qualifier (for example "visitor" in "visitor parking") is tested as its own link, not folded into the head noun.
- Split by Kind means a new row; differ by LOB means the same row with LOB columns.
- Counts derive from tables, so the claim cannot drift from the output.
- Presentation: uniform diagram prefixes (Kind for glossary nodes, flow role for flow-only nodes: Trigger, Actor, Decision, Outcome); colours green for reuse, red for new, blue for a decision; portable pills (terms and values pilled, file names italic, Kind tags in square brackets); one item per line where a real list belongs.
- Surface undecidables as questions before stories.

## 11. Worked examples (illustrations only)

- Extend: "show slots for the next 5 days". The whole flow is reuse; the one net-new piece is a display window that is not an existing value.
- New capability: "allocate visitor parking for a period". The component nouns are reused, but the capability (allocate a space to a visitor for a period) is not modelled; the core link and steps are absent.

## 12. One-page recap

- Rule: pick the Glossary, narrow to the Family by its root term, let the Kind pick the document, match the Term strictly, then reuse with a citation or declare a gap.
- Ladder: exact, then synonym, then value, then relationship or gate, then cross-cutting, then gap.
- Verdict: Fits, Extend, New capability, or Blocked, by the section 8 thresholds.
- Guarantee: the process, structure, vocabulary, and evidence are repeatable and auditable; judgment is narrowed to a few named points (decomposition grain, the loose family match, the reuse-vs-gap boundary). That is the honest ceiling, not "fully deterministic".

## 13. Blank template

Copy this skeleton and fill it; keep the section order. It is the shape every Feature Fit view takes, and filling it the same way each time is what makes the output repeatable.

```markdown
# Feature fit - "<feature>"

- Date: <date>
- Glossary: <LOB, or "unset (list the LOBs)">
- Family: <family>

> Convention:
> - terms and values in pills
> - file names in italics
> - kinds in [square brackets]

## How this was read - the four layers
| Layer | What it unravels | How it helps |
(the four-layer table, unchanged)

## Files this view drew on
### Layer 1 - Family
| File | What it gave |
### Layer 2 - Term and kind
| File | What it gave |
### Layer 3 - Structure and movement
| File | What it gave |
### Layer 4 - Proof and close calls
| File | What it gave |

## Verdict - <Fits | Extend | New capability | Blocked>
<one plain sentence>

At a glance
- Reuse: <n> elements
- Net-new: <n> elements
- Decisions that block: <n>

Reuse - already in the glossary
| Concept | Kind | <LOB A> | <LOB B> |

Net-new - the build
| Net-new element | Kind | Why it is new |

Decisions that block
- <one per line>

## Diagram 1 - Movement
Colours: green for reuse, red for new, blue for a decision.
(mermaid: prefix each node with its Kind, or a flow role: Trigger, Actor, Decision, Outcome)

## Diagram 2 - Model
(mermaid: the term graph; a dashed edge marks the gap)

Values referenced
- <value-set> [State] values: one value per line

## Who acts (roles)
| Step | Who | Kind | Source |

## Steps followed (the operation trace)
Decomposed tokens: one per line
(per token) | Input | What you did | Processing | Output |

## Evidence and traceability
| Claim | Element | Kind | Source |
```

## 14. Golden examples

Two worked outputs, one per verdict class, for a sample product called Acme, to copy the shape and depth from:

- Extend: examples/feature-fit-acme-booking.md ("show slots for the next 5 days"). The whole flow is reuse; one net-new value.
- New capability: examples/feature-fit-acme-parking.md ("allocate visitor parking for a period"). The nouns are reused; the capability is not modelled.
