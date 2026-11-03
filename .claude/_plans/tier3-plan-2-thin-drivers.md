# Tier-3 · Plan 2 — Make auto-spec & specifier Thin Drivers (AD-7 move #3)

**Addresses:** Tier-3 hole #9 (auto-spec/specifier divergence). **Depends on:** Tier-3 Plan 1
(contract + manifest) — this plan is meaningless without them. **Revised** after self-review; the
corrections are called out inline.

## Context / problem
Two implementations of one pipeline, duplicating the orchestration parameters:

| Concern | auto-spec.js | specifier SKILL.md |
|---------|-----------|--------------------|
| Step *parameters* | restated inline — `auto-spec.js:212` "batches of at most 4", `:216` "3–7 Given/When/Then" | restated again — `SKILL.md:46` "batches of ≤4", `:48` "per story" |

The atomic skills already hold the real work; the **sequence + parameters + naming** are duplicated
across the two drivers and drift. Every new AD would have to be added twice.

## Target
One shared definition; two thin drivers that differ **in more than just gating** (corrected — see
below). Change a parameter once, both drivers inherit it.

## Mechanism (corrected for the no-fs runtime)
> **Self-review fix #1/#2:** a auto-spec *script* has no filesystem access, so it cannot `import` a
> contract file, and a split `.md`+`.json` "kept in sync" would re-create the drift we're removing.

- **The manifest and contract are read/written by the step *agents*, not the script.** Subagents have
  Read/Write; the auto-spec script only sequences them. So "read the contract / update the manifest"
  is an agent instruction, never a script fs call.
- **Single source for the contract** (Tier-3 Plan 1 decides md vs json — *not decided here*). auto-spec
  holds at most a bare ordered list of step ids (data, not skill-paraphrase); the authoritative
  per-step detail lives in the contract + the skill, which the step agent reads.
- **auto-spec** = autonomous driver: for each step id, spawn an agent told *"follow `<skill>` + contract
  step `<id>`; read inputs from the manifest; write output; update the manifest."* No inline
  "batches of 4 / 3–7 AC" — those live in the skill/contract.
- **specifier** = gated driver: "walk the contract steps; invoke each skill; gate; update the
  manifest." No restated parameters.

## What lives where (corrected boundary)
> **Self-review fix #4:** "differ only in gating" was too clean. Drivers own three differences, not one.

| Layer | Owns |
|-------|------|
| Atomic skills | Generation logic + templates (unchanged) |
| Pipeline contract (Plan 1) | Step order, inputs/outputs, naming, forward-IDs, rubric, manifest writes, **decision-points** |
| Drivers (auto-spec/specifier) | (a) autonomy vs **gating**; (b) **decision resolution** — auto-select vs human-picks (e.g. clustering); (c) **entry & provided-doc handling** (Plan 3) — which steps run vs ingest-and-place; plus auto-spec-only fan-out + resume |

## A lighter alternative (decide before building the heavy version)
> **Self-review fix #5:** the full contract+conformance rig may be overkill for a 5-step pipeline.

**Option A — Contract-driven (heavier):** a real pipeline contract both drivers read; strongest
single-source guarantee; more machinery.
**Option B — Skills-are-the-contract (lighter):** the skills already own their own parameters. Fix
the bug directly — **drivers only sequence steps and wire IDs forward via the manifest, and are
forbidden from restating any skill-internal parameter.** No separate contract doc; the manifest
handles wiring. Less machinery, weaker formal guarantee, relies on a lint/conformance check to catch
restated-parameter regressions.

Recommendation: **start with Option B**; graduate to A only if drift keeps happening. (Open question 1.)

## Guarantee (corrected — scoped honestly)
> **Self-review fix #3:** I overclaimed "structurally identical output." Gated runs are human-edited
> and can stop partway, and the interactive driver can't be cheaply auto-run in CI.

The conformance check asserts **structural** conformance of *each* run to the contract — right
folders, valid manifest, IDs resolve, provenance present — **per driver**, not content-parity between
drivers. A gated run legitimately differs in content (human edits) and completeness (stopped at a
gate). We do **not** claim auto-spec-output == specifier-output.

## Risks & mitigations
- Two drivers drift even against one source → conformance check per run (structure, not content).
- Over-thinning strips auto-spec's fan-out/resume → those are explicit driver concerns, they stay.
- Big-bang rewrite breaks auto-spec → migrate one step at a time (BRD first), prove parity, continue.

## Acceptance criteria
- Changing grooming batch size in **one place** (skill or contract) changes both drivers with no
  driver edit.
- auto-spec.js and specifier SKILL.md contain **no** restated skill parameters — only sequencing +
  wiring + their driver-specific concerns.
- Each driver's run passes the conformance check (structure/manifest/IDs), independently.

## Open questions (for review)
1. **Option A vs B** — heavier contract, or lighter "skills-are-the-contract"? (My rec: B first.)
2. **Fan-out** — confirm parallelism is a driver concern (auto-spec parallel, specifier sequential).
3. **Decision-points** — model them in the contract as first-class (each driver resolves), agreed?
4. **Migration** — prove parity per-step (BRD first) before continuing, or convert then verify once?
