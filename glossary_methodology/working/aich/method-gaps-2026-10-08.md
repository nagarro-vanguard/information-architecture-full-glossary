# Method gaps from the AICH run - 2026-10-08

Every place where the AICH run hit something the method did not cover, or where two of its rules disagreed. None of these were fixed in the method during the run. Each entry says what happened and what the run did instead, so you can decide the rule later.

The run itself is in `Output/glossary/`. All gate calls were taken automatically on the recommendation, as asked for this dry run.

## Sections and sources

1. **Workbook sections.** "Sections" does not say what to do with a sheet that repeats another sheet's rows by id, or with rows that belong to no epic. The run used the plan confirmed at scaffolding:
   - one section per epic
   - restated rows read with their item
   - rows with no epic: one section per sheet
2. **Several documents.** Neither the source nor the method gives a reading order. The run used backlog, then EP-01 stories, then prototype, as confirmed at scaffolding.
3. **Prototypes.** The method reads sentences; a prototype is code. The run read on-screen text only:
   - one screen per section
   - the brief and its screenshots as one section
   - the frame shared by every screen read once, with the first screen
4. **Column headings and cell values.** Agents differed on whether a column heading (for example "Provider: All") is a candidate. The method reads sentences, not tables, but never says so for column headings.
5. **Backlog planning words.** Agents split on item types and planning values:
   - some dropped them as "describes the build"
   - some kept them as candidates under "cast a wide net"

   The words in question:
   - Epic
   - Story
   - Spike
   - Phase
   - Priority
   - Status
   - Owner team

   The reader brief needs one rule. The join failed them all on special meaning.
6. **Links given only by an item id.** "Depends On: E19" names another section by id only. The method reads phrases, and on a new build there is no shared glossary to recognise the target, so no agent recorded these.
7. **Prototype structure.** Prototypes have few sentences. Agents treated column headings, field labels and breadcrumbs as structural phrases ("its a, b and c"); the no-phrase-no-link rule has no form for screens.
8. **Contradictions that are not word conflicts.** Examples:
   - E03's owner team is "Product" on one sheet and "Eng" on another
   - P07 and D03 depend on each other

   The section draft has no place for these.

## Reading the words

9. **Drop reasons.** The drop list has no row for:
   - a word that fails KEEP (not one of the four kinds)
   - a verb or action ("reconciles", "sign in")
   - the product's own name (AICH)

   Agents cited the lens 1 worked example ("an action (verb), not a thing") or wrote "not one of the four kinds".
10. **The product's own name.** AICH fits none of the four kinds. Agents split between keeping it as an object and dropping it; the join dropped it.
11. **Unnamed sets.** When the source names no set, agents invented a set name, such as "Cost state" or "Access state". Lens 1's own example does this, but the method never says it is allowed.
12. **Abbreviations never spelled out.** The section draft has no place for these (BU, Org, AICH, CCS, PCEO). They surface only as a note in a meaning cell.
13. **Team names.** G6 rule 3 covers company, product and vendor names only. A team name such as Org IT Infra has no casing rule; agents split between "Org IT Infra" and "Org IT infra", and the glossary uses "Org IT infra".
14. **Words the method itself uses.** "Role", "harvest", "source", "hierarchy" and "level" are both product words and method words. The run raised the first three as Gate 1 conflicts. Part 4 of the section draft has no slot for this conflict kind.
15. **A word that is also fixed wording.** Every role definition must open "A person who ...", so "person" cannot be retired, while a merge row could retire it. The run kept "person" as an everyday word.
16. **Structural phrases stretched.** The structural give-away phrases are a short list, and agents stretched it:
   - "set on X" read as contains
   - "below" read as contains
   - "names the node" read as reveals

## Templates against rules

17. **Quotes and banned characters.** The brief and output-formats say quotes stay exactly as the source has them; G6 bans em dashes, middots, arrows and curly quotes, and the step 9 sweep must fix every banned character. The agents avoided the clash by choosing quote spans without banned characters; the sweep found none.
18. **Relationship-words table.** The section template prints all seven relationship words; G4 rule 2 says list only the words a document uses. Agents split between the two.
19. **No "not placed" part in the section draft.** A section draft has nowhere to list terms with no structural relationship; the assembly draft does.
20. **"Thing" against "object".** G5 level tables say "thing" for the kind that lens 1, the fixed block and the kind pages call "object". The method breaks its own one-word rule.
21. **Comma-joined lists in templates.** The template's "Source:" line is a comma-joined list, which G6 rule 7 forbids; agents wrote bullets. The assembly draft's "Word (also written as: a, b)" puts a list inside a bracket, which G6 rule 7 also forbids; the run followed the template.
22. **Brackets in lens 1.** Lens 1's worked example writes alternates in a bracket ("(also seen as ...)"), which G6 rule 7 bans.
23. **Takeaways need families.** G5 rule 4's "shared" takeaway needs "<m> other families". Section drafts and the assembly draft are written before Gate 1 sets the families. Agents dropped or zeroed the clause; the assembly draft leaves it out. In the glossary it reads "in 0 other families" when every parent shares the term's family.
24. **Placement by produces.** Lens 2 builds the tree from contains, kind of and reveals only; G5 rule 1, which output-formats applies to section drafts, also places a term under what produces it. Agents followed the lens.
25. **Anchors collide in the object page.** The template's "### <Parent>" group headings give the same anchor as the parent's own row anchor.
26. **Decision register rows.** Part B says one row per contested term; harvest step 9 says every settled gate row becomes a register row. The run added the 83 Gate 1 rows. It did not add the 96 Gate 2 rows, all of which were accepted as written.

## Assembly and the gates

27. **No check of relationships.** Joining the drafts' relationships mechanically gave wrong placements, for example a node under an alert and AI cost under the unallocated node. The run raised five Gate 1 questions on relationships; the method has no step for this.
28. **First parent in source order.** Placement takes the first parent in source order, which favours the backlog's order. A term's most general parent can lose to an early, narrow one: Role sits under Access preview, not Mapping.
29. **Too many borderline words.** About 120 words appear in one section but several items, so each is borderline on reach. Raising them all would make the gate unusable. The run raised the eight that pass special meaning and consequence, and failed the rest on special meaning. The method gives no filter for which borderline words reach the gate (already an open item).
30. **Home family.** The method says each term's family comes from the Gate 1 decision, but not how it is assigned. The families row lists every term's family by hand.
31. **Retired words in family names.** The families come from the product's menu, and two of their names use words the glossary retired:
   - "Budgets" (budget)
   - "Seats & licenses" (license)

   This was already an open item.
32. **A subagent could not write.** One section agent was blocked from writing files ("Subagents should return findings as text"). The main thread wrote its two files unchanged from its report.
