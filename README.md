# AI-Native Specifier Skills (Claude)

A gated, tool-agnostic **Agent Skills** toolkit that walks a feature idea through
**requirements → PRD → features → EPICs → stories → acceptance criteria**, with a human
approval at every step and a living traceability + change layer over the top.

Built from a set of battle-tested BA/PO prompts, packaged as skills, workflows, and an
eval layer. Everything runs inside Claude Code — no servers, no tracker integrations,
nothing to deploy.

> **This README is the complete guide.** The two docs under `.claude/` are references for
> narrower questions: [WORKFLOW.md](.claude/WORKFLOW.md) is the per-phase execution detail;
> [ARCHITECTURE.md](.claude/ARCHITECTURE.md) is how it's built. They don't repeat what's here.

---

## Table of contents

- [The three building blocks](#the-three-building-blocks)
- [Setup](#setup)
- [Quick start](#quick-start)
- [The pipeline](#the-pipeline)
- [Prerequisites — what each step needs](#prerequisites--what-each-step-needs)
- [Skill or workflow — how to choose](#skill-or-workflow--how-to-choose)
- [Skills — invoke by intent](#skills--invoke-by-intent)
- [Workflows — name them explicitly](#workflows--name-them-explicitly)
- [When a requirement changes](#when-a-requirement-changes)
- [Quality &amp; evals](#quality--evals)
- [Where the output lands](#where-the-output-lands)
- [Principles](#principles)
- [Using it with other coding agents](#using-it-with-other-coding-agents)

---

## The three building blocks

Everything in the toolkit is one of three things. Knowing which is which tells you **how
to invoke it**.

| Block | What it is | How you invoke it | Gated? |
|-------|------------|-------------------|--------|
| **Skill** | A single capability, driven as a conversation. | **By intent** — say what you want; the matching skill triggers. | Yes — ends with a human gate. |
| **Workflow** | A background automation that fans out across many sub-runs. | **By name** — you name it explicitly; it runs unattended. | No — review at the end. |
| **Eval** | A human-authored rubric a machine grades an artifact against. | Manually — on demand (`eval-runner` or `compliance-audit`); never fired by a skill. | It *is* the quality bar. |

A **skill** is the default way to work: precise, one phase at a time, you approve each
output. A **workflow** trades gates for speed when you want a whole pass at once. An
**eval** is the quality bar both are checked against.

The through-line is the **traceability spine** — every artifact carries the ID of the
stage before it:

```
BR-xx  →  FR-xx  →  Feature  →  EPIC  →  Story  →  AC
(BRD)     (PRD)     (catalog)   (epics)  (shells)  (criteria)
```

Because the IDs chain, you can always answer *"if this changes, what does it touch?"* by
following them — which is what the [change layer](#when-a-requirement-changes) runs on.

---

## Setup

| # | Step | Detail |
|---|------|--------|
| 1 | **Open this repo in Claude Code** | the toolkit is entirely inside [`.claude/`](.claude/) — skills in `skills/`, workflows in `workflows/` |
| 2 | **Skills auto-discover** | from `.claude/skills/`, no registration — confirm with `/skills` (you should see 13) |
| 3 | **Workflows are invoked by name** | `/workflows` shows live progress |
| 4 | **Output** | written under `Output/` at the repo root as you go (created on first run) |

No API keys, dependencies, or build step. Skills are prompt files; workflows are the only
executable pieces and run in Claude Code's own sandbox.

---

## Quick start

Pick the entry point that matches what you have. All three are things you type into
Claude Code.

**A. Just an idea — walk it, gated (recommended first run):**
> "Spec this out end to end with the `specifier`: *passwordless login for our web app.*"

The `specifier` skill drives every phase in order and stops at each gate for your
approve / edit / redo. You stay in control the whole way.

**B. Just an idea — get the whole pack unattended:**
> "Run the **auto-spec** workflow on this idea: *passwordless login for our web app.*"

Runs the full pipeline in the background and hands you the complete pack to review at the
end. Faster, no gates — read the output before trusting it.

**C. You already have a doc — start mid-pipeline:**
> "Write the PRD from this BRD: *[paste or path]*" &nbsp;·&nbsp; "Define the features from this PRD."

Any skill runs on its own. Start at whatever phase your inputs already cover.

---

## The pipeline

```
[ idea ]
  → probe-requirements         elicit gaps → Discovery Brief
  → write-brd                  business case → BR-xx
  → write-prd                  what to build → FR-xx, each traced to a BR-xx
  → define-features            prioritized feature catalog, 100% FR coverage
  → cluster-features           group features into EPIC options
  → generate-epics             EPIC Register (copied from clustering) + detail files on demand
  → draft-stories              INVEST story shells
  → groom-stories              scope, business rules, dependencies
  → write-acceptance-criteria  Given/When/Then, categorized UI / Behavior / System
  → [ your work-item tracker ]
```

`probe-requirements` is optional and re-runnable at any point — use it whenever an
artifact feels thin. Every other phase produces an artifact that feeds the next.

For the gate-by-gate mechanics of each phase, see [WORKFLOW.md](.claude/WORKFLOW.md).

---

## Prerequisites — what each step needs

Each phase consumes the prior phase's **approved** artifact — that's why order matters.
You can't draft stories without an EPIC, or cluster features you haven't defined yet. The
**Requires** column is the hard prerequisite; a skill will ask for it if it's missing.
**Also draws on** is context it uses when available.

| Step | Requires (hard prerequisite) | Also draws on |
|------|------------------------------|---------------|
| `probe-requirements` | a feature idea *or* any artifact to interrogate | — |
| `write-brd` | a feature idea | Discovery Brief (if you probed) |
| `write-prd` | an **approved BRD** (`BR-xx`) | Discovery Brief |
| `define-features` | the **PRD** (`FR-xx`) | BRD |
| `cluster-features` | the **feature catalog** (`03-features/`) | BRD + PRD for value/dependency context |
| `generate-epics` | the **chosen clustering** (`04-clustering/`) | PRD (`FR-xx`), BRD, feature catalog |
| `draft-stories` | an **EPIC** — its feature list from the Register row (`05-epics/EPIC-REGISTER.md`; or a detail file if expanded) | PRD, for traceability |
| `groom-stories` | **story files** (≤4 per batch, `06-stories/<epic-stem>/`) | relevant PRD/BRD excerpts, prior groomed stories |
| `write-acceptance-criteria` | a **groomed story** with persona + capability + outcome + ≥1 of rules / permissions / error handling | — |

Already have some of these and want to jump in mid-pipeline? See
[WORKFLOW.md → Entry points](.claude/WORKFLOW.md).

---

## Skill or workflow — how to choose

Both do the same underlying work; they differ in *control vs. cost*:

- **Reach for a skill** when you want to **stay in control** — review and steer each
  artifact, run just one phase, or you're not sure the inputs are solid yet. Cheaper per
  step, and bounded by your own gating. Use the [skills](#skills--invoke-by-intent) table's
  **Weight** column to gauge the bite.
- **Reach for a workflow** when you want a **whole pass at once** and trust the inputs —
  you'll trade the gates for speed and a bigger up-front token cost, then review at the
  end. Use the [workflows](#workflows--name-them-explicitly) table's **Est. wait / Token
  cost** columns to decide if it's worth it.

Rule of thumb: **first time through, or thin inputs → skills** (or the gated `specifier`).
**Re-running with solid inputs, or a bulk pass → the matching workflow.**

---

## Skills — invoke by intent

You don't call skills by name — you **say what you want** and the matching skill
triggers. The phrases below are examples, not magic words. Every skill runs a gated flow
and ends with a clear `HUMAN ACTION REQUIRED:` — approve, edit, or redirect.

**Weight** is a rough relative effort (compute/tokens): **Light** = a single quick pass,
**Medium** = a multi-step gated flow, **Heavy** = spans many artifacts or the whole
pipeline. Because skills are interactive and you approve each step, wall-clock is mostly
*your* review time, not the wait — so weight, not a stopwatch, is what tells you how big a
bite you're taking.

| Skill | Produces | Weight | Say something like |
|-------|----------|--------|--------------------|
| **`specifier`** *(orchestrator)* | drives the whole pipeline, gating each phase | Heavy — runs every phase | "spec this out end to end" |
| `probe-requirements` | Discovery Brief (gaps, assumptions, risks) | Light | "what are we missing here?" |
| `write-brd` | BRD with numbered `BR-xx` | Medium | "draft a BRD for passwordless login" |
| `write-prd` | PRD with `FR-xx` traced to `BR-xx` | Medium | "write the PRD from this BRD" |
| `define-features` | prioritized feature catalog | Medium | "turn this PRD into a feature list" |
| `cluster-features` | 2–3 EPIC grouping options | Medium | "cluster these features into epics" |
| `generate-epics` | EPIC Register + detail files on demand + sequencing + mapping | Medium — register is copied from the clustering; details generated on demand | "generate the epics from this clustering" |
| `draft-stories` | INVEST story shells | Medium | "break this epic into user stories" |
| `groom-stories` | groomed stories + dependencies | Medium — per batch of ≤4 | "groom these stories against the PRD" |
| `write-acceptance-criteria` | Given/When/Then AC | Light — one story at a time | "write the AC for this story" |
| `change-impact` | per-item change verdict | Light — one artifact | "does the refund story still hold if BR-05 changed?" |
| `audit-skill` | scored skill-audit report | Medium | "audit this skill" |
| `artifact-eval` | a callable eval (rubric) for any artifact type | Medium | "write an eval for our PRDs" |

---

## Workflows — name them explicitly

A workflow is a background, multi-run automation. Because it spawns several sub-runs and
costs more than a single skill, **naming it is the opt-in** — the assistant only starts
one when you ask for it by name. You get a notification when it finishes; `/workflows`
shows live progress. Nothing is gated, so **review the output at the end.**

**Which one, and what it costs:**

| Workflow | Use it when… | Complexity | Est. wait | Token cost |
|----------|--------------|------------|-----------|------------|
| `auto-spec` | you want the whole spec pack from an idea or source docs in one unattended pass | High — chains all 6 phases | Several minutes | Very high |
| `blast-radius` | a `BR/FR` changed and you need its impact across every linked artifact | Medium — parallel fan-out | One to a few minutes | High |
| `compliance-audit` | you want the whole `Output/` pack graded against its rubrics at once | Medium — parallel eval | One to a few minutes | High |
| `version-log` | you want a stamped snapshot of the current artifacts to diff against later | Low — single record pass | Under a minute | Low |

> Wait and token figures are **rough, relative guidance**, not guarantees. `blast-radius`,
> `compliance-audit`, and (to a degree) `auto-spec` scale with input size — number of
> affected artifacts, pack size, number of features/EPICs — so a large pack pushes both up.

**How to invoke each:**

- **`auto-spec`** — "run the auto-spec workflow on this idea: *[1–2 lines]*" → args `{ idea, featureName }` → the full pack under `Output/01-brd/` … `06-stories/`.
- **`blast-radius`** — "run blast-radius for this change: *[changed BR/FR]* against *[affected stories]*" → args `{ change, affected[] }` → a **Change Impact Report** (update / new / no-change + edits).
- **`compliance-audit`** — "run compliance-audit over the Output pack" → args `{ artifacts[] }` → **eval findings** per artifact (severity · where · what · fix).
- **`version-log`** — "run version-log to snapshot the artifacts, stamp *[version]*" → args `{ stamp, artifacts[], previous[] }` → a **versioned trail entry** under `Output/audit-trail/[stamp]/`.

Each workflow's `.js` file documents its exact inputs in a top `// args:` comment.

> **Experimental** — smoke-test each once before you rely on it, `auto-spec` especially
> (it chains six sub-runs).

**Skill ↔ workflow pairs.** Two workflows are just the unattended, fanned-out version of a
skill: `specifier` (gated) ⟷ `auto-spec` (autonomous), and `change-impact` (per-item) ⟷
`blast-radius` (across the whole blast radius).

---

## When a requirement changes

A change doesn't break the pipeline — the change layer makes it surgical. One mechanism:
`diff → impact → decide → selective re-run`.

| # | Step | What you do | Outcome |
|---|------|-------------|---------|
| 1 | **Snapshot as you go** | run `version-log` to record a stamped copy of the artifacts (optional, but it's what a later diff reads) | a versioned baseline |
| 2 | **On a change** | run **`blast-radius`** with the changed `BR/FR` and the artifacts the traceability IDs link to it | a **Change Impact Report** — update / new / no-change per item, with the exact edits |
| 3 | **Apply — gated** | approve the report; the `specifier` re-runs only the impacted skills (re-groom, re-AC, draft-new) | updated artifacts — applying is never automatic |

The mechanism behind this (how the spine, `version-log`, and `blast-radius` interlock) is
in [ARCHITECTURE.md](.claude/ARCHITECTURE.md).

---

## Quality &amp; evals

Quality isn't a vibe check. Every artifact type has a **human-authored rubric** under
[`.claude/skills/_shared/rubrics/`](.claude/skills/_shared/rubrics/), and one shared
executor ([`eval-runner.md`](.claude/skills/_shared/eval-runner.md)) grades against it. Both
the skills and the rubrics test one shared, deterministic bar for what makes a unit
well-formed — the quality characteristics **Q1–Q9** in
[`_shared/quality-characteristics.md`](.claude/skills/_shared/quality-characteristics.md) —
so a skill and its eval never grade to two different definitions.

**Evals are manual — a skill never grades its own output.** Nothing is graded until *you* ask.
There are three ways to ask:

**1. Grade one artifact (1-to-1).** Ask in plain language, naming the file and its type — e.g.:
> *"Grade `Output/02-prd/refunds-prd.md` against the `prd` eval."*

Claude loads `_shared/eval-runner.md` + `_shared/rubrics/prd.md`, grades it, and writes the
findings to `Output/_eval/<id>-eval.md`. Rubric names (the `type`): `brd · prd · features ·
clustering · epic · story-shell · story-body · ac` (the full map is in
[`system-prompt.md`](.claude/skills/_shared/system-prompt.md) → *Rubric-to-type map*).

**2. Grade a whole pack (batch).** Run the **`compliance-audit`** workflow by name, passing the
artifacts to grade:
> *"Run the `compliance-audit` workflow over `Output/` — grade every artifact against its rubric."*

It fans out one auditor per artifact (a 3-auditor panel for BRD/PRD), reconciles by majority
vote, and returns a PASS / PASS_WITH_FINDINGS / FAIL verdict for each.

**3. As part of `auto-spec`.** The `auto-spec` **workflow** grades its BRD → PRD → features spine
as it runs — the one caller that grades automatically, and it's a workflow you invoke by name,
not a skill.

To author or rewrite an eval, use the **`artifact-eval`** skill. Skills themselves are
checked with **`audit-skill`** against a ten-check rubric. The eval layer's internals are
documented in [ARCHITECTURE.md](.claude/ARCHITECTURE.md).

---

## Where the output lands

All artifacts are written under `Output/`, one folder per stage, plus a single
machine-readable index at `Output/manifest.json`.

| Stage | Folder |
|-------|--------|
| probe-requirements | `Output/discovery/` |
| write-brd | `Output/01-brd/` |
| write-prd | `Output/02-prd/` |
| define-features | `Output/03-features/` |
| cluster-features | `Output/04-clustering/` |
| generate-epics | `Output/05-epics/` |
| draft-stories → groom-stories → write-acceptance-criteria | `Output/06-stories/<epic-stem>/` (index + per-story files; each story accretes shell → grooming → AC in place) + `Output/06-stories/epics-list-draft.md` (batch nav index) |
| change-impact | `Output/change-impact/` |
| version-log | `Output/audit-trail/[stamp]/` |

The canonical map with file-naming conventions lives in
[`.claude/skills/_shared/system-prompt.md`](.claude/skills/_shared/system-prompt.md).

---

## Principles

- **Human-gated** — nothing advances without approval; every skill step ends with a clear action.
- **No invented specifics** — numbers, limits, and rules come from sources or are marked `TBD`; metrics carry a confidence tier.
- **Tool-agnostic** — Work Item IDs stay `TBD` until your tracker creates them; no tracker-specific calls baked in.
- **Traceable** — every artifact references the prior stage's IDs, so change is surgical.

---

## Using it with other coding agents

The skills are just **prompt files** — a `SKILL.md`, its `references/`, and the shared
rules and rubrics in `skills/_shared/`. None of that content is Claude-specific; only the
way a host *discovers and triggers* it differs. So the methodology ports to Cursor, GitHub
Copilot, Windsurf, and the like — **you re-wire the trigger, not the content.**

**What ports, and what doesn't:**

| Piece | Portable? | Notes |
|-------|-----------|-------|
| Skill content (`SKILL.md`, `references/`, `_shared/` rules + rubrics) | ✅ Yes | Plain markdown instructions — load them as rules/context. |
| Auto-trigger by `description` | ⚠️ Claude Code only | Other hosts don't match a skill to intent; you reference the file explicitly. |
| Workflows (`.js`) | ❌ No | They run on Claude Code's workflow engine (`agent()` / `parallel()` / `pipeline()`). Elsewhere, run the underlying skills in sequence yourself. |

**The universal pattern** (works in any agent): (1) load `skills/_shared/system-prompt.md`
\+ `standard-formats.md` as the house rules, (2) load the one `SKILL.md` for the phase
you're running, (3) for quality, load that phase's `rubrics/<type>.md` and ask the agent
to self-check against it. That's what the gated pipeline does, minus the auto-orchestration.

**Cursor** — add the skills you want as project rules under `.cursor/rules/` (`.mdc`
files), or pull a `SKILL.md` in with `@file`. Load the matching `_shared/` files
alongside. Cursor won't auto-pick a skill by intent — name the file in your prompt.

**GitHub Copilot** — put the shared rules in `.github/copilot-instructions.md` for
always-on guidance, or add a specific `SKILL.md` as chat context (a scoped
`.github/instructions/*.instructions.md` with an `applyTo` glob works for path-specific
rules). Then ask for the phase: *"draft the BRD following these rules."*

**Replacing the workflows.** A workflow is just its skills run back-to-back over the same
inputs. To reproduce `auto-spec` in another host, run the phases in order yourself (BRD →
PRD → features → EPICs → stories → AC), carrying each output into the next. You lose the
parallel fan-out and auto-gating, but the artifacts come out the same.

> Exact rule-file locations for each host change over time — check the host's current docs
> if a path here has moved. The portable part is always the same: **load the `SKILL.md` +
> `_shared/` rules as context, and drive the phases yourself.**
