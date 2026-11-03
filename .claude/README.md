# Specifier Toolkit — package index

The gated, tool-agnostic spec pipeline (requirements → PRD → features → EPICs → stories →
acceptance criteria). This folder *is* the toolkit.

**👉 Start with the full guide: [`../README.md`](../README.md)** — setup, quick start, how
to invoke every skill and workflow, prerequisites, evals, and output layout. It's the
single source of truth; the docs here don't repeat it.

## What's in this folder

- **`skills/`** — 13 Agent Skills (invoked by intent). The pipeline skills, the `specifier`
  orchestrator, plus `change-impact`, `audit-skill`, and `artifact-eval`.
  Shared rules, rubrics, and the eval runner live in `skills/_shared/`.
- **`workflows/`** — 4 background automations (invoked by name): `auto-spec`,
  `blast-radius`, `compliance-audit`, `version-log`.

## The other docs here

| Doc | Answers |
|-----|---------|
| [`../README.md`](../README.md) | **How do I use it?** (the complete guide) |
| [`WORKFLOW.md`](WORKFLOW.md) | **What happens at each phase?** (gate-by-gate execution detail + entry points) |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | **How is it built?** (component model, eval layer, change layer, on-disk layout) |
