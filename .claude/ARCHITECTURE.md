# Specifier Toolkit — Architecture

The toolkit turns a feature idea into tracker-ready artifacts (BRD → PRD → Features
→ EPICs → Stories → AC), human-gated at every step, with a living traceability and
change layer over the top.

## Two primitives

| Primitive | What it is | Lives in |
|-----------|------------|----------|
| **Skill** | A capability you invoke by intent. Most are atomic (one artifact); one — `specifier` — is an *orchestrating* skill that walks the whole gated pipeline by invoking the others. | `.claude/skills/<name>/` |
| **Workflow** | Non-gated, background, parallel fan-out. The four automations. | `.claude/workflows/*.js` |

**Why no separate "agent" layer?** Gated, turn-by-turn work (ask → answer → draft →
approve) must run in the main thread, where it can pause for you — that's a **skill**.
Claude Code's detached subagents and workflows can't pause for approval mid-run, so
they're reserved for **non-gated fan-out**. Orchestration-*with-gates* is therefore an
orchestrating skill (`specifier`), not a separate agent — there is no `.claude/agents/`
folder in this toolkit.

## Agent fan-out (inside workflows)

Skills run single-threaded in the main loop. **Workflows** run on a separate engine that
spawns **isolated sub-agents** — each with its own context window — via three primitives:
`agent()` (one sub-agent → one result), `parallel()` (fan out with a barrier), and
`pipeline()` (fan out with no barrier). Which primitive a workflow uses is its core design
choice, and it's what makes workflows the higher-token, non-gated path.

```text
                     Claude Code  (main loop / you)
                               │
        ┌──────────────────────┴──────────────────────┐
   invoke a SKILL                               name a WORKFLOW
   runs in the MAIN thread                      runs on the workflow engine
        │                                              │
   ┌────▼─────────────┐                     ┌──────────▼───────────────┐
   │ one assistant     │                    │ workflow script (.js)     │
   │ gated · step by    │                   │ spawns isolated sub-agents │
   │ step · you approve │                   │ non-gated · review at end  │
   └───────────────────┘                    └──────────┬───────────────┘
      NO sub-agents                                    │  fan-out
                                                        ▼
                                          one of the patterns below


PATTERN A — PARALLEL  (barrier: wait for all)        parallel(items.map(agent))
used by:  blast-radius  ·  compliance-audit

                    manager (script)
                          │  splits work
          ┌───────────┬───┴───────┬───────────┐
          ▼           ▼           ▼           ▼
       agent       agent       agent       agent      ← N sub-agents,
      item #1     item #2     item #3     item #N        all at once
          │           │           │           │         (~16 concurrent,
          └───────────┴─────┬─────┴───────────┘          rest queue)
                            ▼
                     collect results  →  Change Impact Report / audit findings


PATTERN B — PIPELINE  (no barrier: each item flows on its own)
used by:  auto-spec  (stories phase)         pipeline(epics, draft, groom, AC)

   EPIC-1 ──► draft ──► groom ──► AC ─┐
   EPIC-2 ──► draft ──► groom ──► AC ─┤   each EPIC runs its own 3-stage
   EPIC-3 ──► draft ──► groom ──► AC ─┼─► chain independently — EPIC-2 can
   EPIC-N ──► draft ──► groom ──► AC ─┘   be at 'groom' while EPIC-1 is at 'AC'


PATTERN C — SEQUENTIAL SPINE  (each output feeds the next)
used by:  auto-spec  (requirements → EPICs)   chained agent() calls

   idea ─► intake ─► BRD ─► PRD ─► features ─► clustering ─► EPIC Register ──┐
                                        then hand off to Pattern B ──┘
                                        (pipeline over the Register rows)

version-log = a single agent() call (no fan-out).

LEGEND
  agent()     one isolated sub-agent — own context window, returns a result
  parallel()  fan out, BARRIER — all must finish before the next step
  pipeline()  fan out, NO barrier — wall-clock = slowest single chain, not sum
  concurrency capped at ~min(16, cores-2); excess sub-agents queue
```

**Barrier vs. no-barrier is the key latency choice.** `parallel()` (blast-radius,
compliance-audit) waits for the whole batch before returning; `pipeline()` (auto-spec's
stories) lets each EPIC advance independently, so wall-clock ≈ the slowest single chain,
not the sum. Cost and latency both scale with fan-out width — N affected artifacts, N
artifacts in a pack, N EPICs — which is why workflows are the opt-in path.

## The gated pipeline (skills)

The pipeline is a sequence of atomic skills orchestrated by `specifier`, plus cross-cutting
skills invoked anywhere (`probe-requirements`, `change-impact`, `audit-skill`,
`artifact-eval`). The phase order, what each phase invokes, and the gates are in
[WORKFLOW.md](WORKFLOW.md); the input each phase needs is the prerequisites table in the
[guide](../README.md#prerequisites--what-each-step-needs).

Each skill *embodies* its method (distilled from the battle-tested prompts) in its
`SKILL.md`, and keeps the full original prescription in its `references/` as the
exhaustive source. Global rules live once in `skills/_shared/`. The gated `specifier`
skill and the unattended `auto-spec` workflow run these same phases — gates vs. no gates.

## The change-management layer

- **traceability** = the **ID spine** carried *inside* the artifacts
  (`BR-xx → FR-xx → Feature → EPIC → Story → AC`). Not a separate file — you follow
  the IDs to answer "what does this change touch?"
- **audit-trail** = the **`version-log`** workflow — records versioned snapshots of the
  artifacts so a change can be diffed later.
- **change-impact** (skill) = the per-item verdict (update / new / no-change).
  **`blast-radius`** (workflow) fans it out across the whole blast radius into a Change
  Impact Report. Applying the report stays gated (via `specifier`).

## The eval layer

Artifacts are graded against a **human-authored eval** (a rubric) instead of an LLM's free
opinion — the rubric is the ground truth. Grading happens **at formation**, before each gate —
see *Rollout status* below for exactly where it's wired.

| Piece | What it is | Lives in |
|-------|------------|----------|
| **rubric** (eval) | the three-pass checklist + severities for one artifact type — *data* | `skills/_shared/rubrics/<type>.md` |
| **eval-runner** | the one shared executor every eval runs through (stance, anchored findings, verdict, remediation routing) | `skills/_shared/eval-runner.md` |
| **`artifact-eval`** | the standalone skill that *authors* a new eval for any artifact or job | `skills/artifact-eval/` |

**Callable, never hardcoded** — a caller names an eval and loads the runner; the eval itself is
data. Evals are **manual**: skills (including the `specifier` pipeline) never run one on their own
(`_shared/system-prompt.md` → *Evals are manual — never run automatically*). They are invoked only
when a human asks:

- **standalone** — run the runner + a rubric against any file;
- **from the `compliance-audit` workflow** — a thin loop over the runner. Adding a type = drop a rubric file, no code change;
- **from the `auto-spec` workflow** — grades the BRD → PRD → features spine as it runs.

**What a finding looks like.** Each one is *anchored* — it names the rubric check it breaks, the
location, a **verbatim quote** of the offending text, and a concrete fix (no quote → the finding
is dropped). Each is also *routed* by who can fix it:

- **`agent`-fixable** — an edit the model can make from existing sources → feeds a bounded auto-fix loop (≤3 tries);
- **`needs-human`** — closing it would require **inventing a fact** (a number, a rule) that's in no source → goes to a person, never the loop (or the loop would fabricate to pass its own eval).

**Verdict:** any Blocker → `FAIL` · else any finding → `PASS_WITH_FINDINGS` · clean → `PASS`.
To author a *new* eval, use the `artifact-eval` skill (its `references/method.md` is the how-to);
`_shared/eval-model.md` is the *why* — the philosophy this whole layer implements.

> **Rollout status (read this):** **Evals are manual — skills never auto-grade.** A single shared
> rule in `_shared/system-prompt.md` (*Evals are manual — never run automatically*) forbids any
> skill — including the `specifier` pipeline — from grading its own output; a skill produces its
> artifact and stops at the human gate. Grading happens only on explicit human request:
> **standalone** (`eval-runner` + a rubric on one file) or **on demand** via the `compliance-audit`
> sweep. **`auto-spec`** is the sole caller that grades as it runs — a workflow-level gate over the
> linear spine (BRD → PRD → features) that auto-fixes `agent`-owned findings (≤3) before the next
> stage builds on it. **Panel voting** — `panel: N` for BRD/PRD — is honoured by the
> `compliance-audit` sweep (N auditors, majority vote).

## Package layout (portable)

This is a self-contained package — copy the whole thing into wherever your host discovers
skills and workflows (in Claude Code that's the `.claude/` folder). Paths below are **relative to
the package root**, not to any one machine:

```
<package root>/          (e.g. .claude/ in Claude Code)
├── README.md            ← package index → points to the full guide (repo-root README)
├── ARCHITECTURE.md      ← this file (how it's built)
├── WORKFLOW.md          ← per-phase execution detail + entry points
├── skills/
│   ├── _shared/         ← system-prompt.md · quality-characteristics.md · standard-formats.md · pipeline.md · eval-runner.md · eval-model.md · rubrics/<type>.md
│   ├── specifier/       ← the gated orchestrating skill
│   ├── probe-requirements/  audit-skill/  change-impact/  artifact-eval/
│   ├── write-brd/  write-prd/  define-features/
│   └── cluster-features/  generate-epics/  draft-stories/  groom-stories/  write-acceptance-criteria/
└── workflows/
    └── auto-spec.js  ·  blast-radius.js  ·  compliance-audit.js  ·  version-log.js
                                            (compliance-audit = a thin loop over _shared/eval-runner.md)
```

**One relocation caveat:** skills reference shared files by *relative* path (`../_shared/…`), so
they move cleanly. The **workflow `.js` files address skills/rubrics via a single `SKILLS` constant**
at the top of each script (default `.claude/skills`) — if your host root differs, change that one
line. Generated work lands under `Output/` wherever the run executes.

## Reuse principle

The five downstream skills run on the battle-tested prompts **verbatim** — the full
`feature-clustering.md`, `epic-generation.md`, `story-creation.md`, `story-grooming.md`,
and `acceptance-criteria.md` are bundled in each skill's `references/` as the
authoritative source. The net-new prescriptions (`probe-requirements`,
`define-features`, `write-prd`, `change-impact`) are authored in the same house style
— inheriting `system-prompt.md`'s rules, confidence tiers, and gating. Each keeps its deep
guidance in `references/` (e.g. `define-features/references/feature-catalog.md`) and shares
the unit-level quality bar in `_shared/quality-characteristics.md` (Q1–Q9), so a skill and
its rubric grade against one definition instead of two.
