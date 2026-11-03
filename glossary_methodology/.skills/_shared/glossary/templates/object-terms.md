<!-- Assembled per glossary-assembly-principles.md - Part B: object-terms. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
# Objects

<One short paragraph: the things <product> stores, shows, or acts on - all <n> of them, in <k> families, each under the thing it sits under in the hierarchy. How the families connect is in terms-and-relationships.md.>

## How to read this document

<The G4 fixed block: term, kind, family (with the family decision link), L1 and so on.>

**The columns used on this page:**
- **Term** - the one agreed word for the thing.
- **What it is** - the definition: what kind of thing it is, and what sets it apart.
- **Relationship to the term above** - in plain words: part of, a kind of, shown when opened, or created by - with the term above as a link.
- **Source** - where the sources define it: the section, as a link to its evidence in `deep-dives/`, and the item id the source uses.
- **Decision** - a link to the decision that settled the word, if it was contested; otherwise `-`.

**The columns of Terms replaced or retired over time:**
- **Earlier term** - a word the glossary no longer uses.
- **What happened** - one of:
  - renamed
  - merged
  - split
  - retired
- **Use now** - the current term to use instead, as a link to its definition; `-` when the word was retired with nothing in its place.
- **Decision** - a link to the decision that replaced or retired it.
- **Date** - the date of that decision.

## Families at a glance (index)

**What you're reading.** <...>
**Why it matters.** <...>
**What to do with it.** <...>
**What it affects.** <...>

| Family | What it covers | L1 terms (origin) | Source |
|---|---|---|---|
| [<Family>](#<family-anchor>) | <what it covers> | <[term](terms-and-relationships.md#row-anchor), one per line, or -> | <source, one per line> |

---

## <Family>

**What you're reading.** <...>
**Why it matters.** <...>
**What to do with it.** <...>
**What it affects.** <...>

**The tree (text tree).** <One line.>

```
<Term> (from <family>)
└── <Term>
```

**The picture (diagram).** <One line.>

```mermaid
flowchart TD
    <the family view of terms-and-relationships.md, drawn the same way>
```

### Starting points (family roots)

<One line: this family's things with no parent in the family.>

| Term | What it is | Relationship to the term above | Source | Decision |
|---|---|---|---|---|
| <a id="<term-anchor>"></a><Term> | <definition> | <part of a [term](#anchor), in <family>, or -> | <source> | <decision or -> |

### <Parent>

<The parent's definition - or its kind or family, with a link to where it is defined.>

| Term | What it is | Relationship to the term above | Source | Decision |
|---|---|---|---|---|
| <a id="<term-anchor>"></a><Child> | <definition> | <part of a [parent](#anchor)> | <source> | <decision or -> |

<repeat one group per parent, in tree order>

**Also belongs elsewhere (lookup).** <One line.>

- [<Term>](terms-and-relationships.md#<row-anchor>)

### Not placed in the hierarchy (not placed)

<One line.>

| Term | What it is | Where else it appears | Source | Decision |
|---|---|---|---|---|
| <a id="<term-anchor>"></a><Term> | <definition> | <in the flow: see step-terms.md, or nowhere else ...> | <source> | <decision or -> |

<repeat one section per family, in family order>

---

## Terms replaced or retired over time

**What you're reading.** <...>
**Why it matters.** <...>
**What to do with it.** <...>
**What it affects.** <...>

| Earlier term | What happened | Use now | Decision | Date |
|---|---|---|---|---|
| <Earlier word> | <renamed / merged / split / retired> | <[Term](#term-anchor), one per line, or -> | [D-n](decision-register.md#d-n) | <date> |

<!-- Order per G8 rule 6: rows that point to the same current term sit together, the groups in the order those terms appear above, the latest change first; rows with - in Use now come last, latest first. With no rows, the table is replaced by one line: None yet. -->

---

## Related pages

| Page | Why it relates |
|---|---|
| [terms-and-relationships.md](terms-and-relationships.md) | where every thing sits in the whole product, level by level |
| [states-and-values.md](states-and-values.md) | the conditions these things can be in |
| [step-terms.md](step-terms.md) | the stages of work that create and use them |
