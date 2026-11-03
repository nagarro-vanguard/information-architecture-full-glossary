# FRD conventions — the rules the FRD author enforces

These are non-negotiable. The template (`frd-template.md`) is the shape; this file is the law.

Other files point to a section by its name, for example "the Done when section of the conventions". Terms
such as clause, review stop and suggested rule are defined in `SKILL.md`, under "Words used in this skill".

**An FRD is a living document.** It never carries a status such as draft, approved or final. What has been
decided, by whom and when, is in its Decision record.

## 1. IDs — only these, never invent new prefixes

| ID | Means | Who assigns it |
|---|---|---|
| `REQ-x.y` | a requirement | the requirements doc (verbatim) |
| `F-nn` | a feature | the feature catalog |
| `F-nn.dwN` | the Nth clause of feature F-nn's "Done when" | the FRD author (numbering the verbatim clauses) |
| `F-nn.n` | a rule | the FRD author |

No `FR-`, `BR-`, `AC-`, `GI/GO`, or any other prefix. If you feel the need for a new prefix, stop — you don't need it.

Rules are numbered per feature from 1 with no gaps: `F-16.1`, `F-16.2`, `F-16.3`. Done-when clauses the same:
`F-16.dw1`, `F-16.dw2`.

**Rule order is source order** until the person first accepts the changes, so every run gives the same
behaviour the same ID:
1. Rules from Done-when clauses, in clause order: all of `dw1`'s rules, then `dw2`'s, and so on. Within one
   clause, in the order the clause mentions things.
2. Then `req` rules, in the order the requirement text states them.
3. Then `proposed` and `decided` rules.

**Once the person accepts the changes** (see the Changes and acceptance section), rule IDs never change. A rule
added later takes the next free number.

## 2. Capability — one FRD per capability

- A **capability** is a coherent group of features *within one module* of the catalog. Split a module
  into capabilities where it holds clearly distinct bodies of work; a small module may be one capability.
- **Number:** `FRD-<module><capability letter>` (module = the catalog section number; letter = the capability's
  order within the module: `a`, `b`, `c`…, in the order of each capability's lowest feature ID). E.g.
  `FRD-3b`. A letter, never a second number, so an FRD can never be read as a requirement ID (`FRD-3b` vs
  `REQ-3.2`).
- **Name:** one feature → its catalog name, exactly. Several features → the author proposes a name at the
  Step 1 review stop; the person decides it, and it is then fixed.
- **Filename:** `FRD-<module><capability letter>-<name>.md`, where the name is the capability name in
  lowercase, with spaces as `-` and `&` as `and`. E.g. `FRD-3b-source-management.md`.
- The capability runs off the **feature catalog + requirements doc only** — it does *not* wait for clustering.
  (Clustering groups features into EPICs — the large chunks delivery is planned in; the FRD groups them into
  capabilities for specification. Different lenses, run in parallel.)

## 3. Rules

- Every rule opens with **The system shall …** (those words sit in the column header; each cell holds the
  rest of the sentence).
- **One behaviour per rule.** No bundled "and/or" — split into two rules.
- **The Source column cites exactly one source per rule:**
  - `F-nn.dwN — <clause>` when it comes from a Done-when clause
  - `req — from the requirement` when it comes from the requirement text beyond the Done-when
  - `proposed — Why: <the options the sources name, and why this one>` — a rule the author suggests, waiting
    for the person's decision (see the Never invent section)
  - `decided — see Decision n` — a rule added or kept because of the person's decision
- **Notes.** Wherever the document differs from the requirements doc because of a decision, a note says so,
  right where the difference shows. The note always reads
  `*Updated from the requirement on the basis of Decision n: <what changed, in a few words>.*`
  - In a rule's Source cell, the note follows the source after `<br>`.
  - Every `decided` rule carries a note naming its own decision.
  - A rule taken from a Done-when clause or the requirement, whose wording a decision changed, keeps its source
    and adds the note.
  - In Actors and Data, the note sits next to the item that changed.
- **Constraints and validations** (must-nots, allowed value sets) are rules too — same table, use **not** or **only**.
- **A limit is its own rule.** If the source states a count ("one or more", "at most"), a closed list of
  values, or "only", write the allowing rule and a separate **not** or **only** rule for the limit.
  Example: "one or more roles" → "let a member hold one or more roles" and "**not** accept a member who
  holds no role".
- **Rules-only — state behaviour, never mechanism.** A rule says what a person sees or does, not how it's
  built. **Reject any rule containing a "how" word:** screen, page, button, click, tab, modal, dropdown,
  field, API, endpoint, database, schema, cache, queue, retry, chunk, checkpoint, commit, webhook, cron,
  thread, token, pixel. Rewrite it as behaviour, or drop it.

## 4. Done when — the anchor

- **Copied verbatim** from the catalog; **never edited** in the FRD.
- **Split into clauses without rewording.** Break the Done-when sentence into its separate conditions. Each
  clause uses only the catalog's words, in the catalog's order. Between two clauses you may drop only the
  joining text: `, ` or `, and ` or ` and ` or `; ` — nothing else. Never add, swap, or change the form of a
  word. Read in order, the clauses must reproduce the sentence. Number them per feature (`F-16.dw1`, `F-16.dw2`, …).
- **The Coverage table holds the split.** Every clause is listed there with its ID and text. That is
  the split the person decides at the Step 1 review stop.
- **Once decided, the split is fixed.** Step 2 never adds, removes, renumbers, or rewords a clause. Each
  rule quotes its clause exactly as the Coverage table lists it. If a split proves wrong while drafting,
  stop and return to the Step 1 review stop.
- **Every clause must map to at least one rule** — the Proved by column. A clause with no rule is an error;
  a rule tracing to nothing is either `proposed`, `decided`, or an invention to cut.
- If a feature's Done-when is **thin** (one vague clause that drops what the requirement says), flag it in
  Open questions and lean on the requirement text.

## 5. Sources — copied word for word, and named

- **Requirements** are listed with their **full text, verbatim**, each one **named** — never a bare `REQ-3.2`.
- **Feature descriptions** in "Features covered" are the catalog descriptions, verbatim. Feature name,
  requirement ID, and priority are the catalog's too.
- **Depends on** lists every feature the catalog names under "Depends on" for the covered features, minus
  the features inside this capability — each as `F-xx <catalog name>`.
- **Last changed** reads `<date>, Decision <n>`: the date and number of the latest entry in the Decision
  record. Before the first decision it reads `None yet.` Update it every time a decision is recorded.
- **Excludes** lists exactly these, one per line, and nothing else:
  1. every other feature in the same catalog module, in feature-ID order, as `F-xx <catalog name>`
  2. then any feature or module that **this FRD's own requirements** name in their text (by catalog name or
     module name), as `F-xx <catalog name>, linked by REQ-x.y` or `<Module name> module, linked by REQ-x.y`.
     Requirements this FRD does not cover never add an item.
  No description is added — the catalog name says what it is, so every run writes the same line.
  A neighbour that this FRD's own requirement text does not name is not listed.
- **Gates.** Every "Tied to" cell names features as `F-xx <catalog name>`, or reads `None.` — never `TBD`.
  - **In** — Tied to: the Depends-on features. Condition: the catalog's "Done when" line of each Depends-on
    feature, word for word (one per line, each after `• ` and joined by `<br>`, when there are several);
    `None.` when there is none.
  - **Out** — Tied to: the features whose catalog Depends on names a covered feature, from outside this
    capability. Condition: a plain sentence on what this capability makes possible for them. When Tied to is
    `None.`, the condition is this capability's own "Done when" line, word for word (one per feature, as
    above, when there are several).
  - **Undone if** — Tied to: the covered feature whose rule undoes Out. Condition: a plain sentence. `None.`
    in both cells when nothing undoes it.
- **Written gate conditions** (the Out and Undone if sentences that are not copied) are plain, written for no
  one role in particular, and understandable by any outside reader — no product jargon.
- **Actors** are the roles that this FRD's own requirement text names as doing something. When the text
  names none, the actor is `Any member`, and an Open question asks who does it — unless a decision has
  already settled it, in which case the row carries that decision's note.

## 6. Never invent — flag instead

- Never invent a limit, value, threshold, or rule. When the sources leave a gap, one test decides how it
  is raised:
  - **The sources name the possible answers, and the gap is which one applies** → a `proposed` rule picking
    one, written `proposed — Why: <the options the sources name, and why this one>`. Example: the sources
    say a member is "active or inactive" but not which a new member starts in.
  - **Anything else** → an Open question, with the unknown marked `TBD`. Never a rule. Example: the sources
    never mention duplicate emails, so whether they are allowed is a question.
  The person decides both at the Step 2 review stop.
- **Two readings.** When a source can be read two ways, the Open question is titled `Two readings: <topic>`,
  and its options are the two readings.
- **Every pending `proposed` rule appears in exactly three places** (missing from any one is an error):
  - its row in the Rules table
  - the **From your decisions** list under Coverage
  - a **Keep or drop F-xx.n?** entry in Open questions
- **After the person answers**, the decision is recorded in the Decision record, and then:
  - **A kept suggested rule** → its Source becomes `decided — see Decision n`, with its note.
  - **A dropped suggested rule** → deleted from the Rules table and the From your decisions list.
  - **An answer that adds or changes rules** → each new rule's Source is `decided — see Decision n`, with
    its note, and it is listed under From your decisions. It needs no Keep or drop question.
  - **Every Open question stays**, with ` Decided — see Decision n.` added at its end.
- Unknowns are `TBD` and become an Open question — never guessed.

## 7. Standard questions

The same questions are asked about every thing the Data section holds, so no run skips one.

**The questions, in order:**

1. Can it be changed after it is added? Which parts?
2. Can it be removed?
3. Can two be the same, and on what?
4. When several are added at once, what happens if some fail?
5. Who can do each of these?
6. What is its starting status?
7. What changes in each status?

- The Standard questions section has one row for each thing and each question, in this order, the question
  copied word for word.
- **First look for the answer in the documents.** Only when they are silent does the question go to the
  person. Never answer a standard question with a guess.
- The **Answered by** cell holds exactly one of these:
  - `<document>, <place> → <rule IDs>` — the documents answer it. Example: `requirements doc, entry 3.1 → F-15.5`
  - `Decision n → <rule IDs>` — the person's answer, and the rules it produced
  - `Decision n → no rule` — the person's answer added no rule
  - `Open question n` — asked, not yet answered
  - `Does not apply — <reason, naming the document that rules it out>` — only when the documents rule the
    topic out. Questions 4, 6 and 7 do not apply when the documents never add several at once, or never give
    the thing a status.
- Two rule IDs are joined with ` and `; three or more are listed one per line with `<br>• `.

## 8. Flow

- A **diagram** — written in Mermaid, a text format for drawings — showing the order of actions and their
  branches, with a start box labelled `ENTRY` and an end box labelled `EXIT`.
- **And** a **numbered list of steps**: one action per step, each tagged with **exactly one** rule. A step that
  covers several rules is split into sub-steps, one rule each. The list opens with an **Entry** line and
  closes with an **Exit** line, tied to the Gates.
- **Every rule appears in the flow at least once.**
- The flow **references** rules; it never introduces a behaviour that isn't already a rule in the Rules section.
- **Entry and Exit repeat the Gates, word for word.** The `Entry` line and the diagram's `ENTRY` box use the
  Gate In condition exactly; the `Exit` line and the `EXIT` box use the Gate Out condition exactly. Never
  reword or shorten them — the condition is written once, in the Gates table.

## 9. Output — what may appear in the document

- **Lineage block first**, directly under the title.
- **No meta-commentary** in the document (no "generated by…", no notes about the process).
- **No status.** Never write draft, approved, final, or any other status.
- **No template markers or writer notes.** The template's `<!-- Step N -->` markers and its `<…>`
  placeholders are instructions to the writer. Each is removed when its part is filled; none reaches a
  finished document. Labels in the template that a reader sees are written for the reader, never as
  instructions (no "verbatim", no "in plain terms").
- **One item per line.** Never join items with `·`, `/`, or commas. Three or more items go on separate
  lines — bullets in text, `<br>• ` inside a table cell or a diagram label. Two items may be joined with
  `and` or `or` in a sentence. Verbatim text (requirements, catalog names, descriptions and Done-when
  lines) is copied as it is; this rule never rewrites it.
- **No `·` anywhere.** An ID and its name sit side by side with a space: `F-16 Source attachment & health`,
  `FRD-3b Source management`.
- Sections in the template's order. Empty section → say "None." honestly rather than padding.

## 10. Who decides — at each review stop

The author **drafts**; the **person decides**, and the author must not overstep.

| At a review stop, the person decides | The author must NOT |
|---|---|
| **Step 1:** the capability boundaries (which features, the split) | invent a module or a capability |
| **Step 1:** the Done-when clause split | change the split after it is decided |
| **Step 1:** the capability name, when it covers several features | change the name after it is decided |
| priorities (inherited from the catalog) | reprioritise |
| keep or drop each `proposed` rule | resolve a proposed rule itself |
| the answer to each Open question | answer an Open question itself |
| **Step 3:** each tension between decisions | resolve a tension itself |
| **Step 3:** whether to accept the changes into the document | accept on the person's behalf |
| every decision above is recorded | leave a decision out of the Decision record |

Use only the **three inputs**: the capability, the feature catalog and the requirements doc. Never pull facts
from chat or memory.

## 11. Changes and acceptance — Step 3

- **Apply every decision.** Write each rule the decisions add or change, with its note. Then rebuild the
  Actors, Gates, Flow and Data from the final rules — not only where a decision mentions them.
- **Look across the decisions for tensions** — two decisions whose reasons or effects pull in different
  directions. Ask about each one as its own decision, with two options: keep both (the tension is recorded),
  or revisit one of them.
- **Show the person the result**, then ask exactly `Accept these changes into the document?` with the
  options `Accept` and `Change something first`. Record it like every other decision.
  - `Accept` → rule IDs are fixed from then on.
  - `Change something first` → make the change the person asks for, then show the review again and ask again.
- **Once the latest decision is an accepted `Accept these changes into the document?`**, nothing may be left
  undecided: no pending suggested rule, and every Open question ends with ` Decided — see Decision n.`

## 12. Decision record

The Decision record records every decision the person makes at a review stop, so anyone can see later what
was offered, what was chosen, and why.

- **One entry per decision**, in the order made, numbered `Decision 1`, `Decision 2`, … with no gaps.
  Step 1 decisions (the capability, the clause split, the name) are recorded too.
- **Each entry holds:**
  - the question, as it was asked
  - the review stop it was asked at: Step 1, Step 2 or Step 3
  - **every option offered**, exactly as offered: its label, why you'd pick it, and what happens next — at
    least two
  - the option recommended
  - the option chosen — exactly one of the offered labels
  - who decided — the person's name or role — and the date, as `YYYY-MM-DD`
- **An answer that was not offered** is added to the options as `Other: <the person's words>` and chosen.
- **Never edit a past entry.** If a decision changes later, add a new entry that starts its question with
  `Replaces Decision n:`.
- Until the first decision is made, the section says `None yet.`

## 13. Check record

- The last section of every FRD holds the record of the most recent passing check made at a review stop:
  the checker's "For the file" block, pasted as it is. Before the first check it says `None yet.`
- Never write or edit it by hand. Each passing check at a review stop replaces it.
- The checker checks only this section's shape, never its content against itself — it always holds the
  previous run's record.
