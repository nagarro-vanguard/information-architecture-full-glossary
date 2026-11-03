# FRD stage — capability functional requirements

A sandbox for the piece the pipeline is missing: a Functional Requirements Document (FRD) that sits between
the feature catalog and the user stories. For each capability it states the always-true
`The system shall…` rules, so acceptance criteria *prove* rules instead of re-inventing them, and every test
can be traced back through acceptance criteria, rules and features to a requirement.

Nothing here is wired into the pipeline yet. When it is, the `frd-author/` skill moves to `.claude/skills/`
and the FRDs move under `Output/03-features/frd/`.

## Where it fits

The FRD runs **after the feature catalog, in parallel with clustering** — both read only the catalog,
neither blocks the other.

```
requirements ─► feature catalog ─┬─► clustering ─► EPICs ─► user stories ─► acceptance criteria
                                  │                                                  ▲
                                  └─► FRDs, one per capability ───────────────────────┘
                                      (acceptance criteria cite the rules they prove)
```

**Why parallel, not after clustering.** Clustering groups features into **EPICs** — the large chunks
delivery is planned in (what ships when). The FRD groups them into **capabilities for specification**
(coherent behaviour). Different lenses: binding FRDs to EPIC boundaries would tear a coherent capability
across separate releases. Capability boundaries come from the catalog's own **module structure**, which
needs only the features.

## What an FRD is — and is not

- **Is:** the always-true **rules** for one capability — `The system shall…`, one section per feature,
  each rule testable and traced to one source.
- **Is a living document.** It never carries a status such as draft or final. Its Decision record
  holds every decision with its date, and "Last changed" near the top names the latest one.
- **Is not:**
  - the *why* — that is the requirement
  - the *slice to build next* — that is a story
  - the *how* — behaviour only, no screens or mechanisms

## Granularity — one FRD per capability

Not per feature (81 fragmented files, sibling rules split apart), not per EPIC (delivery grouping, not
behavioural). A **capability** is a coherent group of features *within one module*. Setup (module 3), for
example, splits into three:

| FRD | Capability | Features |
|---|---|---|
| FRD-3a | Team & roles | F-15 |
| FRD-3b | Source management | F-16 – F-19 |
| FRD-3c | Start the read | F-20 |

## How a feature becomes rules

Rules are not invented. Each one has exactly one source, shown in the rules table:

1. **A clause of the "Done when" line** (one separate condition) → tagged `F-nn.dwN`
2. **The requirement text** (it says more than the one-line "Done when") → tagged `req`
3. **A suggestion** where the sources name the options but not which applies → tagged `proposed`, until you
   keep or drop it
4. **Your decision** — a kept suggestion, or a rule your answer added → tagged `decided`

Wherever the FRD differs from the requirements doc because of a decision, a note says so, right there:
*Updated from the requirement on the basis of Decision n: what changed.* The client's requirements doc itself
is never changed.

Two more things keep gaps from slipping through:
- **Every clause is covered by at least one rule** — the Coverage table.
- **The same standard questions are asked about every thing the FRD keeps** — answered from the documents
  where they can be, otherwise asked of you, never guessed.

## Numbering & naming

- **Number:** `FRD-<module><capability letter>` — e.g. `FRD-3b`: module 3, second capability. Stable (catalog
  module numbers don't move), and it tells you where the FRD sits. A letter, not a second number, so
  `FRD-3b` can't be mistaken for `REQ-3.2`.
- **File:** `FRD-<module><capability letter>-<name in lowercase, with hyphens>.md` — e.g.
  `FRD-3b-source-management.md`.

## The template

[`frd-template.md`](frd-author/references/frd-template.md) is the fixed layout of every FRD. It lives only inside the
skill, so the skill stays self-contained and there is one copy to edit. Every FRD matches it section for section:

1. Lineage — where the document comes from, and what comes next
2. The head of the file:
   - Depends on — what must exist first
   - Last changed — the latest decision
   - Excludes — what it leaves out
3. Requirements — the client's words, copied exactly
4. Features covered — the features this FRD turns into rules
5. Gates — the conditions around this capability:
   - what must be true before
   - what it makes possible
   - what would undo it
6. Actors — who does what
7. Rules — one table per feature
8. Coverage — every "Done when" clause, and the rules that cover it
9. Flow — a diagram and numbered steps showing the order of actions; every rule appears in it
10. Data — what the system must keep
11. Standard questions — the same questions about every thing in Data, and where each is answered
12. Open questions — what only you can decide
13. Decision record — every decision, with every option that was offered
14. Check record — the checking program's record of its latest passing check

The template also marks which step fills each part, with hidden `<!-- Step 1 -->` and `<!-- Step 2 -->`
markers. The skill reads them, so the layout is defined in one place only. No marker reaches a finished FRD.

## The skill — `frd-author`

[`frd-author/`](frd-author/SKILL.md) follows three steps, each ending at a **review stop** where you decide
before it goes on. (Not to be confused with the Gates section inside an FRD.)

| Step | Produces | At the review stop, you decide |
|---|---|---|
| 1. Scope | the FRD file with only its top filled:<br>• the head of the file<br>• features covered<br>• the "Done when" clause split | • which features it covers<br>• the clause split<br>• the name, if several features |
| 2. Draft | • every rule, with its source<br>• the Standard questions, answered from the documents where they can be<br>• the open questions | each open question, one at a time |
| 3. Changes and acceptance | • your decisions applied, with notes<br>• the rest of the document rebuilt to match<br>• everything that changed, shown to you | • each tension between your decisions<br>• whether to accept the changes |

The skill:
- reads only its **inputs**:
  - the capability
  - the feature catalog
  - the requirements doc
  - who decides
- runs [`check-frd.cjs`](frd-author/scripts/check-frd.cjs) before each review stop and after each decision, and
  never shows you anything while a check fails
- carries its own references, so it still works when moved
- speaks to you in plain names, never codes, one decision at a time with what happens next
  ([`talking-to-the-person.md`](frd-author/references/talking-to-the-person.md))

## The check — `check-frd.cjs`

A program that checks an FRD against your documents and the conventions, and prints PASS or FAIL per check.
It only reports; it never edits. Each check names the conventions section it enforces, so it adds no rule
of its own. These are **structure checks**: they prove the document is copied, numbered and linked
correctly — not that its rules are right. It needs Node (the program that runs JavaScript).

```
node frd-author/scripts/check-frd.cjs <FRD file> <feature catalog> <requirements doc> [--step1]
```

- **Step 1 mode** — add `--step1`. Used during Step 1. Runs the 19 checks that apply to the parts Step 1
  fills, because the rest is not written yet.
- **Full mode** — no flag. Used during Steps 2 and 3. Runs all 37 checks.

When every check passes, it prints three blocks, which the skill pastes as they are:
- **For the person** — the facts for the review message, each with the place it came from
- **One line** — the check result, for a follow-up decision at the same review stop
- **For the file** — the check record, which replaces the FRD's Check record section

**You still check**, by reading:
- lists of three or more items joined with commas
- the written Gates sentences are plain language
- each rule states one behaviour, not a mechanism
- each rule is a faithful reading of the source it cites
- each suggested rule picks between options the sources name
- the Actors and the flow agree with the final rules
- every "Does not apply" in Standard questions is backed by a document
- tensions between decisions were raised before the changes were accepted

## Conventions (the law)

[`frd-author/references/conventions.md`](frd-author/references/conventions.md) holds the enforceable rules,
so they're not buried in prose. Its sections:
- IDs
- Capability
- Rules
- Done when
- Sources
- Never invent
- Standard questions
- Flow
- Output
- Who decides
- Changes and acceptance
- Decision record
- Check record

## Site map

**This experiment**

```
frd_experiment/
├── README.md                        this file
├── FRD-3b-source-management.md      Source management (predates the redesign; see Status & next)
├── dry-runs/                        the files dry runs produced, kept as the record
│   └── 2026-10-13-FRD-3a-team-and-roles.md
└── frd-author/                      the skill  (→ .claude/skills/frd-author/ once wired in)
    ├── SKILL.md
    ├── references/
    │   ├── conventions.md
    │   ├── frd-template.md          the fixed layout (the only copy)
    │   └── talking-to-the-person.md how the skill speaks at every review stop
    └── scripts/
        └── check-frd.cjs            the checks, run before each review stop and after each decision
```

**Once wired into the pipeline**

```
.claude/skills/frd-author/           the skill, moved as it is
Output/03-features/
├── <name>-features.md               the catalog (exists)
└── frd/                             the FRDs, one per capability
    ├── FRD-3a-team-and-roles.md
    ├── FRD-3b-source-management.md
    └── FRD-3c-start-the-read.md
```

## The PRD question (deferred)

The PRD stays as it is. Its only overlap is the PRD's section 5 (Business Rules & Validations). When wiring
in, the recommendation is: the PRD keeps rules that apply across the whole product; FRDs own the per-feature
rules. Not decided yet.

## Dry runs

| Date | What ran | What it showed |
|---|---|---|
| 2026-10-12 | Team & roles, each step run twice by separate agents | After six rule fixes, Step 1 came out identical across runs; Step 2 gave the same rules under the same numbers, with only wording differing |
| 2026-10-13 | Team & roles, start to finish, with you answering | Steps 1 and 2 held. Step 3 broke:<br>• it marked the document approved without asking<br>• it labelled your answers as suggestions<br>• it invented questions<br>• it left the flow and Actors contradicting the rules<br>This led to the redesign below |

The file the 2026-10-13 run produced is kept in [`dry-runs/`](dry-runs/2026-10-13-FRD-3a-team-and-roles.md).
It predates the redesign: it carries a status line and has no Standard questions or Check record, so it
fails today's checks by design.

## Status & next

**Decided** (in brackets: the section of the conventions each one lives in)
- the template layout
- one FRD per capability
- where it runs: after the catalog, alongside clustering
- numbering by letter (`FRD-3b`)
- one template copy, inside the skill
- from the dry run on 2026-10-12:
  - rules are numbered in source order until the changes are first accepted (IDs)
  - a gap becomes a `proposed` rule only when the sources name the options; otherwise an open question (Never invent)
  - a limit the source states is its own rule (Rules)
  - Excludes: the module's other features, then only items this FRD's own requirements name (Sources)
  - a capability's name: the catalog name for one feature; yours, at Step 1, for several (Capability)
  - the Gates are tied from the catalog's Depends on column; `None.` when it shows none (Sources)
- from the reviews on 2026-10-13:
  - the template marks which step fills each part
  - no Capability block, and no writer's notes in a finished document (Output)
  - one meaning per word: a **review stop** is where you decide; **Gates** is a section inside an FRD
  - "Undone if" and "Coverage" as FRD labels
  - no section-sign symbol anywhere
  - the checking program writes every fact you see, each with its source
  - a Decision record in every FRD, decided under the role "Product owner" (Decision record)
- from the redesign on 2026-10-13:
  - no status anywhere — a living document; "Last changed" names the latest decision (Output, Sources)
  - rules from your decisions are tagged `decided`, with a note wherever the FRD differs from the
    requirements doc; the requirements doc itself is never changed (Rules)
  - one list, "From your decisions", for suggested and decided rules (Never invent)
  - Step 3 rebuilds the document from your decisions, raises tensions between them, and ends with your
    decision to accept (Changes and acceptance)
  - every rule appears in the flow (Flow)
  - the Gates copy the catalog's "Done when" lines where they can (Sources)
  - "Two readings" open questions (Never invent)
  - standard questions about every thing in Data (Standard questions)
  - a Check record in every FRD (Check record)
  - follow-up decisions show only one check line, not the whole block
  - the skill no longer copies an approved example

**Known exceptions**
- **FRD-3b fails 7 of today's checks.** It was written before the redesign. It:
  - has a status line
  - has no Last changed line
  - has no Standard questions section
  - has no Check record
  - words its Gates in its own words instead of copying them
  - leaves three rules out of its flow

  It is brought up to date at wiring time (item 11 below).
- FRD-3b does not apply the "a limit is its own rule" convention to the requirement "Attach the sources"
  (REQ-3.2) and its "one or more repositories". Decided 2026-10-12 to leave it as it is.
- FRD-3b's Decision record is empty: it was decided in conversation on 2026-09-28, before decision records
  existed.

**To do — prove it**
1. Dry run on Team & roles under the redesign, with you answering.
2. Dry run on Start the read — it depends on another feature and others depend on it, so it tests real Gates.

**To do — next**
3. Design how an FRD changes after acceptance, working with the repo's change-impact skills.
4. Dry run on a messy, real client document, and design a readiness check for Step 1 from it — including
   when a "Done when" is too thin.
5. Allow citing other parts of the requirements doc, such as its Personas section, named by section.

**To do — at wiring time**
6. The workflow: which skills exist, and how they hand work to each other.
7. The PRD's Business Rules section: the PRD keeps product-wide rules; FRDs own per-feature rules.
8. The feature catalog lists each "Done when" already split into numbered conditions.
9. The capability letter for a capability run on its own.
10. Document that the kit needs the feature-catalog skill to run first.
11. Bring FRD-3b to the current template, as an ordinary FRD.

**To hand off — not method work**
- Send the requirements owner the four MCP content issues:
  - Team & roles' "Done when" leaves out the role set, and Admin being held alongside another role
  - "named with an email" may not mean "a name and an email"
  - no catalog feature depends on Team & roles
  - "no access control" against "Admin is the access role"

**Dropped**
- a rule for when to propose a capability split — it stays your decision at Step 1
- keeping FRD-3b as a model for the skill to copy
