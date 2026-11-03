# STANDARD FORMATS REFERENCE

**Load this file when working in Layer 02 (PRD) or Layer 03 (Features) for the Requirements
Traceability Matrix and (Layer 03) the Prioritization basis, in Feature Clustering or EPIC
Generation for the EPIC naming & title format below, or in Layer 04 (Story Creation),
Layer 05 (Story Grooming), or Layer 06 (Acceptance Criteria) for the story formats below.**

**Purpose:** Define common formats once. All outputs that use them MUST follow these exact
formats per Global Rule G.6 (Exact Format Compliance) in `_shared/system-prompt.md`. Whether
each unit is well-formed is governed separately by `_shared/quality-characteristics.md` (Q1–Q9).

---

## Prioritization basis (vocabulary)

When a MoSCoW rank is recorded, the reason it carries that rank is stated as **one** of
these bases (used by `define-features`; available to any layer that prioritizes):

| Basis | The rank is driven by… |
|-------|------------------------|
| **Benefit** | the value delivered to stakeholders when it is implemented |
| **Penalty** | the consequence of *not* implementing it (including policy/regulatory demands) |
| **Cost** | the effort/resources to implement it |
| **Risk** | the chance it can't deliver its value, or can't be built at all |
| **Dependency** | it can't be fulfilled unless another item is, or it unblocks others |
| **Time-sensitivity** | value decays after a date — time-to-market or seasonal |
| **Stability** | how likely it is to change; unstable items may rank lower to avoid rework |
| **Regulatory** | it must ship to meet a legal/policy obligation |

> State the basis in one clause, e.g. `Must · Penalty — unattributed actions break the
> record the platform rests on`. If no source supports a rank, mark `Proposed (needs confirmation)`.

---

## Requirements Traceability Matrix (coverage)

A coverage check that proves **no upstream item is dropped**. Any layer that must show its
output covers the layer before it renders this, parameterized by its own endpoints.

| ⟨Upstream⟩ ID | ⟨Upstream⟩ (from source) | Covered by ⟨downstream⟩ | Status |
|---|---|---|---|
| BR-01 | [name, verbatim from source] | FR-01, FR-02 | Covered |
| BR-04 | [name, verbatim from source] | — | **Gap** |

**Endpoints per layer:**

| Layer | Upstream → Downstream |
|-------|----------------------|
| `write-prd` | BR → FR |
| `define-features` | Requirement / FR → Feature |

**Status vocabulary:** `Covered` (fully) · `Partial` (some intent covered; the rest is a
gap or an explicit, owner-noted deferral) · `Gap` (nothing covers it).

**Rules:**
- **One row per in-scope upstream item** — never collapse IDs into ranges (`REQ-1.1 … REQ-1.5` is not allowed).
- **Name each item verbatim** from the source (its short title), so the row is meaningful without opening the source.
- **Group by the source's categories/sections** when it has them (one sub-table each); otherwise one table.
- A **gap** is its own row — `—` in *Covered by*, `Gap` status — never hidden; raise every gap in Open Questions.
- **100%** of in-scope items must be `Covered` (or an explicit `Partial`/deferral with an owner).

---

## EPIC naming and title

**This is the single source of truth for how every EPIC is named — on disk and in its heading.
`generate-epics`, `cluster-features`, the `auto-spec` workflow, and the EPIC rubric all follow
exactly this. If the taxonomy ever changes, change it here.**

### Format

```
Filename:  EPIC-<NNN>-<name-slug>.md
Heading:   # EPIC-<NNN>: <Epic Name>
```

| Part | Rule |
|------|------|
| **`<NNN>`** | 3-digit zero-padded sequence number — `001`, `002`, … Same number in the filename and the heading. |
| **`<Epic Name>`** | A **short capability/theme phrase** naming the body of work — how an agilist names an epic (Atlassian/SAFe: a short *name*, not the outcome). Typically 2–5 words, a noun phrase (e.g. "Onboarding & Workspace", "Navigation & Wayfinding", "Evidence Core"). A bare capability noun is correct here. |
| **`<name-slug>`** | The `<Epic Name>`, kebab-cased **verbatim** (lowercase, spaces → `-`, `&` → `and`, drop other punctuation). A mechanical transform of the name — never composed separately — so the filename can never drift from the heading. |
| **Outcome / value** | **Not** in the name. The outcome/value is the **Epic Hypothesis** in the Description (`As a … I need … so that …`) — see the EPIC detail-file schema. |

**Example:** heading `# EPIC-001: Onboarding & Workspace` → file `EPIC-001-onboarding-and-workspace.md`; its outcome ("a person signs in and stands up an AI-ready project…") lives in the Description as the epic hypothesis.

**Determinism rule — inherit, don't re-invent.** The epic name is authored **once**, at the
clustering step (`cluster-features` → the EPIC's **Name**). `generate-epics` **carries that name
through verbatim** and derives the slug from it — it does not compose a new name. Two runs over the
same clustering therefore produce the same names.

### The epic name — do / don't

Applied wherever an EPIC name is first written (the clustering step) and enforced by the EPIC rubric.

**DO**
- Use a **short capability/theme phrase** (a name, not a sentence) a stakeholder would recognize — the body of work (e.g. "Onboarding & Workspace", "Evidence Core").
- Use **business language** (per Global Rule G.3).

**DON'T**
- Write the **outcome as the name** — the outcome/value belongs in the **Epic Hypothesis** (Description), not the name.
- Name a **technical component** (API, database, service, …).
- Add a **capability prefix** or `>` separator.

### Cross-references

Sequencing, mapping, and dependency tables refer to an EPIC as **`EPIC-<NNN>`** (optionally
followed by its name) — never with a capability prefix. If a capability column is wanted in those
tables, add it as its own column.

**Sequencing / summary files** (one per batch, not per EPIC): `[batch-name]-epic-sequencing.md`
and `[batch-name]-epic-mapping.md`.

---

## EPIC Register (schema)

**The Register is the primary EPIC deliverable and the review gate.** It is built by **copying from
the chosen clustering** — every field is *transcribe / enum / derive*, never composed — so two runs
over the same clustering produce the same register. File: `Output/05-epics/EPIC-REGISTER.md`.

**Provenance legend:** *transcribe* = copy the named clustering value verbatim · *enum* = one of a
fixed set, copied from the clustering · *derive* = mechanical transform · *compose* = the only
generated field (must be labeled and bounded).

### Required blocks (in order)
1. **Header** — Status (`DRAFT — awaiting review`), Created (today), Source clustering (link),
   Upstream-evidence note (state if no BRD/PRD; measures will be benefit hypotheses).
2. **The EPICs table** — one row per EPIC:

| Column | Provenance | Rule |
|--------|-----------|------|
| EPIC | derive | `EPIC-` + 3-digit zero-padded clustering **Sl. No.** (clustering row 1 → EPIC-001) |
| Name | transcribe | the clustering EPIC Definitions table's **EPIC Name**, verbatim (a short capability phrase) |
| Outcome | transcribe | that row's **Outcome (hypothesis)** text, verbatim — the value the epic delivers |
| Features | transcribe | that row's **MVP + Later** feature IDs (the two columns combined) |
| Band | enum | that row's **Band** (`MVP` / `Later` / `Mixed`) |
| Persona | enum | the clustering's stated persona — a Persona column if present, else the single persona stated above the table (e.g. `Both`) |
| Depends on | transcribe | the clustering's inter-EPIC dependency edges (by Sl. No.), mapped to `EPIC-<NNN>` |

3. **Capability → EPIC roll-up** (optional) — since each EPIC **Name** is already a capability phrase,
   this is just a coarse grouping of the EPIC names into higher-level themes for navigation; mark it
   *interim — not a governed artifact*. This is the register's one lightly-*composed* block.
4. **MVP build order** — transcribe from the clustering's suggested sequence.
5. **Open decisions** — only those the clustering explicitly raises (e.g. a merge question). Never invented.
6. **Gate line** — `HUMAN ACTION REQUIRED: …` (see the generate-epics skill).

**Manifest:** the register writes one manifest row per EPIC (`type: epic`, id `EPIC-<NNN>`, its
feature traces) — this is what the coverage gate reads to prove every feature is placed.

---

## EPIC detail file (schema)

A **lean** per-EPIC document, generated **on demand** (not all at once). File:
`EPIC-<NNN>-<name-slug>.md`. **No acceptance criteria and no story-centric mapping** — those live
on the stories; the feature list here already seeds forward traceability. **Readability:** one idea
per sentence, active voice.

Sections, in order, with provenance:

| # | Section | Provenance |
|---|---------|-----------|
| 1 | **Description** — the **Epic Hypothesis** (`As a <persona>, I need <capability>, so that <outcome>`) carrying the outcome/value, + 1 short context paragraph | persona + outcome *transcribed*; the hypothesis sentence is *bounded compose* |
| 2 | **Business Value** — ≤5 bullets, each tied to a feature/`REQ` | *bounded compose*, one line per cited source |
| 3 | **Success / Fitness Criteria** — benefit hypothesis + measures | *compose*, **every measure labeled AI-RECOMMENDED** with confidence tier; never invent baselines/targets |
| 4 | **Scope** — In (this EPIC's features) / Out (features owned by other EPICs) | *transcribe* from the clustering (features + borderline/other-EPIC placements) |
| 5 | **Features (TABLE)** — `Feature ID \| Feature \| Req ID \| What it delivers \| Band` (column 3 is the requirement id — label it **Req ID / BR ID / FR ID** to match the source) | *transcribe* the feature list + the clustering's "what it is" text; one row per feature |
| 6 | **Dependencies** — Upstream / Downstream | *transcribe* the clustering's dependency edges |
| 7 | **Non-Functional Requirements** — evidenced vs recommended | evidenced *transcribed with source*; recommended *composed*, labeled AI-RECOMMENDED |
| 8 | **References** — clustering, `REQ`/`FR`, design links | *transcribe*; missing links → `TBD (not in source)` |

The heading and filename follow *EPIC naming and title* above. Capability, if stated, goes in the
Description — never in the title or filename.

---

## Story statement format

```
As a [persona], I want [capability], so that [value].
```

| Component | Description | Example |
|-----------|-------------|---------|
| **Persona** | The user role performing the action | Loan Applicant, System Admin, Hiring Manager |
| **Capability** | Single action the user wants (Verb + Object) | view application status, submit timesheet |
| **Value** | Benefit the user receives | track progress without contacting support |

---

## Story title format

```
[Verb] + [Object]  (2-6 words)
```

**Examples:** View Loan Status, Submit Expense Report, Configure Password Policy

---

## Story folder, index & file (schema)

**Single source of truth for how Layer 06 stories are foldered, named, and structured.** `draft-stories`,
`groom-stories`, `write-acceptance-criteria`, the `auto-spec` workflow, and the story rubrics all follow this.

### Folder & files
- One **folder per EPIC**: `Output/06-stories/<epic-stem>/`, where `<epic-stem>` is the source EPIC's
  filename without extension (e.g. `EPIC-005-target-architecture`), **inherited verbatim** — never re-composed
  (inherit-don't-re-invent, same as EPIC naming).
- **Index** (one per folder): `<epic-stem>-stories-draft.md` — the approval gate, the graded shell record,
  and the coverage view.
- **Story files** (one per story): named by the **title slug** only (e.g. `set-target-direction.md`). No
  `S1`/`S2`, no epic or feature prefix — the folder carries the EPIC; the **title is the unique identity**
  (unique per rubric S1). Created **on approval of the index**, not before (no empty scaffolds).
- **Batch navigation index** (one per `06-stories/`): `epics-list-draft.md` — a flat map so the per-EPIC
  indexes aren't hidden a level down. One row per EPIC folder: `EPIC | Story Index (link to that folder's
  <epic-stem>-stories-draft.md) | Stories | Review Status`. It carries **no story content**. `draft-stories`
  (and `auto-spec`) **add or update a row here whenever an EPIC's index is written**. Review Status ∈
  `Pending review` / `Reviewed` / `Changes requested`.

### Identity & traceability
- A story's **identity is its title**. There is **no story-id prefix code**.
- Traceability is **two inline fields**: `Req ID` and `Feature ID` (never a combined "Delivers"). The Feature
  already carries `Feature → FR/REQ → BR`, so the story inherits the chain by pointing at its `Feature ID`.
- **The index owns the statement**; each story file's `## Story` is **seeded from it and kept in sync**.
  What is approved in the index flows forward.

### Accretion (no 07/08 folders)
Each story file grows **in place** — the file *is* the audit trail: `Status: shell` → add `## Grooming`
(Layer 05) → add `## Acceptance Criteria` (Layer 06). Status advances `shell → groomed → AC-complete`.

### Index layout (section order — fixed)
1. **Lineage block** — the FIRST block under the title, per *Lineage block (document chaining)*: Previous step = `EPIC detail` (plain text); Primary source = the Source EPIC file (linked by its filename); Supporting sources = Feature Catalog + Requirements (linked by filename); Next step = groomed then given acceptance criteria in place, then handed off to a tracker.
2. **Header** — title, `STATUS`, one-line accretion note, field table (Source EPIC, Persona, Identity — Identity trace = `Req ID` + `Feature ID`, never a combined "Delivers").
3. **`## Stories`** — table: `# | Story (title, linked to its file) | Statement (As a / I want / So that) | Req ID | Feature ID | Status`.
4. **`## Out of scope / routed`** — `Item | Where it went | Why`.
5. **`## Coverage`** — `Feature | Story(ies)`: every in-scope feature → its covering story title(s), or `Routed … (see Out of scope)`; close with a ✓ line.
6. **`## Open Questions`** (only if any).

### Story file layout
```
# <Title>

> **Lineage**
> - **Previous step:** Story index
> - **Primary source:** [<epic-stem>.md](../../05-epics/<epic-stem>.md)
> - **Supporting sources:** [<feature-catalog>.md](../../03-features/<feature-catalog>.md) · [<requirements>.md](../../<requirements>.md)
> - **Next step:** This story is groomed then given acceptance criteria in place (see ## Grooming and ## Acceptance Criteria below)

| | |
|--|--|
| Status | shell |
| Req ID | REQ-x.y[, REQ-…] |
| Feature ID | F-nn |
| EPIC | EPIC-<NNN> — <Epic Name> |
| Work Item ID | TBD |

## Story
As a <persona>, I want <capability>, so that <value>.

## Grooming
_Pending — added at grooming._

## Acceptance Criteria
_Pending — added at AC._
```

---

## Dependency table template

```
| Exec Order | Story Reference | Story Title | Rationale | Status |
|------------|-----------------|-------------|-----------|--------|
| 1 | [Work Item ID or S1] | [Title] | [Concrete reason] | [Status] |
```

### Story Reference Values

| Type | When to Use | Example |
|------|-------------|---------|
| Work Item ID | Story exists in the tracker | `WI-12345` (format depends on your tool) |
| Shell ID | Story in current batch, not yet in tracker | `S1`, `S2`, `S3`... |
| Title + Pending | Story exists but ID unknown | `[Title] (Work Item ID pending)` |
| EXTERNAL | Dependency outside current scope | `[EXTERNAL] - SSO Integration` |

### Status Values

| Status | Meaning |
|--------|---------|
| Linked | Work Item ID exists and dependency established |
| Pending Work Item ID | Story exists but not yet created in the tracker |
| External Dependency | Work outside current story scope |
| Needs Verification | Dependency inferred, not proven from sources |

---

## Roles / permissions grid template

```
| Role | System | Program | Workstream | Initiative | Milestone |
|------|--------|---------|------------|------------|-----------|
| Admin | | | | | |
| Editor | | | | | |
| Owner | | | | | |
| Viewer | | | | | |
| Sponsor | | | | | |
```

> **Rule:** Populate ONLY from sources. Leave cells blank if not specified.

**When permissions are not specified in sources, add this block:**

> **PERMISSION GAP:** Roles/permissions not specified in provided sources.
>
> **Required action:** Add to Open Questions:
> - "Which roles can perform [capability]?"
> - "Are there entity-level permission differences (System/Program/Workstream/etc.)?"
>
> **Do NOT proceed to development** until PO confirms role matrix.

**You MUST:** Add the permission questions to the Open Questions section when the Roles/Permissions grid cannot be populated from sources.

---

## Scope table template

```
| Sl. No. | Item | Description | Source |
|---------|------|-------------|--------|
| 1 | [Item name] | [What is included/excluded] | [Source reference] |
```

---

## Key rules table template

```
| Sl. No. | Rule / Decision | Description | Source | Status |
|---------|-----------------|-------------|--------|--------|
| 1 | [Rule name] | [Detailed explanation] | [Source] | [Status] |
```

### Status Values

| Status | When to Use |
|--------|-------------|
| Confirmed | Rule is clearly specified with all details |
| TBD | Rule mentioned but key details missing |
| Needs Verification | Rule is ambiguous or conflicting; requires PO confirmation |

---

## User flow table template

```
| Step # | User Action | System Response (Implicit) | Response Type | Source | Maps to AC |
|--------|-------------|---------------------------|---------------|--------|------------|
| 1 | [Verb + object] | [System behavior triggered] | Implicit | [per source] | Scenario X |
```

### Column Definitions

| Column | Definition |
|--------|------------|
| **Step #** | Sequential number reflecting user actions (not system responses) |
| **User Action** | What the user intentionally does (verb + object). This is the primary step. |
| **System Response (Implicit)** | What the system does in response. This is NOT a separate step; it is the expected behavior triggered by the user action. |
| **Response Type** | `Implicit` = direct consequence of user action (e.g., "page loads", "preview updates"). `Explicit` = system-initiated behavior with no user action required (e.g., async processing, background jobs). |
| **Source** | Citation per Global Rule G.2 (e.g., "per BRD 3.1", "per Figma Login Screen") |
| **Maps to AC** | Reference to the Acceptance Criteria scenario that validates this step |

### Extraction Rules

1. **User Action** — What the user intentionally does (verb + object). This is the primary step.
2. **System Response (Implicit)** — What the system does in response. This is NOT a separate step; it is the expected behavior triggered by the user action.
3. **Consolidation Rule:** If the source lists alternating user/system steps, consolidate each user action + its immediate system response(s) into a single row. The step count should reflect user actions, not system responses.

> **Target:** 4–7 consolidated steps per user flow. If more steps are needed, consider whether the story should be split.

---

## Story sizing alert format

When a story may exceed 2 days of work, add this at the top of the output:

```
> **SIZING ALERT**
> This story may exceed the recommended 2-day scope based on:
> - [Reason 1]
> - [Reason 2]
>
> **Recommendation:** Consider splitting. See Open Questions for suggested options.
```

### Detection Signals

| Signal | Indicates Oversized Story |
|--------|--------------------------|
| 5+ In-Scope items | Too many capabilities |
| 8+ business rules | Too complex |
| 10+ happy path steps | Too long a flow |
| Multiple personas | Should split by persona |
| "and/or" in capability | Bundled capabilities |

---

## Lineage block (document chaining)

**Every generated artifact opens with this block — the FIRST block directly under the H1 title,
before any status/control line.** It exists so no artifact is an orphan: a reader can always see
what this file follows from, what it was built out of, and what comes next. It applies to every
upstream stage (`probe-requirements` through `generate-epics`) and is inherited via the system prompt.

### Format

```
> **Lineage**
> - **Previous step:** <preceding stage name — plain text, not a link> — or `Does not exist`
> - **Primary source:** [<filename.md>](relative/path) — or `Does not exist`
> - **Supporting sources:** [<filename.md>](relative/path) · … — or `None`
> - **Next step:** <plain sentence: what happens to this artifact next> -> [<filename.md>](relative/path)
```

### How each field is derived — mechanical, never a judgment call

| Field | Derived from | If the file is not on disk |
|-------|--------------|----------------------------|
| **Previous step** | the immediately preceding stage in `pipeline.md` (fixed by the contract); **rendered as plain text, not a link** | write `Does not exist` |
| **Primary source** | the document this artifact's own traceability IDs resolve to — its `Covers`/`Traces To` column followed up exactly one level; **linked, with the file's name as the link text** | write `Does not exist` |
| **Supporting sources** | every *other* document already cited in this artifact that is not the primary | write `None` |
| **Next step** | the stage that consumes this artifact per `pipeline.md`; link the downstream file when it exists | name the target path, no link |

**Rules**
- **Previous step is plain text** (the preceding stage's name), never a link. **Primary source, Supporting sources, and Next step link the file, using the file's own name as the link text** (e.g. `[EPIC-004-as-is-analysis.md](../../05-epics/EPIC-004-as-is-analysis.md)`, never a generic label like `[EPIC detail]`) — so the chain is clickable and the target is legible. A file that does not exist is named and marked `Does not exist` — never invented, never inferred from chat.
- **Primary vs Supporting is not an opinion.** Primary = the one parent the IDs resolve to; Supporting = whatever else is already cited. Both are read off existing structure.
- **Next step is a plain-language sentence** of what happens to this artifact, not just a link (e.g. "Features are grouped into clusters (candidate EPICs)").
- The block **replaces** any prior single `Source:` line — it is the one provenance header. Never emit the `§` character (per the plain-characters rule in the system prompt).

### Per-stage endpoints

| Stage (artifact) | Previous step | Primary source | Next step (sentence) -> target |
|------------------|---------------|----------------|--------------------------------|
| Discovery Brief | Entry point | the idea/artifact probed | These findings are written up as a BRD -> `01-brd/` |
| BRD | Discovery Brief | Discovery Brief | Business requirements are detailed into a PRD -> `02-prd/` |
| PRD | BRD | BRD | Functional requirements are decomposed into a feature catalog -> `03-features/` |
| Feature Catalog | PRD | PRD (or the requirements doc the `Covers` IDs resolve to) | Features are grouped into clusters (candidate EPICs) -> `04-clustering/` |
| Clustering | Feature Catalog | Feature Catalog | The chosen clustering is mapped to EPICs in the EPIC Register -> `05-epics/EPIC-REGISTER.md` |
| EPIC Register | Clustering | Clustering | Each EPIC is expanded into a detail file, then sequenced and mapped -> detail files + sequencing/mapping |
| EPIC detail file | EPIC Register | Clustering | This EPIC's features are drafted into user stories -> `06-stories/<epic-stem>/` (index + per-story files) |
| EPIC sequencing / mapping | EPIC Register | EPIC Register | The sequenced EPICs are taken into story creation -> `06-stories/` |
