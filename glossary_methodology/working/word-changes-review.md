# Word changes - review before they are applied

Every change below is made on a copy of the method. The method itself is unchanged until you approve. Each block shows the line as it is today (red, `-`) and as it would become (green, `+`).

## Added since your last look

You approved these; they are in the changes below.

| What | Where |
|---|---|
| The list binds columns: a column named in a list's "Used in" line holds only that list's values, and every list names its exact column | `method-words.md`, rule 5 and part 8 |
| Every skill or prompt, now or added later, names the list among what it reads and uses only its words | `method-words.md`, rule 6; `skill-orchestration.md`; `glossary-methodology-prompts/README.md`; both prompts |
| Every word in a template comes from the list; a template changes only together with it | `glossary-assembly-principles.md`, "How templates use this doc", rule 4; `method-words.md`, rule 7; the first line of all 13 templates |
| The end-of-run sweep runs two more checks: no retired word, and only list values in list columns | `glossary-assembly-principles.md`, G6 |
| The lean overview: what the method does and how its parts fit; no skill or agent acts on it, and it restates no rule | `glossary-design.md`, rewritten (shown in full below as one change) |
| The feature-fit prompt uses the list's words: flow relationship (not gate), borderline judgement (not call), the glossary's organisation without levels, "by what each page is for" (not by role) | `glossary-methodology-prompts/feature-journey-analysis.md` |

## What I settled while doing it

Each is decided the same way in every file; say if you want any of them different.

| Found | Settled as | Why |
|---|---|---|
| "whole-picture rules" | "the rules applied over the assembly draft" | "picture" now means a diagram only |
| "gate" in Choreography, meaning a lock between states | "flow relationship" | "gate" now only means a point where a person decides |
| "link", meaning a relationship | "relationship" | "link" now only means a hyperlink |
| "file", meaning a glossary page | "page"; a method file is a "doc" | "file" now only names something on disk |
| "action", meaning what disposition decides | "next best action" | "action" stays free for "Actions that happen throughout" on the step page; the list gains a row "Supporting action" |
| "item", meaning a gate row | "gate row" | one word for one meaning |
| The level table's column in the section draft and assembly draft | "Relationship to the candidate above" | before Gate 1 there are only candidates |
| The gate log's Change part listed rename, redefine, split, withdraw | merge added | merge is on the Change list |
| "produces" reads "A <parent> creates a <child>" on the terms and relationships page | kept, with one line in the list saying why | that page names every relationship's two ends parent and child |
| The README's fixed block | now 9 words plus the four kinds, copied word for word from the list | a reader needs these words to understand what a term is |


## Files and how much changes

| File | Lines changed |
|---|---|
| .skills/_shared/glossary/glossary-assembly-principles.md | 130 lines |
| .skills/_shared/glossary/lens1-ontology.md | 72 lines |
| .skills/_shared/glossary/lens2-topology.md | 41 lines |
| .skills/_shared/glossary/lens3-choreography.md | 34 lines |
| .skills/_shared/glossary/method-words.md | new file, 292 lines |
| .skills/_shared/glossary/otc-methodology.md | 41 lines |
| .skills/_shared/glossary/otc-run-rules.md | 29 lines |
| .skills/_shared/glossary/output-formats.md | 70 lines |
| .skills/_shared/glossary/sweep-builder-brief.md | 15 lines |
| .skills/_shared/glossary/sweep-reader-brief.md | 15 lines |
| .skills/_shared/glossary/templates/README.md | 34 lines |
| .skills/_shared/glossary/templates/change-ripple.md | 1 lines |
| .skills/_shared/glossary/templates/check-findings.md | 4 lines |
| .skills/_shared/glossary/templates/decision-register.md | 7 lines |
| .skills/_shared/glossary/templates/gate-log.md | 30 lines |
| .skills/_shared/glossary/templates/glossary-assembly-draft.md | 24 lines |
| .skills/_shared/glossary/templates/object-terms.md | 15 lines |
| .skills/_shared/glossary/templates/role-terms.md | 15 lines |
| .skills/_shared/glossary/templates/section-decisions.md | 13 lines |
| .skills/_shared/glossary/templates/section-glossary.md | 31 lines |
| .skills/_shared/glossary/templates/states-and-values.md | 13 lines |
| .skills/_shared/glossary/templates/step-terms.md | 11 lines |
| .skills/_shared/glossary/templates/terms-and-relationships.md | 25 lines |
| .skills/check/SKILL.md | 7 lines |
| .skills/disposition/SKILL.md | 13 lines |
| .skills/harvest/SKILL.md | 15 lines |
| glossary-design.md | 55 lines |
| glossary-methodology-prompts/README.md | 4 lines |
| glossary-methodology-prompts/adversarial-check.md | 4 lines |
| glossary-methodology-prompts/feature-journey-analysis.md | 53 lines |
| skill-orchestration.md | 18 lines |

## Searches after the change

Each of these is a word the list stops using. The count is how many are left across every method file, the list itself excluded.

| Word searched for | Left |
|---|---|
| thing / things (whole word) | 0 |
| candidate term | 0 |
| same-thing test | 0 |
| conflict kind | 0 |
| kind document | 0 |
| re-scan | 0 |
| How to read this document | 0 |
| state / value, States & values | 0 |
| legend | 0 |
| gate item | 0 |
| checkpoint | 0 |
| your call | 0 |
| OTC lens | 0 |
| a kind of person | 0 |
| joined / assembled picture | 0 |
| left out / set aside / rejected | 0 |
| whole-picture | 0 |
| seven files / seven glossary files | 0 |
| decision-items | 0 |

## Every change, file by file

### .skills/_shared/glossary/glossary-assembly-principles.md

The fixed block in G4 now copies method-words.md. README Part B gains the 'How this glossary was built' paragraph and the Source and Page columns. G6's sweep also searches for the bold Don't-use words. Pages, candidates, object, conflict types, G8's 'Earlier word' and 'withdrawn'.

81 places changed.

Line 5

```diff
-**Assembly is the last stage of building a glossary.** The OTC lenses find the terms and how they connect; the judgments settle which word wins and what each term means. Assembly is what happens next: it writes those settled terms into the reader-facing documents in `Output/glossary/`.
+**Assembly is the last stage of building a glossary.** The lenses find the candidates and how they connect; the judgments settle which word wins and what each term means. Assembly is what happens next: it writes those settled terms into the reader-facing pages in `Output/glossary/`.
```

Line 7

```diff
-This file exists so that assembly is **deterministic** - the same settled terms always produce the same documents, laid out the same way, with the same columns, groupings, diagrams, and links. Nothing here is left to the writer's taste on the day.
+This doc exists so that assembly is **deterministic** - the same settled terms always produce the same pages, laid out the same way, with the same columns, groupings, diagrams, and links. Nothing here is left to the writer's taste on the day.
```

Line 11

```diff
-- **Part A - Ground rules.** Cross-cutting rules that hold for *every* document in the deliverable.
-- **Part B - Doc-specific rules.** One section per output document, stating what only that document does, and naming which ground rules it applies.
+- **Part A - Ground rules.** Cross-cutting rules that hold for *every* page in the deliverable.
+- **Part B - Page-specific rules.** One part per page, stating what only that page does, and naming which ground rules it applies.
```

Line 14

```diff
-Every output document, and every blank template in `templates/`, is built by applying Part A and then that document's Part B section. A template's first line names its Part B section so the source of truth is never in doubt.
+Every page, and every blank template in `templates/`, is built by applying Part A and then that page's Part B rules. A template's first line names its Part B rules so the source of truth is never in doubt.
```

Line 25

```diff
-**Statement.** The glossary is split first into four **kind** documents, because every term is exactly one kind:
+**Statement.** The glossary is split first into four **kind** pages, because every term is exactly one kind:
```

Line 31

```diff
-Inside a kind document, terms are clustered into a small, named set of **families** taken from the source's own top-level groups. Each family is a top-level section of the document.
+Inside a kind page, terms are clustered into a small, named set of **families** taken from the source's own top-level groups. Each family is a top-level part of the page.
```

Line 33

```diff
-**Why.** Kind answers "what sort of thing is this"; family answers "which part of the product does it belong to". Two coarse cuts let a reader reach any term in two decisions, without scanning a long list.
+**Why.** Kind answers "what is this"; family answers "which part of the product does it belong to". Two coarse cuts let a reader reach any term in two decisions, without scanning a long list.
```

Line 36

```diff
-1. Take each term's kind straight from the harvest (object, role, step, or state).
+1. Take each term's kind straight from the harvest (object, role, step, or state or value).
```

Line 38

```diff
-3. Order families in the order they appear in the source. Name every family in sentence case (see [G6](#g6)). The family taxonomy is **shared across all four kind documents** - the same families, in the same order - so a reader learns it once and meets it everywhere.
+3. Order families in the order they appear in the source. Name every family in sentence case (see [G6](#g6)). The family taxonomy is **shared across all four kind pages** - the same families, in the same order - so a reader learns it once and meets it everywhere.
```

Line 41

```diff
-**Deterministic output.** Kind is read from the harvest and family from the Gate 1 decision, never chosen while writing. The number of families, their names, and their order are fixed by the source, so two runs produce the same sections in the same order.
+**Deterministic output.** Kind is read from the harvest and family from the Gate 1 decision, never chosen while writing. The number of families, their names, and their order are fixed by the source, so two runs produce the same parts in the same order.
```

Line 46

```diff
-**Statement.** In a kind document grouped by family, terms are shown family by family and, inside a family, under the parent they sit under in the hierarchy - the same placement as [G5](#g5) rule 1, so a term sits in the same place on every page. A term appears once. Where it also belongs elsewhere, the page points to its row in the lookup in `terms-and-relationships.md` rather than repeating it.
+**Statement.** In a kind page grouped by family, terms are shown family by family and, inside a family, under the parent they sit under in the hierarchy - the same placement as [G5](#g5) rule 1, so a term sits in the same place on every page. A term appears once. Where it also belongs elsewhere, the page points to its row in the lookup in `terms-and-relationships.md` rather than repeating it.
```

Line 62

```diff
-**Statement.** Every term is one table row. The **common columns sit in fixed slots**: `Term` and `What it is` always first, and `Source` and `Decision` always last. Between them, each kind inserts its **relational columns**, defined in that kind's Part B section. Column order is fixed and no cell is ever blank - absence is written `-`.
+**Statement.** Every term is one table row. The **common columns sit in fixed slots**: `Term` and `What it is` always first, and `Source` and `Decision` always last. Between them, each kind inserts its **relational columns**, defined in that kind's Part B rules. Column order is fixed and no cell is ever blank - absence is written `-`.
```

Line 72

```diff
-2. Insert the kind's relational column(s) between `What it is` and `Source`, exactly as its Part B section specifies.
+2. Insert the kind's relational column(s) between `What it is` and `Source`, exactly as its Part B rules specify.
```

Line 81

```diff
-**Statement.** The reader is assumed to know nothing about the method. So every document - the seven glossary files and every file under `deep-dives/` - opens with a **description** and a **How to read this document** section that starts with a **fixed block** printed the same way in every glossary file; a file under `deep-dives/` does not repeat the block but opens its How to read with one line  ...
+**Statement.** The reader is assumed to know nothing about the method. So every page - the seven glossary pages and every page under `deep-dives/` - opens with a **description** and a **How to read this page** part that starts with a **fixed block** printed the same way in every glossary page; a page under `deep-dives/` does not repeat the block but opens its How to read with one line linking to  ...
```

Line 83

```diff
-**Why.** A one-line label such as "Verbatim (complete)" tells a reader nothing: not what they are looking at, why it is there, or what to do with it. A reader taking a decision needs that answered on the spot, without opening another file - and needs the basic words, such as "term", to mean the same thing in every file.
+**Why.** A one-line label such as "Verbatim (complete)" tells a reader nothing: not what they are looking at, why it is there, or what to do with it. A reader taking a decision needs that answered on the spot, without opening another file - and needs the basic words, such as "term", to mean the same on every page.
```

Line 86

```diff
-1. **Description.** The first paragraph under the title says what the document is, who it is for, and what it holds.
-2. **How to read this document.** Next, under that heading, in this order:
-   - **The fixed block** - printed verbatim, with only `<product>` filled in. Its source of truth is "Words this methodology uses" in `otc-methodology.md`; this is the reader's wording of it:
+1. **Description.** The first paragraph under the title says what the page is, who it is for, and what it holds.
+2. **How to read this page.** Next, under that heading, in this order:
+   - **The fixed block** - printed verbatim; the only part filled in per run is the family decision link. It copies its rows from `method-words.md` exactly, and is never reworded:
```

Line 90

```diff
-     > **Term** - a word or phrase that has one agreed meaning in <product>. It is in the glossary because it passed three tests: its meaning here differs from everyday use, misreading it would change what is built or tested, and it is used in more than one part of the product.
+     > These words mean the same on every page. They are copied from the method's word list, `method-words.md`.
```

Line 92

```diff
-     > **Kind** - every term is exactly one of four kinds:
+     > | Word | Means |
+     > |---|---|
+     > | Source | A document the glossary is built from. It is read, never changed. |
+     > | Section | One part of a source, read on its own, taken from the source's own headings, in source order, and fixed before reading starts. Not the same as a family: a section is how we read. |
+     > | Candidate | A word Ontology keeps for judging. It is not yet a term. |
+     > | The three tests | The tests a candidate must all pass to become a term:<br>• special meaning<br>• consequence<br>• reach |
+     > | Term | A candidate that passed the three tests and Gate 1. Gate 2 then agrees its definition. |
+     > | Kind | Which of the four kinds a term is. Not the same as the relationship word "kind of". |
+     > | Family | A group of terms the glossary's pages are arranged by, decided at Gate 1, usually from the source's top-level groups. Not the same as a section: a family is how a reader browses. |
+     > | Gate | A point where a person decides. The run stops until every gate row is resolved. |
+     > | Level | How far down the hierarchy a term sits, written L1, L2 and so on. L1 is the top. |
```

Line 94

```diff
-     > | Kind | What it is | Defined in |
-     > |---|---|---|
-     > | object | a thing the product stores, shows, or acts on | object-terms.md |
-     > | role | a kind of person | role-terms.md |
-     > | step | a stage of the work | step-terms.md |
-     > | state or value | a condition a thing can be in, or one member of a closed set | states-and-values.md |
+     > **The four kinds:**
```

Line 101

```diff
-     > **Family** - a part of the product, taken from the source's own top-level structure. A family says where a term comes from in the sources; it is not a relationship between terms. Every term belongs to one family. How the families were chosen: [D-n](decision-register.md#d-n).
+     > | Kind | Means | Defined in |
+     > |---|---|---|
+     > | object | something the product stores, shows, or acts on | [object-terms.md](object-terms.md) |
+     > | role | a person the product serves, records, or gives access to | [role-terms.md](role-terms.md) |
+     > | step | a named stage of the work | [step-terms.md](step-terms.md) |
+     > | state or value | a condition a term can be in, or one member of a closed set | [states-and-values.md](states-and-values.md) |
```

Line 103

```diff
-     > **L1, L2 and so on** - the levels of the hierarchy. L1 is the top; a term at L2 sits under the L1 term above it, and so on down.
+     > How the families were chosen: [D-n](decision-register.md#d-n).
```

Line 105

```diff
-   - **The columns** this document uses, one bullet each, in plain words.
-   - **The relationship words** this document uses, as a table `Relationship | What it means | Reads as`, taken from [G5](#g5) rule 3 - only the words that appear in this document.
-3. **The explainer.** Every **numbered part** of a document opens with these four lines, in this order, each at most two sentences:
+   - **The columns** this page uses, one bullet each, in plain words.
+   - **The relationship words** this page uses, as a table `Relationship | What it means | Reads as`, taken from [G5](#g5) rule 3 - only the words that appear on this page.
+3. **The explainer.** Every **numbered part** of a page opens with these four lines, in this order, each at most two sentences:
```

Line 110

```diff
-   - **What to do with it** - the action expected: read, check, decide, or look up.
+   - **What to do with it** - what the reader is expected to do: read, check, decide, or look up.
```

Line 122

```diff
+   | Candidates that also belong elsewhere | (lookup) |
```

Line 135

```diff
-   | The terms found | (ontology) |
+   | The candidates found | (ontology) |
```

Line 141

```diff
-   Any other method word a reader would meet - for example "reach" or "gate" - is defined once under How to read this document.
+   Any other method word a reader would meet - for example "reach" or "gate" - is defined once under How to read this page.
```

Line 143

```diff
-6. **Contents and links between parts.** A document with numbered parts lists them, each as a link, under a **Contents** heading directly after the description. Every mention of a part, a family section, or another document is a link to it, never a bare name or number for the reader to hunt for.
+6. **Contents and links between parts.** A page with numbered parts lists them, each as a link, under a **Contents** heading directly after the description. Every mention of a part, a family part, or another page is a link to it, never a bare name or number for the reader to hunt for.
```

Line 150

```diff
-**Statement.** Structure is shown as a **level table**: one row per term, its level made explicit by the column it sits in (L1, L2, and so on), so a reader sees at a glance what sits under what. A document that covers the whole product shows **one hierarchy for the whole product**, with true levels; a family view is a **slice** of that same hierarchy - the same rows, the same levels. Each term ap ...
+**Statement.** Structure is shown as a **level table**: one row per term, its level made explicit by the column it sits in (L1, L2, and so on), so a reader sees at a glance what sits under what. A page that covers the whole product shows **one hierarchy for the whole product**, with true levels; a family view is a **slice** of that same hierarchy - the same rows, the same levels. Each term appear ...
```

Line 165

```diff
-   - **Kind**: thing, role, step, or state or value.
+   - **Kind**: object, role, step, or state or value.
```

Line 173

```diff
-   | reveals | the first opens on demand to show the second | Opening a <parent> shows its <child>. |
+   | reveals | opening the first shows the second | Opening a <parent> shows its <child>. |
```

Line 180

```diff
-   Grammar, so every sentence reads naturally: "a" or "an" follows how the word is said (an API, a SKU); a company or product name takes no article; a plural or uncountable term takes no "a" or "each"; a thing in a state is written "Thing: state" and takes no article.
+   Grammar, so every sentence reads naturally: "a" or "an" follows how the word is said (an API, a SKU); a company or product name takes no article; a plural or uncountable term takes no "a" or "each"; a term in a state is written "Term: state" and takes no article.
```

Line 185

```diff
-   | it is also a kind of a category that is a thing or a role | Anything the glossary says about <category> also applies to <term>: see <category>. |
+   | it is also a kind of a category that is an object or a role | Anything the glossary says about <category> also applies to <term>: see <category>. |
```

Line 198

```diff
-   - **also in this family, not placed in the hierarchy** - the family's things with no structural relationship: `Term | Where else it appears`, where the second column is "in the flow: see step-terms.md" when the term takes part in the flow, or "nowhere else: the sources name it but never relate it to another term - a gap to raise with the source's owner".
-6. **The flow, step by step.** Flow is not a hierarchy. It is a numbered list of steps in `comes before` order (ties in source order); under each step, one bullet per thing it produces, locks, or unlocks, each written as its "reads as" sentence; then every flow relationship as a table `First | Relationship | Second | Reads as`, and a picture of the same relationships.
-7. **No picture of the whole product.** Pictures are drawn per family view (rule 5) and per flow section (rule 6) only.
+   - **also in this family, not placed in the hierarchy** - the family's terms with no structural relationship: `Term | Where else it appears`, where the second column is "in the flow: see step-terms.md" when the term takes part in the flow, or "nowhere else: the sources name it but never relate it to another term - a gap to raise with the source's owner".
+6. **The flow, step by step.** Flow is not a hierarchy. It is a numbered list of steps in `comes before` order (ties in source order); under each step, one bullet per term it produces, locks, or unlocks, each written as its "reads as" sentence; then every flow relationship as a table `First | Relationship | Second | Reads as`, and a picture of the same relationships.
+7. **No picture of the whole product.** Pictures are drawn per family view (rule 5) and per flow part (rule 6) only.
```

Line 207

```diff
-**Statement.** Every term and every family name is written in **sentence case** wherever it is shown, and the same word always looks the same - in the seven glossary files **and** in every file under `deep-dives/` (section drafts, decisions files, the assembly draft, and the gate log). Kebab-case is kept only for file names, folder names, and the hidden anchor id behind a link, never as visible t ...
+**Statement.** Every term and every family name is written in **sentence case** wherever it is shown, and the same word always looks the same - in the seven glossary pages **and** in every page under `deep-dives/` (section drafts, decisions files, the assembly draft, and the gate log). Kebab-case is kept only for file names, folder names, and the hidden anchor id behind a link, never as visible t ...
```

Line 209

```diff
-**Why.** One casing everywhere means a reader never meets "Org" in one file and "org" in the next and wonders whether they are two things. Sentence case reads as ordinary language, so a term looks like the word people actually say.
+**Why.** One casing everywhere means a reader never meets "Org" in one file and "org" in the next and wonders whether they are two terms. Sentence case reads as ordinary language, so a term looks like the word people actually say.
```

Line 237

```diff
-   Kebab-case is used only for file names, folder names, and the hidden anchor id behind a link (lower case, hyphens); it is never shown, and a term's display is never derived from it. If the source spells one term both ways (for example "sign in" and "sign-in"), that is a weak word for Gate 1, not a choice made while writing.
+   Kebab-case is used only for file names, folder names, and the hidden anchor id behind a link (lower case, hyphens); it is never shown, and a term's display is never derived from it. If the source spells one candidate both ways (for example "sign in" and "sign-in"), that is a weak word for Gate 1, not a choice made while writing.
```

Line 240

```diff
-8. **Table column headings - sentence case.** Every header cell of a table starts with a capital letter and is otherwise cased by rule 1, so acronyms stay in capitals (ID, L1) and later words are lower case unless a rule above keeps them: "Relationship to the term above", not "relationship to the term above" or "Relationship To The Term Above". A legend that names a column, and any rule text that ...
+8. **Table column headings - sentence case.** Every header cell of a table starts with a capital letter and is otherwise cased by rule 1, so acronyms stay in capitals (ID, L1) and later words are lower case unless a rule above keeps them: "Relationship to the term above", not "relationship to the term above" or "Relationship To The Term Above". A column guide that names a column, and any rule tex ...
```

Line 242

```diff
-Run a casing and character sweep before finishing and fix any file that breaks a rule or contains a banned character - over the seven files and everything in `deep-dives/`.
+Run a casing and character sweep before finishing and fix any page that breaks a rule or contains a banned character - over the seven pages and everything in `deep-dives/`. The same sweep runs two more checks, and either one failing fails the run:
+- **Retired words.** It searches every page and method doc for each word that `method-words.md` marks in bold under Don't use.
+- **List values.** For each list in part 8 of `method-words.md` whose "Used in" line names a column, every cell in that column holds one of the list's values, written exactly as listed, or `-`.
```

Line 244

```diff
-**Deterministic output.** The display form is fixed by the source's spelling and the closed acronym, product-name and relationship-word rules, so no choice remains; the bullet rule leaves one layout for any list; and the banned set is a closed list, so a file either passes the sweep or it does not.
+**Deterministic output.** The display form is fixed by the source's spelling and the closed acronym, product-name and relationship-word rules, so no choice remains; the bullet rule leaves one layout for any list; and the banned set is a closed list, so a page either passes the sweep or it does not.
```

Line 247

```diff
-## G7 - Every document ends with a correlated related-pages footer
+## G7 - Every page ends with a correlated related-pages footer
```

Line 249

```diff
-**Statement.** Every document - each of the seven glossary files and every file under `deep-dives/` - ends with a **related pages** table that links only to the documents that genuinely correlate with it - not to all of them - each with a one-line reason. The one exception is `README.md`: its documents-and-reading-order table already links every page, so README carries no separate related-pages f ...
+**Statement.** Every page - each of the seven glossary pages and every page under `deep-dives/` - ends with a **related pages** table that links only to the pages that genuinely correlate with it - not to all of them - each with a one-line reason. The one exception is `README.md`: its pages-and-reading-order table already links every page, so README carries no separate related-pages footer.
```

Line 251

```diff
-**Why.** A reader finishing a document should be handed the next relevant document, not a full directory.
+**Why.** A reader finishing a page should be handed the next relevant page, not a full directory.
```

Line 254

```diff
-1. Choose the two to four documents most related to this one.
+1. Choose the two to four pages most related to this one.
```

Line 256

```diff
-3. The related set for each document is fixed in that document's Part B section - or, for a file under `deep-dives/`, in its section of `output-formats.md` - so it is not re-chosen each run.
+3. The related set for each page is fixed in that page's Part B rules - or, for a page under `deep-dives/`, in its part of `output-formats.md` - so it is not re-chosen each run.
```

Line 258

```diff
-**Deterministic output.** Each document's related set is named in Part B or in `output-formats.md`, so it is fixed, not re-decided per run.
+**Deterministic output.** Each page's related set is named in Part B or in `output-formats.md`, so it is fixed, not re-decided per run.
```

Line 263

```diff
-**Statement.** Each kind document - `object-terms.md`, `role-terms.md`, `step-terms.md`, and `states-and-values.md` - shows only the current terms in its main tables, and ends, just before its related pages, with a table of the earlier words of that kind that the glossary no longer uses, each pointing to the term to use now.
+**Statement.** Each kind page - `object-terms.md`, `role-terms.md`, `step-terms.md`, and `states-and-values.md` - shows only the current terms in its main tables, and ends, just before its related pages, with a table of the earlier words of that kind that the glossary no longer uses, each pointing to the term to use now.
```

Line 268

```diff
-1. **Heading:** `Terms replaced or retired over time`, opened with the [G4](#g4) four-line explainer. The section is always present; with no rows, the table is replaced by one line: `None yet.`
-2. **Columns:** `Earlier term | What happened | Use now | Decision | Date`.
-3. **Rows.** One row for every earlier word of this document's kind:
+1. **Heading:** `Terms replaced or retired over time`, opened with the [G4](#g4) four-line explainer. The part is always present; with no rows, the table is replaced by one line: `None yet.`
+2. **Columns:** `Earlier word | What happened | Use now | Decision | Date`.
+3. **Rows.** One row for every earlier word of this page's kind:
```

Line 272

```diff
-   - each term later renamed, merged, split, or retired through disposition.
+   - each term later renamed, merged, split, or withdrawn through disposition.
```

Line 274

```diff
-   The kind is the kind of the term in **Use now**; for a retired term with nothing in its place, its own kind.
+   The kind is the kind of the term in **Use now**; for a withdrawn term with nothing in its place, its own kind.
```

Line 279

```diff
-   - retired
-5. **Use now** - always the current term, as a link to its definition, never a word in between: if "Checkout cart" became "Basket" and "Basket" later became "Cart", both rows say Cart. A split lists each current term, one per line. A term retired with nothing in its place shows `-`.
-6. **Order.** Rows that point to the same current term sit together. The groups follow the order the current terms appear in this document's main tables. Inside a group, the latest change comes first; rows with the same date keep the decision register's order. Rows with `-` in **Use now** come last, latest first.
+   - withdrawn
+5. **Use now** - always the current term, as a link to its definition, never a word in between: if "Checkout cart" became "Basket" and "Basket" later became "Cart", both rows say Cart. A split lists each current term, one per line. A term withdrawn with nothing in its place shows `-`.
+6. **Order.** Rows that point to the same current term sit together. The groups follow the order the current terms appear in this page's main tables. Inside a group, the latest change comes first; rows with the same date keep the decision register's order. Rows with `-` in **Use now** come last, latest first.
```

Line 283

```diff
-8. **Earlier term** - the word cased per [G6](#g6), as the source or the earlier glossary wrote it. It carries no anchor, because it is no longer a term.
+8. **Earlier word** - the word cased per [G6](#g6), as the source or the earlier glossary wrote it. It carries no anchor, because it is no longer a term.
```

Line 290

```diff
-# How templates use this file (the determinism mechanism)
+# How templates use this doc (the determinism mechanism)
```

Line 292

```diff
-This file is the **law**. The blank files in `templates/` are the **fill-in skeletons**. They connect two ways:
+This doc is the **law**. The blank files in `templates/` are the **fill-in templates**. They connect two ways:
```

Line 294

```diff
-1. Each `templates/<document>.md` **embeds the exact structure** its Part B section mandates - the headings, the legend text, the column headers, and placeholder rows and diagrams - and opens with a first line: `Assembled per glossary-assembly-principles.md - Part B: <document>`.
-2. When assembly runs, it only **fills the placeholders** from the harvested data by applying Part A and the document's Part B section. It never invents structure. The same settled terms therefore always produce the same document.
+1. Each `templates/<page>.md` **embeds the exact structure** its Part B rules mandate - the headings, the column guide text, the column headers, and placeholder rows and diagrams - and opens with a first line: `Assembled per glossary-assembly-principles.md - Part B: <page>`.
+2. When assembly runs, it only **fills the placeholders** from the harvested data by applying Part A and the page's Part B rules. It never invents structure. The same settled terms therefore always produce the same page.
```

Line 296

```diff
+4. **Every word comes from the word list.** A template's headings, column headings, column guides, and placeholders use only words from `method-words.md`, with the meanings it gives them. A template changes only together with that list: a new word goes into the list first.
```

Line 298

```diff
-To change the standard, edit this file **and** the affected template together; changing one without the other is not allowed.
+To change the standard, edit this doc **and** the affected template together; changing one without the other is not allowed.
```

Line 302

```diff
-# Part B - Doc-specific rules
+# Part B - Page-specific rules
```

Line 304

```diff
-Each output document has a section below. Each names the ground rules it applies (linked) and states what only that document does. Nothing here names a product: every rule works for any source. Templates link back to these sections by their anchor.
+Each page has a part below. Each names the ground rules it applies (linked) and states what only that page does. Nothing here names a product: every rule works for any source. Templates link back to these parts by their anchor.
```

Line 309

```diff
-**What only this document does.** It is the gateway: it orients a reader, says what the glossary's basic words mean, and points to every page. It carries no term data, no run history, and no operational rationale.
-**Ground rules applied.** [G4](#g4) (description; the fixed block; an explainer on each table), [G6](#g6). **Exempt from [G7](#g7)** - its documents table already links every page.
-**Doc-specific rules.**
+**What only this page does.** It is the gateway: it orients a reader, says what the glossary's basic words mean, and points to every page. It carries no term data, no run history, and no operational rationale.
+**Ground rules applied.** [G4](#g4) (description; the fixed block; an explainer on each table), [G6](#g6). **Exempt from [G7](#g7)** - its pages table already links every page.
+**Page-specific rules.**
```

Line 314

```diff
-3. **What this glossary contains (fixed block).** The [G4](#g4) fixed block, under this heading - the one place a reader meets the basic words first. Files under `deep-dives/` link here instead of repeating it.
-4. **Sources table.** Opens with the G4 explainer. `Document | What it provides`, one row per source, each provision one per line, followed by the line stating the glossary is derived from these and must not contradict them.
-5. **Documents and reading order table.** Opens with the G4 explainer. One combined table `# | Document | Read it for | Terms`, ordered as the intended reading path (terms and their relationships first). Each count is a link to the page it counts. Its last row is always `deep-dives/`, read it for "how each term was reached: the source quotes behind every entry and how each decision was taken", te ...
-6. **Nothing else** - no footer, no run history. Whether a run's calls were made by a person or taken automatically is recorded only in the decision register.
+3. **How this glossary was built.** Directly after the description and before the fixed block, the README carries this paragraph, exactly as written:
+
+   > **How this glossary was built.** The sources were read one section at a time, three ways: what each section names (Ontology), how those fit together (Topology), and how they move from one stage or state to the next (Choreography). The candidates were joined across sections, and a person settled every contested word at two gates: first the words, then their definitions. The evidence behind ev ...
+
+4. **What this glossary contains (fixed block).** The [G4](#g4) fixed block, under this heading - the one place a reader meets the basic words first. Files under `deep-dives/` link here instead of repeating it.
+5. **Sources table.** Opens with the G4 explainer. `Source | What it provides`, one row per source, each provision one per line, followed by the line stating the glossary is derived from these and must not contradict them.
+6. **Pages and reading order table.** Opens with the G4 explainer. One combined table `# | Page | Read it for | Terms`, ordered as the intended reading path (terms and their relationships first). Each count is a link to the page it counts. Its last row is always `deep-dives/`, read it for "how each term was reached: the source quotes behind every entry and how each decision was taken", terms `-`.
+7. **Nothing else** - no footer, no run history. Whether a run's resolutions were made by a person or taken automatically is recorded only in the decision register.
```

Line 319

```diff
-**Per-run placeholders.** the product name in the title and the fixed block, the family decision link, the source rows, each document's term count, and the date.
+**Per-run placeholders.** the product name in the title, the family decision link, the source rows, each page's term count, and the date.
```

Line 324

```diff
-**What only this document does.** It shows how the terms relate to each other in structure - what is part of what, what is a kind of what, what opens to show what - first as one hierarchy for the whole product, then family by family. It covers terms of every kind that the source relates, not only things. The flow - what happens in what order - lives in `step-terms.md`, not here.
+**What only this page does.** It shows how the terms relate to each other in structure - what is part of what, what is a kind of what, what opens to show what - first as one hierarchy for the whole product, then family by family. It covers terms of every kind that the source relates, not only objects. The flow - what happens in what order - lives in `step-terms.md`, not here.
```

Line 326

```diff
-**Doc-specific rules.**
+**Page-specific rules.**
```

Line 330

```diff
-   - How to read this document: the fixed block, the relationship words, the level-table columns, and one line saying that a relationship skipping a level is implied by the levels and not shown again ([G4](#g4) rule 2)
+   - How to read this page: the fixed block, the relationship words, the level-table columns, and one line saying that a relationship skipping a level is implied by the levels and not shown again ([G4](#g4) rule 2)
```

Line 336

```diff
-4. **No flow** here: this document points to `step-terms.md` for the flow.
+4. **No flow** here: this page points to `step-terms.md` for the flow.
```

Line 341

```diff
-## object-terms.md - the things
+## object-terms.md - the objects
```

Line 343

```diff
-**What only this document does.** Defines the things the product stores, shows, or acts on, family by family, each under the parent it sits under in the hierarchy.
+**What only this page does.** Defines the objects the product stores, shows, or acts on, family by family, each under the parent it sits under in the hierarchy.
```

Line 345

```diff
-**Doc-specific rules.**
-1. **Parts, in this order:** description; How to read this document (the fixed block, then the columns); **Families at a glance**; one section per family, in family order; a final "Cross-cutting" section **only if** some thing belongs to no family; **Terms replaced or retired over time** ([G8](#g8)); related pages.
-2. **Families at a glance.** Opens with the G4 explainer. `Family | What it covers | L1 terms (origin) | Source`: each family a link to its section below; each L1 term - a thing of the family at L1 of the whole hierarchy - a link to its row in `terms-and-relationships.md`; `-` when there is none.
-3. **Each family section**, a sentence-case heading with no "Family N" prefix, holds in order:
+**Page-specific rules.**
+1. **Parts, in this order:** description; How to read this page (the fixed block, then the columns); **Families at a glance**; one part per family, in family order; a final "Cross-cutting" part **only if** some object belongs to no family; **Terms replaced or retired over time** ([G8](#g8)); related pages.
+2. **Families at a glance.** Opens with the G4 explainer. `Family | What it covers | L1 terms (origin) | Source`: each family a link to its part below; each L1 term - an object of the family at L1 of the whole hierarchy - a link to its row in `terms-and-relationships.md`; `-` when there is none.
+3. **Each family part**, a sentence-case heading with no "Family N" prefix, holds in order:
```

Line 352

```diff
-4. **Columns** of the starting-points and group tables: `Term | What it is | Relationship to the term above | Source | Decision`, the relationship in plain words with the parent linked ([G3](#g3) rule 3). Only things are rows; a parent of another kind is named in its group heading with a link to where it is defined.
+4. **Columns** of the starting-points and group tables: `Term | What it is | Relationship to the term above | Source | Decision`, the relationship in plain words with the parent linked ([G3](#g3) rule 3). Only objects are rows; a parent of another kind is named in its group heading with a link to where it is defined.
```

Line 357

```diff
-## role-terms.md - the kinds of person
+## role-terms.md - the people the product serves, records, or gives access to
```

Line 359

```diff
-**What only this document does.** Defines the kinds of person the product serves, records, or gives access to, and says where each sits in the hierarchy.
+**What only this page does.** Defines the people the product serves, records, or gives access to, and says where each sits in the hierarchy.
```

Line 361

```diff
-**Doc-specific rules.**
-1. **Parts:** description; How to read this document (the fixed block, then the columns); **The terms**, opened with the G4 explainer; **Terms replaced or retired over time** ([G8](#g8)); related pages.
-2. **Columns:** `Term | What it is | Persona or role | Sits under | Home family | Source | Decision`.
-3. `Persona or role`: **persona** - a kind of person the product is designed around; **role** - a label that grants access or duties; `-` when the sources do not say which.
+**Page-specific rules.**
+1. **Parts:** description; How to read this page (the fixed block, then the columns); **The terms**, opened with the G4 explainer; **Terms replaced or retired over time** ([G8](#g8)); related pages.
+2. **Columns:** `Term | What it is | Persona or access role | Sits under | Home family | Source | Decision`.
+3. `Persona or access role`: **persona** - a person the product is designed around; **access role** - a label that grants access or duties; `-` when the sources do not say which.
```

Line 368

```diff
-**Per-run placeholders.** the roles, the persona or role split, their place in the hierarchy, their families, and sources.
+**Per-run placeholders.** the roles, the persona or access role split, their place in the hierarchy, their families, and sources.
```

Line 373

```diff
-**What only this document does.** Holds the whole flow - the main stages in order, what controls them, and the actions that happen throughout - and defines every step term. It is the single home of the flow; `terms-and-relationships.md` does not repeat it.
+**What only this page does.** Holds the whole flow - the main stages in order, what controls them, and the actions that happen throughout - and defines every step term. It is the single home of the flow; `terms-and-relationships.md` does not repeat it.
```

Line 375

```diff
-**Doc-specific rules.**
-1. **Parts:** description; How to read this document (the fixed block, the columns, and the flow words); **The flow, step by step (forward thread)** - the main stages in the order the source gives them; **Actions that happen throughout (supporting actions)** - steps the source does not pin to one stage; **The terms**; **Steps not in the flow**, only if there are any; **Terms replaced or retired o ...
+**Page-specific rules.**
+1. **Parts:** description; How to read this page (the fixed block, the columns, and the flow words); **The flow, step by step (forward thread)** - the main stages in the order the source gives them; **Actions that happen throughout (supporting actions)** - steps the source does not pin to one stage; **The terms**; **Steps not in the flow**, only if there are any; **Terms replaced or retired over  ...
```

Line 386

```diff
-**What only this document does.** Defines the named conditions and the closed sets of values, grouped by the **same families** as the other kind documents, with the thing each belongs to named and linked.
+**What only this page does.** Defines the named conditions and the closed sets of values, grouped by the **same families** as the other kind pages, with the term each belongs to named and linked.
```

Line 388

```diff
-**Doc-specific rules.**
-1. **Parts:** description; How to read this document (the fixed block, then the columns); one section per family that holds conditions, in family order, each opened with the G4 explainer; a final **Platform-wide** section for any set that belongs to no single thing; **Terms replaced or retired over time** ([G8](#g8)); related pages. Family headings stay exactly the family names, so other pages ca ...
+**Page-specific rules.**
+1. **Parts:** description; How to read this page (the fixed block, then the columns); one part per family that holds conditions, in family order, each opened with the G4 explainer; a final **Platform-wide** part for any set that belongs to no single term; **Terms replaced or retired over time** ([G8](#g8)); related pages. Family headings stay exactly the family names, so other pages can link to t ...
```

Line 391

```diff
-3. `Belongs to` names the exact owning thing as a link to its definition; a set that qualifies no single thing sits in Platform-wide.
+3. `Belongs to` names the exact owning term as a link to its definition; a set that qualifies no single term sits in Platform-wide.
```

Line 400

```diff
-**What only this document does.** Records every contested term and how it was settled, including the choice of families; it is the one place operational reasoning lives, and every other document links to it by anchor.
+**What only this page does.** Records every contested term and how it was settled, including the choice of families; it is the one place operational reasoning lives, and every other page links to it by anchor.
```

Line 402

```diff
-**Doc-specific rules.**
-1. **Parts:** description; the operational note (rule 5); How to read this document (the fixed block, then the columns); **The register**, opened with the G4 explainer; related pages.
-2. One append-only table, one row per contested term, keyed by a global id `D-n` with a hidden anchor `<a id="d-n">` so other documents can link to the exact row.
+**Page-specific rules.**
+1. **Parts:** description; the operational note (rule 5); How to read this page (the fixed block, then the columns); **The register**, opened with the G4 explainer; related pages.
+2. One append-only table, one row per contested term, keyed by a global id `D-n` with a hidden anchor `<a id="d-n">` so other pages can link to the exact row.
```

Line 406

```diff
-4. Term and chosen are cased per [G6](#g6); retired words and basis stay as prose (they are the rejected forms and the reasoning).
-5. It carries the one operational note: when a run's calls were taken automatically rather than by a person, one line says so, with the date. No other document carries rationale.
+4. Term and chosen are cased per [G6](#g6); retired words and basis stay as prose (they are the dropped forms and the reasoning).
+5. It carries the one operational note: when a run's resolutions were taken automatically rather than by a person, one line says so, with the date. No other page carries rationale.
```

### .skills/_shared/glossary/lens1-ontology.md

Section defined by the list; the Re-run column and its four values; candidates in the worked example tables; 'not a noun' in the dropped table.

43 places changed.

Line 1

```diff
-# Ontology — find the things and what they mean
+# Ontology — find the candidates and what they mean
```

Line 3

```diff
-> **What this is** — the first OTC lens. It finds every candidate term in one section and states what each one means. It is the only OTC lens that adds new candidates.
-> **What it is not** — it does not place terms (that is `lens2-topology.md`), find their states (`lens3-choreography.md`), or judge which qualify (`otc-run-rules.md`). Definitions are finalised at Gate 2.
+> **What this is** — the first lens. It finds every candidate in one section and states what each one means. It is the only lens that adds new candidates.
+> **What it is not** — it does not place candidates (that is `lens2-topology.md`), find their states (`lens3-choreography.md`), or judge which qualify (`otc-run-rules.md`). Definitions are finalised at Gate 2.
```

Line 7

```diff
-> - `otc-methodology.md` (how the OTC lenses connect)
+> - `otc-methodology.md` (how the lenses connect)
```

Line 11

```diff
+> - words: `method-words.md`
```

Line 13

```diff
-> **Next step** — its candidate-term table feeds `lens2-topology.md` and `lens3-choreography.md`.
+> **Next step** — its candidate table feeds `lens2-topology.md` and `lens3-choreography.md`.
```

Line 17

```diff
-- **One section** of the source — one coherent part (e.g. "Checkout"), never the whole corpus at once. A *section* is a requirements module or step, or an area of the product.
-- **The existing glossary** — empty on the first build; populated on a re-scan.
+- **One section** of the source — one coherent part (e.g. "Checkout"), never the whole corpus at once. A *section* is one part of the source, read on its own, taken from the source's own headings.
+- **The existing glossary** — empty on a new build; populated on a re-run.
```

Line 23

```diff
-one fixed output table. Anything without a quote is not a term. Two runs are therefore diffable, and the
+one fixed output table. Anything without a quote is not a candidate. Two runs are therefore diffable, and the
```

Line 37

```diff
-    MARK -- no --> NEW["A new term"]
-    MARK -- yes --> KNOWN["Known — skip"]
-    NEW -->|the list of things| DOWN["To Topology"]
+    MARK -- no --> NEW["A new candidate"]
+    MARK -- yes --> KNOWN["no change — skip"]
+    NEW -->|the list of candidates| DOWN["To Topology"]
```

Line 42

```diff
-This blows out the first OTC lens: read the section, keep the real terms, and hand the list of things to Topology.
+This blows out the first lens: read the section, keep the real candidates, and hand the list of candidates to Topology.
```

Line 50

```diff
-5. **Mark** each row against the existing glossary: `NEW` (not present) or `KNOWN` (already a term — stop here; Merge/Change is decided in `otc-run-rules.md`).
+5. **Mark** each row against the existing glossary: `add` (not present) or `no change` (already a term — stop here; merge or change is decided in `otc-run-rules.md`).
```

Line 53

```diff
-glossary entry?) is done by the three tests in `otc-run-rules.md`, at the gate. This OTC lens's job is to miss nothing
+glossary entry?) is done by the three tests in `otc-run-rules.md`, at the gate. This lens's job is to miss nothing
```

Line 60

```diff
-| **object** | a thing the product stores, shows, or acts on | order, cart, receipt, refund |
-| **role** | a kind of person | customer, admin |
+| **object** | something the product stores, shows, or acts on | order, cart, receipt, refund |
+| **role** | a person the product serves, records, or gives access to | customer, admin |
```

Line 63

```diff
-| **state / value** | a named condition, or a member of a closed set | cancelled; {card, wallet, bank transfer} |
+| **state or value** | a named condition, or a member of a closed set | cancelled; {card, wallet, bank transfer} |
```

Line 71

```diff
-| a bare modifier | it is not a thing on its own | quick, deep, smart → keep the *noun* it qualifies |
+| a bare modifier | it does not stand on its own | quick, deep, smart → keep the *noun* it qualifies |
```

Line 77

```diff
-## Rules this OTC lens enforces (inline)
+## Rules this lens enforces (inline)
```

Line 79

```diff
-- Keep only the four kinds: object, role, step, state/value.
+- Keep only the four kinds: object, role, step, state or value.
```

Line 81

```diff
-- Every kept term carries an exact evidence quote — no quote, not a term.
-- Cast a wide net; the narrowing (the three tests, especially reach) is a whole-picture rule in `otc-run-rules.md`.
+- Every kept candidate carries an exact evidence quote — no quote, not a candidate.
+- Cast a wide net; the narrowing (the three tests, especially reach) is a rule applied over the assembly draft, in `otc-run-rules.md`.
```

Line 86

```diff
-Ontology's output goes into part 1 of the section draft, "The terms found", filled from `templates/section-glossary.md`; the words it drops go into part 5, "Words dropped". Ontology writes **a separate table for each kind**:
+Ontology's output goes into part 1 of the section draft, "The candidates found", filled from `templates/section-glossary.md`; the words it drops go into part 5, "Words dropped". Ontology writes **a separate table for each kind**:
```

Line 93

```diff
-- **Meaning** - what the source says the term is, in at most 12 words.
+- **Meaning** - what the source says the candidate is, in at most 12 words.
```

Line 96

```diff
-The **Re-scan** cell holds one of:
-- `NEW`
-- `KNOWN`
-- `possible-merge`
+The **Re-run** cell holds one of:
+- `add`
+- `merge`
+- `change`
+- `no change`
```

Line 101

```diff
-On a first build every row is `NEW`; on a re-scan the Re-scan column does the work (see below). An empty table is kept and marked **None.** - an honest empty beats a padded one.
+On a new build every row is `add`; on a re-run the Re-run column does the work (see below). An empty table is kept and marked **None.** - an honest empty beats a padded one.
```

Line 103

```diff
-The **Term** cell, and each value in a States and values row, is written in sentence case per G6 in `glossary-assembly-principles.md`, exactly as it will look in the glossary: "Quick scan", "Running". The **Evidence** cell is a quote and keeps the source's own casing.
+The **Candidate** cell, and each value in a States and values row, is written in sentence case per G6 in `glossary-assembly-principles.md`, exactly as it will look in the glossary: "Quick scan", "Running". The **Evidence** cell is a quote and keeps the source's own casing.
```

Line 107

```diff
-We use **one slice across all three OTC lenses** (Ontology → Topology → Choreography), so you can watch the same things carry forward.
+We use **one section across all three lenses** (Ontology → Topology → Choreography), so you can watch the same candidates carry forward.
```

Line 113

```diff
-| # | Term | Meaning | Evidence | Re-scan |
+| # | Candidate | Meaning | Evidence | Re-run |
```

Line 115

```diff
-| 1 | Source | the attached code read in depth | "reads a source in depth" | NEW |
-| 2 | Result | what the deep read presents | "presents its result" | NEW |
-| 3 | As-is | the system as it is today | "the as-is organised by business domain" | NEW |
-| 4 | Domain | an area the result is organised by | "organised by business domain" | NEW |
-| 5 | Journey | part of a domain | "each domain opens to its journeys" | NEW |
-| 6 | Module | part of a domain | "and its modules" | NEW |
-| 7 | Finding | a cited item — a domain fact, a coupling, or a gap | "Every finding — a domain fact, a coupling, a gap" | NEW |
-| 8 | Evidence | what supports a finding | "can be opened to the evidence" | NEW |
+| 1 | Source | the attached code read in depth | "reads a source in depth" | add |
+| 2 | Result | what the deep read presents | "presents its result" | add |
+| 3 | As-is | the system as it is today | "the as-is organised by business domain" | add |
+| 4 | Domain | an area the result is organised by | "organised by business domain" | add |
+| 5 | Journey | part of a domain | "each domain opens to its journeys" | add |
+| 6 | Module | part of a domain | "and its modules" | add |
+| 7 | Finding | a cited item — a domain fact, a coupling, or a gap | "Every finding — a domain fact, a coupling, a gap" | add |
+| 8 | Evidence | what supports a finding | "can be opened to the evidence" | add |
```

Line 126

```diff
-| # | Term | Meaning | Evidence | Re-scan |
+| # | Candidate | Meaning | Evidence | Re-run |
```

Line 128

```diff
-| - | None. | this slice names no roles | - | - |
+| - | None. | this section names no roles | - | - |
```

Line 132

```diff
-| # | Term | Meaning | Evidence | Re-scan |
+| # | Candidate | Meaning | Evidence | Re-run |
```

Line 134

```diff
-| 1 | Quick scan | the first read across every source *(also seen as "the scan")* | "The quick scan can be paused, resumed, stopped, and restarted" | NEW |
-| 2 | Deep read | reads one source in depth *(also seen as "deep analysis")* | "Deep analysis reads a source in depth" | NEW |
+| 1 | Quick scan | the first read across every source *(also seen as "the scan")* | "The quick scan can be paused, resumed, stopped, and restarted" | add |
+| 2 | Deep read | reads one source in depth *(also seen as "deep analysis")* | "Deep analysis reads a source in depth" | add |
```

Line 139

```diff
-| # | Term | Meaning | Evidence | Re-scan |
+| # | Candidate | Meaning | Evidence | Re-run |
```

Line 141

```diff
-| 1 | Scan run state | • Running<br>• Paused<br>• Stopped<br>• Restarted | "paused, resumed, stopped, and restarted" | NEW |
-| 2 | Scan result | • Incomplete (once stopped) | "a stopped scan is incomplete" | NEW |
+| 1 | Scan run state | • Running<br>• Paused<br>• Stopped<br>• Restarted | "paused, resumed, stopped, and restarted" | add |
+| 2 | Scan result | • Incomplete (once stopped) | "a stopped scan is incomplete" | add |
```

Line 148

```diff
-| "**business** domain" | business | a modifier; the term is **domain** |
-| "reads a source **in depth**" | in depth | a manner, not a thing |
-| "the scan **resumes**" | resumes | an action (verb), not a thing |
+| "**business** domain" | business | a modifier; the candidate is **domain** |
+| "reads a source **in depth**" | in depth | a manner, not a noun |
+| "the scan **resumes**" | resumes | a verb, not a noun |
```

Line 152

```diff
-Note the alternates: Ontology only *records* that "the scan" and "deep analysis" name things already listed — it does not pick the winner. That is the same-thing test in `otc-methodology.md`, decided at the gate.
+Note the alternates: Ontology only *records* that "the scan" and "deep analysis" name candidates already listed — it does not pick the winner. That is the same-meaning test in `otc-methodology.md`, decided at the gate.
```

Line 154

```diff
-## When the glossary already exists (a re-scan)
+## When the glossary already exists (a re-run)
```

Line 156

```diff
-Re-running this slice after "source", "quick scan", "deep read", and "evidence" are already terms - the Re-scan column carries the meaning, and most rows are `KNOWN`. The tables keep every column of a first build; only the Re-scan cells differ:
+Re-running this section after "source", "quick scan", "deep read", and "evidence" are already terms - the Re-run column carries the meaning, and most rows are `no change`. The tables keep every column of a new build; only the Re-run cells differ:
```

Line 160

```diff
-| # | Term | Meaning | Evidence | Re-scan |
+| # | Candidate | Meaning | Evidence | Re-run |
```

Line 162

```diff
-| 1 | Source | the attached code read in depth | "reads a source in depth" | KNOWN |
-| 2 | Result | what the deep read presents | "presents its result" | NEW |
-| 3 | Evidence | what supports a finding | "can be opened to the evidence" | KNOWN |
+| 1 | Source | the attached code read in depth | "reads a source in depth" | no change |
+| 2 | Result | what the deep read presents | "presents its result" | add |
+| 3 | Evidence | what supports a finding | "can be opened to the evidence" | no change |
```

Line 168

```diff
-| # | Term | Meaning | Evidence | Re-scan |
+| # | Candidate | Meaning | Evidence | Re-run |
```

Line 170

```diff
-| 1 | Quick scan | the first read across every source | "The quick scan can be paused..." | KNOWN |
-| 2 | Deep read | reads one source in depth | "Deep analysis reads a source in depth" | KNOWN |
-| 3 | Deep analysis | reads one source in depth | "Deep analysis reads a source in depth" | possible-merge |
+| 1 | Quick scan | the first read across every source | "The quick scan can be paused..." | no change |
+| 2 | Deep read | reads one source in depth | "Deep analysis reads a source in depth" | no change |
+| 3 | Deep analysis | reads one source in depth | "Deep analysis reads a source in depth" | merge |
```

Line 175

```diff
-- **`KNOWN`** - skipped: the glossary already has the term. Here that is Source, Evidence, Quick scan, and Deep read; Evidence is known even though another module owns it.
-- **`NEW`** - added: Result.
-- **`possible-merge`** - raised for a person: Deep analysis may be the same thing as Deep read, so it goes to the same-thing test.
+- **`no change`** - skipped: the glossary already has the term. Here that is Source, Evidence, Quick scan, and Deep read; Evidence is known even though another section owns it.
+- **`add`** - added: Result.
+- **`merge`** - raised for a person: Deep analysis may have the same meaning as Deep read, so it goes to the same-meaning test.
```

Line 188

```diff
-2. **One sentence, at most 25 words**: *what kind of thing it is*, then *what sets it apart*.
+2. **One sentence, at most 25 words**: *what it is*, then *what sets it apart*.
```

Line 196

```diff
-   | State | "The condition of a <thing> when ..." | Order status: "The condition of an order as it moves from placement to delivery." |
+   | State or value | "The condition of a <term> when ..." | Order status: "The condition of an order as it moves from placement to delivery." |
```

Line 211

```diff
-The term table (`NEW` rows) goes to **Topology** (to place them) and **Choreography** (to find their
-states). `KNOWN` rows stop here. Nothing from this OTC lens is a final glossary entry yet — that happens at
-Gate 2, after `otc-run-rules.md` has judged which terms qualify.
+The candidate table (`add` rows) goes to **Topology** (to place them) and **Choreography** (to find their
+states). `no change` rows stop here. Nothing from this lens is a final glossary entry yet — that happens at
+Gate 2, after `otc-run-rules.md` has judged which candidates qualify.
```

### .skills/_shared/glossary/lens2-topology.md

Candidates; relationship (never link); 'Relationships across sections'; the example's level table column 'Relationship to the candidate above'.

26 places changed.

Line 1

```diff
-# Topology — find where each thing sits
+# Topology — find where each candidate sits
```

Line 3

```diff
-> **What this is** — the second OTC lens. It takes the things Ontology found and **decomposes the section into a tree** — placing each thing under the thing it belongs to: what contains what, what is a kind of what, what reveals what.
-> **What it is not** — it does not find new things (`lens1-ontology.md`), track how they move (`lens3-choreography.md`), or judge them (`otc-run-rules.md`). It adds no terms; it only connects the ones already found.
+> **What this is** — the second lens. It takes the candidates Ontology found and **decomposes the section into a tree** — placing each candidate under the candidate it belongs to: what contains what, what is a kind of what, what reveals what.
+> **What it is not** — it does not find new candidates (`lens1-ontology.md`), track how they move (`lens3-choreography.md`), or judge them (`otc-run-rules.md`). It adds no candidates; it only connects the ones already found.
```

Line 7

```diff
-> - `otc-methodology.md` (how the OTC lenses connect)
+> - `otc-methodology.md` (how the lenses connect)
```

Line 10

```diff
+> - words: `method-words.md`
```

Line 16

```diff
-Topology answers one question for every thing: **what does it sit under?** The result is a hierarchy — a tree. Each link is a parent–child step: the child `contains`-into, is a `kind of`, or is `reveal`ed by its parent. Read the whole set of links together and you have the section decomposed into its structure. That tree is the entire output of this OTC lens.
+Topology answers one question for every candidate: **what does it sit under?** The result is a hierarchy — a tree. Each relationship is a parent–child step: the child `contains`-into, is a `kind of`, or is `reveal`ed by its parent. Read the whole set of links together and you have the section decomposed into its structure. That tree is the entire output of this lens.
```

Line 22

```diff
-    UP["From Ontology: the things"] -->|pair them| PAIR["Two things in one sentence"]
+    UP["From Ontology: the candidates"] -->|pair them| PAIR["Two candidates in one sentence"]
```

Line 25

```diff
-    PH -- no --> NONE["No link"]
+    PH -- no --> NONE["No relationship"]
```

Line 30

```diff
-This blows out the second OTC lens: it begins with Ontology's flat list of things, arranges them into a tree, and hands that tree to Choreography.
+This blows out the second lens: it begins with Ontology's flat list of candidates, arranges them into a tree, and hands that tree to Choreography.
```

Line 34

```diff
-- **Ontology's term table** for the section — the things to connect.
+- **Ontology's candidate table** for the section — the candidates to connect.
```

Line 39

```diff
-1. **Pair up** the things that appear in the same sentence.
+1. **Pair up** the candidates that appear in the same sentence.
```

Line 41

```diff
-3. **Classify** it as `contains`, `kind of`, or `reveals`, and decide which thing is the **parent** and which the **child**.
-4. **Record** the link — `parent → child` — with the exact phrase as evidence.
-5. **Stop** if there is no phrase. No phrase, no link — Topology never infers structure the text does not state.
+3. **Classify** it as `contains`, `kind of`, or `reveals`, and decide which candidate is the **parent** and which the **child**.
+4. **Record** the relationship — `parent → child` — with the exact phrase as evidence.
+5. **Stop** if there is no phrase. No phrase, no relationship — Topology never infers structure the text does not state.
```

Line 51

```diff
-| **reveals** | the thing that opens | what it shows on demand | "opens to its", "shows its", "expands to" |
+| **reveals** | the candidate that opens | what it shows on demand | "opens to its", "shows its", "expands to" |
```

Line 53

```diff
-`reveals` differs from `contains` (composition vs showing an existing part), and both differ from Choreography's `locks / unlocks` (whether something *can happen*), which is not this OTC lens.
+`reveals` differs from `contains` (composition vs showing an existing part), and both differ from Choreography's `locks / unlocks` (whether something *can happen*), which is not this lens.
```

Line 55

```diff
-## Rules this OTC lens enforces (inline)
+## Rules this lens enforces (inline)
```

Line 57

```diff
-- Record a link only where a give-away phrase exists — no phrase, no link.
-- Set the direction: the parent is the whole / category / opener; the child is the part / member / revealed thing.
-- Add no new terms — only connect the things Ontology found.
+- Record a relationship only where a give-away phrase exists — no phrase, no relationship.
+- Set the direction: the parent is the whole / category / opener; the child is the part / member / what is revealed.
+- Add no new candidates — only connect the candidates Ontology found.
```

Line 65

```diff
-- **The tree (text tree)** - the section's terms, names only, each under its nearest parent, as deep as it goes. The reader's quick view.
-- **The level table (levels)** - the same rows, line for line, with each term's level in its own column (L1, L2, and so on) and its relationship to the term above in plain words.
-- **Terms that also belong elsewhere (lookup)** - every other parent a term has, with the fixed takeaways; a "kind of" relationship places a term only when it has no "part of" parent.
-- **Every relationship, as a table (verbatim)** - the columns of that table in part 2 of `templates/section-glossary.md`, copied exactly; the Evidence cell is the exact quote from the source and where it is. Rows are grouped by parent. The source of truth, including second parents and shortcuts the level table does not draw.
+- **The tree (text tree)** - the section's candidates, names only, each under its nearest parent, as deep as it goes. The reader's quick view.
+- **The level table (levels)** - the same rows, line for line, with each candidate's level in its own column (L1, L2, and so on) and its relationship to the candidate above in plain words.
+- **Candidates that also belong elsewhere (lookup)** - every other parent a candidate has, with the fixed takeaways; a "kind of" relationship places a candidate only when it has no "part of" parent.
+- **Every relationship, as a table (verbatim)** - the columns of that table in part 2 of `templates/section-glossary.md`, copied exactly; the Evidence cell is the exact quote from the source and where it is. Rows are grouped by parent. The source of truth, including the relationships in the lookup and shortcuts the level table does not draw.
```

Line 70

```diff
-**How to read this table (reading key):** the **parent** is the whole, the category, or the thing that opens; the **child** is the part, the member, or what is shown. The "reads as" cell says the relationship in a plain sentence, from the fixed patterns in G5: for example, `contains` reads "Each <child> is part of a <parent>."
+**How to read this table (reading key):** the **parent** is the whole, the category, or the candidate that opens; the **child** is the part, the member, or what is shown. The "reads as" cell says the relationship in a plain sentence, from the fixed patterns in G5: for example, `contains` reads "Each <child> is part of a <parent>."
```

Line 72

```diff
-**Casing.** Terms in the tree, the level table, the lookup, and the verbatim table are written in sentence case per G6 in `glossary-assembly-principles.md`, so they look exactly as they will in the glossary; relationship words stay lower case; the Evidence cell keeps the source's own casing.
+**Casing.** Candidates in the tree, the level table, the lookup, and the verbatim table are written in sentence case per G6 in `glossary-assembly-principles.md`, so they look exactly as they will in the glossary; relationship words stay lower case; the Evidence cell keeps the source's own casing.
```

Line 76

```diff
-Continuing the shared slice. **From Ontology** we already have the things — *quick scan, deep read, source, result, as-is, domain, journey, module, finding, evidence*. Topology now places them under one another, as part 2 of the section draft shows them.
+Continuing the shared section. **From Ontology** we already have the candidates — *quick scan, deep read, source, result, as-is, domain, journey, module, finding, evidence*. Topology now places them under one another, as part 2 of the section draft shows them.
```

Line 108

```diff
-| L1 | L2 | L3 | Relationship to the term above | Kind |
+| L1 | L2 | L3 | Relationship to the candidate above | Kind |
```

Line 110

```diff
-| Result | | | - | thing |
-| | Domain | | part of a result | thing |
-| | | Journeys | shown when a domain is opened | thing |
-| | | Modules | shown when a domain is opened | thing |
-| | Finding | | part of a result | thing |
-| | | Domain fact | a kind of finding | thing |
-| | | Coupling | a kind of finding | thing |
-| | | Gap | a kind of finding | thing |
+| Result | | | - | object |
+| | Domain | | part of a result | object |
+| | | Journeys | shown when a domain is opened | object |
+| | | Modules | shown when a domain is opened | object |
+| | Finding | | part of a result | object |
+| | | Domain fact | a kind of finding | object |
+| | | Coupling | a kind of finding | object |
+| | | Gap | a kind of finding | object |
```

Line 119

```diff
-No term here has a second parent, so there is no lookup table.
+No candidate here also belongs under another parent, so there is no lookup table.
```

Line 133

```diff
-## Relationships across features and modules
+## Relationships across sections
```

Line 135

```diff
-Structure is not confined to one feature. `result contains finding` links two different features of the Analysis module; a link from `finding` to `Evidence` would reach into the Evidence module. Topology records both the same way — a give-away phrase in one sentence — and the **shared glossary** is what lets it recognise a term that first appeared in another feature or module.
+Structure is not confined to one section. `result contains finding` connects two different sections of the Analysis module; a relationship from `finding` to `Evidence` would reach into the Evidence module. Topology records both the same way — a give-away phrase in one sentence — and the **shared glossary** is what lets it recognise a term that first appeared in another section.
```

Line 137

```diff
-Which feature or module each term belongs to is **not repeated in every row** — that would clutter the tree. It is recorded once, in the term's glossary entry (its `Source`), and the cross-links are joined into one whole when the per-section pictures are assembled in `otc-methodology.md`. Topology never invents a cross-link; it only records one the text states.
+Which section each term belongs to is **not repeated in every row** — that would clutter the tree. It is recorded once, in the term's glossary entry (its `Source`), and the cross-links are joined into one whole when the section drafts are assembled in `otc-methodology.md`. Topology never invents a cross-link; it only records one the text states.
```

Line 141

```diff
-The tree is handed to **Choreography**, which animates it. Its shape carries through to the picture — `contains` and `kind of` become the nesting, `reveals` an arrow — and each thing's parent becomes the **Part of** line in its glossary entry. The entry shape lives in `output-formats.md`.
+The tree is handed to **Choreography**, which animates it. Its shape carries through to the picture — `contains` and `kind of` become the nesting, `reveals` an arrow — and each candidate's parent becomes the **Part of** line in its glossary entry. The entry shape lives in `output-formats.md`.
```

### .skills/_shared/glossary/lens3-choreography.md

'Gate' meant a lock between states here; it is now 'flow relationship', so 'gate' only ever means a person deciding. 'Belongs to' column; 'Term: state'.

24 places changed.

Line 1

```diff
-# Choreography — find how each thing moves
+# Choreography — find how each candidate moves
```

Line 3

```diff
-> **What this is** — the third OTC lens. It takes the things Ontology found and records how they move: the states a thing can be in, and the gates between things — what comes before what, what produces what, what locks or unlocks what.
-> **What it is not** — it does not find new things (`lens1-ontology.md`) or place them (`lens2-topology.md`), and its output does **not** become glossary entries — flow is behaviour, and behaviour belongs in the specification, not the dictionary.
+> **What this is** — the third lens. It takes the candidates Ontology found and records how they move: the states a term can be in, and the flow relationships between candidates — what comes before what, what produces what, what locks or unlocks what.
+> **What it is not** — it does not find new candidates (`lens1-ontology.md`) or place them (`lens2-topology.md`), and its output does **not** become glossary entries — flow is behaviour, and behaviour belongs in the specification, not the dictionary.
```

Line 7

```diff
-> - `otc-methodology.md` (how the OTC lenses connect)
+> - `otc-methodology.md` (how the lenses connect)
```

Line 10

```diff
+> - words: `method-words.md`
```

Line 12

```diff
-> **Next step** — its states feed back as candidate terms; its gates become the flow arrows in the picture.
+> **Next step** — its states feed back as candidates; its flow relationships become the arrows in the picture.
```

Line 18

```diff
-    UP["From Topology: the tree"] --> S["Find each thing's states"]
-    UP --> G["Two things in one sentence"]
+    UP["From Topology: the tree"] --> S["Find each term's states"]
+    UP --> G["Two candidates in one sentence"]
```

Line 22

```diff
-    PH -- yes --> RECG["Record the gate"]
-    PH -- no --> NONE["No gate"]
-    RECS --> PIC["The picture (the animated tree)"]
+    PH -- yes --> RECG["Record the relationship"]
+    PH -- no --> NONE["No relationship"]
+    RECS --> PIC["The section draft (the animated tree)"]
```

Line 28

```diff
-This blows out the third OTC lens: it begins with Topology's tree, animates it with states and gates, and that animated tree is the section's picture.
+This blows out the third lens: it begins with Topology's tree, animates it with states and flow relationships, and that animated tree is the section draft.
```

Line 32

```diff
-- **Topology's tree** for the section — the placed things whose movement to trace (they carry Ontology's terms).
-- **The section text** — to read the states and the phrases between things.
+- **Topology's tree** for the section — the placed candidates whose movement to trace (they carry Ontology's candidates).
+- **The section text** — to read the states and the phrases between candidates.
```

Line 37

```diff
-1. **States:** for each thing, record the conditions it can be in.
-2. **Gates:** for each pair of things in a sentence, look for a flow give-away phrase.
-3. **Classify** a gate as `comes before`, `produces`, or `locks / unlocks`.
-4. **Record** states per thing, and each gate as a triple with its evidence phrase.
-5. **Stop** if there is no phrase. No phrase, no gate.
+1. **States:** for each term, record the conditions it can be in.
+2. **Flow relationships:** for each pair of candidates in a sentence, look for a flow give-away phrase.
+3. **Classify** each as `comes before`, `produces`, or `locks / unlocks`.
+4. **Record** states per term, and each flow relationship as a triple with its evidence phrase.
+5. **Stop** if there is no phrase. No phrase, no relationship.
```

Line 43

```diff
-## The relationships this OTC lens reads
+## The relationships this lens reads
```

Line 50

```diff
-| *(states)* | the conditions a single thing passes through | "can be paused, resumed, stopped"; "marked incomplete" |
+| *(states)* | the conditions a single term passes through | "can be paused, resumed, stopped"; "marked incomplete" |
```

Line 52

```diff
-## Rules this OTC lens enforces (inline)
+## Rules this lens enforces (inline)
```

Line 54

```diff
-- Record a gate only where a flow phrase exists — no phrase, no gate.
-- States are candidate terms; gates are behaviour, not glossary entries.
+- Record a flow relationship only where a flow phrase exists — no phrase, no relationship.
+- States are candidates; flow relationships are behaviour, not glossary entries.
```

Line 64

```diff
-- **Every flow relationship, as a table (verbatim)** - the columns of that table in part 3 of `templates/section-glossary.md`, copied exactly; the Evidence cell is the exact quote from the source and where it is. Rows are grouped by the first thing. The source of truth.
+- **Every flow relationship, as a table (verbatim)** - the columns of that table in part 3 of `templates/section-glossary.md`, copied exactly; the Evidence cell is the exact quote from the source and where it is. Rows are grouped by the first candidate. The source of truth.
```

Line 67

```diff
-**How to read this table (reading key):** the first thing *produces* the second, *locks* or *unlocks* it, or *comes before* it. The "reads as" cell says the link in a plain sentence, for example `locks` reads "<First> stops <second> from happening."
+**How to read this table (reading key):** the first candidate *produces* the second, *locks* or *unlocks* it, or *comes before* it. The "reads as" cell says the relationship in a plain sentence, for example `locks` reads "<First> stops <second> from happening."
```

Line 69

```diff
-**Casing.** Things, states, and mermaid labels are written in sentence case per G6 in `glossary-assembly-principles.md`, so they look exactly as they will in the glossary; a thing in a given state is written `Thing: state` (for example "Quick scan: stopped"); relationship words stay lower case; the Evidence cell keeps the source's own casing.
+**Casing.** Candidates, states, and mermaid labels are written in sentence case per G6 in `glossary-assembly-principles.md`, so they look exactly as they will in the glossary; a term in a given state is written `Term: state` (for example "Quick scan: stopped"); relationship words stay lower case; the Evidence cell keeps the source's own casing.
```

Line 73

```diff
-Continuing the shared slice. **From Ontology** we have the things — *quick scan, deep read, result*, and the rest. **From Topology** we have the structure — *a result contains findings; a gap is a kind of finding*. **Choreography now adds their movement** — the states each thing can be in, and the flow between them, as part 3 of the section draft shows them.
+Continuing the shared section. **From Ontology** we have the candidates — *quick scan, deep read, result*, and the rest. **From Topology** we have the structure — *a result contains findings; a gap is a kind of finding*. **Choreography now adds their movement** — the states each term can be in, and the flow between them, as part 3 of the section draft shows them.
```

Line 77

```diff
-**States each thing can be in**
+**States each candidate can be in**
```

Line 79

```diff
-| Thing | States | Evidence |
+| Belongs to | States | Evidence |
```

Line 107

```diff
-Choreography's output does **not** create glossary entries — a gate like "a stopped scan locks the deep read" is a rule of the product, and rules live in the specification, not the glossary. Choreography earns its place in two other ways: a **state it finds** (e.g. "incomplete") is a named condition, so it loops back to Ontology as a candidate term; and a **gate it finds** becomes a flow arrow wh ...
+Choreography's output does **not** create glossary entries — a flow relationship like "a stopped scan locks the deep read" is a rule of the product, and rules live in the specification, not the glossary. Choreography earns its place in two other ways: a **state it finds** (e.g. "incomplete") is a named condition, so it loops back to Ontology as a candidate; and a **flow relationship it finds** be ...
```

Line 111

```diff
-We do not capture them. UI controls — buttons, fields, toggles, modals — were dropped by Ontology as *mechanism*, so they are never things, and Choreography tracks states only for things. A button being enabled or disabled is the **visible echo** of a product state, not a state in its own right. We capture the product state it echoes, never the control.
+We do not capture them. UI controls — buttons, fields, toggles, modals — were dropped by Ontology as *mechanism*, so they are never candidates, and Choreography tracks states only for candidates. A button being enabled or disabled is the **visible echo** of a product state, not a state in its own right. We capture the product state it echoes, never the control.
```

Line 113

```diff
-- **We capture:** `deep read — locked` and the gate `a stopped quick scan → locks → deep read` (the meaning, from the requirement).
+- **We capture:** `deep read — locked` and the flow relationship `a stopped quick scan → locks → deep read` (the meaning, from the requirement).
```

Line 120

```diff
-The animated tree **is** the section's picture. Its states go back to Ontology's States and values table as candidate terms; its gates are the flow. Nothing here is a glossary definition. Across sections, the picture is joined to others on shared terms (`otc-methodology.md`).
+The animated tree **is** the section draft. Its states go back to Ontology's States and values table as candidates; its flow relationships are the flow. Nothing here is a glossary definition. Across sections, the section draft is joined to others on shared candidates (`otc-methodology.md`).
```

### .skills/_shared/glossary/method-words.md

New file. Sent alongside this page, in full.

### .skills/_shared/glossary/otc-methodology.md

The 'Words this methodology uses' table is replaced by one paragraph pointing to method-words.md. Same-meaning test, re-run, sections, candidates.

26 places changed.

Line 1

```diff
-# Methodology — how the three OTC lenses tie together
+# Methodology — how the three lenses tie together
```

Line 3

```diff
-> **What this is** — the binder that ties the three OTC lenses together: the order they run in, how each feeds the next, how they assemble into one picture, and where that picture goes.
-> **What it is not** — not the OTC lenses themselves, not the law that judges terms, not the output shapes. It only connects them.
+> **What this is** — the binder that ties the three lenses together: the order they run in, how each feeds the next, how they assemble into the assembly draft, and where that draft goes.
+> **What it is not** — not the lenses themselves, not the law that judges terms, not the output shapes. It only connects them.
```

Line 7

```diff
-> - OTC lenses:
+> - lenses:
```

Line 13

```diff
+> - words: `method-words.md`
```

Line 15

```diff
-> **Next step** — read `lens1-ontology.md`, the first OTC lens. The harvest and check skills apply this methodology; the disposition skill consumes its outputs.
+> **Next step** — read `lens1-ontology.md`, the first lens. The harvest and check skills apply this methodology; the disposition skill consumes its outputs.
```

Line 19

```diff
-A way to read *any* document for meaning, in three OTC lenses — **O**ntology, **T**opology, **C**horeography — that together produce **one picture** of the product's things and how they connect. It reads the phrases in sentences, not tables or identifiers, so it works on a tidy spec or a loose brief alike. It is **methodology, not a skill**: it describes *how to read* and produces nothing until a ...
+A way to read *any* source for meaning, in three lenses — **O**ntology, **T**opology, **C**horeography — that together produce **one model** of the product's candidates and how they connect. It reads the phrases in sentences, not tables or identifiers, so it works on a tidy spec or a loose brief alike. It is **methodology, not a skill**: it describes *how to read* and produces nothing until a ski ...
```

Line 23

```diff
-We hold ourselves to the same discipline we ask of a specification — one word per thing.
+We hold ourselves to the same discipline we ask of a specification — one word per meaning.
```

Line 25

```diff
-| Word | Means |
-|---|---|
-| **section** | one coherent part of the source, read at a time — a module or step in a requirements document, an area such as "Checkout" in the store example. *(This is what we earlier called "per module".)* |
-| **OTC lens** | one of the three readings: Ontology, Topology, Choreography |
-| **candidate term** | a word or phrase an OTC lens found, not yet judged |
-| **term** | a candidate that passed the gates and the three tests in `otc-run-rules.md`, and so has a glossary entry. The tests:<br>• special meaning<br>• consequence<br>• reach |
-| **kind** | which of the four sorts a term is, as `lens1-ontology.md` ("KEEP") defines them. Every term is exactly one kind; "object" is one kind of term, not another word for it. The kinds:<br>• object<br>• role<br>• step<br>• state or value |
-| **family** | a part of the product that groups terms in the glossary, taken from the source's own top-level structure. A family says where a term comes from in the sources; it is not a relationship between terms. The families are chosen at Gate 1 and recorded in the decision register, so every glossary file can show how they were chosen |
-| **relationship** | a stated connection between two terms, of one of two sorts:<br>• structure - what is part of, or a kind of, what<br>• flow - what happens before, or controls, what<br>The words for each are listed in `glossary-assembly-principles.md`, G5 rule 2 |
-| **picture** | the assembled model of one section |
-| **gate** | a checkpoint where a person decides |
-| **decision register** | the permanent record of what overrode what |
+Every word this method uses is defined once, in `method-words.md`: what it means, an example, and the words we no longer use for it. This doc uses those words and defines none of its own.
```

Line 40

```diff
-Each OTC lens reads one **section** at a time. Take the sections from the source's **own structure** — its headings, modules, or numbered groups, in document order. That is repeatable because the divisions are the source's, not ours. If the source has no structure of its own, treat the whole source as one section, or ask the person to mark the sections at the gate — never invent a grouping of loo ...
+Each lens reads one **section** at a time. Take the sections from the source's **own structure** — its headings, modules, or numbered groups, in source order. That is repeatable because the divisions are the source's, not ours. If the source has no structure of its own, treat the whole source as one section, or ask the person to mark the sections at the gate — never invent a grouping of loose pro ...
```

Line 42

```diff
-**Naming a section.** A section's name is its own name in the source, without the number or id the source puts in front of its section names to number them - for example E01, EP-01, or 3.2. A number that is part of the name itself stays: "Phase 2 features" keeps its 2. The section's folder name is that name in kebab-case - "E01 Checkout" becomes `checkout`, "Phase 2 features" becomes `phase-2-fea ...
+**Naming a section.** A section's name is its own name in the source, without the number or id the source puts in front of its section names to number them - for example E01, EP-01, or 3.2. A number that is part of the name itself stays: "Phase 2 features" keeps its 2. The section's folder name is that name in kebab-case - "E01 Checkout" becomes `checkout`, "Phase 2 features" becomes `phase-2-fea ...
```

Line 46

```diff
-The OTC lenses run in a fixed order, each building on the one before. **Ontology** finds *what* the things are — a flat list. **Topology** takes that list and arranges it into a *tree* — where each thing sits. **Choreography** takes the tree and *animates* it — the states each thing can be in, and the gates between them. Each OTC lens hands its output to the next: things → tree → animated tree, a ...
+The lenses run in a fixed order, each building on the one before. **Ontology** finds *what* the candidates are — a flat list. **Topology** takes that list and arranges it into a *tree* — where each candidate sits. **Choreography** takes the tree and *animates* it — the states each term can be in, and the gates between them. Each lens hands its output to the next: candidates → tree → animated tree ...
```

Line 48

```diff
-## When the rules apply — inline, then whole-picture
+## When the rules apply — inline, then over the assembly draft
```

Line 50

```diff
-Rules run at **two moments**, not one. Most run **inline, as each OTC lens runs** — they judge a single item and need nothing else, so there is no "draft now, get scolded later". A few can only run **after the whole read**, because they need every section in view.
+Rules run at **two moments**, not one. Most run **inline, as each lens runs** — they judge a single item and need nothing else, so there is no "draft now, get scolded later". A few can only run **after the whole read**, because they need every section in view.
```

Line 55

```diff
-| no phrase → no link / no gate | **inline, in Topology / Choreography** | judges one sentence |
-| the three tests (especially reach) | **whole-picture, after the read** | reach needs every section |
-| the five conflict kinds | **whole-picture** | needs all candidates on the table |
-| weak-word recommendation | **whole-picture** | names the axis across all uses |
-| Add / Merge / Change | **whole-picture** | needs the full set against the existing glossary |
+| no phrase → no relationship | **inline, in Topology / Choreography** | judges one sentence |
+| the three tests (especially reach) | **over the assembly draft, after the read** | reach needs every section |
+| the five conflict types | **over the assembly draft** | needs all candidates on the table |
+| weak-word recommendation | **over the assembly draft** | names the axis across all uses |
+| add / merge / change | **over the assembly draft** | needs the full set against the existing glossary |
```

Line 61

```diff
-The inline rules live in the Ontology, Topology, and Choreography docs, in each OTC lens's **"Rules this OTC lens enforces"** list. The whole-picture rules live in `otc-run-rules.md`. Note the second tier is **not error-hunting** — it is decision-making that needs everything visible (which word wins, is this reach-2, is this a merge); those calls simply cannot be made during a single OTC lens. So ...
+The inline rules live in the Ontology, Topology, and Choreography docs, in each lens's **"Rules this lens enforces"** list. The rules that run over the assembly draft live in `otc-run-rules.md`. Note the second moment is **not error-hunting** — it is decision-making that needs everything visible (which word wins, is this reach-2, is this a merge); those calls simply cannot be made during a single ...
```

Line 68

```diff
-    SLICE --> O["Ontology — the things (a list)"]
-    O --> T["Topology — the things placed in a tree"]
-    T --> C["Choreography — the tree animated with states and gates"]
+    SLICE --> O["Ontology — the candidates (a list)"]
+    O --> T["Topology — the candidates placed in a tree"]
+    T --> C["Choreography — the tree animated with states and flow relationships"]
```

Line 74

```diff
-    RECON --> RULES["Rules — 3 tests, weak-word, conflict kind, Add / Merge / Change"]
-    RULES --> G1{{"GATE 1 — picture, recommendations, questions"}}
+    RECON --> RULES["Rules — 3 tests, weak-word, conflict type, add / merge / change"]
+    RULES --> G1{{"GATE 1 — assembly draft, recommendations, questions"}}
```

Line 85

```diff
-## The same-thing test — why it lives here, not in a single OTC lens
+## The same-meaning test — why it lives here, not in a single lens
```

Line 87

```diff
-Deciding whether two words name one thing needs all three OTC lenses at once, so it sits in the binder rather than in any single OTC lens. Two words are the same **only if they agree on all three**: O — described as the same thing; T — sit in the same place, same parent and same kind; C — same states and same actions. If all three agree, it is one thing, and the method **proposes the merge**: in  ...
+Deciding whether two words have one meaning needs all three lenses at once, so it sits in the binder rather than in any single lens. Two words are the same **only if they agree on all three**: O — described with the same meaning; T — sit in the same place, same parent and same kind; C — same states and same actions. If all three agree, the two words have one meaning, and the method **proposes the ...
```

Line 89

```diff
-## Assembly — one picture per section, then joined across sections
+## Assembly — one section draft per section, then joined across sections
```

Line 91

```diff
-Because the OTC lenses build on each other, the picture is complete when Choreography finishes a section: **Ontology** put the boxes in (the things), **Topology** nested them (`contains`, `kind of`, `reveals`), and **Choreography** added the `also can be` states and the `locks / produces / comes-before` arrows. The same-thing test proposes merging synonyms into one box with an `Also written as` l ...
+Because the lenses build on each other, the section draft is complete when Choreography finishes a section: **Ontology** put the boxes in (the candidates), **Topology** nested them (`contains`, `kind of`, `reveals`), and **Choreography** added the `also can be` states and the `locks / produces / comes-before` arrows. The same-meaning test proposes merging synonyms into one box with an `Also writt ...
```

Line 93

```diff
-**Joining across sections.** The glossary is one shared set across every section, not per-section. So a term used in two sections is the **same node**. When section A's text links a local term to a term owned by section B (recognised as already `KNOWN` in the shared glossary), that **cross-section link** is recorded where the phrase appears. When the per-section pictures are then assembled, those ...
+**Joining across sections.** The glossary is one shared set across every section, not per-section. So a term used in two sections is the **same node**. When section A's text links a local term to a term owned by section B (recognised as already in the shared glossary), that **cross-section link** is recorded where the phrase appears. When the section drafts are then assembled, those shared terms  ...
```

Line 95

```diff
-## Re-scan — the methodology never starts from zero
+## Re-run — the methodology never starts from zero
```

Line 97

```diff
-On a re-scan, Ontology marks each thing `NEW` or `KNOWN` against the existing glossary, and the same-thing test may find a `KNOWN` thing appearing under a new word. The methodology *surfaces* these; `otc-run-rules.md` classifies each as one of:
+On a re-run, Ontology checks each candidate against the existing glossary, and the same-meaning test may find an existing term appearing under a new word. The methodology *surfaces* these; `otc-run-rules.md` classifies each as one of:
```

Line 99

```diff
-- **Add**
-- **Merge**
-- **Change**
-- **No change**
+- **add**
+- **merge**
+- **change**
+- **no change**
```

Line 110

```diff
-| read the document, find things and connections, assemble the picture | **the methodology** — this file plus Ontology / Topology / Choreography |
-| judge which terms qualify, classify conflicts, decide Add / Merge / Change | `otc-run-rules.md` |
-| the shape of the picture, the glossary entry, the decision register, the deltas | `output-formats.md` |
-| run the OTC lenses, hold the gates, write the files, keep state | the **skills** — harvest / check / change |
-| decide every conflict, keep or drop each proposed term, answer each question | the **person**, at a gate |
+| read the source, find candidates and connections, build the assembly draft | **the methodology** — this doc plus Ontology / Topology / Choreography |
+| judge which candidates qualify, classify conflicts, decide add / merge / change | `otc-run-rules.md` |
+| the shape of each section draft and the assembly draft, the glossary entry, the decision register, the deltas | `output-formats.md` |
+| run the lenses, hold the gates, write the files, keep state | the **skills** — harvest / check / change |
+| decide every conflict, keep or drop each candidate, answer each question | the **person**, at a gate |
```

### .skills/_shared/glossary/otc-run-rules.md

Reach counts sections. Conflict types and re-run outcomes written exactly as the lists. Gate rows, resolutions.

23 places changed.

Line 1

```diff
-# Rules — the whole-picture judgments
+# Rules — the judgments over the assembly draft
```

Line 3

```diff
-> **What this is** — the rules that need **every section in view**: which candidate terms qualify, how a weak word is improved, how conflicts are classified, how a re-scan is reconciled, and who decides at each gate.
-> **What it is not** — the **per-item rules**, which live in the Ontology, Topology, and Choreography docs (each OTC lens's "Rules this OTC lens enforces" list — four-kinds, drop-list, evidence quote, no "how" words, no-phrase-no-link). This file holds only what cannot be judged during a single OTC lens.
+> **What this is** — the rules that need **every section in view**: which candidates qualify, how a weak word is improved, how conflicts are classified, how a re-run is reconciled, and who decides at each gate.
+> **What it is not** — the **per-item rules**, which live in the Ontology, Topology, and Choreography docs (each lens's "Rules this lens enforces" list — four-kinds, drop-list, evidence quote, no "how" words, no-phrase-no-link). This file holds only what cannot be judged during a single lens.
```

Line 11

```diff
+> - words: `method-words.md`
```

Line 17

```diff
-Once, after the full OTC read, over the **whole assembled picture** — never candidate-by-candidate. Reach, conflicts, the weak-word recommendation, and the re-scan all need every section in view. This is **not error-hunting on a draft** — it is the set of decisions that can only be made once everything is on the table (which word wins, is a term reach-2, is this a merge). The per-item rules have  ...
+Once, after the full OTC read, over the **whole assembly draft** — never candidate-by-candidate. Reach, conflicts, the weak-word recommendation, and the re-run all need every section in view. This is **not error-hunting on a draft** — it is the set of decisions that can only be made once everything is on the table (which word wins, is a candidate reach-2, is this a merge). The per-item rules have ...
```

Line 23

```diff
-    IN["The assembled picture — all candidate terms + connections"] --> T1{"Passes the three tests?<br/>special meaning<br/>consequence<br/>reach"}
+    IN["The assembly draft — all candidates + connections"] --> T1{"Passes the three tests?<br/>special meaning<br/>consequence<br/>reach"}
```

Line 29

```diff
-    REC --> CONF["Classify conflicts — the five kinds"]
+    REC --> CONF["Classify conflicts — the five types"]
```

Line 31

```diff
-    CONF --> RES["Reconcile a re-scan — Add / Merge / Change / No change"]
+    CONF --> RES["Reconcile a re-run — add / merge / change / no change"]
```

Line 43

```diff
-| **reach** | is it used in more than one feature? | "source" — across Setup and Analysis | a word in a single sentence |
+| **reach** | is it used in more than one section? | "source" — across Setup and Analysis | a word in a single sentence |
```

Line 45

```diff
-- **Borderline reach** (used in one feature but several requirements — e.g. "gap") is **raised at the gate**, not decided here.
+- **Borderline reach** (used in one section but several requirements — e.g. "gap") is **raised at the gate**, not decided here.
```

Line 51

```diff
-If a qualifying term's source word is **weak**, propose one or two better words for the gate — never a silent swap.
+If a qualifying candidate's source word is **weak**, propose one or two better words for the gate — never a silent swap.
```

Line 57

```diff
-| overloaded | one word, several things | split or narrow |
+| overloaded | one word, several meanings | split or narrow |
```

Line 62

```diff
-## 3. The five conflict kinds
+## 3. The five conflict types
```

Line 66

```diff
-| Kind | Description | Example |
+| Type | Description | Example |
```

Line 68

```diff
-| several words, one thing | synonyms to collapse | quick scan<br>quick analysis<br>the scan |
-| one word, two meanings | a word to split or narrow | "source" (a repository) vs "engagement-wide sources" (reference material) |
+| several words, one meaning | synonyms to collapse | quick scan<br>quick analysis<br>the scan |
+| one word, several meanings | a word to split or narrow | "source" (a repository) vs "engagement-wide sources" (reference material) |
```

Line 71

```diff
-| collides with our own working words | a product word clashes with method vocabulary | product "module" (part of a domain) vs our "section" |
-| drift between documents | one thing named differently across files | EPIC "Adaptive Output" vs requirement "Case-driven output" |
+| clashes with a method word | a product word clashes with method vocabulary | product "module" (part of a domain) vs our "section" |
+| drift between sources | one meaning named differently across files | EPIC "Adaptive Output" vs requirement "Case-driven output" |
```

Line 74

```diff
-## 4. Reconciling a re-scan
+## 4. Reconciling a re-run
```

Line 80

```diff
-| **Add** | genuinely new — nothing covers it | yes |
-| **Merge** | the same thing under a new word | the naming choice does |
-| **Change** | an existing term's meaning has shifted | the wording does |
-| **No change** | already covered, same meaning | no — skipped |
+| **add** | genuinely new — nothing covers it | yes |
+| **merge** | the same meaning under a new word | the naming choice does |
+| **change** | an existing term's meaning has shifted | the wording does |
+| **no change** | already covered, same meaning | no — skipped |
```

Line 87

```diff
-The law **proposes**; the person **disposes**. It surfaces qualifying terms, weak-word recommendations, conflicts, and re-scan outcomes with evidence — and then stops. It never picks a winning word, never invents a meaning, and never answers a question on the person's behalf. A merge shown in the assembly draft is such a proposal: it carries the recommended word and names the Gate 1 row that deci ...
+The law **proposes**; the person **disposes**. It surfaces qualifying candidates, weak-word recommendations, conflicts, and re-run outcomes with evidence — and then stops. It never picks a winning word, never invents a meaning, and never answers a question on the person's behalf. A merge shown in the assembly draft is such a proposal: it carries the recommended word and names the Gate 1 row that  ...
```

Line 93

```diff
-| **Gate 1** — picture, recommendations, conflicts, questions | • the winning word in each conflict<br>• keep or drop each proposed term<br>• borderline-reach calls<br>• the answer to each question<br>• which groups become the families | pick a winner, resolve a conflict, or answer a question itself |
+| **Gate 1** — assembly draft, recommendations, conflicts, questions | • the winning word in each conflict<br>• keep or drop each candidate<br>• borderline-reach resolutions<br>• the answer to each question<br>• which groups become the families | pick a winner, resolve a conflict, or answer a question itself |
```

Line 96

```diff
-**The families are always a Gate 1 item**, even when the source's structure makes the answer look obvious: one question, applying to all sections, recommending which of the source's top-level groups become the families and in what order. Its settled row in the decision register is what every glossary file links to when it explains what a family is, so a reader can always see how the families were ...
+**The families are always a Gate 1 row**, even when the source's structure makes the answer look obvious: one question, applying to all sections, recommending which of the source's top-level groups become the families and in what order. Its settled row in the decision register is what every glossary page links to when it explains what a family is, so a reader can always see how the families were  ...
```

Line 98

```diff
-Gate 1 is presented in the shape `output-formats.md` sets out ("The Gate 1 review") — decision-items only, as tables, with evidence in every row and the question in its own row; never a re-dump of the picture. Every decision taken at a gate is written to the decision register (`output-formats.md`), so what overrode what stays auditable.
+Gate 1 is presented in the shape `output-formats.md` sets out ("The Gate 1 review") — gate rows only, as tables, with evidence in every row and the question in its own row; never a re-dump of the assembly draft. Every decision taken at a gate is written to the decision register (`output-formats.md`), so what overrode what stays auditable.
```

Line 102

```diff
-When a gate is raised, its review is written to the gate log (`output-formats.md`, "The gate log"), one row per item, each starting `open`. A gate is **not passed while any of its rows is `open`**: the tool must not write definitions (past Gate 1) or write the seven glossary files (past Gate 2) until every row is resolved — `accepted`, `overridden`, or `answered`. If the session ends with rows st ...
+When a gate is raised, its review is written to the gate log (`output-formats.md`, "The gate log"), one row per item, each starting `open`. A gate is **not passed while any of its rows is `open`**: the tool must not write definitions (past Gate 1) or write the seven glossary pages (past Gate 2) until every row is resolved — `accepted`, `overridden`, or `answered`. If the session ends with rows st ...
```

Line 104

```diff
-The gate is: block, confirm, move ahead. The tool presents each open item with its recommended action and the options; the person confirms or overrides; only then does the run move on. Where the person's intent is unclear, the tool asks one clarifying question and does not proceed on a guess. How the items are presented — section by section, recommendation first, never as an open question — is in ...
+The gate is: block, confirm, move ahead. The tool presents each open gate row with its recommendation and the options; the person confirms or overrides; only then does the run move on. Where the person's intent is unclear, the tool asks one clarifying question and does not proceed on a guess. How the gate rows are presented — section by section, recommendation first, never as an open question — i ...
```

### .skills/_shared/glossary/output-formats.md

Pages, candidates before Gate 1, 'Candidates dropped', the Cart/Basket row in plain meaning words, 'Changing a term' in list values (withdraw).

52 places changed.

Line 3

```diff
-> **What this is** — the shape and location of everything the method writes: the glossary files, one entry, the decision register, and how they link to the source.
-> **What it is not** — the method (the OTC lenses) or the law (`otc-run-rules.md`). This file is about shapes and homes only.
+> **What this is** — the shape and location of everything the method writes: the glossary pages, one entry, the decision register, and how they link to the source.
+> **What it is not** — the method (the lenses) or the law (`otc-run-rules.md`). This file is about shapes and homes only.
```

Line 9

```diff
+> - words: `method-words.md`
```

Line 15

```diff
-Give every output **one shape and one home**, so any run is diffable and entries, decisions, and the source stay linked. Blank versions of every file below live in **`../templates/`** — this doc shows how they are filled, with a small real example.
+Give every output **one shape and one home**, so any run is diffable and entries, decisions, and the source stay linked. Blank versions of every page below live in **`../templates/`** — this doc shows how they are filled, with a small real example.
```

Line 17

```diff
-> **Casing.** Every file this method writes follows one casing rule, G6 in `glossary-assembly-principles.md`: terms and family names in **sentence case**, acronyms in capitals, company and product names in their own form, relationship words in lower case. That covers the seven glossary files **and** everything in `deep-dives/` (the section drafts, the decisions files, the assembly draft, and the  ...
+> **Casing.** Every page this method writes follows one casing rule, G6 in `glossary-assembly-principles.md`: terms and family names in **sentence case**, acronyms in capitals, company and product names in their own form, relationship words in lower case. That covers the seven glossary pages **and** everything in `deep-dives/` (the section drafts, the decisions files, the assembly draft, and the  ...
```

Line 19

```diff
-## Where things live — four buckets
+## Where everything lives — four buckets
```

Line 25

```diff
-| Glossary (the deliverable) | `Output/glossary/` — the seven files | the **finished** glossary: what a reader looks things up in | the deliverable |
+| Glossary (the deliverable) | `Output/glossary/` — the seven pages | the **finished** glossary: where a reader looks up a term | the deliverable |
```

Line 28

```diff
-**How they relate, in one line:** you build each section's draft in its `deep-dives/<section>/` folder; at the gates, the settled terms and decisions are written into the seven glossary files, using the blank shapes from `templates/`. The seven files are *the result*; `deep-dives/` is *how you got there* and the proof behind every entry. A reader starts with the seven files and opens `deep-dives/ ...
+**How they relate, in one line:** you build each section's draft in its `deep-dives/<section>/` folder; at the gates, the settled terms and decisions are written into the seven glossary pages, using the blank shapes from `templates/`. The seven pages are *the result*; `deep-dives/` is *how you got there* and the proof behind every entry. A reader starts with the seven pages and opens `deep-dives/ ...
```

Line 32

```diff
-    ROOT["Source documents (read-only)"] -->|read by| DEEP["deep-dives/ (section drafts, assembly draft, gate log)"]
-    TPL["templates/ (blank shapes)"] -->|filled into| OUT["Output/glossary/ (the seven files)"]
+    ROOT["Sources (read-only)"] -->|read by| DEEP["deep-dives/ (section drafts, assembly draft, gate log)"]
+    TPL["templates/ (blank shapes)"] -->|filled into| OUT["Output/glossary/ (the seven pages)"]
```

Line 43

```diff
-| one | `Output/glossary/` — the seven files, with `deep-dives/` inside it |
+| one | `Output/glossary/` — the seven pages, with `deep-dives/` inside it |
```

Line 95

```diff
-A run decides what it is facing by looking for the **seven glossary files**, never by whether the folder is empty — `deep-dives/` fills up long before the seven files exist, so a folder test would mistake an unfinished run for a finished one.
+A run decides what it is facing by looking for the **seven glossary pages**, never by whether the folder is empty — `deep-dives/` fills up long before the seven pages exist, so a folder test would mistake an unfinished run for a finished one.
```

Line 100

```diff
-| `deep-dives/` exists, but not the seven files | **resumed build** | an earlier run stopped part-way; continue from the `open` rows in `deep-dives/gate-log.md` |
-| all seven files | **re-run** | read the source again and compare against the existing glossary (Add / Merge / Change / No change). If `deep-dives/` is missing — for example a glossary built before this layout — say so and start a fresh one; the decision register still holds the history |
+| `deep-dives/` exists, but not the seven pages | **resumed build** | an earlier run stopped part-way; continue from the `open` rows in `deep-dives/gate-log.md` |
+| all seven pages | **re-run** | read the source again and compare against the existing glossary (add / merge / change / no change). If `deep-dives/` is missing — for example a glossary built before this layout — say so and start a fresh one; the decision register still holds the history |
```

Line 105

```diff
-## The output — the glossary files
+## The output — the glossary pages
```

Line 107

```diff
-The deliverable in `Output/glossary/`, each file a filled copy of its `templates/` blank:
+The deliverable in `Output/glossary/`, each page a filled copy of its `templates/` blank:
```

Line 121

```diff
-When this method says "the seven files", it means the seven above, not `deep-dives/`. The check and disposition skills read only the seven files.
+When this method says "the seven pages", it means the seven above, not `deep-dives/`. The check and disposition skills read only the seven pages.
```

Line 125

```diff
-The reader-facing entry shape is defined in `glossary-assembly-principles.md`, not here: the columns each kind uses are set in that kind's Part B section and written in its template in `templates/`, cased per G6. This file governs the deep-dives, the run root, the decision register, and the gate log; it does not fix the deliverable's entry table.
+The reader-facing entry shape is defined in `glossary-assembly-principles.md`, not here: the columns each kind uses are set in that kind's Part B rules and written in its template in `templates/`, cased per G6. This file governs the deep-dives, the run root, the decision register, and the gate log; it does not fix the deliverable's entry table.
```

Line 139

```diff
-- **No feature number needed** — *Where* falls back to the section, which always exists. D-2 above comes from a document with no features and is filed the same way.
+- **No feature number needed** — *Where* falls back to the section, which always exists. D-2 above comes from a source with no features and is filed the same way.
```

Line 148

```diff
-| `deep-dives/gate-log.md` | **How was it decided?** | every item raised at a gate — the evidence, the options, the recommendation, and the person's call with its date. Nothing is ever deleted. | harvest at Gate 1 and Gate 2; disposition for later changes |
+| `deep-dives/gate-log.md` | **How was it decided?** | every item raised at a gate — the evidence, the options, the recommendation, and the person's resolution, with its date. Nothing is ever deleted. | harvest at Gate 1 and Gate 2; disposition for later changes |
```

Line 150

```diff
-| `deep-dives/<section>/<section>-decisions.md` | **What happened to this section's words?** | one row per term in that section's draft: kept, renamed, merged, dropped, or pending, with the word now used in the glossary and a link to the `D-n` row | harvest when it writes the glossary; disposition updates the rows a change touches |
+| `deep-dives/<section>/<section>-decisions.md` | **What happened to this section's words?** | one row per candidate in that section's draft: kept, renamed, merged, dropped, or pending, with the word now used in the glossary and a link to the `D-n` row | harvest when it writes the glossary; disposition updates the rows a change touches |
```

Line 156

```diff
-A term's row in its kind document always shows the current word and the current definition. Nothing is deleted: an earlier word moves to that document's **Terms replaced or retired over time** table ([G8](glossary-assembly-principles.md#g8)), and earlier wording stays in the gate log and the register.
+A term's row in its kind page always shows the current word and the current definition. Nothing is deleted: an earlier word moves to that page's **Terms replaced or retired over time** table ([G8](glossary-assembly-principles.md#g8)), and earlier wording stays in the gate log and the register.
```

Line 160

```diff
-| **Rename** | the row shows the new word, meaning unchanged; the old word gets a row in Terms replaced or retired over time, with What happened `renamed` |
-| **Redefine** | the row's What it is shows the new definition; the old wording is quoted in the change row of the gate log and noted in the register row's Basis; the term keeps its name, so it gets no history row |
-| **Split** | the row becomes two rows, each with its own What it is and Relationship to the term above; the old word gets a history row, What happened `split`, with both new terms in Use now |
-| **Retire** | the row leaves its table and the word gets a history row, What happened `retired`, Use now `-` |
-| **Merge** | the merged term's row goes; the term it merged into keeps its row; the merged word gets a history row, What happened `merged` |
+| rename | the row shows the new word, meaning unchanged; the old word gets a row in Terms replaced or retired over time, with What happened `renamed` |
+| redefine | the row's What it is shows the new definition; the old wording is quoted in the change row of the gate log and noted in the register row's Basis; the term keeps its name, so it gets no history row |
+| split | the row becomes two rows, each with its own What it is and Relationship to the term above; the old word gets a history row, What happened `split`, with both new terms in Use now |
+| withdraw | the row leaves its table and the word gets a history row, What happened `withdrawn`, Use now `-` |
+| merge | the merged term's row goes; the term it merged into keeps its row; the merged word gets a history row, What happened `merged` |
```

Line 172

```diff
-    ROOT["Root docs (upstream, read-only): requirements + features"] -->|harvested into| GLOSS["Glossary (downstream): the term entries"]
+    ROOT["Sources (upstream, read-only): requirements + features"] -->|harvested into| GLOSS["Glossary (downstream): the term entries"]
```

Line 185

```diff
-| `deep-dives/<section>/<section>-glossary.md` | the section's draft — its terms, tree, and gates, built across the three OTC lenses. It keeps the **source's own words** after the gates, because it is the evidence; the decisions file beside it gives the glossary's word for each |
+| `deep-dives/<section>/<section>-glossary.md` | the section's draft — its candidates, tree, and gates, built across the three lenses. It keeps the **source's own words** after the gates, because it is the evidence; the decisions file beside it gives the glossary's word for each |
```

Line 187

```diff
-| `deep-dives/glossary-assembly-draft.md` | the joined picture across all sections |
-| `deep-dives/gate-log.md` | every gate item and how it was decided (see "The gate log") |
+| `deep-dives/glossary-assembly-draft.md` | the assembly draft, joining all section drafts |
+| `deep-dives/gate-log.md` | every gate row and how it was decided (see "The gate log") |
```

Line 194

```diff
-`<section>-decisions.md` is written once the gates are passed, from the decision register; until then it holds its opening, one line - `None yet - written once the gates are passed.` - and its related pages. It has one table, with one row for **every** term in the section's draft, in the draft's order:
+`<section>-decisions.md` is written once the gates are passed, from the decision register; until then it holds its opening, one line - `None yet - written once the gates are passed.` - and its related pages. It has one table, with one row for **every** candidate in the section's draft, in the draft's order:
```

Line 198

```diff
-| Term in this draft | the word exactly as this section's draft has it |
+| Candidate in this draft | the word exactly as this section's draft has it |
```

Line 201

```diff
-| Decision | a link to the register row, `[D-n](../../decision-register.md#d-n)`; or the test it failed, when it was dropped without a gate item (for example `failed reach`); or `-` when it was kept unchanged without a contest |
+| Decision | a link to the register row, `[D-n](../../decision-register.md#d-n)`; or the test it failed, when it was dropped without a gate row (for example `failed reach`); or `-` when it was kept unchanged without a contest |
```

Line 212

```diff
-`deep-dives/<section>/<section>-glossary.md` is one section of the source, read through the three OTC lenses. It is written by filling `templates/section-glossary.md`, and kept as the evidence behind every glossary entry from this section. It contains exactly this, in this order:
+`deep-dives/<section>/<section>-glossary.md` is one section of the source, read through the three lenses. It is written by filling `templates/section-glossary.md`, and kept as the evidence behind every glossary entry from this section. It contains exactly this, in this order:
```

Line 216

```diff
-| Opening | • the title `Section draft - <section name>`<br>• one paragraph: which part of the source this is, and what the file holds<br>• the source it was read from: file, sheet or heading, and item ids<br>• **Contents**, each part a link<br>• **How to read this document**: one line linking to the fixed block in `README.md`, then the columns and relationship words this file uses |
-| 1. The terms found (ontology) | one table per kind, each term with its meaning and an exact quote:<br>• objects<br>• roles<br>• steps<br>• states and values |
-| 2. How they fit together (topology) | • the tree<br>• the picture<br>• the level table<br>• terms that also belong elsewhere<br>• every relationship, as a table, with "reads as" and the quote that states it |
-| 3. How they move (choreography) | • the states each thing can be in<br>• the flow, step by step<br>• every flow relationship, as a table, with "reads as" and the quote<br>• the picture |
-| 4. Conflicts noticed in this section | words that look like several names for one thing, or one word with several meanings, within this section only - for the assembly to weigh across sections |
+| Opening | • the title `Section draft - <section name>`<br>• one paragraph: which part of the source this is, and what the page holds<br>• the source it was read from: file, sheet or heading, and item ids<br>• **Contents**, each part a link<br>• **How to read this page**: one line linking to the fixed block in `README.md`, then the columns and relationship words this page uses |
+| 1. The candidates found (ontology) | one table per kind, each candidate with its meaning and an exact quote:<br>• objects<br>• roles<br>• steps<br>• states and values |
+| 2. How they fit together (topology) | • the tree<br>• the picture<br>• the level table<br>• candidates that also belong elsewhere<br>• every relationship, as a table, with "reads as" and the quote that states it |
+| 3. How they move (choreography) | • the states each candidate can be in<br>• the flow, step by step<br>• every flow relationship, as a table, with "reads as" and the quote<br>• the picture |
+| 4. Conflicts noticed in this section | words that look like several names for one meaning, or one word with several meanings, within this section only - for the assembly to weigh across sections |
```

Line 224

```diff
-The draft follows [G4](glossary-assembly-principles.md#g4) - each numbered part opens with the four-line explainer, each table, tree, and picture inside it with one plain line - and [G5](glossary-assembly-principles.md#g5): placement, the level table (`L1 | ... | Ln | Relationship to the term above | Kind`, with no home-family column, since a section draft is one section), the lookup with its fix ...
+The draft follows [G4](glossary-assembly-principles.md#g4) - each numbered part opens with the four-line explainer, each table, tree, and picture inside it with one plain line - and [G5](glossary-assembly-principles.md#g5): placement, the level table (`L1 | ... | Ln | Relationship to the candidate above | Kind`, with no home-family column, since a section draft is one section), the lookup with it ...
```

Line 227

```diff
-- Terms are cased per G6 in `glossary-assembly-principles.md`, in tables, trees and picture labels alike, so a word looks the same here as in the seven glossary files. Quotes stay exactly as the source has them.
+- Candidates are cased per G6 in `glossary-assembly-principles.md`, in tables, trees and picture labels alike, so a word looks the same here as in the seven glossary pages. Quotes stay exactly as the source has them.
```

Line 229

```diff
-- Level and relationship rows carry no column listing the sections a relationship appears in; which section a term comes from is recorded once, in the term's source (`lens2-topology.md`, "Relationships across features and modules").
+- Level and relationship rows carry no column listing the sections a relationship appears in; which section a term comes from is recorded once, in the term's source (`lens2-topology.md`, "Relationships across sections").
```

Line 233

```diff
-`deep-dives/glossary-assembly-draft.md` is the joined picture of the whole source: the section drafts put together, so a term several sections use appears once. It is written before Gate 1 by filling `templates/glossary-assembly-draft.md`, and kept afterwards as evidence. It holds **no decisions** — every question it raises is a row in the gate log.
+`deep-dives/glossary-assembly-draft.md` is the assembly draft of the whole source: the section drafts put together, so a candidate several sections use appears once. It is written before Gate 1 by filling `templates/glossary-assembly-draft.md`, and kept afterwards as evidence. It holds **no decisions** — every question it raises is a row in the gate log.
```

Line 239

```diff
-| Opening | • a status line: proposed before Gate 1, or updated after it<br>• one paragraph on what the file is<br>• the sections joined, as links to their folders<br>• **Contents**, each part a link<br>• **How to read this document**: one line linking to the fixed block in `README.md`, then the columns and relationship words this file uses | - |
-| 1. The joined hierarchy | • the joined level table - the section draft's level table, joined across sections - with a proposed merge written in its row<br>• terms that also belong elsewhere, with the fixed takeaways<br>• the proposed merges<br>• things not placed in the hierarchy | • the hierarchy, the lookup, and the family views in `terms-and-relationships.md`<br>• the groups in `object-terms ...
-| 2. The joined flow | • the flow, step by step<br>• every flow relationship, as a table, with "reads as"<br>• the picture<br>• the states each thing can be in | • the flow in `step-terms.md`<br>• `states-and-values.md` |
-| 3. Terms left out | each candidate term that failed one of the three tests, with its section, the test it failed, and a one-line reason with a quote | the `dropped` rows in each section's decisions file |
+| Opening | • a status line: proposed before Gate 1, or updated after it<br>• one paragraph on what the page is<br>• the sections joined, as links to their folders<br>• **Contents**, each part a link<br>• **How to read this page**: one line linking to the fixed block in `README.md`, then the columns and relationship words this page uses | - |
+| 1. The joined hierarchy | • the joined level table - the section draft's level table, joined across sections - with a proposed merge written in its row<br>• candidates that also belong elsewhere, with the fixed takeaways<br>• the proposed merges<br>• candidates not placed in the hierarchy | • the hierarchy, the lookup, and the family views in `terms-and-relationships.md`<br>• the groups in `obj ...
+| 2. The joined flow | • the flow, step by step<br>• every flow relationship, as a table, with "reads as"<br>• the picture<br>• the states each candidate can be in | • the flow in `step-terms.md`<br>• `states-and-values.md` |
+| 3. Candidates dropped, and why | each candidate that failed one of the three tests, with its section, the test it failed, and a one-line reason with a quote | the `dropped` rows in each section's decisions file |
```

Line 249

```diff
-- a table of sections or features that describe the same thing
-- a table of join points - a term shared by sections is one row in the joined hierarchy, which already shows the join
+- a table of sections or features that overlap
+- a table of join points - a candidate shared by sections is one row in the joined hierarchy, which already shows the join
```

Line 252

```diff
-- weak words, conflicts, questions, or any other gate item - their only home is the gate log
+- weak words, conflicts, questions, or any other gate row - their only home is the gate log
```

Line 254

```diff
-**Proposed merges.** Where sections use several words for what the same-thing test (`otc-methodology.md`) finds to be one thing, the draft shows **one row**, labelled with the recommended word and the others after it: `Cart (also written as: basket)`. The merge is a **proposal**: the proposed-merges table lists each one with the gate-log row that decides it, and the person confirms or rejects it  ...
+**Proposed merges.** Where sections use several words for what the same-meaning test (`otc-methodology.md`) finds to be one meaning, the draft shows **one row**, labelled with the recommended word and the others after it: `Cart (also written as: basket)`. The merge is a **proposal**: the proposed-merges table lists each one with the gate-log row that decides it, and the person confirms or overrid ...
```

Line 258

```diff
-Gate 1 shows **only what needs a decision** — never a re-listing of the whole picture (the picture is in the assembly draft; repeating it is noise). Clean terms simply pass and are not shown. The items fall into four tables, always in this order:
+Gate 1 shows **only what needs a decision** — never a re-listing of the assembly draft (repeating it is noise). Clean candidates simply pass and are not shown. The items fall into four tables, always in this order:
```

Line 262

```diff
-| **Conflicts** | one thing with several names (including every proposed merge in the assembly draft), or one word with several meanings - one of the five conflict kinds in `otc-run-rules.md` | which word the glossary uses, or whether two words are one thing |
+| **Conflicts** | one meaning with several names (including every proposed merge in the assembly draft), or one word with several meanings - one of the five conflict types in `otc-run-rules.md` | which word the glossary uses, or whether two words have one meaning |
```

Line 264

```diff
-| **Terms to judge** | a term with borderline reach, or one we propose that the source does not name | keep it or drop it |
+| **Candidates to judge** | a candidate with borderline reach, or one we propose that the source does not name | keep it or drop it |
```

Line 267

```diff
-**Every row uses the same columns.** Five of them are the first five fields of "How the gate is answered" below, under exactly the same names, so the file reads like the item shown inline. The sixth field, **Left to clear**, only tells the person how far through they are, so it is shown inline and never written to the file:
+**Every row uses the same columns.** Five of them are the first five fields of "How the gate is answered" below, under exactly the same names, so the page reads like the item shown inline. The sixth field, **Left to clear**, only tells the person how far through they are, so it is shown inline and never written to the file:
```

Line 275

```diff
-| G1-03 | All sections | Are "cart" and "basket" the same thing, and if so, which word should the glossary use? | • [checkout](checkout/): "items stay in the cart until payment"<br>• [catalogue](catalogue/): "add the item to your basket"<br>• both hold items a shopper means to buy, sit under the shopper, and empty at payment, so the same-thing test finds one thing | **Yes, one thing: use "Cart".* ...
+| G1-03 | All sections | Do "cart" and "basket" have the same meaning, and if so, which word should the glossary use? | • [checkout](checkout/): "items stay in the cart until payment"<br>• [catalogue](catalogue/): "add the item to your basket"<br>• both hold items a shopper means to buy, sit under the shopper, and empty at payment, so the same-meaning test finds one meaning | **Yes, one term: use ...
```

Line 284

```diff
-- **No re-dump.** Terms that pass cleanly are not listed.
+- **No re-dump.** Candidates that pass cleanly are not listed.
```

Line 288

```diff
-The Gate review above is what a person is *shown*; the **gate log** is what is *kept*. A human checkpoint that lives only in the transcript scrolls away, cannot be reopened, and can be half-answered without anyone noticing. The gate log fixes that: it is written the moment a gate is raised, so the one thing the person must act on becomes the most durable artifact in the run, not the least.
+The Gate review above is what a person is *shown*; the **gate log** is what is *kept*. A gate that lives only in the transcript scrolls away, cannot be reopened, and can be half-answered without anyone noticing. The gate log fixes that: it is written the moment a gate is raised, so what the person must act on becomes the most durable artifact in the run, not the least.
```

Line 290

```diff
-**Home.** `deep-dives/gate-log.md`, one per glossary (see "The run root"). It is **kept** with the glossary: it is the full story of how every decision was taken. It is the only place the gate items are written — the assembly draft does not carry a copy.
+**Home.** `deep-dives/gate-log.md`, one per glossary (see "The run root"). It is **kept** with the glossary: it is the full story of how every decision was taken. It is the only place the gate rows are written — the assembly draft does not carry a copy.
```

Line 292

```diff
-**Shape.** One file, filled from `templates/gate-log.md`. It opens with what the file is, how to read it, and how to answer. Then a part per gate: `Gate 1`, `Gate 2`, and one `Change - <date>` part each time disposition changes the glossary later; a re-run adds its own `Re-run - <date>` part. A `Change` part has one table with the Gate 1 columns, its rows numbered `CH-01` onwards. A `Re-run` part ...
+**Shape.** One page, filled from `templates/gate-log.md`. It opens with what the page is, how to read it, and how to answer. Then a part per gate: `Gate 1`, `Gate 2`, and one `Change - <date>` part each time disposition changes the glossary later; a re-run adds its own `Re-run - <date>` part. A `Change` part has one table with the Gate 1 columns, its rows numbered `CH-01` onwards. A `Re-run` part ...
```

Line 296

```diff
-**Every part and every table opens with the four-line explainer** of [G4](glossary-assembly-principles.md#g4), so a reader who opens the file cold knows what to do:
-- **What you're reading** - what kind of item the part or table holds, in everyday words.
+**Every part and every table opens with the four-line explainer** of [G4](glossary-assembly-principles.md#g4), so a reader who opens the page cold knows what to do:
+- **What you're reading** - what sort of item the part or table holds, in everyday words.
```

Line 299

```diff
-- **What to do with it** - the action expected of the reader.
+- **What to do with it** - what the reader is expected to do.
```

Line 328

```diff
-| **What changes if you take it** | the downstream cost, before the call | the effect on the glossary (which words retire, what is renamed or redefined) and the ripple to documents that use the term; where an alternative costs differently, say so |
+| **What changes if you take it** | the downstream cost, before the resolution | the effect on the glossary (which words retire, what is renamed or redefined) and the ripple to documents that use the term; where an alternative costs differently, say so |
```

Line 331

```diff
-**Surface.** The gate is answered **inline** — presented and replied to in the conversation, item by item. The durable record is the gate log file (`gate-log.md`), never the transcript; the inline exchange is only how the person works through it, and the file is what a resumed run reads. Where a fuller view helps, the same gate log may be opened as a document, but the file stays the record and in ...
+**Surface.** The gate is answered **inline** — presented and replied to in the conversation, item by item. The durable record is the gate log file (`gate-log.md`), never the transcript; the inline exchange is only how the person works through it, and the page is what a resumed run reads. Where a fuller view helps, the same gate log may be opened as a document, but the page stays the record and in ...
```

Line 342

```diff
-  - **Issue** is one of the four things check looks for:
+  - **Issue** is one of the four problems check looks for:
```

Line 346

```diff
-    - two words for one thing
-  - **Next best action** is one of disposition's three outcomes:
+    - two words for one meaning
+  - **Next best action** is one of the three next best actions disposition can take:
```

Line 353

```diff
-**Re-scan delta** (the glossary already exists): each candidate is `Add`, `Merge`, `Change`, or `No change` (defined in `otc-run-rules.md`); it is carried by the Re-scan column of each section draft and the Re-run part of the gate log.
+**Re-run delta** (the glossary already exists): each candidate is `add`, `merge`, `change`, or `no change` (defined in `otc-run-rules.md`); it is carried by the Re-run column of each section draft and the Re-run part of the gate log.
```

### .skills/_shared/glossary/sweep-builder-brief.md

10 places changed.

Line 3

```diff
-> **What this is** — the standing brief a `@glossary-sweep` **assembly agent** is handed: join the section drafts of one assembly scope, apply the whole-picture rules, and produce the review package for `@harvest`.
-> **What it is not** — the whole-picture law (`otc-run-rules.md`) or the layout law (`glossary-assembly-principles.md`); this brief points at those, it does not restate them. Not the gates and not the `Output/` write — those are `@harvest`'s, in the main thread.
+> **What this is** — the standing brief a `@glossary-sweep` **assembly agent** is handed: join the section drafts of one assembly scope, apply the rules over the assembly draft, and produce the Gate 1 rows for `@harvest`.
+> **What it is not** — the law applied over the assembly draft (`otc-run-rules.md`) or the layout law (`glossary-assembly-principles.md`); this brief points at those, it does not restate them. Not the gates and not the `Output/` write — those are `@harvest`'s, in the main thread.
```

Line 10

```diff
-> - the sweep: `../../../skill-orchestration.md` (section 3)
+> - the sweep: `../../../skill-orchestration.md` (part 3)
+> - words: `method-words.md`
```

Line 15

```diff
-Join your scope's section drafts into one picture, run the whole-picture rules over it, and hand `@harvest` a review package — you assemble and recommend; you do not gate or write `Output/`.
+Join your scope's section drafts into the assembly draft, run the rules over it, and hand `@harvest` the Gate 1 rows — you assemble and recommend; you do not gate or write `Output/`.
```

Line 18

```diff
-- You own **one assembly scope** — the set of section drafts that assemble into a single glossary, assigned at spawn. A run with one glossary has one assembler; a run split into several glossaries (for example one per source document) has one of you per glossary.
+- You own **one assembly scope** — the set of section drafts that assemble into a single glossary, assigned at spawn. A run with one glossary has one assembler; a run split into several glossaries (for example one per source) has one of you per glossary.
```

Line 23

```diff
-1. **Join.** Stitch the section pictures into one, joining on shared terms as `otc-methodology.md` ("Joining across sections", "Assembly") describes — a term used in two sections is the same node.
-2. **Whole-picture rules.** Over the assembled picture, once, apply `otc-run-rules.md`:
+1. **Join.** Stitch the section drafts into one, joining on shared candidates as `otc-methodology.md` ("Joining across sections", "Assembly") describes — a candidate used in two sections is the same node.
+2. **Rules over the assembly draft.** Once, apply `otc-run-rules.md`:
```

Line 30

```diff
-   - the five conflict kinds
-   - on a re-run, Add / Merge / Change against the existing seven glossary files
-3. **Lay out.** Fill `templates/glossary-assembly-draft.md` exactly as `output-formats.md` ("What the assembly draft must contain") sets out: the opening and three parts, nothing else. Where the same-thing test (`otc-methodology.md`) finds several words for one thing, show one box under the recommended word, list it in part 1c with its gate-log row, and raise that row in the gate log. Apply G5 (d ...
+   - the five conflict types
+   - on a re-run, add / merge / change against the existing seven glossary pages
+3. **Lay out.** Fill `templates/glossary-assembly-draft.md` exactly as `output-formats.md` ("What the assembly draft must contain") sets out: the opening and three parts, nothing else. Where the same-meaning test (`otc-methodology.md`) finds several words for one meaning, show one box under the recommended word, list it in part 1c with its gate-log row, and raise that row in the gate log. Apply G ...
```

Line 37

```diff
-Then write the **review package** for the gate as the `Gate 1` part of **`deep-dives/gate-log.md`**, filling `templates/gate-log.md`, every row `open` — decision-items only, in the shape `output-formats.md` ("The Gate 1 review — what a person is shown", "The gate log") sets out: conflicts, weak-word recommendations, terms to judge, and (on a re-run) the deltas. Every row carries its evidence; eve ...
+Then write the **Gate 1 rows** as the `Gate 1` part of **`deep-dives/gate-log.md`**, filling `templates/gate-log.md`, every row `open` — gate rows only, in the shape `output-formats.md` ("The Gate 1 review — what a person is shown", "The gate log") sets out: conflicts, weak-word recommendations, candidates to judge, and (on a re-run) the deltas. Every row carries its evidence; every question sits ...
```

Line 42

```diff
-- write any of the seven glossary files, write a section's decisions file, or rename any file or identifier — that is `@harvest`'s work after the gates. In `Output/glossary/` you write only the two `deep-dives/` files named above.
+- write any of the seven glossary pages, write a section's decisions file, or rename any file or identifier — that is `@harvest`'s work after the gates. In `Output/glossary/` you write only the two `deep-dives/` files named above.
```

Line 50

```diff
-`@harvest` then runs the gates in the main thread, writes the definitions, and produces the seven glossary files.
+`@harvest` then runs the gates in the main thread, writes the definitions, and produces the seven glossary pages.
```

Line 53

```diff
-This brief is **source** — permanent, read-only, in `_shared/glossary/`. Never copy it, or any method file, into `Output/`.
+This brief is a **method doc** — permanent, read-only, in `_shared/glossary/`. Never copy it, or any method file, into `Output/`.
```

### .skills/_shared/glossary/sweep-reader-brief.md

10 places changed.

Line 3

```diff
-> **What this is** — the standing brief a `@glossary-sweep` **section agent** is handed: read one assigned section with the three OTC lenses and write its draft. One agent, one section, run in parallel with the others.
-> **What it is not** — the method (the OTC lenses in `lens1-ontology.md` / `lens2-topology.md` / `lens3-choreography.md`); this brief points at those, it does not restate them. Not the whole-picture judgment and not the gates — neither is a section agent's job.
+> **What this is** — the standing brief a `@glossary-sweep` **section agent** is handed: read one assigned section with the three lenses and write its draft. One agent, one section, run in parallel with the others.
+> **What it is not** — the method (the lenses in `lens1-ontology.md` / `lens2-topology.md` / `lens3-choreography.md`); this brief points at those, it does not restate them. Not the judgment over the assembly draft and not the gates — neither is a section agent's job.
```

Line 12

```diff
-> - the sweep: `../../../skill-orchestration.md` (section 3)
+> - the sweep: `../../../skill-orchestration.md` (part 3)
+> - words: `method-words.md`
```

Line 17

```diff
-Run the three OTC lenses over your one section and write its draft — nothing judged across sections, nothing gated.
+Run the three lenses over your one section and write its draft — nothing judged across sections, nothing gated.
```

Line 25

```diff
-Run the OTC lenses in order, applying each lens's own inline rules as you go:
-1. `lens1-ontology.md` — find the things in your section (the candidate terms); four-kinds keep and drop-list applied inline.
-2. `lens2-topology.md` — arrange them into a tree (`contains`, `kind of`, `reveals`); the no-phrase-no-link rule applied inline.
-3. `lens3-choreography.md` — animate the tree with states and gates; the no-phrase-no-gate rule applied inline.
+Run the lenses in order, applying each lens's own inline rules as you go:
+1. `lens1-ontology.md` — find the candidates in your section; four-kinds keep and drop-list applied inline.
+2. `lens2-topology.md` — arrange them into a tree (`contains`, `kind of`, `reveals`); the no-phrase-no-relationship rule applied inline.
+3. `lens3-choreography.md` — animate the tree with states and flow relationships; the no-phrase-no-relationship rule applied inline.
```

Line 30

```diff
-On a re-run, mark each thing `NEW` or `KNOWN` against the existing seven glossary files as `lens1-ontology.md` says — but do **not** classify Add / Merge / Change; that is a whole-picture call made at assembly.
+On a re-run, mark each candidate `add` or `no change` against the existing seven glossary pages as `lens1-ontology.md` says — but do **not** settle the final add / merge / change; that is settled over the assembly draft.
```

Line 37

```diff
-| 1. The terms found | `lens1-ontology.md`: the term tables, by kind |
+| 1. The candidates found | `lens1-ontology.md`: the candidate tables, by kind |
```

Line 43

```diff
-No narration beyond the explainers the template asks for — the tables, trees and pictures are the content. A draft missing any part is incomplete. Terms are cased per G6 (`glossary-assembly-principles.md`) in tables, trees and picture labels alike; quotes stay exactly as the source has them. Create `deep-dives/<section>/<section>-decisions.md` from `templates/section-decisions.md`, holding only i ...
+No narration beyond the explainers the template asks for — the tables, trees and pictures are the content. A draft missing any part is incomplete. Candidates are cased per G6 (`glossary-assembly-principles.md`) in tables, trees and picture labels alike; quotes stay exactly as the source has them. Create `deep-dives/<section>/<section>-decisions.md` from `templates/section-decisions.md`, holding o ...
```

Line 47

```diff
-- run the whole-picture rules (`otc-run-rules.md`) — the three tests, the weak-word recommendation, conflict classification, and Add / Merge / Change all need every section in view, so they belong to assembly, not to you.
+- run the rules over the assembly draft (`otc-run-rules.md`) — the three tests, the weak-word recommendation, conflict classification, and add / merge / change all need every section in view, so they belong to assembly, not to you.
```

Line 55

```diff
-- a term count by kind
+- a candidate count by kind
```

Line 61

```diff
-This brief is **source** — permanent, read-only, in `_shared/glossary/`. Never copy it, or any method file, into `Output/`.
+This brief is a **method doc** — permanent, read-only, in `_shared/glossary/`. Never copy it, or any method file, into `Output/`.
```

### .skills/_shared/glossary/templates/README.md

New 'How this glossary was built' paragraph; the fixed block copied from method-words.md; Source and Page columns; 'Pages and reading order'.

15 places changed.

Line 1

```diff
-<!-- Assembled per glossary-assembly-principles.md - Part B: README. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
+<!-- Assembled per glossary-assembly-principles.md - Part B: README. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this doc", rule 3). Words: method-words.md. -->
```

Line 7

```diff
+**How this glossary was built.** The sources were read one section at a time, three ways: what each section names (Ontology), how those fit together (Topology), and how they move from one stage or state to the next (Choreography). The candidates were joined across sections, and a person settled every contested word at two gates: first the words, then their definitions. The evidence behind every e ...
+
```

Line 10

```diff
-**Term** - a word or phrase that has one agreed meaning in <product>. It is in the glossary because it passed three tests: its meaning here differs from everyday use, misreading it would change what is built or tested, and it is used in more than one part of the product.
+These words mean the same on every page. They are copied from the method's word list, `method-words.md`.
+
+| Word | Means |
+|---|---|
+| Source | A document the glossary is built from. It is read, never changed. |
+| Section | One part of a source, read on its own, taken from the source's own headings, in source order, and fixed before reading starts. Not the same as a family: a section is how we read. |
+| Candidate | A word Ontology keeps for judging. It is not yet a term. |
+| The three tests | The tests a candidate must all pass to become a term:<br>• special meaning<br>• consequence<br>• reach |
+| Term | A candidate that passed the three tests and Gate 1. Gate 2 then agrees its definition. |
+| Kind | Which of the four kinds a term is. Not the same as the relationship word "kind of". |
+| Family | A group of terms the glossary's pages are arranged by, decided at Gate 1, usually from the source's top-level groups. Not the same as a section: a family is how a reader browses. |
+| Gate | A point where a person decides. The run stops until every gate row is resolved. |
+| Level | How far down the hierarchy a term sits, written L1, L2 and so on. L1 is the top. |
```

Line 12

```diff
-**Kind** - every term is exactly one of four kinds:
+**The four kinds:**
```

Line 14

```diff
-| Kind | What it is | Defined in |
+| Kind | Means | Defined in |
```

Line 16

```diff
-| object | a thing the product stores, shows, or acts on | [object-terms.md](object-terms.md) |
-| role | a kind of person | [role-terms.md](role-terms.md) |
-| step | a stage of the work | [step-terms.md](step-terms.md) |
-| state or value | a condition a thing can be in, or one member of a closed set | [states-and-values.md](states-and-values.md) |
-
-**Family** - a part of the product, taken from the source's own top-level structure. A family says where a term comes from in the sources; it is not a relationship between terms. Every term belongs to one family. How the families were chosen: [D-n](decision-register.md#d-n).
+| object | something the product stores, shows, or acts on | [object-terms.md](object-terms.md) |
+| role | a person the product serves, records, or gives access to | [role-terms.md](role-terms.md) |
+| step | a named stage of the work | [step-terms.md](step-terms.md) |
+| state or value | a condition a term can be in, or one member of a closed set | [states-and-values.md](states-and-values.md) |
```

Line 23

```diff
-**L1, L2 and so on** - the levels of the hierarchy. L1 is the top; a term at L2 sits under the L1 term above it, and so on down.
+How the families were chosen: [D-n](decision-register.md#d-n).
```

Line 27

```diff
-**What you're reading.** The documents this glossary was built from, and what each one contributed.
-**Why it matters.** Every term and definition in the glossary comes from these documents and nowhere else.
-**What to do with it.** If a definition seems wrong, check it against the document named in that term's source.
-**What it affects.** When one of these documents changes, the glossary must be re-run so it does not drift from it.
+**What you're reading.** The sources this glossary was built from, and what each one contributed.
+**Why it matters.** Every term and definition in the glossary comes from these sources and nowhere else.
+**What to do with it.** If a definition seems wrong, check it against the source named in that term's Source column.
+**What it affects.** When one of these sources changes, the glossary must be re-run so it does not drift from it.
```

Line 32

```diff
-| Document | What it provides |
+| Source | What it provides |
```

Line 36

```diff
-This glossary is derived from these documents and must not contradict them.
+This glossary is derived from these sources and must not contradict them.
```

Line 38

```diff
-## Documents and reading order
+## Pages and reading order
```

Line 41

```diff
-**Why it matters.** Each page answers one kind of question; this table tells you which page to open for yours.
+**Why it matters.** Each page answers one sort of question; this table tells you which page to open for yours.
```

Line 45

```diff
-| # | Document | Read it for | Terms |
+| # | Page | Read it for | Terms |
```

Line 48

```diff
-| 2 | [object-terms.md](object-terms.md) | the things the product stores, shows, or acts on | [<n>](object-terms.md) |
+| 2 | [object-terms.md](object-terms.md) | the objects the product stores, shows, or acts on | [<n>](object-terms.md) |
```

Line 50

```diff
-| 4 | [role-terms.md](role-terms.md) | the kinds of person | [<n>](role-terms.md) |
+| 4 | [role-terms.md](role-terms.md) | the people the product serves, records, or gives access to | [<n>](role-terms.md) |
```

### .skills/_shared/glossary/templates/change-ripple.md

1 places changed.

Line 1

```diff
-<!-- Shape per output-formats.md - "The check findings and the ripple list". Shown in the conversation, never written to a file. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
+<!-- Shape per output-formats.md - "The check findings and the ripple list". Shown in the conversation, never written to a file. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this doc", rule 3). Words: method-words.md. -->
```

### .skills/_shared/glossary/templates/check-findings.md

4 places changed.

Line 1

```diff
-<!-- Shape per output-formats.md - "The check findings and the ripple list". Shown in the conversation, never written to a file. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
+<!-- Shape per output-formats.md - "The check findings and the ripple list". Shown in the conversation, never written to a file. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this doc", rule 3). Words: method-words.md. -->
```

Line 8

```diff
-| 1 | <file, as a link> | <line number> | "<the exact words in the document>" | <a retired word in use / a term used against its definition / a product word with no entry / two words for one thing> | <the word or wording to use, and why in one sentence> | <fix the document / change the glossary / add the term through harvest> |
+| 1 | <file, as a link> | <line number> | "<the exact words in the document>" | <a retired word in use / a term used against its definition / a product word with no entry / two words for one meaning> | <the word or wording to use, and why in one sentence> | <fix the document / change the glossary / add the term through harvest> |
```

Line 18

```diff
-| Issue | which of the four things check looks for this is |
+| Issue | which of the four issues check looks for this is |
```

Line 20

```diff
-| Next best action | which of disposition's three outcomes this finding needs |
+| Next best action | which of the three next best actions this finding needs |
```

### .skills/_shared/glossary/templates/decision-register.md

7 places changed.

Line 1

```diff
-<!-- Assembled per glossary-assembly-principles.md - Part B: decision-register. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
+<!-- Assembled per glossary-assembly-principles.md - Part B: decision-register. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this doc", rule 3). Words: method-words.md. -->
```

Line 6

```diff
-> **Decided automatically.** <one line, only when a run's calls were taken without a person's review, with the dates.>
+> **Decided automatically.** <one line, only when a run's gate rows were resolved without a person's review, with the dates.>
```

Line 8

```diff
-## How to read this document
+## How to read this page
```

Line 10

```diff
-<The G4 fixed block: term, kind, family (with the family decision link), L1 and so on.>
+<The G4 fixed block, copied exactly from README.md.>
```

Line 18

```diff
-- **Retired / overrides** - the words dropped, or the earlier decision reversed.
+- **Retired / overrides** - the retired words, or the earlier decision reversed.
```

Line 38

```diff
-| [object-terms.md](object-terms.md) | the things these decisions settled |
+| [object-terms.md](object-terms.md) | the objects these decisions settled |
```

Line 40

```diff
-| [deep-dives/gate-log.md](deep-dives/gate-log.md) | the full story of each decision: evidence, options, and the call |
+| [deep-dives/gate-log.md](deep-dives/gate-log.md) | the full story of each decision: evidence, options, and the resolution |
```

### .skills/_shared/glossary/templates/gate-log.md

'Candidates to judge'; meaning instead of thing in the conflict headings; Change part lists merge.

23 places changed.

Line 1

```diff
-<!-- Shape per output-formats.md - "The gate log" and "The Gate 1 review". File: deep-dives/gate-log.md. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
+<!-- Shape per output-formats.md - "The gate log" and "The Gate 1 review". File: deep-dives/gate-log.md. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this doc", rule 3). Words: method-words.md. -->
```

Line 4

```diff
-This file is the full story of how every decision in the glossary was taken. Each item a person had to decide is one row: the question, the evidence from the source, the recommendation, and the call that was made, with its date. Rows are never deleted. The settled outcome of each row is also written to [decision-register.md](../decision-register.md), which links back here; each section's decision ...
+This page is the full story of how every decision in the glossary was taken. Each item a person had to decide is one row: the question, the evidence from the source, the recommendation, and the person's resolution, with its date. Rows are never deleted. The settled outcome of each row is also written to [decision-register.md](../decision-register.md), which links back here; each section's decisio ...
```

Line 6

```diff
-## How to read this document
+## How to read this page
```

Line 23

```diff
-- **Resolution** - your call: the winning word, keep or drop, or the answer. Blank while `open`.
-- **Decided** - the date of your call. Blank while `open`.
-- Terms are written in sentence case, as everywhere in the glossary; quotes keep the source's own wording.
+- **Resolution** - your answer to the row: the winning word, keep or drop, or the answer. Blank while `open`.
+- **Decided** - the date of your resolution. Blank while `open`.
+- Candidates and terms are written in sentence case, as everywhere in the glossary; quotes keep the source's own wording.
```

Line 37

```diff
-**What you're reading.** The places, found while reading the source, where one thing has several names, a word is too vague to keep, a word may not deserve a glossary entry, or a question only you can answer - each with our recommendation.
-**Why it matters.** These calls decide which words the glossary uses and which it retires.
+**What you're reading.** The places, found while reading the source, where one meaning has several words, a word is too vague to keep, a word may not deserve a glossary entry, or a question only you can answer - each with our recommendation.
+**Why it matters.** These resolutions decide which words the glossary uses and which it retires.
```

Line 42

```diff
-### Conflicts - one thing with several names, or one word with several meanings
+### Conflicts - one meaning with several words, or one word with several meanings
```

Line 44

```diff
-**What you're reading.** Places where the source uses different words for what looks like one thing, or one word for different things. Where the assembly draft shows a proposed merge, its row is here.
-**Why it matters.** Two words for one thing, or one word for two, is the commonest cause of a misread requirement.
-**What to do with it.** Choose the word the glossary will use, or say whether two words are really one thing.
+**What you're reading.** Places where the source uses different words for what looks like one meaning, or one word for different meanings. Where the assembly draft shows a proposed merge, its row is here.
+**Why it matters.** Two words for one meaning, or one word for two, is the commonest cause of a misread requirement.
+**What to do with it.** Choose the word the glossary will use, or say whether two words really have one meaning.
```

Line 55

```diff
-**What you're reading.** Words the source uses that are relative (no axis), generic, used for several things, or that clash with a standard meaning.
-**Why it matters.** A reader could take such a word the wrong way and build or test the wrong thing.
+**What you're reading.** Words the source uses that are relative (no axis), generic, used with several meanings, or that clash with a standard meaning.
+**Why it matters.** A reader could take such a word the wrong way, and change what is built or tested.
```

Line 64

```diff
-### Terms to judge - words that may not deserve an entry
+### Candidates to judge - words that may not deserve an entry
```

Line 66

```diff
-**What you're reading.** Words that are borderline: used in only one place but for several requirements, or proposed by us where the source does not name the thing.
+**What you're reading.** Words that are borderline: used in only one place but for several requirements, or proposed by us where the source describes something but does not name it.
```

Line 69

```diff
-**What it affects.** A kept term gets a definition in Gate 2. A dropped term gets no entry, and its section's decisions file shows it as dropped.
+**What it affects.** A kept candidate gets a definition in Gate 2. A dropped candidate gets no entry, and its section's decisions file shows it as dropped.
```

Line 73

```diff
-| <a id="g1-03"></a>G1-03 | <[section](section/) or All sections> | <"Should <term> be a glossary term?"> | <quotes, one per line, each with its section link> | <keep or drop, and why> | <(a) keep<br>(b) drop> | <what changes, one per line> | open | | |
+| <a id="g1-03"></a>G1-03 | <[section](section/) or All sections> | <"Should <candidate> be a glossary term?"> | <quotes, one per line, each with its section link> | <keep or drop, and why> | <(a) keep<br>(b) drop> | <what changes, one per line> | open | | |
```

Line 75

```diff
-### Questions - things only you can answer
+### Questions - what only you can answer
```

Line 77

```diff
-**What you're reading.** Things the source does not settle - an abbreviation it never spells out, or two sources that contradict each other - and the standing question of which groups become the families.
+**What you're reading.** Questions the source does not settle - an abbreviation it never spells out, or two sources that contradict each other - and the standing question of which groups become the families.
```

Line 80

```diff
-**What it affects.** Your answer is applied wherever the row says, and recorded in the decision register; the family answer is linked from every glossary file.
+**What it affects.** Your answer is applied wherever the row says, and recorded in the decision register; the family answer is linked from every glossary page.
```

Line 84

```diff
-| <a id="g1-04"></a>G1-04 | All sections | Which of the source's top-level groups become the families, and in what order? | <the source's top-level groups, one per line, each with where it appears> | <the families, one per line, in order, and why> | <(a) ... one per line> | <which terms fall in each family; every glossary file links to this decision when it explains what a family is> | open | | |
+| <a id="g1-04"></a>G1-04 | All sections | Which of the source's top-level groups become the families, and in what order? | <the source's top-level groups, one per line, each with where it appears> | <the families, one per line, in order, and why> | <(a) ... one per line> | <which candidates fall in each family; every glossary page links to this decision when it explains what a family is> | open  ...
```

Line 94

```diff
-**What it affects.** Once every row is approved, the seven glossary files are written with these definitions, and each section's decisions file is filled in.
+**What it affects.** Once every row is approved, the seven glossary pages are written with these definitions, and each section's decisions file is filled in.
```

Line 98

```diff
-| <a id="g2-001"></a>G2-001 | <[section](section/)> | <Term> | <object / role / step / state> | <one plain sentence> | <retired words, one per line, or -> | <section link and item, one per line> | open | | |
+| <a id="g2-001"></a>G2-001 | <[section](section/)> | <Term> | <object / role / step / state or value> | <one plain sentence> | <retired words, one per line, or -> | <section link and item, one per line> | open | | |
```

Line 106

```diff
-**What you're reading.** A change asked for after the glossary was written - a term to rename, redefine, split, or retire - with our recommendation.
-**Why it matters.** The term changes on every page that uses it, so the call should be made knowing what it touches.
+**What you're reading.** A change asked for after the glossary was written - a term to rename, redefine, split, merge, or withdraw - with our recommendation.
+**Why it matters.** The term changes on every page that uses it, so the resolution should be made knowing what it touches.
```

Line 113

```diff
-| <a id="ch-01"></a>CH-01 | <[section](section/) or All sections> | <one plain sentence naming the term and the change, ending in a question mark> | <the quote or finding that raised it, one per line> | <the change, and why in one sentence> | <(a) ... one per line> | <for each option, what is renamed, redefined, split, or retired, one per line> | open | | |
+| <a id="ch-01"></a>CH-01 | <[section](section/) or All sections> | <one plain sentence naming the term and the change, ending in a question mark> | <the quote or finding that raised it, one per line> | <the change, and why in one sentence> | <(a) ... one per line> | <for each option, what is renamed, redefined, split, or withdrawn, one per line> | open | | |
```

Line 117

```diff
-**What you're reading.** The items a new reading of the source raised against the glossary that already exists: new words, words that may be the same thing as a term already in the glossary, and new definitions.
+**What you're reading.** The items a new reading of the source raised against the glossary that already exists: new words, words that may have the same meaning as a term already in the glossary, and new definitions.
```

Line 120

```diff
-**What it affects.** Once every row is answered, the seven glossary files are updated, and so are the section decisions files.
+**What it affects.** Once every row is answered, the seven glossary pages are updated, and so are the section decisions files.
```

Line 131

```diff
-| [glossary-assembly-draft.md](glossary-assembly-draft.md) | the joined picture the Gate 1 rows are raised from |
+| [glossary-assembly-draft.md](glossary-assembly-draft.md) | the assembly draft the Gate 1 rows are raised from |
```

### .skills/_shared/glossary/templates/glossary-assembly-draft.md

Candidates before Gate 1; 'Candidates dropped, and why'; Belongs to.

22 places changed.

Line 1

```diff
-<!-- Shape per output-formats.md - "What the assembly draft must contain". File: deep-dives/glossary-assembly-draft.md. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
+<!-- Shape per output-formats.md - "What the assembly draft must contain". File: deep-dives/glossary-assembly-draft.md. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this doc", rule 3). Words: method-words.md. -->
```

Line 6

```diff
-This is the joined picture of the whole source. Each section was first read on its own; this file puts those sections together, so a term that several sections use appears once, and you can see how the terms relate across the whole product. It is made before Gate 1 and kept afterwards as evidence. It holds no decisions: every question it raises is in [gate-log.md](gate-log.md).
+This is the assembly draft of the whole source. Each section was first read on its own; this page puts those sections together, so a candidate that several sections use appears once, and you can see how the candidates relate across the whole product. It is made before Gate 1 and kept afterwards as evidence. It holds no decisions: every question it raises is in [gate-log.md](gate-log.md).
```

Line 16

```diff
-3. [Terms left out, and why](#3-terms-left-out-and-why)
+3. [Candidates dropped, and why](#3-candidates-dropped-and-why)
```

Line 18

```diff
-## How to read this document
+## How to read this page
```

Line 20

```diff
-What a term, a kind, a family, and a level mean: see [What this glossary contains](../README.md#what-this-glossary-contains-fixed-block). Families are not chosen until Gate 1, so this draft does not group terms by family.
+What a term, a kind, a family, and a level mean: see [What this glossary contains](../README.md#what-this-glossary-contains-fixed-block). Families are not chosen until Gate 1, so this draft does not group candidates by family.
```

Line 22

```diff
-- **A proposed merge** is a term written as `<Word> (also written as: <other word>)`. It means the sections use several words for what we believe is one thing. The first word is the one we recommend. You confirm or reject the merge in the gate log row named in the proposed-merges table. If you reject it, this file is updated after Gate 1 to match your call.
-- **Relationship to the term above** - in plain words: part of, a kind of, shown when opened, or created by.
+- **A proposed merge** is a candidate written as `<Word> (also written as: <other word>)`. It means the sections use several words for what we believe is one meaning. The first word is the one we recommend. You confirm or override the merge in the gate log row named in the proposed-merges table. If you override it, this page is updated after Gate 1 to match your resolution.
+- **Relationship to the candidate above** - in plain words: part of, a kind of, shown when opened, or created by.
```

Line 49

```diff
-| L1 | L2 | L3 | Relationship to the term above | Kind |
+| L1 | L2 | L3 | Relationship to the candidate above | Kind |
```

Line 51

```diff
-| <Term> | | | - | <kind> |
-| | <Word> (also written as: <other word>) | | part of a <term> | <kind> |
+| <Candidate> | | | - | <kind> |
+| | <Word> (also written as: <other word>) | | part of a <candidate> | <kind> |
```

Line 54

```diff
-**Terms that also belong elsewhere (lookup).** <One line.>
+**Candidates that also belong elsewhere (lookup).** <One line.>
```

Line 56

```diff
-| Term | Shown under | Also a kind of | Also part of | Also shown or created by | Takeaways |
+| Candidate | Shown under | Also a kind of | Also part of | Also shown or created by | Takeaways |
```

Line 60

```diff
-**Proposed merges.** <One line: several words that we believe name one thing, each decided in the gate log.>
+**Proposed merges.** <One line: several words that we believe have one meaning, each decided in the gate log.>
```

Line 68

```diff
-| Term | Where else it appears |
+| Candidate | Where else it appears |
```

Line 70

```diff
-| <Term> | <in the flow (part 2), or nowhere else: the sources name it but never relate it to another term> |
+| <Candidate> | <in the flow (part 2), or nowhere else: the sources name it but never relate it to another candidate> |
```

Line 83

```diff
-1. <First thing>
+1. <First step>
```

Line 96

```diff
-    <the same flow relationships; a thing in a state is written "Thing: state"; safe camelCase ids; no subgraphs>
+    <the same flow relationships; a term in a state is written "Term: state"; safe camelCase ids; no subgraphs>
```

Line 99

```diff
-**States each thing can be in.** <One line.>
+**States each candidate can be in.** <One line.>
```

Line 101

```diff
-| Thing | States |
+| Belongs to | States |
```

Line 103

```diff
-| <Term> | <state, one per line> |
+| <Candidate> | <state, one per line> |
```

Line 107

```diff
-## 3. Terms left out, and why
+## 3. Candidates dropped, and why
```

Line 114

```diff
-| Term | Found in | Test failed | Why |
+| Candidate | Found in | Test failed | Why |
```

Line 116

```diff
-| <Term> | [<section>](<section>/<section>-glossary.md) | <special meaning / consequence / reach> | <one line, with a short quote from the source> |
+| <Candidate> | [<section>](<section>/<section>-glossary.md) | <special meaning / consequence / reach> | <one line, with a short quote from the source> |
```

Line 124

```diff
-| [gate-log.md](gate-log.md) | every question this picture raises, and how each was decided |
+| [gate-log.md](gate-log.md) | every question this assembly draft raises, and how each was decided |
```

### .skills/_shared/glossary/templates/object-terms.md

12 places changed.

Line 1

```diff
-<!-- Assembled per glossary-assembly-principles.md - Part B: object-terms. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
+<!-- Assembled per glossary-assembly-principles.md - Part B: object-terms. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this doc", rule 3). Words: method-words.md. -->
```

Line 4

```diff
-<One short paragraph: the things <product> stores, shows, or acts on - all <n> of them, in <k> families, each under the thing it sits under in the hierarchy. How the families connect is in terms-and-relationships.md.>
+<One short paragraph: the objects <product> stores, shows, or acts on - all <n> of them, in <k> families, each under the term it sits under in the hierarchy. How the families connect is in terms-and-relationships.md.>
```

Line 6

```diff
-## How to read this document
+## How to read this page
```

Line 8

```diff
-<The G4 fixed block: term, kind, family (with the family decision link), L1 and so on.>
+<The G4 fixed block, copied exactly from README.md.>
```

Line 11

```diff
-- **Term** - the one agreed word for the thing.
-- **What it is** - the definition: what kind of thing it is, and what sets it apart.
+- **Term** - the one agreed word for the object.
+- **What it is** - the definition: what it is, and what sets it apart.
```

Line 18

```diff
-- **Earlier term** - a word the glossary no longer uses.
+- **Earlier word** - a word the glossary no longer uses.
```

Line 23

```diff
-  - retired
-- **Use now** - the current term to use instead, as a link to its definition; `-` when the word was retired with nothing in its place.
+  - withdrawn
+- **Use now** - the current term to use instead, as a link to its definition; `-` when the word was withdrawn with nothing in its place.
```

Line 64

```diff
-<One line: this family's things with no parent in the family.>
+<One line: this family's objects with no parent in the family.>
```

Line 92

```diff
-<repeat one section per family, in family order>
+<repeat one part per family, in family order>
```

Line 103

```diff
-| Earlier term | What happened | Use now | Decision | Date |
+| Earlier word | What happened | Use now | Decision | Date |
```

Line 105

```diff
-| <Earlier word> | <renamed / merged / split / retired> | <[Term](#term-anchor), one per line, or -> | [D-n](decision-register.md#d-n) | <date> |
+| <Earlier word> | <renamed / merged / split / withdrawn> | <[Term](#term-anchor), one per line, or -> | [D-n](decision-register.md#d-n) | <date> |
```

Line 115

```diff
-| [terms-and-relationships.md](terms-and-relationships.md) | where every thing sits in the whole product, level by level |
-| [states-and-values.md](states-and-values.md) | the conditions these things can be in |
+| [terms-and-relationships.md](terms-and-relationships.md) | where every object sits in the whole product, level by level |
+| [states-and-values.md](states-and-values.md) | the conditions these objects can be in |
```

### .skills/_shared/glossary/templates/role-terms.md

'Persona or access role'; a role is a person the product serves, records, or gives access to.

13 places changed.

Line 1

```diff
-<!-- Assembled per glossary-assembly-principles.md - Part B: role-terms. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
+<!-- Assembled per glossary-assembly-principles.md - Part B: role-terms. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this doc", rule 3). Words: method-words.md. -->
```

Line 4

```diff
-<One short paragraph: the kinds of person <product> serves, records, or gives access to - all <n> of them - with where each sits in the hierarchy and which family it comes from.>
+<One short paragraph: the people <product> serves, records, or gives access to - all <n> of them - with where each sits in the hierarchy and which family it comes from.>
```

Line 6

```diff
-## How to read this document
+## How to read this page
```

Line 8

```diff
-<The G4 fixed block: term, kind, family (with the family decision link), L1 and so on.>
+<The G4 fixed block, copied exactly from README.md.>
```

Line 11

```diff
-- **Term** - the agreed word for the kind of person.
+- **Term** - the agreed word for the role.
```

Line 13

```diff
-- **Persona or role** - **persona**: a kind of person the product is designed around; **role**: a label that grants access or duties; `-` when the sources do not say which.
+- **Persona or access role** - **persona**: a person the product is designed around; **access role**: a label that grants access or duties; `-` when the sources do not say which.
```

Line 19

```diff
-- **Earlier term** - a word the glossary no longer uses.
+- **Earlier word** - a word the glossary no longer uses.
```

Line 24

```diff
-  - retired
-- **Use now** - the current term to use instead, as a link to its definition; `-` when the word was retired with nothing in its place.
+  - withdrawn
+- **Use now** - the current term to use instead, as a link to its definition; `-` when the word was withdrawn with nothing in its place.
```

Line 36

```diff
-| Term | What it is | Persona or role | Sits under | Home family | Source | Decision |
+| Term | What it is | Persona or access role | Sits under | Home family | Source | Decision |
```

Line 38

```diff
-| <a id="<term-anchor>"></a><Term> | <definition> | <persona / role / -> | <part of a [term](terms-and-relationships.md#row-anchor), or -; a second line "also belongs elsewhere: see the lookup" when it does> | [<Family>](terms-and-relationships.md#<family-anchor>) | <source> | <decision or -> |
+| <a id="<term-anchor>"></a><Term> | <definition> | <persona / access role / -> | <part of a [term](terms-and-relationships.md#row-anchor), or -; a second line "also belongs elsewhere: see the lookup" when it does> | [<Family>](terms-and-relationships.md#<family-anchor>) | <source> | <decision or -> |
```

Line 49

```diff
-| Earlier term | What happened | Use now | Decision | Date |
+| Earlier word | What happened | Use now | Decision | Date |
```

Line 51

```diff
-| <Earlier word> | <renamed / merged / split / retired> | <[Term](#term-anchor), one per line, or -> | [D-n](decision-register.md#d-n) | <date> |
+| <Earlier word> | <renamed / merged / split / withdrawn> | <[Term](#term-anchor), one per line, or -> | [D-n](decision-register.md#d-n) | <date> |
```

Line 61

```diff
-| [terms-and-relationships.md](terms-and-relationships.md) | where each kind of person sits in the whole product |
-| [step-terms.md](step-terms.md) | the stages each kind of person takes part in |
+| [terms-and-relationships.md](terms-and-relationships.md) | where each role sits in the whole product |
+| [step-terms.md](step-terms.md) | the stages each role takes part in |
```

### .skills/_shared/glossary/templates/section-decisions.md

13 places changed.

Line 1

```diff
-<!-- Shape per output-formats.md - "What the section decisions file must contain". File name: <section>-decisions.md. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
+<!-- Shape per output-formats.md - "What the section decisions file must contain". File name: <section>-decisions.md. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this doc", rule 3). Words: method-words.md. -->
```

Line 4

```diff
-What the gates did to the words in this section's draft, [<section>-glossary.md](<section>-glossary.md). The draft keeps the source's own words, because it is the evidence; this file gives the glossary's word for each one, and the decision behind it.
+What the gates did to the words in this section's draft, [<section>-glossary.md](<section>-glossary.md). The draft keeps the source's own words, because it is the evidence; this page gives the glossary's word for each one, and the decision behind it.
```

Line 6

```diff
-<!-- Until the gates are passed, this file holds only its title, the paragraph above, the next line, and Related pages. -->
+<!-- Until the gates are passed, this page holds only its title, the paragraph above, the next line, and Related pages. -->
```

Line 9

```diff
-## How to read this document
+## How to read this page
```

Line 13

```diff
-- **Term in this draft** - the word exactly as this section's draft has it.
+- **Candidate in this draft** - the word exactly as this section's draft has it.
```

Line 17

```diff
-  - `merged` - it was found to be the same thing as another term, and now goes by that term's word.
+  - `merged` - it was found to have the same meaning as another term, and now goes by that term's word.
```

Line 21

```diff
-- **Decision** - a link to the row in the decision register that settled it; or the test it failed, when it was dropped without a gate item (for example `failed reach`); or `-` when it was kept unchanged and nobody contested it.
+- **Decision** - a link to the row in the decision register that settled it; or the test it failed, when it was dropped without a gate row (for example `failed reach`); or `-` when it was kept unchanged and nobody contested it.
```

Line 25

```diff
-**What you're reading.** Every term this section's draft found, and what the gates did to it.
+**What you're reading.** Every candidate this section's draft found, and what the gates did to it.
```

Line 28

```diff
-**What it affects.** A later change to a term updates its row here, so this file always matches the glossary.
+**What it affects.** A later change to a term updates its row here, so this page always matches the glossary.
```

Line 30

```diff
-| Term in this draft | Outcome | In the glossary | Decision |
+| Candidate in this draft | Outcome | In the glossary | Decision |
```

Line 32

```diff
-| <term> | <kept / renamed / merged / dropped / pending> | <[word](../../<kind page>#<anchor>) or -> | <[D-n](../../decision-register.md#d-n), failed test, or -> |
+| <candidate> | <kept / renamed / merged / dropped / pending> | <[word](../../<kind page>#<anchor>) or -> | <[D-n](../../decision-register.md#d-n), failed test, or -> |
```

Line 34

```diff
-<!-- One row for every term in the draft, in the draft's order. Disposition updates the rows a later change touches. -->
+<!-- One row for every candidate in the draft, in the draft's order. Disposition updates the rows a later change touches. -->
```

Line 42

```diff
-| [<section>-glossary.md](<section>-glossary.md) | the draft whose words this file maps, with the source quotes |
+| [<section>-glossary.md](<section>-glossary.md) | the draft whose words this page maps, with the source quotes |
```

### .skills/_shared/glossary/templates/section-glossary.md

Candidates found; Candidate column; Re-run column with its four values; 'Words dropped'; Belongs to; conflict type from the list.

24 places changed.

Line 1

```diff
-<!-- Shape per output-formats.md - "What the section draft must contain". File: deep-dives/<section>/<section>-glossary.md. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
+<!-- Shape per output-formats.md - "What the section draft must contain". File: deep-dives/<section>/<section>-glossary.md. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this doc", rule 3). Words: method-words.md. -->
```

Line 4

```diff
-<One short paragraph: which part of the source this section is, that it was read on its own through three lenses - the terms found, how they fit together, how they move - and that it is kept as the evidence behind every glossary entry that comes from it. The glossary's words for these terms are in this folder's decisions file.>
+<One short paragraph: which part of the source this section is, that it was read on its own through three lenses - the candidates found, how they fit together, how they move - and that it is kept as the evidence behind every glossary entry that comes from it. The glossary's words for these candidates are in this folder's decisions file.>
```

Line 10

```diff
-1. [The terms found](#1-the-terms-found-ontology)
+1. [The candidates found](#1-the-candidates-found-ontology)
```

Line 16

```diff
-## How to read this document
+## How to read this page
```

Line 20

```diff
-**The columns used in this file:**
-- **Term** - the word as this section of the source writes it, cased per the glossary's rule.
+**The columns used on this page:**
+- **Candidate** - the word as this section of the source writes it, cased per the glossary's rule.
```

Line 24

```diff
-- **Re-scan** - `NEW` on a first build; `KNOWN` or `possible-merge` when the glossary already exists.
+- **Re-run** - one of the following; on a new build, every row is `add`:
+  - `add` - new: nothing in the glossary covers it.
+  - `merge` - the same meaning as a term, under a new word.
+  - `change` - an existing term whose meaning has shifted.
+  - `no change` - already in the glossary, same meaning.
```

Line 41

```diff
-## 1. The terms found (ontology)
+## 1. The candidates found (ontology)
```

Line 43

```diff
-**What you're reading.** <the words this section of the source uses for things, people, stages, and conditions>
+**What you're reading.** <the words this section of the source uses for objects, people, stages, and conditions>
```

Line 50

```diff
-| # | Term | Meaning | Evidence | Re-scan |
+| # | Candidate | Meaning | Evidence | Re-run |
```

Line 52

```diff
-| 1 | <Term> | <meaning> | "<quote>" - <where> | NEW |
+| 1 | <Candidate> | <meaning> | "<quote>" - <where> | add |
```

Line 64

```diff
-| # | Term | Meaning | Evidence | Re-scan |
+| # | Candidate | Meaning | Evidence | Re-run |
```

Line 66

```diff
-| 1 | <Term> | <value, one per line> | "<quote>" - <where> | NEW |
+| 1 | <Candidate> | <value, one per line> | "<quote>" - <where> | add |
```

Line 80

```diff
-<Term>
-└── <Term>
+<Candidate>
+└── <Candidate>
```

Line 93

```diff
-| L1 | L2 | L3 | Relationship to the term above | Kind |
+| L1 | L2 | L3 | Relationship to the candidate above | Kind |
```

Line 95

```diff
-| <Term> | | | - | <kind> |
-| | <Term> | | part of a <term> | <kind> |
+| <Candidate> | | | - | <kind> |
+| | <Candidate> | | part of a <candidate> | <kind> |
```

Line 98

```diff
-**Terms that also belong elsewhere (lookup).** <One line.>
+**Candidates that also belong elsewhere (lookup).** <One line.>
```

Line 100

```diff
-| Term | Shown under | Also a kind of | Also part of | Also shown or created by | Takeaways |
+| Candidate | Shown under | Also a kind of | Also part of | Also shown or created by | Takeaways |
```

Line 119

```diff
-**States each thing can be in.** <One line.>
+**States each candidate can be in.** <One line.>
```

Line 121

```diff
-| Thing | States | Evidence |
+| Belongs to | States | Evidence |
```

Line 123

```diff
-| <Term> | <state, one per line> | "<quote>" - <where> |
+| <Candidate> | <state, one per line> | "<quote>" - <where> |
```

Line 127

```diff
-1. <First thing>
+1. <First step>
```

Line 152

```diff
-| Kind | Words | Evidence |
+| Conflict type | Words | Evidence |
```

Line 154

```diff
-| <several words, one thing / one word, several meanings> | <word, one per line> | "<quote>" - <where>, one per line |
+| <a conflict type, from the list in method-words.md> | <word, one per line> | "<quote>" - <where>, one per line |
```

Line 175

```diff
-| [<section>-decisions.md](<section>-decisions.md) | the glossary's word for each term in this draft, and the decision behind it |
+| [<section>-decisions.md](<section>-decisions.md) | the glossary's word for each candidate in this draft, and the decision behind it |
```

### .skills/_shared/glossary/templates/states-and-values.md

11 places changed.

Line 1

```diff
-<!-- Assembled per glossary-assembly-principles.md - Part B: states-and-values. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
+<!-- Assembled per glossary-assembly-principles.md - Part B: states-and-values. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this doc", rule 3). Words: method-words.md. -->
```

Line 4

```diff
-<One short paragraph: the named conditions a thing can be in, and the closed sets of values - all <n> of them - grouped by the same families as the rest of the glossary, each with the thing it belongs to.>
+<One short paragraph: the named conditions a term can be in, and the closed sets of values - all <n> of them - grouped by the same families as the rest of the glossary, each with the term it belongs to.>
```

Line 6

```diff
-## How to read this document
+## How to read this page
```

Line 8

```diff
-<The G4 fixed block: term, kind, family (with the family decision link), L1 and so on.>
+<The G4 fixed block, copied exactly from README.md.>
```

Line 13

```diff
-- **Belongs to** - the thing this condition is a property of, as a link to its definition; `-` when it belongs to no single thing.
+- **Belongs to** - the term this condition is a property of, as a link to its definition; `-` when it belongs to no single term.
```

Line 19

```diff
-- **Earlier term** - a word the glossary no longer uses.
+- **Earlier word** - a word the glossary no longer uses.
```

Line 24

```diff
-  - retired
-- **Use now** - the current term to use instead, as a link to its definition; `-` when the word was retired with nothing in its place.
+  - withdrawn
+- **Use now** - the current term to use instead, as a link to its definition; `-` when the word was withdrawn with nothing in its place.
```

Line 42

```diff
-<repeat one section per family that holds conditions, in the shared family order>
+<repeat one part per family that holds conditions, in the shared family order>
```

Line 64

```diff
-| Earlier term | What happened | Use now | Decision | Date |
+| Earlier word | What happened | Use now | Decision | Date |
```

Line 66

```diff
-| <Earlier word> | <renamed / merged / split / retired> | <[Term](#term-anchor), one per line, or -> | [D-n](decision-register.md#d-n) | <date> |
+| <Earlier word> | <renamed / merged / split / withdrawn> | <[Term](#term-anchor), one per line, or -> | [D-n](decision-register.md#d-n) | <date> |
```

Line 76

```diff
-| [object-terms.md](object-terms.md) | the things these conditions belong to |
-| [step-terms.md](step-terms.md) | the stages that move a thing from one condition to another |
+| [object-terms.md](object-terms.md) | the objects these conditions belong to |
+| [step-terms.md](step-terms.md) | the stages that move a term from one condition to another |
```

### .skills/_shared/glossary/templates/step-terms.md

10 places changed.

Line 1

```diff
-<!-- Assembled per glossary-assembly-principles.md - Part B: step-terms. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
+<!-- Assembled per glossary-assembly-principles.md - Part B: step-terms. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this doc", rule 3). Words: method-words.md. -->
```

Line 6

```diff
-## How to read this document
+## How to read this page
```

Line 8

```diff
-<The G4 fixed block: term, kind, family (with the family decision link), L1 and so on.>
+<The G4 fixed block, copied exactly from README.md.>
```

Line 18

```diff
-- **Earlier term** - a word the glossary no longer uses.
+- **Earlier word** - a word the glossary no longer uses.
```

Line 23

```diff
-  - retired
-- **Use now** - the current term to use instead, as a link to its definition; `-` when the word was retired with nothing in its place.
+  - withdrawn
+- **Use now** - the current term to use instead, as a link to its definition; `-` when the word was withdrawn with nothing in its place.
```

Line 37

```diff
-A thing in a state is written "Thing: state". The flow is shown three ways - a numbered list, a table, and a picture; if they seem to disagree, the table is the one to trust.
+A term in a state is written "Term: state". The flow is shown three ways - a numbered list, a table, and a picture; if they seem to disagree, the table is the one to trust.
```

Line 48

```diff
-1. <First thing>
+1. <First step>
```

Line 96

```diff
-| Earlier term | What happened | Use now | Decision | Date |
+| Earlier word | What happened | Use now | Decision | Date |
```

Line 98

```diff
-| <Earlier word> | <renamed / merged / split / retired> | <[Term](#term-anchor), one per line, or -> | [D-n](decision-register.md#d-n) | <date> |
+| <Earlier word> | <renamed / merged / split / withdrawn> | <[Term](#term-anchor), one per line, or -> | [D-n](decision-register.md#d-n) | <date> |
```

Line 109

```diff
-| [object-terms.md](object-terms.md) | the things each step creates and uses, defined in full |
+| [object-terms.md](object-terms.md) | the objects each step creates and uses, defined in full |
```

### .skills/_shared/glossary/templates/terms-and-relationships.md

The fixed block copied from method-words.md; Kind guide reads object.

10 places changed.

Line 1

```diff
-<!-- Assembled per glossary-assembly-principles.md - Part B: terms-and-relationships. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this file", rule 3). -->
+<!-- Assembled per glossary-assembly-principles.md - Part B: terms-and-relationships. Copy every heading and column heading exactly as written here - never retype, rename, or recase them (glossary-assembly-principles.md, "How templates use this doc", rule 3). Words: method-words.md. -->
```

Line 12

```diff
-## How to read this document
+## How to read this page
```

Line 14

```diff
-**Term** - a word or phrase that has one agreed meaning in <product>. It is in the glossary because it passed three tests: its meaning here differs from everyday use, misreading it would change what is built or tested, and it is used in more than one part of the product.
+These words mean the same on every page. They are copied from the method's word list, `method-words.md`.
```

Line 16

```diff
-**Kind** - every term is exactly one of four kinds:
+| Word | Means |
+|---|---|
+| Source | A document the glossary is built from. It is read, never changed. |
+| Section | One part of a source, read on its own, taken from the source's own headings, in source order, and fixed before reading starts. Not the same as a family: a section is how we read. |
+| Candidate | A word Ontology keeps for judging. It is not yet a term. |
+| The three tests | The tests a candidate must all pass to become a term:<br>• special meaning<br>• consequence<br>• reach |
+| Term | A candidate that passed the three tests and Gate 1. Gate 2 then agrees its definition. |
+| Kind | Which of the four kinds a term is. Not the same as the relationship word "kind of". |
+| Family | A group of terms the glossary's pages are arranged by, decided at Gate 1, usually from the source's top-level groups. Not the same as a section: a family is how a reader browses. |
+| Gate | A point where a person decides. The run stops until every gate row is resolved. |
+| Level | How far down the hierarchy a term sits, written L1, L2 and so on. L1 is the top. |
```

Line 18

```diff
-| Kind | What it is | Defined in |
-|---|---|---|
-| object | a thing the product stores, shows, or acts on | [object-terms.md](object-terms.md) |
-| role | a kind of person | [role-terms.md](role-terms.md) |
-| step | a stage of the work | [step-terms.md](step-terms.md) |
-| state or value | a condition a thing can be in, or one member of a closed set | [states-and-values.md](states-and-values.md) |
+**The four kinds:**
```

Line 25

```diff
-**Family** - a part of the product, taken from the source's own top-level structure. A family says where a term comes from in the sources; it is not a relationship between terms. Every term belongs to one family. How the families were chosen: [D-n](decision-register.md#d-n).
+| Kind | Means | Defined in |
+|---|---|---|
+| object | something the product stores, shows, or acts on | [object-terms.md](object-terms.md) |
+| role | a person the product serves, records, or gives access to | [role-terms.md](role-terms.md) |
+| step | a named stage of the work | [step-terms.md](step-terms.md) |
+| state or value | a condition a term can be in, or one member of a closed set | [states-and-values.md](states-and-values.md) |
```

Line 27

```diff
-**L1, L2 and so on** - the levels of the hierarchy. L1 is the top; a term at L2 sits under the L1 term above it, and so on down.
+How the families were chosen: [D-n](decision-register.md#d-n).
```

Line 44

```diff
-| Kind | thing, role, step, or state or value |
+| Kind | • object<br>• role<br>• step<br>• state or value |
```

Line 123

```diff
-**Also in this family, not placed in the hierarchy (not placed).** <One line: this family's things the sources never place under or over another term.>
+**Also in this family, not placed in the hierarchy (not placed).** <One line: this family's terms the sources never place under or over another term.>
```

Line 137

```diff
-| [object-terms.md](object-terms.md) | the definition of every thing on this page, family by family |
+| [object-terms.md](object-terms.md) | the definition of every object on this page, family by family |
```

### .skills/check/SKILL.md

5 places changed.

Line 5

```diff
-  Find where a document or story has drifted from the agreed glossary — a retired word,
-  a term used against its meaning, a new product word, or internal inconsistency — and
+  Find where a document or story has drifted from the agreed glossary — a retired word in use,
+  a term used against its definition, a product word with no entry, or two words for one meaning — and
```

Line 20

```diff
-- The glossary at `Output/glossary/` — the seven files only, not `deep-dives/`: approved terms, and the retired words in each kind document's Terms replaced or retired over time table. The seven files absent → stop; run **harvest** first.
-- The method — `../_shared/glossary/lens1-ontology.md` (the keep rule, to tell a product word from an everyday one), `../_shared/glossary/otc-run-rules.md` (the boundary), `../_shared/glossary/output-formats.md` ("The check findings and the ripple list").
+- The glossary at `Output/glossary/` — the seven pages only, not `deep-dives/`: approved terms, and the retired words in each kind page's Terms replaced or retired over time table. The seven pages absent → stop; run **harvest** first.
+- The method — `../_shared/glossary/method-words.md` (the words every file uses), `../_shared/glossary/lens1-ontology.md` (the keep rule, to tell a product word from an everyday one), `../_shared/glossary/otc-run-rules.md` (the boundary), `../_shared/glossary/output-formats.md` ("The check findings and the ripple list").
```

Line 29

```diff
-3. Flag four things: a retired word in use; a term used against its definition; a product word (passes the `../_shared/glossary/lens1-ontology.md` keep rule) with no entry; two words for one thing inside the document.
+3. Flag four issues: a retired word in use; a term used against its definition; a product word (passes the `../_shared/glossary/lens1-ontology.md` keep rule) with no entry; two words for one meaning inside the document.
```

Line 34

```diff
-Edit the document or the glossary — that is disposition's job. On a baselined source document, report only.
+Edit the document or the glossary — that is disposition's job. On a baselined source, report only.
```

Line 37

```diff
-**check** spots drift; **disposition** acts on it; **harvest** builds and updates the glossary. Full picture: `../../skill-orchestration.md`.
+**check** spots drift; **disposition** acts on it; **harvest** builds and updates the glossary. How the three fit together: `../../skill-orchestration.md`.
```

### .skills/disposition/SKILL.md

6 places changed.

Line 6

```diff
-  redefine, split, or retire a term) or flag a document to fix — with a person approving
-  each call, every glossary change timestamped and its ripple reported. Use to act on
+  redefine, split, or withdraw a term) or flag a document to fix — with a person approving
+  each next best action, every glossary change timestamped and its ripple reported. Use to act on
```

Line 20

```diff
-- The glossary at `Output/glossary/` — the seven files, not `deep-dives/`: the term, and every document that uses it. Term absent, or the seven files absent → stop.
-- The method — `../_shared/glossary/otc-run-rules.md` (boundary, gate), `../_shared/glossary/output-formats.md` (the term-change effects, the register, the ripple list), `../_shared/glossary/glossary-assembly-principles.md` (the shape the changed glossary must keep).
+- The glossary at `Output/glossary/` — the seven pages, not `deep-dives/`: the term, and every page that uses it. Term absent, or the seven pages absent → stop.
+- The method — `../_shared/glossary/method-words.md` (the words every file uses), `../_shared/glossary/otc-run-rules.md` (boundary, gate), `../_shared/glossary/output-formats.md` (the term-change effects, the register, the ripple list), `../_shared/glossary/glossary-assembly-principles.md` (the shape the changed glossary must keep).
```

Line 24

```diff
-- The updated glossary — the entry and every place the term appears (kind doc, the hierarchy and lookup rows in `terms-and-relationships.md`, links), kept adherent to `../_shared/glossary/glossary-assembly-principles.md`, plus a timestamped register row with its **Retired / overrides**, the earlier word's row in the kind document's Terms replaced or retired over time table, the touched rows of ea ...
+- The updated glossary — the entry and every place the term appears (kind page, the hierarchy and lookup rows in `terms-and-relationships.md`, links), kept adherent to `../_shared/glossary/glossary-assembly-principles.md`, plus a timestamped register row with its **Retired / overrides**, the earlier word's row in the kind page's Terms replaced or retired over time table, the touched rows of each  ...
```

Line 27

```diff
-1. **Restate** the drift and the disposition you propose.
-2. **Gate** — write the proposed disposition to the gate log (`../_shared/glossary/output-formats.md`, "The gate log") as an open item, present it recommendation-first per `../_shared/glossary/output-formats.md` ("How the gate is answered"), and apply nothing while it is open. The person confirms or overrides; on doubt, clarify before moving. The item goes into the glossary's own `deep-dives/gate ...
-3. **Apply one disposition:**
-   - **document is wrong** → flag it for the author or a check follow-up; no glossary change.
-   - **glossary must change** → rename, redefine, split, retire, or merge the entry as `../_shared/glossary/output-formats.md` ("Changing a term") sets out - an earlier word is never deleted but moves to the kind document's Terms replaced or retired over time table (`../_shared/glossary/glossary-assembly-principles.md`, G8) - keeping the deliverable adherent to `../_shared/glossary/glossary-assem ...
-   - **new product word** → route it to **harvest** as a term request.
+1. **Restate** the drift and the next best action you propose.
+2. **Gate** — write the proposed next best action to the gate log (`../_shared/glossary/output-formats.md`, "The gate log") as an open gate row, present it recommendation-first per `../_shared/glossary/output-formats.md` ("How the gate is answered"), and apply nothing while it is open. The person confirms or overrides; on doubt, clarify before moving. The item goes into the glossary's own `deep-d ...
+3. **Apply one next best action:**
+   - **fix the document** → flag it for the author or a check follow-up; no glossary change.
+   - **change the glossary** → rename, redefine, split, withdraw, or merge the entry as `../_shared/glossary/output-formats.md` ("Changing a term") sets out - an earlier word is never deleted but moves to the kind page's Terms replaced or retired over time table (`../_shared/glossary/glossary-assembly-principles.md`, G8) - keeping the deliverable adherent to `../_shared/glossary/glossary-assembly ...
+   - **add the term through harvest** → route it to **harvest** as a term request.
```

Line 37

```diff
-Edit the documents that use the term — flag them. Never rename a file or an identifier. Every disposition passes the gate.
+Edit the documents that use the term — flag them. Never rename a file or an identifier. Every next best action passes the gate.
```

Line 40

```diff
-**check** spots drift; **disposition** acts on it; **harvest** builds and updates the glossary. Full picture: `../../skill-orchestration.md`.
+**check** spots drift; **disposition** acts on it; **harvest** builds and updates the glossary. How the three fit together: `../../skill-orchestration.md`.
```

### .skills/harvest/SKILL.md

11 places changed.

Line 6

```diff
-  word per thing, and write it, with a person deciding at every gate. Use to create,
+  word per meaning, and write it, with a person deciding at every gate. Use to create,
```

Line 8

```diff
-  requirements or discovery docs — e.g. "build the glossary", "harvest the terms from
+  requirements or discovery sources — e.g. "build the glossary", "harvest the terms from
```

Line 20

```diff
-- The existing glossary at `Output/glossary/` (the seven files), if any, and its `deep-dives/`.
-- The method — `../_shared/glossary/`, including `glossary-assembly-principles.md` (it governs the assembled deliverable); the blank output files — `../_shared/glossary/templates/`.
+- The existing glossary at `Output/glossary/` (the seven pages), if any, and its `deep-dives/`.
+- The method — `../_shared/glossary/`, including `../_shared/glossary/method-words.md` (the words every file uses) and `glossary-assembly-principles.md` (it governs the assembled deliverable); the blank output files — `../_shared/glossary/templates/`.
```

Line 24

```diff
-- `Output/glossary/` — the reader-facing glossary, seven files: a `README.md` gateway, `terms-and-relationships.md`, the four kind docs (`objects` / `roles` / `steps` / `States`), and `decision-register.md`. Assembled per `../_shared/glossary/glossary-assembly-principles.md`.
+- `Output/glossary/` — the reader-facing glossary, seven pages: a `README.md` gateway, `terms-and-relationships.md`, the four kind pages (`object-terms.md` / `role-terms.md` / `step-terms.md` / `states-and-values.md`), and `decision-register.md`. Assembled per `../_shared/glossary/glossary-assembly-principles.md`.
```

Line 28

```diff
-1. **Mode.** Look for the seven glossary files, not for an empty folder, as `../_shared/glossary/output-formats.md` ("What a run finds, and what it does") sets out:
+1. **Mode.** Look for the seven glossary pages, not for an empty folder, as `../_shared/glossary/output-formats.md` ("What a run finds, and what it does") sets out:
```

Line 30

```diff
-   - `deep-dives/` but not the seven files → resumed build: continue from the `open` rows in `deep-dives/gate-log.md`;
-   - all seven files → re-run.
+   - `deep-dives/` but not the seven pages → resumed build: continue from the `open` rows in `deep-dives/gate-log.md`;
+   - all seven pages → re-run.
```

Line 39

```diff
-5. **Assemble and judge.** Join the sections into `deep-dives/glossary-assembly-draft.md` by filling `../_shared/glossary/templates/glossary-assembly-draft.md` as `../_shared/glossary/output-formats.md` ("What the assembly draft must contain") sets out - including a proposed merge wherever the same-thing test finds several words for one thing - then apply the whole-picture rules in `../_shared/gl ...
-6. **Gate 1** — write the review to `deep-dives/gate-log.md` by filling `../_shared/glossary/templates/gate-log.md` (`../_shared/glossary/output-formats.md`, "The Gate 1 review" and "The gate log") with every item `open` (in a sweep, the assembly agent has already written it), then run the gate as `../_shared/glossary/otc-run-rules.md` sets it, resolving each row to `accepted`, `overridden`, or ` ...
+5. **Assemble and judge.** Join the sections into `deep-dives/glossary-assembly-draft.md` by filling `../_shared/glossary/templates/glossary-assembly-draft.md` as `../_shared/glossary/output-formats.md` ("What the assembly draft must contain") sets out - including a proposed merge wherever the same-meaning test finds several words for one meaning - then apply the rules in `../_shared/glossary/otc ...
+6. **Gate 1** — write the review to `deep-dives/gate-log.md` by filling `../_shared/glossary/templates/gate-log.md` (`../_shared/glossary/output-formats.md`, "The Gate 1 review" and "The gate log") with every gate row `open` (in a sweep, the assembly agent has already written it), then run the gate as `../_shared/glossary/otc-run-rules.md` sets it, resolving each row to `accepted`, `overridden`,  ...
```

Line 42

```diff
-8. **Gate 2** — write the definitions review to the gate log, in its Gate 2 part, with every item `open`, then run the gate as `../_shared/glossary/otc-run-rules.md` sets it, resolving each row. Do not pass Gate 2 while any row is `open`.
+8. **Gate 2** — write the definitions review to the gate log, in its Gate 2 part, with every gate row `open`, then run the gate as `../_shared/glossary/otc-run-rules.md` sets it, resolving each row. Do not pass Gate 2 while any row is `open`.
```

Line 44

```diff
-   - assemble the seven files in `Output/glossary/` per `../_shared/glossary/glossary-assembly-principles.md` — apply its ground rules (Part A) and each document's Part B section, filling the blanks in `../_shared/glossary/templates/`; each settled gate row becomes a `decision-register.md` row that links back to it;
+   - assemble the seven pages in `Output/glossary/` per `../_shared/glossary/glossary-assembly-principles.md` — apply its ground rules (Part A) and each page's Part B rules, filling the blanks in `../_shared/glossary/templates/`; each settled gate row becomes a `decision-register.md` row that links back to it;
```

Line 46

```diff
-   - update `deep-dives/glossary-assembly-draft.md`: set its status line to "updated after Gate 1 on <date>", and change every proposed merge the person rejected so the draft matches the decision.
-   Before finishing, run the casing and character sweep (G6) over the seven files **and** everything in `deep-dives/`, and confirm every decision link resolves.
+   - update `deep-dives/glossary-assembly-draft.md`: set its status line to "updated after Gate 1 on <date>", and change every proposed merge the person overrode so the draft matches the decision.
+   Before finishing, run the casing and character sweep (G6) over the seven pages **and** everything in `deep-dives/`, and confirm every decision link resolves.
```

Line 53

```diff
-harvest builds the glossary; **check** spots drift in a document; **disposition** acts on drift. Full picture: `../../skill-orchestration.md`.
+harvest builds the glossary; **check** spots drift in a document; **disposition** acts on drift. How the three fit together: `../../skill-orchestration.md`.
```

### glossary-design.md

Rewritten as the lean overview: six short parts, each pointing to the doc that holds the rule. The old design pitch (418 lines) is replaced in full.

25 places changed.

Line 1

```diff
-# Glossary Pipeline — Design for Review
+# The glossary method - overview
```

Line 3

```diff
-**Status:** Draft for stakeholder review and confirmation
-**What this is:** How we build and maintain a single, shared glossary for a specification, and how it keeps every document speaking the same language.
-**What we need from you:** Confirm the approach and the choices in Part 14.
-
-> **A note on the examples.** So the method is clear no matter your domain, this document teaches it
-> through a **generic online store** (carts, orders, payments). None of it assumes knowledge of any
-> particular product. The same method applies to any specification.
+> **What this is** - a short explanation of what the glossary method does and how its parts fit together, for someone meeting it for the first time.
+> **What it is not** - an instruction. No skill, prompt, or agent acts on this page; they follow the docs it points to. It restates no rule: every rule lives in the doc named beside it.
+> **Related docs**
+>
+> - words: `.skills/_shared/glossary/method-words.md`
+> - method: `.skills/_shared/glossary/otc-methodology.md`
+> - skills: `skill-orchestration.md`
+>
+> **Next step** - read `otc-methodology.md`.
```

Line 13

```diff
-## 1. Why a glossary, and the problem it solves
+## 1. Why a glossary
```

Line 15

```diff
-A specification is only as reliable as the words it uses. When the same thing is named several ways, or one word means two things, the confusion stays hidden until it reaches the build — and someone builds the wrong thing.
+A source written by several people over several weeks rarely uses one word per meaning. In an online store's requirements, for example:
```

Line 17

```diff
-Picture an online-store specification written by a few people over a few weeks. Without anyone intending it:
+- one meaning is written three ways:
+  - cart
+  - basket
+  - bag
+- one word has two meanings: order is a customer's purchase in one place, and the sort sequence of a list in another.
+- a word is weak: "quick ship" does not say quick by what measure.
```

Line 19

```diff
-- the same thing is called **cart** in one place, **basket** in another, **bag** in a third;
-- **order** means a customer's purchase on one page and the sort sequence of a list on another;
-- the spec says **wishlist**, but the screen mock-ups say **saved items**;
-- shipping options are named **quick ship** and **slow ship**, which tell you nothing precise.
+The glossary settles each of these once. Every term has one word and one meaning, and the glossary also shows how the terms relate: what is part of what, and what comes before what. Every later document is then held to those words.
```

Line 24

```diff
-None of this is wrong in a first draft. The glossary's job is to **resolve it once, agree the words, and then hold every later document to them.**
+## 2. How a source is read
```

Line 26

```diff
-The goal, in one line: **uniformity — every document speaks the same, agreed language.**
+A source is divided into sections, taken from its own headings (`otc-methodology.md`, "Sections"). Each section is read three ways, in this order:
```

Line 28

```diff
-And it is more than a word list. The glossary also captures **how the words connect** — what contains what, what comes before what, what unlocks what — so the specification reads as a **map of meaning**, not just a dictionary. Recognising those connections is half the value; a lone list of defined words would miss that "a cancelled order can no longer be shipped" is a rule binding two of them tog ...
-
----
-
-## 2. The mental model
-
-**We read the product's own words, build a small picture of how its things relate, and draw the glossary from that picture. Where a word is weak, we recommend a better one. A person decides every call.**
-
-Three beliefs hold the design together:
-
-1. **Meaning first, words second.** We don't collect words and then guess their meaning. We work out what the things *are* and how they connect; the words follow. This is why three names for one thing (cart / basket / bag) collapse into a single entry instead of three.
-
-2. **Loosely coupled — we read sentences, not file structure.** The method never depends on a table, an ID scheme, or a particular layout. It reads the linking words in ordinary prose. Give it a tidy structured catalog or a two-page brief, and both work.
-
-3. **The tool proposes; the person disposes.** The tool settles only what the source plainly settles, and brings the person the genuine ambiguities and the weak words. It may improve a *label*; it may never invent a *meaning*. Every real decision happens at a checkpoint (a "gate"). This boundary is what makes the method safe to run across a large specification.
-
----
-
-## 3. How we find the keywords
-
-Three moves, all done by reading.
-
-### Move 1 — list the things
-Pull the nouns that carry product meaning: *cart, order, customer, payment, shipment, refund*. Not every noun — only the ones a newcomer would trip on. (We skip everyday words like "page" or "button".)
-
-### Move 2 — read the words *between* two things
-When two things appear in a sentence, the words joining them carry the relationship. There is a small, fixed set, each with tell-tale phrasing:
-
-| Relationship | Meaning | Give-away phrase | Example sentence | Becomes |
-|---|---|---|---|---|
-| contains | A is made of B | "is made up of", "holds" | "an order is made up of one or more line items" | order **contains** line items |
-| kind of | B is a type of A | "can be a, b, or c", "such as" | "payment can be by card, wallet, or bank transfer" | payment **kinds**: card, wallet, transfer |
-| comes before | A then B in the flow | "proceeds to", "then" | "the customer proceeds from cart to checkout, then to confirmation" | cart **→** checkout **→** confirmation |
-| produces | A creates B | "generates", "results in" | "a successful payment generates a receipt" | payment **produces** receipt |
-| opens into | A reveals B | "opens to its", "shows its" | "each order opens to its line items and tracking" | order **opens into** line items, tracking |
-| locks / opens | A controls B's state | "cannot ... until", "enabled once" | "a cancelled order cannot be shipped" | cancelled order **locks** shipment |
-| same as | two words, one thing | the same thing named two ways nearby | "cart" and "basket" used interchangeably | cart **=** basket |
-
-Every relationship comes straight from a phrase — nothing is inferred beyond the text.
-
-### Move 2, worked on a real passage
-
-This is the critical move, so here it is on an actual passage. Read it once as prose, then see how each relationship is lifted from a single phrase.
-
-> "A **cart** holds the items a customer has chosen but not yet paid for; some teams call it a **basket**. The customer proceeds from the cart to **checkout** once the cart holds at least one item. At checkout the customer chooses a **payment method** — a card, a wallet, or a bank transfer. A successful **payment** generates a **receipt** and creates the **order**. Each order opens to its **line  ...
-
-The bold words are the *things* (Move 1). The phrases between them are the *relationships*:
-
-| Phrase in the passage | Relationship | Reads as |
-|---|---|---|
-| "a cart **holds** the items..." | contains | cart → contains → items |
-| "some teams **call it** a basket" | same as | cart = basket *(basket will be retired)* |
-| "**proceeds from** the cart **to** checkout" | comes before | cart → checkout |
-| "checkout **once** the cart holds at least one item" | opens | checkout unlocks once cart holds ≥ 1 item |
-| "a payment method — **a card, a wallet, or** a bank transfer" | kind of | payment method → card<br>payment method → wallet<br>payment method → transfer |
-| "a successful payment **generates** a receipt and **creates** the order" | produces | payment → receipt, order |
-| "each order **opens to its** line items and tracking" | opens into | order → line items, tracking |
-| "**once** cancelled, it can **no longer** be shipped" | locks | cancelled order → locks → shipment |
-
-Stack those up and you get the picture in the worked example — the same eight relationships, drawn. That is the whole of Move 2: no tables parsed, no identifiers read, just the linking phrases in ordinary sentences. Hand it a messy paragraph instead of a tidy spec and the same phrases still carry the same connections.
-
-### The same move, run on this very document
-
-To show it reads *any* text — not just a tidy specification — here is Move 2 run on a paragraph of this document itself:
-
-> "**harvest** learns the **glossary**. **check** measures any **document** against the glossary and recommends a **fix**. A **term** has a **definition** and a **Part-of** line. harvest produces the **picture**; the glossary is drawn from it. A **re-scan** reconciles each **candidate** into Add, Merge, Change, or No change."
-
-| Phrase | Relationship | Reads as |
-|---|---|---|
-| "harvest **produces** the picture" | produces | harvest → picture |
-| "the glossary is **drawn from** it" | produces (reverse) | picture → glossary |
-| "a term **has** a definition and a Part-of" | contains | term → definition, Part-of |
-| "check **measures** ... **against** the glossary" | uses | check → reads → glossary |
-| "reconciles ... **into** Add, Merge, Change, or No change" | kind of | re-scan outcome → the four kinds |
-
-Drawn out, the method describes itself:
-
-```
-Glossary method
-├── harvest  — learns the glossary;  produces → picture → (glossary drawn from it)
-├── check    — measures any document against the glossary;  produces → a delta
-└── change   — moves a term;  produces → an impact
-
-term      contains → definition
-                     Part of
-                     Previous definition
-re-scan   outcome is one of → Add
-                              Merge
-                              Change
-                              No change
-```
-
-That the method can be turned on its own description is the strongest proof of the loose-coupling claim: it reads meaning from plain sentences, whatever the document.
-
-### Move 3 — decide which things are keywords
-Three quiet tests, applied by the tool. A person sees only the borderline cases:
-
-- **Special meaning** — would a newcomer take the everyday sense and be wrong? *("cart" here is a saved list tied to an account, not just a shopping trolley → passes.)*
-- **Consequence** — would a misreading change what gets built? *("a cancelled order locks shipment" → misreading changes behaviour → passes.)*
-- **Reach** — is it used in more than one place? *("customer" appears across browsing, checkout, and account → passes.)*
-
-A word used once, in a single feature, with its meaning obvious from that one sentence, is *not* promoted to a glossary term — the sentence already carries it.
-
-### The weak-word test (leads to a recommendation)
-While doing Move 3, the tool judges whether the source's own word is weak. A word is weak if it is:
-
-- **relative with no axis** — quick, slow, deep, light *(quick compared to what?)*;
-- **generic** — smart, advanced, item, data, handling;
-- **overloaded** — one word used for several things;
-- **clashing** — collides with a standard meaning.
-
-A weak word gets one or two recommended replacements, with the reasoning — as a proposal to the gate (see the recommending-a-better-word part).
-
-### Local first, then reconcile across the whole
-Meaning lives in a place. Each area of the product (browsing, checkout, account, returns) is a place, so we build one small picture per area — each a short, digestible review. Some words span many areas: *customer, price, order* appear everywhere. After the per-area pictures, a single **reconciliation pass** across the whole set settles these shared words. This pass is where most conflicts surfac ...
-
----
-
-## 4. OTC — the lens we scan by
-
-OTC (Ontology–Topology–Choreography, from information-architecture practice) is simply the order in which we read the relationships. It tells us *which* relationships to look for, and *in what order*.
-
-| OTC | Plain question | Store example |
-|---|---|---|
-| **O — Ontology (meaning)** | What is each thing? | *What is an "order"? A confirmed, paid purchase.* |
-| **T — Topology (structure)** | Where does it sit? | *A "line item" is part of an order; "gift wrap" is a kind of add-on.* |
-| **C — Choreography (flow)** | How does it move? | *An order goes placed → paid → shipped → delivered; a cancelled order can't ship.* |
-
-Meaning comes first: you cannot place a thing (T) or track its states (C) until you know what it is (O). This maps straight onto the glossary:
-
-- **O becomes the definition.**
-- **T becomes the "Part of" line.**
-- **C stays out of the glossary** — states and rules are behaviour, which belongs in the specification, not the dictionary.
-
----
-
-## 5. The picture — a worked example
-
-This is what one area's picture looks like, built by reading the store's checkout specification.
-
-```
-Checkout  —  the flow that turns a cart into a paid order
-│
-├── cart  —  the items a customer has chosen but not yet paid for
-│        also called:
-│          - basket
-│          - bag
-│        contains → line items, each holding:
-│          - product
-│          - quantity
-│          - price
-│        enables → checkout once it holds at least one item
-│
-├── payment  —  the step that charges the customer
-│        can be:
-│          - pending
-│          - authorised
-│          - failed
-│        produces → receipt
-│
-└── produces → order  —  a confirmed purchase
-         opens into:
-           - line items
-           - shipment
-           - tracking
-         can be:
-           - placed
-           - shipped
-           - delivered
-           - cancelled
-         a cancelled order → locks → shipment
-```
-
-Boxes are the things; the arrows and words between them are the relationships, each lifted from a sentence. The `also called` lines are the other words the source used — the ones we would retire.
-
-> **Note the trap it catches:** "order" here means the *purchase*. Elsewhere the spec used "order" for a
-> list's *sort sequence*. That is one word with two meanings — a conflict the picture makes visible, to be
-> settled at the gate (perhaps: keep "order" for the purchase, rename the other to "sort order").
-
----
-
-## 6. Recommending a better word
-
-This is deliberate editorial work, bounded by one rule:
-
-> **We may improve a label. We may never invent a meaning.**
-
-The meaning is always the source's, stated back plainly. Only the *name* is open to improvement, and every improvement is a proposal to the gate — never a silent swap.
-
-**Example 1 — relative words with no axis.** The store names shipping speeds "quick ship" and "slow ship".
-
-| Thing | Source words | Recommended | Why |
-|---|---|---|---|
-| next-day, higher cost | quick ship<br>fast ship | **express delivery** | names the tier, not a vague "quick" |
-| 3–5 day, included | slow ship<br>normal ship | **standard delivery** | pairs cleanly with "express" |
-
-The tool states the *axis of difference* (delivery speed and cost) — that is the intelligent part, not merely noticing the words vary.
-
-**Example 2 — a generic word.** A feature is called "smart search". "Smart" says nothing. If the source shows it *suggests results as you type*, the recommendation is **predictive search**; if it *remembers past searches*, **recent searches**. The tool proposes based on what the source actually describes — and if the source is unclear, it asks rather than guesses.
-
-In practice, strong words often already exist, so recommendation fires rarely. That is correct behaviour — it should not rename things that are already clear.
-
----
-
-## 7. Conflicts we resolve
-
-Five kinds, each surfaced with its locations and taken to a gate. The tool never picks the winner.
-
-| Kind | Description | Store example |
+| Lens | What it finds | Doc |
```

Line 238

```diff
-| Several words, one thing | synonyms to collapse | cart / basket / bag |
-| One word, two meanings | a word to split or narrow | "order" = a purchase vs a sort sequence; "delivery" = the act vs the parcel |
-| Part vs whole | a whole confused with its part | "order" (the whole purchase) vs "line item" (one product in it) |
-| Collides with our own working words | a product word clashes with the team's process vocabulary | the store's marketing "story" (a customer testimonial) vs a "user story" in our process |
-| Drift between documents | the same thing named differently across files | spec "wishlist" vs mock-up "saved items" |
-
----
-
-## 8. What the method produces (interim and final)
-
-### Interim — the working-out, reviewed at the gate, not kept as the norm
-- **The picture** — one per area. This is what a person reviews first.
-- **The recommendation and conflict lists** — attached to the picture.
-- **The delta** — for a document being checked, the line-by-line disagreements and proposed fixes.
+| Ontology | the candidates the section names | `lens1-ontology.md` |
+| Topology | the structure relationships between them | `lens2-topology.md` |
+| Choreography | the flow relationships, and the states | `lens3-choreography.md` |
```

Line 253

```diff
-### Final — the norm, kept and maintained
-- **The glossary**, split into category files (things, steps, states, roles — the categories are proposed during the build and confirmed at the gate). Each entry:
+Each section's three readings are written to its section draft. The section drafts are then joined into one assembly draft (`output-formats.md`, "What the assembly draft must contain").
```

Line 256

```diff
-  | Term | What it is | Part of | Previous definition |
-  |---|---|---|---|
-  | cart | the items a customer has chosen but not yet paid for | Checkout | — |
-  | order | a confirmed, paid purchase | Checkout | — |
+## 3. How a word becomes a term
```

Line 261

```diff
-  No "also called" column: retired words are *not* kept as entries. They live only on a retired list, so there is exactly one approved word per thing.
-
-- **A decisions record** — one row per conflict settled, with the **retired words** and the date. This retired list is what the checking step scans for.
-
-### A rule that protects traceability
-When we fix wording in a document that already exists, we change **words in prose only** — never a filename or an identifier. Renaming a file or an ID would break every cross-reference pointing at it. Each entry keeps a **Previous definition**, so any change is auditable and reversible.
-
-### A living document — and why a re-scan is not a fresh start
-The glossary is maintained, not built once and abandoned. When the source changes — or when a later scan reaches text the first pass never saw — the build runs again. But **a recommendation is only true at the moment it is made.** A word that looked new last month may already be an approved term today. So a re-scan never adds blindly; it **reconciles every candidate against the glossary that alre ...
-
-| Outcome | Meaning | Example |
+| Stage | What it is | Settled by |
```

Line 273

```diff
-| **Add** | genuinely new — no existing term covers it | a new "gift card" concept appears |
-| **Merge** | the same thing under a different word | text now says "trolley" — merge into the existing **cart**, retire "trolley" |
-| **Change** | an existing term's meaning has shifted | "order" now includes subscriptions — hand to the change step |
-| **No change** | already covered, same meaning | skip silently |
-
-Only **Add** and the naming half of **Merge** and **Change** reach a person; the rest are quiet. This is what stops the list going stale: the norm is always the current glossary, and each scan is a *delta against it*, never a new pile of words.
-
----
+| Word | any word or phrase as a source writes it | - |
+| Candidate | a word Ontology keeps for judging | the keep and drop lists in `lens1-ontology.md` |
+| Term | a candidate that passed the three tests and Gate 1 | the three tests in `otc-run-rules.md`, then a person at Gate 1 |
+| Definition | the agreed meaning of a term | a person at Gate 2 |
```

Line 282

```diff
-## 9. The three skills
+The method recommends; a person decides. A gate stops the run until every gate row is resolved (`otc-run-rules.md`, "The gates"). Every decision is recorded in the decision register.
```

Line 284

```diff
-The method is delivered as three skills. Each has one job, and each accepts loosely-coupled input — point it at whatever text you have.
+## 4. The three skills
```

Line 286

```diff
-| Skill | Its one job | Input | When it runs |
+| Skill | What it does | Reads | Writes |
```

Line 288

```diff
-| **harvest** | *Learn* the glossary (the norm) | any authoritative document(s) | once, to build |
-| **check** | *Measure* any text against the glossary | **any single document** | anytime, uniformly |
-| **change** | *Move* a term and propagate it | a term change + the files | when a term changes |
-
-**check is the universal instrument.** There is no "upstream vs downstream". The same logic runs every time: read the words, compare to the glossary, flag disagreement (a retired word, a wrong meaning, a product word missing from the glossary). It does not care which kind of document it is looking at — that is what delivers uniformity. It can even be pointed at the *source* documents themselves,  ...
-
-**check recommends; it never applies.** This is deliberate. check points out the gap and states the **next best action** — for example, "correct this wording by hand", "this needs the story re-generated, hand it back to the authoring step", or "this is a new product word — raise it for the glossary". It then stops. It does **not** edit the document, and it **never reaches into the authoring skill ...
+| harvest | builds or updates the glossary | the sources | the seven glossary pages and `deep-dives/` |
+| check | measures a document against the glossary; it changes nothing | a document and the seven glossary pages | the check findings, shown in the conversation |
+| disposition | acts on a finding, through a gate | the check findings, or a request to change a term | the changed pages, a decision register row, and the ripple list |
```

Line 296

```diff
-Two rules keep check honest:
-
-- **Flag drift where it originates, not in every copy.** A document that quotes another word-for-word is not flagged for the original's wording; check flags the original directly (it runs on that too). This stops one drift being reported many times.
-- **Any fix a person then makes is words in prose only** — identifiers and filenames never change, or every cross-reference pointing at them breaks.
-
----
+When to use each skill is in `skill-orchestration.md`. What each one reads and writes, step by step, is in its own `SKILL.md`.
```

Line 303

```diff
-## 10. The flow — what a person reviews, and when
+## 5. What the method produces
```

Line 305

```diff
-Four review gates. ◆ = nothing moves forward until a person approves.
-
-```
- authoritative doc(s) ─►  harvest ─► ◆ GATE 1  the picture + questions + word recommendations
-                                  ─► ◆ GATE 2  the definitions
-                                          │
-                                          ▼   the glossary now exists
-
- any single document  ─►  check   ─► ◆ GATE 3  the DELTA (what disagrees + recommendation + next best action)
-
- a term change        ─►  change  ─► ◆ GATE 4  the IMPACT (the change + every place it lands)
-```
-
-| A person reviews... | At | From |
-|---|---|---|
-| **Recommendations** — new terms + better-word suggestions | Gate 1 | harvest |
-| **Definitions** to approve or reword | Gate 2 | harvest |
-| **The diff / delta** — disagreement + recommendation + next best action | Gate 3 | check |
-| **The impact** of changing a term | Gate 4 | change |
-
-Sample of a recommendation at **Gate 1**:
-
-```
-Thing:         next-day, higher-cost shipping
-Source words:  quick ship
-               fast ship
-Recommend:     express delivery   (names the tier, not a vague "quick")
-Your call:     ✓  / or type another word
-```
-
-Sample of the delta at **Gate 3** — note it *recommends*, it does not apply:
-
-```
-File:       checkout/story-03-empty-cart.md
-Found:      "...the customer's basket is cleared after payment..."
-Issue:      "basket" was retired at Gate 1  →  approved word is "cart"
-Recommend:  replace "basket" with "cart" in this line
-Next best:  minor wording — safe to correct in place;
-            if the story needs regenerating, hand it back to the story step
-```
-
-check stops here. It has found and flagged the gap and named the next best action; the person takes the call. It does not edit the file, and it does not step into the authoring skills.
-
----
-
-## 11. Architecture — skills now, workflows later
-
-The rule: **anything with a gate is a skill** — it runs interactively and can pause for a person. A **workflow** is the ungated, background, parallel version that runs a skill across many items at once.
-
-Because the glossary has gates at every stage:
-
-- **Phase 1 is three skills, no workflows.** Everything is reviewed one document at a time.
-- **Phase 2 optionally adds workflows** purely for speed — e.g. checking a hundred documents in one pass, or applying a term change across many files at once. **A workflow never adds a new kind of review; the gates stay in the skills.**
-
----
-
-## 12. Where the skills live (folder layout)
-
-### Now — self-contained in `glossary_methodology/`, so it can be tried in isolation
-```
-glossary_methodology/
-├── glossary-design.md      this document
-├── skill-orchestration.md        how the skills and the workflow are invoked
-├── .skills/                THE PACKAGE — the skills and the method they share
-│   ├── _shared/glossary/   the METHOD (read-only reference) + templates/
-│   │   ├── otc-methodology.md  how the three OTC lenses tie together
-│   │   ├── lens1-ontology.md     OTC lens 1 — the things
-│   │   ├── lens2-topology.md     OTC lens 2 — structure (contains, kind of, reveals)
-│   │   ├── lens3-choreography.md OTC lens 3 — flow (states, locks/unlocks, produces)
-│   │   ├── otc-run-rules.md        the law: tests, weak-word, conflict kinds, boundary, gates, Add/Merge/Change
-│   │   ├── output-formats.md      the shapes and homes of every output
-│   │   └── templates/      BLANK copies of the output files
-│   ├── harvest/            skill — build or update the glossary
-│   ├── check/              skill — spot drift in a document
-│   └── disposition/        skill — act on drift
-└── (Output/glossary/)      the DELIVERABLE — the seven glossary files
-    └── deep-dives/         the EVIDENCE — one folder per section, the assembly draft, the gate log
-```
-`.skills/` is the single source of truth. When folded into a team's skill locations it drops in as-is (`_shared/glossary/` and the three skills, which may take a `glossary-` prefix to stay unique). Nothing about the method changes when it moves.
-
----
-
-## 13. How it fits the wider process
-
-A typical specification process runs: **requirements → features → grouping → epics → user stories → acceptance criteria.**
-
-```
-requirements + features ──► harvest ──► the glossary          (runs alongside grouping)
-                                            │
-                        (check guards any document)
-                                            ▼
-        every later document is written or checked against the glossary
-```
-
-- **harvest runs off the agreed requirements and features**, alongside the grouping step — neither blocks the other. Grouping decides *how work is delivered*; harvest agrees *the language*. Two different lenses on the same inputs.
-- **check applies the glossary uniformly** to any document, at any stage.
-- **Where a project already has documents written**, the practical path is: build the glossary now from the authoritative sources, then use check to bring the existing documents into line (words only, identifiers untouched), so the later work is written in the agreed language from the start.
-
-### Deliberately deferred
-Two integrations wait until the three skills are proven: the downstream authoring steps *reading* the glossary as a required input, and a hard gate that requires an approved glossary before detailed authoring begins.
-
----
+**The glossary** - seven pages in `Output/glossary/` (`output-formats.md`, "The output"):
+- `README.md`
+- `terms-and-relationships.md`
+- `object-terms.md`
+- `role-terms.md`
+- `step-terms.md`
+- `states-and-values.md`
+- `decision-register.md`
```

Line 408

```diff
-## 14. What we are asking you to confirm
+**The evidence** - `Output/glossary/deep-dives/`, kept with the glossary:
+- one section draft and one section decisions page for each section
+- the assembly draft
+- the gate log
```

Line 410

```diff
-1. **The approach overall** — a meaning-first picture that also captures the connections between words, the glossary drawn from it, a person deciding at every gate. *(Confirmed.)*
-2. **The tool's boundary** — it recommends better words and surfaces conflicts, but never picks a winner or invents a meaning. *(Confirmed.)*
-3. **check recommends, it never applies** — it points out the gap, names the next best action, and stops. It does not edit documents and does not reach into the authoring skills that own them. The person takes the call. *(Confirmed.)*
-4. **Categories proposed, not fixed** — the categories (things, steps, states, roles) are proposed during the build and confirmed at the gate. *(Confirmed.)*
-5. **The list never goes stale** — every re-scan reconciles against the existing glossary and reports a delta (Add / Merge / Change / No change), so a point-in-time recommendation is always re-judged against what is already agreed. *(Confirmed.)*
+Every page is built from its template in `.skills/_shared/glossary/templates/`, by the rules in `glossary-assembly-principles.md`.
```

Line 416

```diff
-The product-specific naming decisions themselves — "is this one thing or two?", "which word wins?" — are not decided in this document. They are exactly what the method brings to a person at each gate, with the evidence, when it runs.
+## 6. The words this method uses
```

Line 418

```diff
-**Next step:** build the three skills and the shared references, and produce a first Gate 1 on a real slice of the specification for you to judge.
+Every word on this page has one meaning, defined once in `method-words.md`. No doc, skill, template, or page defines a word of its own.
```

### glossary-methodology-prompts/README.md

New part: the words the prompts use come from method-words.md.

1 places changed.

Line 4

```diff
+## The words they use
+
+Both prompts, and any prompt added here later, read `.skills/_shared/glossary/method-words.md` first and use only its words (`method-words.md`, rule 6). It is the same word list the glossary itself was built with, so a prompt and the glossary it reads never give the same word two meanings.
+
```

### glossary-methodology-prompts/adversarial-check.md

3 places changed.

Line 6

```diff
-> - glossary terms and values are in pills; documents are referred to by role, never by filename
+> - glossary terms and values are in pills; glossary pages are referred to by the file names harvest gives them
+> - words: this prompt reads `.skills/_shared/glossary/method-words.md` first and uses every method word (page, section, kind, relationship and the rest) only as defined there
```

Line 22

```diff
-- read access to the same glossary (Objects, Steps, Map, States, Roles, Decision register, reconciliation, and the section deep-dives).
+- read access to the same glossary (`object-terms.md`, `step-terms.md`, `terms-and-relationships.md`, `states-and-values.md`, `role-terms.md`, `decision-register.md`, reconciliation, and the section deep-dives).
```

Line 33

```diff
-## The checks (the only things this does)
+## The checks (the only checks this does)
```

### glossary-methodology-prompts/feature-journey-analysis.md

Glossary pages named by their file names; kinds and conflict types as the lists; flow relationship, borderline judgement, no numbered levels; reads method-words.md first.

25 places changed.

Line 7

```diff
-> - document names are referred to by role, never by filename
+> - glossary pages are referred to by the file names harvest gives them
+> - words: this prompt reads `.skills/_shared/glossary/method-words.md` first and uses every method word (page, section, kind, relationship and the rest) only as defined there
```

Line 16

```diff
-Every glossary this method reads can be worked at four layers. Each one unravels a different thing and helps in a different way; the reading order runs top to bottom.
+Every glossary this method reads can be worked at four layers. Each one unravels something different and helps in a different way; the reading order runs top to bottom.
```

Line 21

```diff
-| Layer 2 - Term and kind | the agreed word, and whether it is an object, role, step or state | gives the exact word to match, and points to the right document |
-| Layer 3 - Structure and movement | how the term connects, and the step-by-step flow with its gates | shows whether the feature can reuse existing rails, and where it plugs in |
-| Layer 4 - Proof and close calls | the exact quotes, the LOB differences, the reuse-vs-missing call | lets you cite every claim and settle the tricky calls honestly |
+| Layer 2 - Term and kind | the agreed word, and whether it is an object, role, step, or state or value | gives the exact word to match, and points to the right page |
+| Layer 3 - Structure and movement | how the term connects, and the step-by-step flow with its flow relationships | shows whether the feature can reuse existing rails, and where it plugs in |
+| Layer 4 - Proof and borderline judgements | the exact quotes, the LOB differences, the reuse-vs-missing judgement | lets you cite every claim and settle the tricky judgements honestly |
```

Line 25

```diff
-Plain rule: use Layers 1 to 3 (the high-level docs) to find and match; drop into Layer 4 (the section deep-dives) to prove and settle. The high-level layers alone are not enough: the citations and the close calls live in Layer 4.
+Plain rule: use Layers 1 to 3 (the high-level pages) to find and match; drop into Layer 4 (the section deep-dives) to prove and settle. The high-level layers alone are not enough: the citations and the borderline judgements live in Layer 4.
```

Line 37

```diff
-- Before stories or estimates, as a grounded triage gate against an existing glossary.
+- Before stories or estimates, as a grounded triage check against an existing glossary.
```

Line 42

```diff
-- Glossary (level 1): one per LOB. If the feature names no LOB, carry all and mark it an open question.
-- Family (level 2, also called a section): the module group; identified by its root term.
-- Kind (level 3): Object, Role, Step, or State-value.
-- Term (level 4): the individual entry.
-- Attaching to a term: Relationship, Gate, Value, Decision.
+How a glossary is organised, largest to smallest:
+- Glossary: one per LOB. If the feature names no LOB, carry all and mark it an open question.
+- Family: a top-level part of each page, identified by its root term.
+- Kind: object, role, step, or state or value.
+- Term: the individual entry.
+- Attached to a term: structure relationships, flow relationships, values, and decisions.
```

Line 51

```diff
-## 4. The documents (by role, name-agnostic)
+## 4. The pages (by what each is for)
```

Line 53

```diff
-Filenames vary by project and skill version. Match each document by its job, not its name:
+Filenames vary by project and skill version. Match each page by its job, not its name:
```

Line 55

```diff
-- the Objects document: the things the product stores, shows, or acts on.
-- the Steps document: the stages and actions, in order.
-- the Relationships or Map document: the hierarchy and how terms connect.
-- the States and Values document: the named conditions and closed value-sets.
-- the Roles document: the kinds of person.
-- the Decision register: synonyms retired, terms split, and why a word was chosen.
-- the reconciliation document: the joined view that stitches the sections and the LOBs into one coherent model and records the resolved conflicts (synonyms, one-word-two-meanings, part-vs-whole, and the cross-LOB drift). This is where "same concept across LOBs" is settled, so it carries the cross-LOB notes a feature-fit call needs.
+- `object-terms.md`: the objects the product stores, shows, or acts on.
+- `step-terms.md`: the stages and actions, in order.
+- `terms-and-relationships.md`: the hierarchy and how terms connect.
+- `states-and-values.md`: the named conditions and closed value-sets.
+- `role-terms.md`: the people the product serves, records, or gives access to.
+- `decision-register.md`: synonyms retired, terms split, and why a word was chosen.
+- the reconciliation page: the joined view that stitches the sections and the LOBs into one coherent model and records the resolved conflicts (several words, one meaning; one word, several meanings; part vs whole; and the cross-LOB drift). This is where "same concept across LOBs" is settled, so it carries the cross-LOB notes a feature-fit call needs.
```

Line 64

```diff
-Which document serves which layer (see The four reading layers above):
+Which page serves which layer (see The four reading layers above):
```

Line 66

```diff
-- Layer 1 (family): the Map or families overview.
-- Layer 2 (term and kind): the Objects, Roles, Steps and States documents; the Decision register settles synonyms.
-- Layer 3 (structure and movement): the Map (connections) and the Steps (flow and gates).
-- Layer 4 (proof and close calls): the section deep-dives, and the reconciliation document for cross-LOB calls.
+- Layer 1 (family): `terms-and-relationships.md` or the families overview.
+- Layer 2 (term and kind): `object-terms.md`, `role-terms.md`, `step-terms.md` and `states-and-values.md`; `decision-register.md` settles synonyms.
+- Layer 3 (structure and movement): `terms-and-relationships.md` (connections) and `step-terms.md` (the flow).
+- Layer 4 (proof and borderline judgements): the section deep-dives, and the reconciliation page for cross-LOB judgements.
```

Line 77

```diff
-- Step 3 (decompose): apply the tokenization rule (section 10).
+- Step 3 (decompose): apply the tokenization rule (part 10).
```

Line 79

```diff
-- Step 5 (travel the taxonomy per token): Glossary -> Family (via root term) -> Kind (which picks the document) -> Term.
-- Step 6 (three-lens read): section 7.
-- Step 7 (classify and roll up): token results roll into one verdict via the thresholds (section 8).
-- Step 8 (output): the Feature Fit view (section 9).
+- Step 5 (travel the taxonomy per token): Glossary -> Family (via root term) -> Kind (which picks the page) -> Term.
+- Step 6 (three-lens read): part 7.
+- Step 7 (classify and roll up): token results roll into one verdict via the thresholds (part 8).
+- Step 8 (output): the Feature Fit view (part 9).
```

Line 91

```diff
-- relationship or gate
+- structure or flow relationship
```

Line 99

```diff
-- Ontology: does the term exist? (Objects, States, Decisions)
-- Topology: where does it sit, and how does it connect? (Map)
-- Choreography: how does it move, and what gates? (Steps)
-- Roles: who acts? (Roles)
+- Ontology: does the term exist? (`object-terms.md`, `states-and-values.md`, `decision-register.md`)
+- Topology: where does it sit, and how does it connect? (`terms-and-relationships.md`)
+- Choreography: how does it move, and what locks or unlocks it? (`step-terms.md`)
+- Roles: who acts? (`role-terms.md`)
```

Line 117

```diff
-  - Movement (from the Steps document): how the feature would flow.
-  - Model (from the Map document): where it sits in the term graph.
+  - Movement (from `step-terms.md`): how the feature would flow.
+  - Model (from `terms-and-relationships.md`): where it sits in the term graph.
```

Line 126

```diff
-- Tokenization rule: one token per noun phrase (things), one per verb (actions), one per qualifier or constraint (scope, time, state); drop pure connectors; test each token independently.
-- Kind decision rule: person is a Role; a thing the system stores, shows, or acts on is an Object; an action or stage is a Step; a status or fixed value-set is a State; a link between two things is a Relationship or Gate. A token may be more than one Kind: test each, and give each its own row.
-- Verdict thresholds: as in section 8; the verdict follows the rule, not a feel.
+- Tokenization rule: one token per noun phrase (objects), one per verb (actions), one per qualifier or constraint (scope, time, state); drop pure connectors; test each token independently.
+- Kind decision rule: person is a role; something the system stores, shows, or acts on is an object; an action or stage is a step; a status or fixed value-set is a state or value; a connection between two terms is a Relationship or Gate. A token may be more than one Kind: test each, and give each its own row.
+- Verdict thresholds: as in part 8; the verdict follows the rule, not a feel.
```

Line 131

```diff
-- Qualifier materiality: a qualifier (for example "visitor" in "visitor parking") is tested as its own link, not folded into the head noun.
+- Qualifier materiality: a qualifier (for example "visitor" in "visitor parking") is tested as its own relationship, not folded into the head noun.
```

Line 134

```diff
-- Presentation: uniform diagram prefixes (Kind for glossary nodes, flow role for flow-only nodes: Trigger, Actor, Decision, Outcome); colours green for reuse, red for new, blue for a decision; portable pills (terms and values pilled, file names italic, Kind tags in square brackets); one item per line where a real list belongs.
+- Presentation: uniform diagram prefixes (Kind for glossary nodes, place in the flow for flow-only nodes: Trigger, Role, Decision, Outcome); colours green for reuse, red for new, blue for a decision; portable pills (terms and values pilled, file names italic, Kind tags in square brackets); one item per line where a real list belongs.
```

Line 140

```diff
-- New capability: "allocate visitor parking for a period". The component nouns are reused, but the capability (allocate a space to a visitor for a period) is not modelled; the core link and steps are absent.
+- New capability: "allocate visitor parking for a period". The component nouns are reused, but the capability (allocate a space to a visitor for a period) is not modelled; the core relationship and steps are absent.
```

Line 144

```diff
-- Rule: pick the Glossary, narrow to the Family by its root term, let the Kind pick the document, match the Term strictly, then reuse with a citation or declare a gap.
-- Ladder: exact, then synonym, then value, then relationship or gate, then cross-cutting, then gap.
-- Verdict: Fits, Extend, New capability, or Blocked, by the section 8 thresholds.
+- Rule: pick the Glossary, narrow to the Family by its root term, let the Kind pick the page, match the Term strictly, then reuse with a citation or declare a gap.
+- Ladder: exact, then synonym, then value, then structure or flow relationship, then cross-cutting, then gap.
+- Verdict: Fits, Extend, New capability, or Blocked, by the part 8 thresholds.
```

Line 151

```diff
-Copy this skeleton and fill it; keep the section order. It is the shape every Feature Fit view takes, and filling it the same way each time is what makes the output repeatable.
+Copy this template and fill it; keep the part order. It is the shape every Feature Fit view takes, and filling it the same way each time is what makes the output repeatable.
```

Line 176

```diff
-### Layer 4 - Proof and close calls
+### Layer 4 - Proof and borderline judgements
```

Line 198

```diff
-(mermaid: prefix each node with its Kind, or a flow role: Trigger, Actor, Decision, Outcome)
+(mermaid: prefix each node with its Kind, or its place in the flow: Trigger, Role, Decision, Outcome)
```

Line 204

```diff
-- <value-set> [State] values: one value per line
+- <value-set> [state or value] values: one value per line
```

### skill-orchestration.md

Word changes, plus the rule for adding a skill or prompt.

13 places changed.

Line 3

```diff
-`@` marks an **invocation point** — where you call a skill or the workflow. There are three ways to run the glossary: **build** it (`@harvest`), **keep a changed document in step** with it (`@check` then `@disposition`), and **build at scale** (`@glossary-sweep`). Skills run in the main thread and pause at a gate; the workflow runs in the background and hands its result to `@harvest` for the gate ...
+`@` marks an **invocation point** — where you call a skill or the workflow. There are three ways to run the glossary: **build** it (`@harvest`), **keep a changed document in step** with it (`@check` then `@disposition`), and **build at scale** (`@glossary-sweep`). Skills run in the main thread and pause at a gate; the workflow runs in the background and hands its result to `@harvest` for the gate ...
```

Line 13

```diff
-    NB --> O["Ontology: find the things"]
+    NB --> O["Ontology: find the candidates"]
```

Line 16

```diff
-    T --> C["Choreography: animate with states and gates"]
-    C --> WP["Assemble, then whole-picture rules"]
+    T --> C["Choreography: animate with states and flow relationships"]
+    C --> WP["Assemble, then apply the rules to the assembly draft"]
```

Line 32

```diff
-    CH --> F["Drift found: retired word, wrong meaning, new term, internal drift"]
+    CH --> F["Drift found:<br/>a retired word in use<br/>a term used against its definition<br/>a product word with no entry<br/>two words for one meaning"]
```

Line 35

```diff
-    Q -- "the doc is wrong" --> FIX["Flag the document to fix"]
-    Q -- "the glossary must change" --> UPD["Update the glossary (gated) + register + ripple"]
-    Q -- "a new term" --> HARV["Raise it to @harvest"]
+    Q -- "fix the document" --> FIX["Flag the document to fix"]
+    Q -- "change the glossary" --> UPD["Update the glossary (gated) + register + ripple"]
+    Q -- "add the term through harvest" --> HARV["Raise it to @harvest"]
```

Line 44

```diff
-Invoked when you want the **whole catalog** read at once rather than section by section. It only reads, in parallel; it cannot gate, so it hands its package to `@harvest` for the gates and the writing.
+Invoked when you want the **whole catalog** read at once rather than section by section. It only reads, in parallel; it cannot gate, so it hands the assembly draft and the Gate 1 rows to `@harvest` for the gates and the writing.
```

Line 52

```diff
-    S1 --> ASM["Assemble all sections, then whole-picture rules"]
+    S1 --> ASM["Assemble all sections, then apply the rules to the assembly draft"]
```

Line 55

```diff
-    ASM --> PKG["Review package: picture, recommendations, conflicts, deltas"]
+    ASM --> PKG["Assembly draft and Gate 1 rows: recommendations, conflicts, deltas"]
```

Line 63

```diff
-Each agent runs the three OTC lenses — Ontology, then Topology, then Choreography — on its own section, producing that section's picture. The agents run in parallel, then converge to be assembled.
+Each agent runs the three lenses — Ontology, then Topology, then Choreography — on its own section, producing its section draft. The agents run in parallel, then converge to be assembled.
```

Line 67

```diff
-The sweep creates many folders at once, so it declares them first. Before spawning any agent, it shows the paths it will use — the seven glossary files and every `deep-dives/` file (each section's folder, the assembly draft, and the gate log) — as a tree, one file per line, using the layout in `output-formats.md` ("The run root"), and **stops for confirmation whenever there is a fork:**
+The sweep creates many folders at once, so it declares them first. Before spawning any agent, it shows the paths it will use — the seven glossary pages and every `deep-dives/` file (each section's folder, the assembly draft, and the gate log) — as a tree, one file per line, using the layout in `output-formats.md` ("The run root"), and **stops for confirmation whenever there is a fork:**
```

Line 80

```diff
-| section agent (one per section) | `.skills/_shared/glossary/sweep-reader-brief.md` | runs the three OTC lenses on its one section, inline rules only | `deep-dives/<section>/<section>-glossary.md` |
-| assembly agent (one per glossary) | `.skills/_shared/glossary/sweep-builder-brief.md` | joins the section drafts, runs the whole-picture rules, builds the review package | `deep-dives/glossary-assembly-draft.md` and the Gate 1 part of `deep-dives/gate-log.md` |
+| section agent (one per section) | `.skills/_shared/glossary/sweep-reader-brief.md` | runs the three lenses on its one section, inline rules only | `deep-dives/<section>/<section>-glossary.md` |
+| assembly agent (one per glossary) | `.skills/_shared/glossary/sweep-builder-brief.md` | joins the section drafts, runs the rules over the assembly draft, writes the Gate 1 rows | `deep-dives/glossary-assembly-draft.md` and the Gate 1 part of `deep-dives/gate-log.md` |
```

Line 83

```diff
-The briefs carry only what parallel running adds — scope, read-only, where to write, what to hand back — and they **reference** the method files rather than restate them, so the one-shared-method rule below still holds. The agents read only; `@harvest` holds both gates and writes `Output/glossary/`, recording each gate to a durable gate log (`output-formats.md`, "The gate log") that blocks the ru ...
+The briefs carry only what parallel running adds — scope, read-only, where to write, what to hand back — and they **reference** the method files rather than restate them, so the one-shared-method rule below still holds. The agents read only; `@harvest` holds both gates and writes `Output/glossary/`, recording each gate to a durable gate log (`output-formats.md`, "The gate log") that blocks the ru ...
```

Line 87

```diff
+
+**Adding a skill or prompt.** Every skill or prompt for the glossary - the three here, the two prompts, and any added later - names `.skills/_shared/glossary/method-words.md` among what it reads and uses only its words (`method-words.md`, rule 6). One that does not is incomplete.
```
