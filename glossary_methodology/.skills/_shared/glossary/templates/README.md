<!-- Assembled per glossary-assembly-principles.md - Part B: README. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
# Glossary - <product>

**Last updated:** <date>

<One short paragraph: what this glossary is, who it serves, and what a reader can look up.>

## What this glossary contains (fixed block)

**Term** - a word or phrase that has one agreed meaning in <product>. It is in the glossary because it passed three tests: its meaning here differs from everyday use, misreading it would change what is built or tested, and it is used in more than one part of the product.

**Kind** - every term is exactly one of four kinds:

| Kind | What it is | Defined in |
|---|---|---|
| object | a thing the product stores, shows, or acts on | [object-terms.md](object-terms.md) |
| role | a kind of person | [role-terms.md](role-terms.md) |
| step | a stage of the work | [step-terms.md](step-terms.md) |
| state or value | a condition a thing can be in, or one member of a closed set | [states-and-values.md](states-and-values.md) |

**Family** - a part of the product, taken from the source's own top-level structure. A family says where a term comes from in the sources; it is not a relationship between terms. Every term belongs to one family. How the families were chosen: [D-n](decision-register.md#d-n).

**L1, L2 and so on** - the levels of the hierarchy. L1 is the top; a term at L2 sits under the L1 term above it, and so on down.

## Sources

**What you're reading.** The documents this glossary was built from, and what each one contributed.
**Why it matters.** Every term and definition in the glossary comes from these documents and nowhere else.
**What to do with it.** If a definition seems wrong, check it against the document named in that term's source.
**What it affects.** When one of these documents changes, the glossary must be re-run so it does not drift from it.

| Document | What it provides |
|---|---|
| `<source-doc>` | <what it provides, one per line> |

This glossary is derived from these documents and must not contradict them.

## Documents and reading order

**What you're reading.** Every page of the glossary, in the order that makes most sense to read them, with what each is for.
**Why it matters.** Each page answers one kind of question; this table tells you which page to open for yours.
**What to do with it.** Start with terms and their relationships to see the whole shape, then open the page that matches what you need to look up.
**What it affects.** Nothing - this is a guide to the other pages.

| # | Document | Read it for | Terms |
|---|---|---|---|
| 1 | [terms-and-relationships.md](terms-and-relationships.md) | terms and their relationships: what sits under what, level by level and family by family | - |
| 2 | [object-terms.md](object-terms.md) | the things the product stores, shows, or acts on | [<n>](object-terms.md) |
| 3 | [step-terms.md](step-terms.md) | the stages of the work, in order | [<n>](step-terms.md) |
| 4 | [role-terms.md](role-terms.md) | the kinds of person | [<n>](role-terms.md) |
| 5 | [states-and-values.md](states-and-values.md) | the named conditions and the sets of values | [<n>](states-and-values.md) |
| 6 | [decision-register.md](decision-register.md) | why a contested word was chosen | [<n>](decision-register.md) |
| 7 | [deep-dives/](deep-dives/) | how each term was reached: the source quotes behind every entry and how each decision was taken | - |
