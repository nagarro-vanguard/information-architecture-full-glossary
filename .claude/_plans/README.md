# _plans — Workflow Hardening Plans

Each plan is a self-contained change you run separately. The register tracks status; the plans
specify the work.

## Index

| Doc | What it is |
|-----|------------|
| [FIXES.md](FIXES.md) | The change register — AD-1…AD-6 decisions, per-workflow items, status. |
| [eval-model.md](../skills/_shared/eval-model.md) | Cross-cutting: how the toolkit evaluates its own artifacts (the framework Plans 1 & 2 implement). Now shipped in `skills/_shared/`. |
| [tier1-plan-1-eval-rubrics.md](tier1-plan-1-eval-rubrics.md) | **Tier 1.** Per-artifact rubrics + refactor `compliance-audit` into a per-artifact auditor. |
| [tier1-plan-2-traceability-coverage-gate.md](tier1-plan-2-traceability-coverage-gate.md) | **Tier 1.** Set-level traceability/coverage gate (deterministic graph check). |
| [tier1-plan-3-provided-docs-and-no-skip.md](tier1-plan-3-provided-docs-and-no-skip.md) | **Tier 1.** Approved docs pass through (no rewrite); no-skip without upstream fabrication. |
| [tier3-plan-1-contract-and-manifest.md](tier3-plan-1-contract-and-manifest.md) | **Tier 3 (foundation).** Run manifest + pipeline contract + conformance check — the thing all workflows conform to. |
| [tier3-plan-2-thin-drivers.md](tier3-plan-2-thin-drivers.md) | **Tier 3.** Make auto-spec & specifier thin drivers over the shared pipeline (revised after self-review). |

## Build order
**Canonical, rework-checked, file-by-file → [BUILD-ORDER.md](BUILD-ORDER.md).** That doc is the single
source for the sequence and exactly which files each step edits. (Do not restate the order here — one
source only, so it can't drift.)

Five steps in short: **1** index/manifest → **2** contract + conformance → **3** eval rubrics + auditor
→ **4** coverage gate → **5** one driver refactor pass (owns the one-evolving-story *placement*; the
atomic skills' logic stays untouched), then the real-doc run.

## Still open (in [FIXES.md](FIXES.md))
Anything not yet scheduled into [BUILD-ORDER.md](BUILD-ORDER.md).
