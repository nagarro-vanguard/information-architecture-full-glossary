# Method gaps - COBOL "my first program" run, 2026-10-13

Places where the glossary method did not settle what to do on this source, logged during the run instead of changing the method. Each row says what happened, what this run did, and a proposed rule. Nothing here has been applied to the method.

**What to do with it.** After the run, give each row a call: adopt the proposed rule, change it, or leave the method as it is.

**The source.** IBM cobol-is-fun, `my-first-program` folder: README.md plus seven code and data files, read literally (your option B), one section per file (your option a).

| # | What happened | Where in the method | What this run did | Proposed rule | Your call |
|---|---|---|---|---|---|
| 1 | The source is a code repository, not requirements or a feature catalog | harvest SKILL.md, "Reads" | Read the README's prose, code comments, and the program's displayed messages; skipped code and data lines | Say what a code repository contributes as a source, or rule it out | |
| 2 | Code and data files have no headings; the method does not say whether a language's own parts (COBOL divisions, JCL steps) count as "the source's own structure" | otc-methodology.md, "Sections" | Asked you before reading; you chose one section per file | A file with no headings is one section; decide sections at the scaffolding stop, since no gate exists before reading | |
| 3 | The README's title is a heading with no text under it | otc-methodology.md, "Sections" | Kept it as a section, which came back empty | A heading with no text of its own is the document's title, not a section | |
| 4 | Two things are not stated: the order of sections across several files, and the folder name for a whole-file section | otc-methodology.md, "Naming a section" | Used the repository's own file order; named folders from the file name in kebab-case, for example bind-jcl | Write both into "Naming a section" | |
| 5 | Two images cannot be read; the Flow section is an image only | lens1-ontology.md | Recorded the Flow section as read and empty | An image-only section is recorded and flagged for the source's owner | |
| 6 | Part 5 of the section draft asks for a DROP-list reason, but some words fail the KEEP rule instead (licence names), and some text is not read at all (code, data rows); lens1's own worked example already uses reasons not on the DROP list | templates/section-glossary.md, part 5; lens1-ontology.md, DROP | Used "not one of the four kinds" and "not read: not a sentence" | Add both to the allowed reasons | |
| 7 | The mechanism-word drop assumes the build is not the product; here the source's subject is the build | lens1-ontology.md, DROP | Took "the product" to be what the README says the application is: the program and its three jobs; dropped platform and tool words around it | A rule for sources whose subject is technical | |
| 8 | "List" is a DROP-list example of an everyday word, but "sorted list" and "merged list" name specific things | lens1-ontology.md, DROP | Dropped bare "file" and "list"; kept compounds that name one specific thing | A rule for compounds built on an everyday word | |
| 9 | Topology and Choreography pair terms only within one sentence, so a part named across two sentences ("There are two parts to this application. First is the COBOL source code itself.") gets no relationship, and numbered steps without "then" get no order | lens2-topology.md, lens3-choreography.md, "Procedure" | Recorded no relationship in both cases | Allow a relationship across consecutive sentences when the second sentence refers back to the first | |
| 10 | The give-away phrase lists read as examples, not closed lists | lens2-topology.md, lens3-choreography.md | Accepted close equivalents of the listed phrases, each quoted in its draft | Say whether the lists are closed; if open, give the test for an equivalent | |
| 11 | In a tutorial each concept is explained in one section, so most COBOL and JCL words fail reach; "borderline: one feature but several requirements" has no unit in prose | otc-run-rules.md, "The three qualifying tests" | Treated "one section, but more than one paragraph or numbered item" as borderline and raised those at Gate 1 | Name the borderline unit for prose sources | |
| 12 | The special-meaning test has no stance on technical words a general reader already knows | otc-run-rules.md, "The three qualifying tests" | A word passes when the source explains it, or uses it with more than one meaning | Write that into the test | |
| 13 | The same-thing test needs agreement on all three lenses, but a word often has no placement or no states at all | otc-methodology.md, "The same-thing test" | Read missing information as agreement; only a contradiction keeps two words apart | Say so in the test | |
| 14 | The source never names a set of states, such as "started" and "ended" | lens1-ontology.md, States and values | Named the set "<thing> state", as lens1's worked example does | Write the naming rule | |
| 15 | G6 has no rule for a language keyword inside a term | glossary-assembly-principles.md, G6 | Wrote "Merge statement" in sentence case but kept "EXEC statement" and "DD statement" in capitals, as abbreviations | Say how keywords are cased | |
| 16 | The template's "(also written as: a, b, c)" puts a list inside brackets, which G6 rule 7 forbids | templates/glossary-assembly-draft.md; G6 rule 7 | Followed the template, as the AICH run did | Pick one and change the other | |
| 17 | No rule says which family a term goes to when it appears in several sections | glossary-assembly-principles.md, G1 | Listed every term's family in the families row of the gate log (G1-23) | A family placement rule | |
| 18 | G5 places a term under what creates it, but lens2 says Topology records only contains, kind of and reveals | glossary-assembly-principles.md, G5 rule 1; lens2-topology.md | Followed G5: created-by rows appear in each draft's level table | Align lens2 with G5 | |
| 19 | When reach drops a term, the terms placed under it lose their parent: job card lost "statement", and sorted list lost "sort statement" | otc-run-rules.md; G5 | Showed those terms as not placed | Decide whether a left-out parent still places its children | |
| 20 | Words dropped in Ontology never reach a person, so they cannot be overruled at Gate 1, for example "file" and "list" | lens1-ontology.md; output-formats.md, "The Gate 1 review" | Listed them in each draft's part 5 only | A Gate 1 table for dropped words a reader might expect | |
| 21 | The "reads as" pattern for unlocks has no articles, so it reads "DD statement lets COBOL compiler happen." | glossary-assembly-principles.md, G5 rule 3 | Followed the pattern | Allow articles, as the produces pattern has | |
| 22 | The gate-log template has no wording for a Gate 2 part that is not raised yet | templates/gate-log.md | Wrote one line: "Not raised yet" | Add the line to the template | |
| 23 | The only person in the source, the program's author, is named in code only ("AUTHOR."), so the glossary has no roles | lens1-ontology.md, KEEP | Recorded no roles | None needed: an observation on this source | |

## Related pages

| Page | Why it relates |
|---|---|
| [gate-log.md](Output/glossary/deep-dives/gate-log.md) | the Gate 1 rows this run raised |
| [glossary-assembly-draft.md](Output/glossary/deep-dives/glossary-assembly-draft.md) | the joined picture, including the terms left out by the tests |
