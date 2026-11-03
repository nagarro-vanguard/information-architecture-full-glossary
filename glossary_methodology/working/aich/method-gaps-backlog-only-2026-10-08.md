# Method gaps from the AICH backlog-only run - 2026-10-08

This run rebuilt the AICH glossary from one source only: `AI_Cost_Hub_Product_Backlog_v5.0.xlsx`, all four sheets. The prototype and the EP-01 stories were left out. Every gate call was taken automatically on the recommendation, as asked. Nothing in the method was changed during the run.

The run is in `Output/glossary/`. It has:
- 31 sections
- 72 terms:
  - 53 objects
  - 5 roles
  - 8 steps
  - 6 states or value sets
- 65 Gate 1 rows
- 14 families

Numbers in brackets refer to the gap list from the earlier run, `method-gaps-2026-10-08.md`.

## Gaps that came back

These showed up again with only the backlog as the source, so they belong to the method, not to the prototype or the stories.

1. **Planning words (#5).** Agents split three ways on Epic, Story, Phase, Priority, Status, Owner team and MVP:
   - most dropped them as "mechanism or how" words
   - some dropped them as "formatting artifacts" or "not one of the four kinds"
   - four sections kept them as candidates under "cast a wide net": GitHub Copilot, cloud infrastructure, backlog, assumptions

   The join failed them all on special meaning, as last time.
2. **Drop reasons (#9).** The same word was dropped under three different labels across sections. The drop list still has no row for a planning word, a vendor name, or the product's own name.
3. **The product's own name (#10).** AICH was kept as an object by 12 sections and dropped by at least eight, under two different reasons.
4. **Links given only by an item id (#6).** Most agents skipped "Depends On: E14". The MVP acceptance agent read "Depends On" as a flow phrase where both ends sat in its own section, so the split is new.
5. **Column headings and cell values (#4).** Two splits:
   - Provider was kept as a value set by most sections and dropped as a column artifact by the seat section.
   - The backlog section placed "Epic contains Item" on the column heading "Parent Epic ID" alone.
6. **Unnamed sets (#11).** Agents named sets the source never names, such as Usage level and Seat state. The join kept three of these names (Cost figure state, Reconciliation result, Seat state), each raised as a Gate 1 row.
7. **Abbreviations never spelled out (#12).** AICH, BU, MVP and P0 are never expanded anywhere in the backlog. Gate 1 asked about AICH and BU. The draft still has no place for these.
8. **Team names (#13).** "Org IT Infra" was kept in its own form by two sections and sentence-cased by four.
9. **Words the method itself uses (#14).** Raised at Gate 1 as conflicts:
   - Role
   - Level
   - Harvest
   - Source
   - Hierarchy

   New this time: the source's "Locks the cost model" (meaning "settles it") clashes with the method's "locks".
10. **"Person" as fixed wording (#15).** This run merged "person" into User at Gate 1, while every role definition still opens "A person who". Last run kept "person" as an everyday word. The same input got two different calls.
11. **Structural phrases stretched (#16).** Agents read these as structure:
    - "sits under" and "lands in" as contains
    - "names" as contains
    - "with" as contains
    - "who receives which alert: a, b, or c" as kind of
12. **Relationship-words table (#18).** Some drafts printed all seven words, as the template does; others printed only the words used, as G4 rule 2 asks.
13. **"Thing" against "object" (#20).** The level tables still say "thing".
14. **Comma list inside a bracket (#21).** The assembly draft's "Word (also written as: a, b)" form is still in the template and in the output.
15. **Takeaways need families (#23).** One section draft wrote "in this section" in place of the family count.
16. **Decision register rows (#26).** The register has the 65 Gate 1 rows and none of the Gate 2 rows.
17. **No check of relationships (#27).** The join needed eight Gate 1 relationship questions to take out wrong placements, for example "user contains seat cost", "alert contains node" and "Org is a kind of level".
18. **Borderline reach (#29).** About 150 words appear in one section but in several items. Six were raised at Gate 1. The rest failed on special meaning.
19. **Home family (#30).** The method still does not say how a term gets its family. This run used: "the epic section that quotes the term most, ties to the earlier one". The result reads wrong:
    - Org and User land in "Cost pooling"
    - BU lands in "Access"
    - Provider lands in "MVP acceptance"
20. **Retired words in family names (#31).** The families are the epic titles, and three of them use words the glossary retired:
    - "Budgets, allowances and alerts" uses budget
    - "Cost allocation to users, BU and org" uses allocation
    - "Seat cost rollup from user to BU to org" uses rollup
21. **A subagent could not write (#32).** The reports section agent was refused by the Write tool. It wrote its files through a bash heredoc instead, which works around the guard rather than handing its text back.

## Gaps that did not come back

These came from the prototype or the stories, and need no rule for a backlog-only source:
- reading order across several documents (#2)
- reading a prototype (#3)
- structure on prototype screens (#7)

## New gaps

1. **"Other" against a named provider.** Every later-phase provider epic names its provider in the title but says "Provider: Other". Agents raised this as "several words, one thing". It is really a planning value contradicting the title, and none of the five conflict kinds fits it.
2. **Single-row sections.** 14 of the 31 sections are one parked epic row. Their drafts are nearly empty: every term at L1, no relationships. The method has no minimum size for a section and no rule for folding thin ones together.
3. **A flow gate on a dropped word.** "Must be confirmed before stories can be written" gates "stories", a dropped planning word. Agents handled it two ways:
   - one dropped the gate
   - one moved it onto the epic's subject
4. **"Re-checks" has no flow phrase.** G5 lists re-checks as a relationship word, but lens 3's list of flow phrases has none for it. So "picked up on the next daily run" was left without a gate.
5. **A title read as flow.** "From User to BU to Org" was read as "user comes before BU". It names the direction cost rolls up in, not stages of the work.
6. **Moved rows are not announced.** The MVP scope summary agent saw rows 20 to 55 missing and suspected an under-read. Those rows had been moved to their own items' sections by the plan "restated rows read with their item". A section built by moving rows needs a line saying where the moved rows went.
7. **Families from a backlog.** With the menu gone, the only top-level grouping is the 28 epics. G1 asks for "a small, named set of families taken from the source's own top-level groups", and these two halves pull apart. The run took one family per epic that holds a term, which gave 14 families of 1 to 13 terms each. Last run's recommendation had rejected exactly this option as "a build plan, not a set a reader can learn once".
