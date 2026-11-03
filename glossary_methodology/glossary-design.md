# Glossary Pipeline — Design for Review

**Status:** Draft for stakeholder review and confirmation
**What this is:** How we build and maintain a single, shared glossary for a specification, and how it keeps every document speaking the same language.
**What we need from you:** Confirm the approach and the choices in Part 14.

> **A note on the examples.** So the method is clear no matter your domain, this document teaches it
> through a **generic online store** (carts, orders, payments). None of it assumes knowledge of any
> particular product. The same method applies to any specification.

---

## 1. Why a glossary, and the problem it solves

A specification is only as reliable as the words it uses. When the same thing is named several ways, or one word means two things, the confusion stays hidden until it reaches the build — and someone builds the wrong thing.

Picture an online-store specification written by a few people over a few weeks. Without anyone intending it:

- the same thing is called **cart** in one place, **basket** in another, **bag** in a third;
- **order** means a customer's purchase on one page and the sort sequence of a list on another;
- the spec says **wishlist**, but the screen mock-ups say **saved items**;
- shipping options are named **quick ship** and **slow ship**, which tell you nothing precise.

None of this is wrong in a first draft. The glossary's job is to **resolve it once, agree the words, and then hold every later document to them.**

The goal, in one line: **uniformity — every document speaks the same, agreed language.**

And it is more than a word list. The glossary also captures **how the words connect** — what contains what, what comes before what, what unlocks what — so the specification reads as a **map of meaning**, not just a dictionary. Recognising those connections is half the value; a lone list of defined words would miss that "a cancelled order can no longer be shipped" is a rule binding two of them together.

---

## 2. The mental model

**We read the product's own words, build a small picture of how its things relate, and draw the glossary from that picture. Where a word is weak, we recommend a better one. A person decides every call.**

Three beliefs hold the design together:

1. **Meaning first, words second.** We don't collect words and then guess their meaning. We work out what the things *are* and how they connect; the words follow. This is why three names for one thing (cart / basket / bag) collapse into a single entry instead of three.

2. **Loosely coupled — we read sentences, not file structure.** The method never depends on a table, an ID scheme, or a particular layout. It reads the linking words in ordinary prose. Give it a tidy structured catalog or a two-page brief, and both work.

3. **The tool proposes; the person disposes.** The tool settles only what the source plainly settles, and brings the person the genuine ambiguities and the weak words. It may improve a *label*; it may never invent a *meaning*. Every real decision happens at a checkpoint (a "gate"). This boundary is what makes the method safe to run across a large specification.

---

## 3. How we find the keywords

Three moves, all done by reading.

### Move 1 — list the things
Pull the nouns that carry product meaning: *cart, order, customer, payment, shipment, refund*. Not every noun — only the ones a newcomer would trip on. (We skip everyday words like "page" or "button".)

### Move 2 — read the words *between* two things
When two things appear in a sentence, the words joining them carry the relationship. There is a small, fixed set, each with tell-tale phrasing:

| Relationship | Meaning | Give-away phrase | Example sentence | Becomes |
|---|---|---|---|---|
| contains | A is made of B | "is made up of", "holds" | "an order is made up of one or more line items" | order **contains** line items |
| kind of | B is a type of A | "can be a, b, or c", "such as" | "payment can be by card, wallet, or bank transfer" | payment **kinds**: card, wallet, transfer |
| comes before | A then B in the flow | "proceeds to", "then" | "the customer proceeds from cart to checkout, then to confirmation" | cart **→** checkout **→** confirmation |
| produces | A creates B | "generates", "results in" | "a successful payment generates a receipt" | payment **produces** receipt |
| opens into | A reveals B | "opens to its", "shows its" | "each order opens to its line items and tracking" | order **opens into** line items, tracking |
| locks / opens | A controls B's state | "cannot ... until", "enabled once" | "a cancelled order cannot be shipped" | cancelled order **locks** shipment |
| same as | two words, one thing | the same thing named two ways nearby | "cart" and "basket" used interchangeably | cart **=** basket |

Every relationship comes straight from a phrase — nothing is inferred beyond the text.

### Move 2, worked on a real passage

This is the critical move, so here it is on an actual passage. Read it once as prose, then see how each relationship is lifted from a single phrase.

> "A **cart** holds the items a customer has chosen but not yet paid for; some teams call it a **basket**. The customer proceeds from the cart to **checkout** once the cart holds at least one item. At checkout the customer chooses a **payment method** — a card, a wallet, or a bank transfer. A successful **payment** generates a **receipt** and creates the **order**. Each order opens to its **line items** and its **tracking**. Once an order is **cancelled**, it can no longer be **shipped**."

The bold words are the *things* (Move 1). The phrases between them are the *relationships*:

| Phrase in the passage | Relationship | Reads as |
|---|---|---|
| "a cart **holds** the items..." | contains | cart → contains → items |
| "some teams **call it** a basket" | same as | cart = basket *(basket will be retired)* |
| "**proceeds from** the cart **to** checkout" | comes before | cart → checkout |
| "checkout **once** the cart holds at least one item" | opens | checkout unlocks once cart holds ≥ 1 item |
| "a payment method — **a card, a wallet, or** a bank transfer" | kind of | payment method → card<br>payment method → wallet<br>payment method → transfer |
| "a successful payment **generates** a receipt and **creates** the order" | produces | payment → receipt, order |
| "each order **opens to its** line items and tracking" | opens into | order → line items, tracking |
| "**once** cancelled, it can **no longer** be shipped" | locks | cancelled order → locks → shipment |

Stack those up and you get the picture in the worked example — the same eight relationships, drawn. That is the whole of Move 2: no tables parsed, no identifiers read, just the linking phrases in ordinary sentences. Hand it a messy paragraph instead of a tidy spec and the same phrases still carry the same connections.

### The same move, run on this very document

To show it reads *any* text — not just a tidy specification — here is Move 2 run on a paragraph of this document itself:

> "**harvest** learns the **glossary**. **check** measures any **document** against the glossary and recommends a **fix**. A **term** has a **definition** and a **Part-of** line. harvest produces the **picture**; the glossary is drawn from it. A **re-scan** reconciles each **candidate** into Add, Merge, Change, or No change."

| Phrase | Relationship | Reads as |
|---|---|---|
| "harvest **produces** the picture" | produces | harvest → picture |
| "the glossary is **drawn from** it" | produces (reverse) | picture → glossary |
| "a term **has** a definition and a Part-of" | contains | term → definition, Part-of |
| "check **measures** ... **against** the glossary" | uses | check → reads → glossary |
| "reconciles ... **into** Add, Merge, Change, or No change" | kind of | re-scan outcome → the four kinds |

Drawn out, the method describes itself:

```
Glossary method
├── harvest  — learns the glossary;  produces → picture → (glossary drawn from it)
├── check    — measures any document against the glossary;  produces → a delta
└── change   — moves a term;  produces → an impact

term      contains → definition
                     Part of
                     Previous definition
re-scan   outcome is one of → Add
                              Merge
                              Change
                              No change
```

That the method can be turned on its own description is the strongest proof of the loose-coupling claim: it reads meaning from plain sentences, whatever the document.

### Move 3 — decide which things are keywords
Three quiet tests, applied by the tool. A person sees only the borderline cases:

- **Special meaning** — would a newcomer take the everyday sense and be wrong? *("cart" here is a saved list tied to an account, not just a shopping trolley → passes.)*
- **Consequence** — would a misreading change what gets built? *("a cancelled order locks shipment" → misreading changes behaviour → passes.)*
- **Reach** — is it used in more than one place? *("customer" appears across browsing, checkout, and account → passes.)*

A word used once, in a single feature, with its meaning obvious from that one sentence, is *not* promoted to a glossary term — the sentence already carries it.

### The weak-word test (leads to a recommendation)
While doing Move 3, the tool judges whether the source's own word is weak. A word is weak if it is:

- **relative with no axis** — quick, slow, deep, light *(quick compared to what?)*;
- **generic** — smart, advanced, item, data, handling;
- **overloaded** — one word used for several things;
- **clashing** — collides with a standard meaning.

A weak word gets one or two recommended replacements, with the reasoning — as a proposal to the gate (see the recommending-a-better-word part).

### Local first, then reconcile across the whole
Meaning lives in a place. Each area of the product (browsing, checkout, account, returns) is a place, so we build one small picture per area — each a short, digestible review. Some words span many areas: *customer, price, order* appear everywhere. After the per-area pictures, a single **reconciliation pass** across the whole set settles these shared words. This pass is where most conflicts surface and resolve; without it, a word agreed for "checkout" could quietly drift in "returns".

---

## 4. OTC — the lens we scan by

OTC (Ontology–Topology–Choreography, from information-architecture practice) is simply the order in which we read the relationships. It tells us *which* relationships to look for, and *in what order*.

| OTC | Plain question | Store example |
|---|---|---|
| **O — Ontology (meaning)** | What is each thing? | *What is an "order"? A confirmed, paid purchase.* |
| **T — Topology (structure)** | Where does it sit? | *A "line item" is part of an order; "gift wrap" is a kind of add-on.* |
| **C — Choreography (flow)** | How does it move? | *An order goes placed → paid → shipped → delivered; a cancelled order can't ship.* |

Meaning comes first: you cannot place a thing (T) or track its states (C) until you know what it is (O). This maps straight onto the glossary:

- **O becomes the definition.**
- **T becomes the "Part of" line.**
- **C stays out of the glossary** — states and rules are behaviour, which belongs in the specification, not the dictionary.

---

## 5. The picture — a worked example

This is what one area's picture looks like, built by reading the store's checkout specification.

```
Checkout  —  the flow that turns a cart into a paid order
│
├── cart  —  the items a customer has chosen but not yet paid for
│        also called:
│          - basket
│          - bag
│        contains → line items, each holding:
│          - product
│          - quantity
│          - price
│        enables → checkout once it holds at least one item
│
├── payment  —  the step that charges the customer
│        can be:
│          - pending
│          - authorised
│          - failed
│        produces → receipt
│
└── produces → order  —  a confirmed purchase
         opens into:
           - line items
           - shipment
           - tracking
         can be:
           - placed
           - shipped
           - delivered
           - cancelled
         a cancelled order → locks → shipment
```

Boxes are the things; the arrows and words between them are the relationships, each lifted from a sentence. The `also called` lines are the other words the source used — the ones we would retire.

> **Note the trap it catches:** "order" here means the *purchase*. Elsewhere the spec used "order" for a
> list's *sort sequence*. That is one word with two meanings — a conflict the picture makes visible, to be
> settled at the gate (perhaps: keep "order" for the purchase, rename the other to "sort order").

---

## 6. Recommending a better word

This is deliberate editorial work, bounded by one rule:

> **We may improve a label. We may never invent a meaning.**

The meaning is always the source's, stated back plainly. Only the *name* is open to improvement, and every improvement is a proposal to the gate — never a silent swap.

**Example 1 — relative words with no axis.** The store names shipping speeds "quick ship" and "slow ship".

| Thing | Source words | Recommended | Why |
|---|---|---|---|
| next-day, higher cost | quick ship<br>fast ship | **express delivery** | names the tier, not a vague "quick" |
| 3–5 day, included | slow ship<br>normal ship | **standard delivery** | pairs cleanly with "express" |

The tool states the *axis of difference* (delivery speed and cost) — that is the intelligent part, not merely noticing the words vary.

**Example 2 — a generic word.** A feature is called "smart search". "Smart" says nothing. If the source shows it *suggests results as you type*, the recommendation is **predictive search**; if it *remembers past searches*, **recent searches**. The tool proposes based on what the source actually describes — and if the source is unclear, it asks rather than guesses.

In practice, strong words often already exist, so recommendation fires rarely. That is correct behaviour — it should not rename things that are already clear.

---

## 7. Conflicts we resolve

Five kinds, each surfaced with its locations and taken to a gate. The tool never picks the winner.

| Kind | Description | Store example |
|---|---|---|
| Several words, one thing | synonyms to collapse | cart / basket / bag |
| One word, two meanings | a word to split or narrow | "order" = a purchase vs a sort sequence; "delivery" = the act vs the parcel |
| Part vs whole | a whole confused with its part | "order" (the whole purchase) vs "line item" (one product in it) |
| Collides with our own working words | a product word clashes with the team's process vocabulary | the store's marketing "story" (a customer testimonial) vs a "user story" in our process |
| Drift between documents | the same thing named differently across files | spec "wishlist" vs mock-up "saved items" |

---

## 8. What the method produces (interim and final)

### Interim — the working-out, reviewed at the gate, not kept as the norm
- **The picture** — one per area. This is what a person reviews first.
- **The recommendation and conflict lists** — attached to the picture.
- **The delta** — for a document being checked, the line-by-line disagreements and proposed fixes.

### Final — the norm, kept and maintained
- **The glossary**, split into category files (things, steps, states, roles — the categories are proposed during the build and confirmed at the gate). Each entry:

  | Term | What it is | Part of | Previous definition |
  |---|---|---|---|
  | cart | the items a customer has chosen but not yet paid for | Checkout | — |
  | order | a confirmed, paid purchase | Checkout | — |

  No "also called" column: retired words are *not* kept as entries. They live only on a retired list, so there is exactly one approved word per thing.

- **A decisions record** — one row per conflict settled, with the **retired words** and the date. This retired list is what the checking step scans for.

### A rule that protects traceability
When we fix wording in a document that already exists, we change **words in prose only** — never a filename or an identifier. Renaming a file or an ID would break every cross-reference pointing at it. Each entry keeps a **Previous definition**, so any change is auditable and reversible.

### A living document — and why a re-scan is not a fresh start
The glossary is maintained, not built once and abandoned. When the source changes — or when a later scan reaches text the first pass never saw — the build runs again. But **a recommendation is only true at the moment it is made.** A word that looked new last month may already be an approved term today. So a re-scan never adds blindly; it **reconciles every candidate against the glossary that already exists** and sorts it into one of four outcomes:

| Outcome | Meaning | Example |
|---|---|---|
| **Add** | genuinely new — no existing term covers it | a new "gift card" concept appears |
| **Merge** | the same thing under a different word | text now says "trolley" — merge into the existing **cart**, retire "trolley" |
| **Change** | an existing term's meaning has shifted | "order" now includes subscriptions — hand to the change step |
| **No change** | already covered, same meaning | skip silently |

Only **Add** and the naming half of **Merge** and **Change** reach a person; the rest are quiet. This is what stops the list going stale: the norm is always the current glossary, and each scan is a *delta against it*, never a new pile of words.

---

## 9. The three skills

The method is delivered as three skills. Each has one job, and each accepts loosely-coupled input — point it at whatever text you have.

| Skill | Its one job | Input | When it runs |
|---|---|---|---|
| **harvest** | *Learn* the glossary (the norm) | any authoritative document(s) | once, to build |
| **check** | *Measure* any text against the glossary | **any single document** | anytime, uniformly |
| **change** | *Move* a term and propagate it | a term change + the files | when a term changes |

**check is the universal instrument.** There is no "upstream vs downstream". The same logic runs every time: read the words, compare to the glossary, flag disagreement (a retired word, a wrong meaning, a product word missing from the glossary). It does not care which kind of document it is looking at — that is what delivers uniformity. It can even be pointed at the *source* documents themselves, as a **consistency health-check** that shows where the source contradicts itself.

**check recommends; it never applies.** This is deliberate. check points out the gap and states the **next best action** — for example, "correct this wording by hand", "this needs the story re-generated, hand it back to the authoring step", or "this is a new product word — raise it for the glossary". It then stops. It does **not** edit the document, and it **never reaches into the authoring skills** that own those documents. The person takes the call. Our job here is to *find and flag*, not to fix on someone else's behalf.

Two rules keep check honest:

- **Flag drift where it originates, not in every copy.** A document that quotes another word-for-word is not flagged for the original's wording; check flags the original directly (it runs on that too). This stops one drift being reported many times.
- **Any fix a person then makes is words in prose only** — identifiers and filenames never change, or every cross-reference pointing at them breaks.

---

## 10. The flow — what a person reviews, and when

Four review gates. ◆ = nothing moves forward until a person approves.

```
 authoritative doc(s) ─►  harvest ─► ◆ GATE 1  the picture + questions + word recommendations
                                  ─► ◆ GATE 2  the definitions
                                          │
                                          ▼   the glossary now exists

 any single document  ─►  check   ─► ◆ GATE 3  the DELTA (what disagrees + recommendation + next best action)

 a term change        ─►  change  ─► ◆ GATE 4  the IMPACT (the change + every place it lands)
```

| A person reviews... | At | From |
|---|---|---|
| **Recommendations** — new terms + better-word suggestions | Gate 1 | harvest |
| **Definitions** to approve or reword | Gate 2 | harvest |
| **The diff / delta** — disagreement + recommendation + next best action | Gate 3 | check |
| **The impact** of changing a term | Gate 4 | change |

Sample of a recommendation at **Gate 1**:

```
Thing:         next-day, higher-cost shipping
Source words:  quick ship
               fast ship
Recommend:     express delivery   (names the tier, not a vague "quick")
Your call:     ✓  / or type another word
```

Sample of the delta at **Gate 3** — note it *recommends*, it does not apply:

```
File:       checkout/story-03-empty-cart.md
Found:      "...the customer's basket is cleared after payment..."
Issue:      "basket" was retired at Gate 1  →  approved word is "cart"
Recommend:  replace "basket" with "cart" in this line
Next best:  minor wording — safe to correct in place;
            if the story needs regenerating, hand it back to the story step
```

check stops here. It has found and flagged the gap and named the next best action; the person takes the call. It does not edit the file, and it does not step into the authoring skills.

---

## 11. Architecture — skills now, workflows later

The rule: **anything with a gate is a skill** — it runs interactively and can pause for a person. A **workflow** is the ungated, background, parallel version that runs a skill across many items at once.

Because the glossary has gates at every stage:

- **Phase 1 is three skills, no workflows.** Everything is reviewed one document at a time.
- **Phase 2 optionally adds workflows** purely for speed — e.g. checking a hundred documents in one pass, or applying a term change across many files at once. **A workflow never adds a new kind of review; the gates stay in the skills.**

---

## 12. Where the skills live (folder layout)

### Now — self-contained in `glossary_methodology/`, so it can be tried in isolation
```
glossary_methodology/
├── glossary-design.md      this document
├── skill-orchestration.md        how the skills and the workflow are invoked
├── .skills/                THE PACKAGE — the skills and the method they share
│   ├── _shared/glossary/   the METHOD (read-only reference) + templates/
│   │   ├── otc-methodology.md  how the three OTC lenses tie together
│   │   ├── lens1-ontology.md     OTC lens 1 — the things
│   │   ├── lens2-topology.md     OTC lens 2 — structure (contains, kind of, reveals)
│   │   ├── lens3-choreography.md OTC lens 3 — flow (states, locks/unlocks, produces)
│   │   ├── otc-run-rules.md        the law: tests, weak-word, conflict kinds, boundary, gates, Add/Merge/Change
│   │   ├── output-formats.md      the shapes and homes of every output
│   │   └── templates/      BLANK copies of the output files
│   ├── harvest/            skill — build or update the glossary
│   ├── check/              skill — spot drift in a document
│   └── disposition/        skill — act on drift
└── (Output/glossary/)      the DELIVERABLE — the seven glossary files
    └── deep-dives/         the EVIDENCE — one folder per section, the assembly draft, the gate log
```
`.skills/` is the single source of truth. When folded into a team's skill locations it drops in as-is (`_shared/glossary/` and the three skills, which may take a `glossary-` prefix to stay unique). Nothing about the method changes when it moves.

---

## 13. How it fits the wider process

A typical specification process runs: **requirements → features → grouping → epics → user stories → acceptance criteria.**

```
requirements + features ──► harvest ──► the glossary          (runs alongside grouping)
                                            │
                        (check guards any document)
                                            ▼
        every later document is written or checked against the glossary
```

- **harvest runs off the agreed requirements and features**, alongside the grouping step — neither blocks the other. Grouping decides *how work is delivered*; harvest agrees *the language*. Two different lenses on the same inputs.
- **check applies the glossary uniformly** to any document, at any stage.
- **Where a project already has documents written**, the practical path is: build the glossary now from the authoritative sources, then use check to bring the existing documents into line (words only, identifiers untouched), so the later work is written in the agreed language from the start.

### Deliberately deferred
Two integrations wait until the three skills are proven: the downstream authoring steps *reading* the glossary as a required input, and a hard gate that requires an approved glossary before detailed authoring begins.

---

## 14. What we are asking you to confirm

1. **The approach overall** — a meaning-first picture that also captures the connections between words, the glossary drawn from it, a person deciding at every gate. *(Confirmed.)*
2. **The tool's boundary** — it recommends better words and surfaces conflicts, but never picks a winner or invents a meaning. *(Confirmed.)*
3. **check recommends, it never applies** — it points out the gap, names the next best action, and stops. It does not edit documents and does not reach into the authoring skills that own them. The person takes the call. *(Confirmed.)*
4. **Categories proposed, not fixed** — the categories (things, steps, states, roles) are proposed during the build and confirmed at the gate. *(Confirmed.)*
5. **The list never goes stale** — every re-scan reconciles against the existing glossary and reports a delta (Add / Merge / Change / No change), so a point-in-time recommendation is always re-judged against what is already agreed. *(Confirmed.)*

The product-specific naming decisions themselves — "is this one thing or two?", "which word wins?" — are not decided in this document. They are exactly what the method brings to a person at each gate, with the evidence, when it runs.

**Next step:** build the three skills and the shared references, and produce a first Gate 1 on a real slice of the specification for you to judge.
