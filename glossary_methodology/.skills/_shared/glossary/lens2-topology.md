# Topology — find where each thing sits

> **What this is** — the second OTC lens. It takes the things Ontology found and **decomposes the section into a tree** — placing each thing under the thing it belongs to: what contains what, what is a kind of what, what reveals what.
> **What it is not** — it does not find new things (`lens1-ontology.md`), track how they move (`lens3-choreography.md`), or judge them (`otc-run-rules.md`). It adds no terms; it only connects the ones already found.
> **Related docs**
>
> - `otc-methodology.md` (how the OTC lenses connect)
> - `lens1-ontology.md`
> - `lens3-choreography.md`
> - `otc-run-rules.md`
>
> **Next step** — its tree becomes the nesting in the picture and the "Part of" line in each glossary entry.

## The mental model

Topology answers one question for every thing: **what does it sit under?** The result is a hierarchy — a tree. Each link is a parent–child step: the child `contains`-into, is a `kind of`, or is `reveal`ed by its parent. Read the whole set of links together and you have the section decomposed into its structure. That tree is the entire output of this OTC lens.

## Topology at a glance

```mermaid
flowchart TD
    UP["From Ontology: the things"] -->|pair them| PAIR["Two things in one sentence"]
    PAIR --> PH{"A structural phrase? contains / kind of / reveals"}
    PH -- yes --> REC["Record parent and child"]
    PH -- no --> NONE["No link"]
    REC --> TREE["The tree"]
    TREE -->|the tree| DOWN["To Choreography"]
```

This blows out the second OTC lens: it begins with Ontology's flat list of things, arranges them into a tree, and hands that tree to Choreography.

## Input

- **Ontology's term table** for the section — the things to connect.
- **The section text** — to read the phrases between them.

## Procedure — do in order

1. **Pair up** the things that appear in the same sentence.
2. **Look** for a structural give-away phrase between them.
3. **Classify** it as `contains`, `kind of`, or `reveals`, and decide which thing is the **parent** and which the **child**.
4. **Record** the link — `parent → child` — with the exact phrase as evidence.
5. **Stop** if there is no phrase. No phrase, no link — Topology never infers structure the text does not state.

## The three structural relationships

| Relationship | Parent is... | Child is... | Give-away phrases |
|---|---|---|---|
| **contains** | the whole | a part of it | "is made up of", "holds", "consists of", "carries", "its a, b and c" |
| **kind of** | the category | a member of it | "is one of", "such as", "a X — a, b, or c" |
| **reveals** | the thing that opens | what it shows on demand | "opens to its", "shows its", "expands to" |

`reveals` differs from `contains` (composition vs showing an existing part), and both differ from Choreography's `locks / unlocks` (whether something *can happen*), which is not this OTC lens.

## Rules this OTC lens enforces (inline)

- Record a link only where a give-away phrase exists — no phrase, no link.
- Set the direction: the parent is the whole / category / opener; the child is the part / member / revealed thing.
- Add no new terms — only connect the things Ontology found.

## Output — the levels, the kinds, and every relationship

Topology's output goes into part 2 of the section draft, "How they fit together", filled from `templates/section-glossary.md`. It shows the section's structure as [G5](glossary-assembly-principles.md#g5) sets out:

- **The tree (text tree)** - the section's terms, names only, each under its nearest parent, as deep as it goes. The reader's quick view.
- **The level table (levels)** - the same rows, line for line, with each term's level in its own column (L1, L2, and so on) and its relationship to the term above in plain words.
- **Terms that also belong elsewhere (lookup)** - every other parent a term has, with the fixed takeaways; a "kind of" relationship places a term only when it has no "part of" parent.
- **Every relationship, as a table (verbatim)** - the columns of that table in part 2 of `templates/section-glossary.md`, copied exactly; the Evidence cell is the exact quote from the source and where it is. Rows are grouped by parent. The source of truth, including second parents and shortcuts the level table does not draw.

**How to read this table (reading key):** the **parent** is the whole, the category, or the thing that opens; the **child** is the part, the member, or what is shown. The "reads as" cell says the relationship in a plain sentence, from the fixed patterns in G5: for example, `contains` reads "Each <child> is part of a <parent>."

**Casing.** Terms in the tree, the level table, the lookup, and the verbatim table are written in sentence case per G6 in `glossary-assembly-principles.md`, so they look exactly as they will in the glossary; relationship words stay lower case; the Evidence cell keeps the source's own casing.

## Worked example — from the real requirements

Continuing the shared slice. **From Ontology** we already have the things — *quick scan, deep read, source, result, as-is, domain, journey, module, finding, evidence*. Topology now places them under one another, as part 2 of the section draft shows them.

> "Deep analysis ... presents its result. The result presents the as-is organised by business domain; each domain opens to its journeys and its modules. Every finding — a domain fact, a coupling, a gap — can be opened to the evidence."

**The tree (text tree)**

```
Result
├── Domain
│   ├── Journeys
│   └── Modules
└── Finding
    ├── Domain fact
    ├── Coupling
    └── Gap
```

**The picture (diagram)** - a dotted line is "kind of".

```mermaid
flowchart TD
    result["Result"] -->|contains| domain["Domain"]
    result -->|contains| finding["Finding"]
    domain -->|reveals| journeys["Journeys"]
    domain -->|reveals| modules["Modules"]
    finding -.->|kind of| df["Domain fact"]
    finding -.->|kind of| cpl["Coupling"]
    finding -.->|kind of| gp["Gap"]
```

**The level table (levels)**

| L1 | L2 | L3 | Relationship to the term above | Kind |
|---|---|---|---|---|
| Result | | | - | thing |
| | Domain | | part of a result | thing |
| | | Journeys | shown when a domain is opened | thing |
| | | Modules | shown when a domain is opened | thing |
| | Finding | | part of a result | thing |
| | | Domain fact | a kind of finding | thing |
| | | Coupling | a kind of finding | thing |
| | | Gap | a kind of finding | thing |

No term here has a second parent, so there is no lookup table.

**Every relationship, as a table (verbatim)**

| Parent | Relationship | Child | Reads as | Evidence |
|---|---|---|---|---|
| Result | contains | Domain | Each domain is part of a result. | "The result presents the as-is organised by business domain" |
| Result | contains | Finding | Each finding is part of a result. | "Every finding ..." |
| Domain | reveals | Journeys | Opening a domain shows its journeys. | "each domain opens to its journeys and its modules" |
| Domain | reveals | Modules | Opening a domain shows its modules. | "each domain opens to its journeys and its modules" |
| Finding | kind of | Domain fact | A domain fact is one kind of finding. | "Every finding — a domain fact, a coupling, a gap" |
| Finding | kind of | Coupling | A coupling is one kind of finding. | "Every finding — a domain fact, a coupling, a gap" |
| Finding | kind of | Gap | A gap is one kind of finding. | "Every finding — a domain fact, a coupling, a gap" |

## Relationships across features and modules

Structure is not confined to one feature. `result contains finding` links two different features of the Analysis module; a link from `finding` to `Evidence` would reach into the Evidence module. Topology records both the same way — a give-away phrase in one sentence — and the **shared glossary** is what lets it recognise a term that first appeared in another feature or module.

Which feature or module each term belongs to is **not repeated in every row** — that would clutter the tree. It is recorded once, in the term's glossary entry (its `Source`), and the cross-links are joined into one whole when the per-section pictures are assembled in `otc-methodology.md`. Topology never invents a cross-link; it only records one the text states.

## Hand-off

The tree is handed to **Choreography**, which animates it. Its shape carries through to the picture — `contains` and `kind of` become the nesting, `reveals` an arrow — and each thing's parent becomes the **Part of** line in its glossary entry. The entry shape lives in `output-formats.md`.
