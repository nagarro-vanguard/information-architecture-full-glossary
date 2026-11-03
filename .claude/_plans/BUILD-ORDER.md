# Build Order — canonical, rework-checked

The one authoritative sequence. Each step names the **exact files** it creates/edits, its test, and a
review gate before the next. Rework traps found in review are listed at the bottom with how the order
avoids them.

**Rules that keep rework near-zero:**
- Every skill/shared file is edited in **distinct passes** — the same lines are never touched twice.
- **Drivers (auto-spec.js, specifier) are edited exactly once**, at the end, against a finished
  foundation — never patched repeatedly.
- Every step is tested on the **tiny fixture** and passes a **review gate** before we continue.
- A single real-doc run happens **only at the very end**.

## Workflow name map (rename here — one place)
If a workflow is renamed again, update this table; it's the reference for the find/replace across the
plans. The plans use these current names.

| Role | File |
|------|------|
| Autonomous generator | `.claude/workflows/auto-spec.js` |
| Gated generator | `.claude/skills/specifier/SKILL.md` |
| Snapshots / audit-trail | `.claude/workflows/version-log.js` |
| Change-impact (fan-out) | `.claude/workflows/blast-radius.js` |
| Eval / auditor | `.claude/workflows/compliance-audit.js` |
| Change-impact (per-item skill) | `.claude/skills/change-impact/SKILL.md` |
| Conformance check *(new, Step 2)* | `.claude/tools/conformance-check.mjs` *(Node, not a Workflow)* |
| Coverage gate *(new, Step 4)* | `.claude/tools/coverage-gate.mjs` *(Node, not a Workflow)* |

---

## Step 1 — The index (manifest)
- **Edit:** `.claude/skills/_shared/system-prompt.md` → add a new "Run manifest" section (what fields
  each artifact records, when to write). *New section — does not touch the existing output table.*
- **Create (test only):** a fixture mini-spec + a tiny throwaway run that emits `Output/manifest.json`.
- **Test:** rows well-formed; look a story up by its id; kill & resume → PASS artifacts skipped.
- **Gate.**

## Step 2 — Contract + conformance check
- **Create:** `.claude/skills/_shared/pipeline.md` (human-first contract you can read/edit).
- **Create:** `.claude/tools/conformance-check.mjs` *(plain Node — deterministic file checks need
  filesystem access, which Workflow scripts don't have, so this is NOT a Workflow).*
- **Test:** clean pack passes; a file with no manifest row / a dangling link → fails naming the id.
- **Gate.**

## Step 3 — Eval rubrics + auditor
- **Create:** `.claude/skills/_shared/rubrics/` → `brd.md, prd.md, features.md, clustering.md,
  epic.md, story-shell.md, story-body.md, ac.md`. *Written to the FINAL target (incl. the one-file
  story model), so they're authored once.*
- **Edit:** `.claude/workflows/compliance-audit.js` → per-artifact auditor (load rubric, return
  verdict, write to `Output/_eval/` + manifest).
- **Test:** seeded defects flagged with severity + anchor; clean passes; rerun = same severity.
- **Gate.**

## Step 4 — Coverage / traceability gate
- **Create:** `.claude/tools/coverage-gate.mjs` *(plain Node, like the conformance check).*
- **Test:** an FR covered by no feature → named; a feature in two EPICs → flagged; traced pack → pass.
- **Gate.**

## Step 5 — One driver refactor pass (owns AD-6 placement; the ONLY driver edit)
> **Design decision:** the one-evolving-story model is a *placement* concern, so it lives in the
> **driver/contract** — the atomic skills' METHOD is left untouched. (Old "edit the skills' story
> logic" step is dropped.)

> **Status (updated after commits `af638dd`, `5eb0273`):** the **eval half is DONE** — grade-on-
> formation is a shared skill rule, `auto-spec` has `gradeAndFix` on BRD→PRD→features, and
> `compliance-audit` does panel voting. **Remaining = the structure half:** ① write the manifest
> during a run · ② one-evolving-story file · ③ provided-docs/no-skip (`artifacts/` + provenance) ·
> ④ thin-drivers (follow `pipeline.md` instead of inline logic) · ⑤ auto-run conformance + coverage.

- **Edit:** `.claude/workflows/auto-spec.js` → thin autonomous driver: loop the contract steps;
  **assemble each story as ONE evolving file** (`06-stories/<story-id>.md`) — draft writes it, groom
  and AC **append in place**; handle provided-docs/no-skip intake (drop → eval → place normalized /
  reconstructed-stub); update the manifest; ≤3-loop eval hook; resume; per-EPIC fan-out.
- **Edit:** `.claude/skills/specifier/SKILL.md` → thin gated driver: same behaviours, with gates.
- **Edit (shared convention, NOT an atomic skill):** `.claude/skills/_shared/system-prompt.md` output
  table → replace `06/07/08` rows with one `06-stories/` row + story-id naming; add provenance labels
  + `artifacts/`. *(Only time the output table changes.)*
- **Edit (ONE line each — placement only, skills' METHOD untouched):** the save-location line in
  `draft-stories`, `groom-stories`, `write-acceptance-criteria` → "write to the story file the
  orchestrator names (default `06-stories/<story-id>.md`)". Removes the old 06/07/08 conflict.
- **Edit:** `.claude/workflows/version-log.js` → snapshot a frozen copy at each stage (AD-10 anchor).
- **Edit:** root `README.md` (~line 36) → the `06/07/08` list becomes `06-stories/`.
- **How:** migrate one pipeline step at a time (BRD first → prove parity → next). auto-spec keeps
  working throughout.
- **Test:** fixture end-to-end — one story file grows shell → body → AC with snapshots; change a
  skill's batch size once → both drivers reflect it; conformance + coverage pass for each driver.
- **Gate → then one real-doc run** (your 3 modernization docs) with resume ready.

---

## Rework traps found in review — and how this order avoids them
1. **Editing the shared output table twice** (once for the manifest, again for the story-folder
   collapse). → Fixed: Step 1 only *adds* a manifest section; the output table's story rows change
   **once**, in Step 5.
2. **Editing the drivers 3× ** (provided-docs, story model, thinning as separate passes, each partly
   undoing the last). → Fixed: all driver changes are one consolidated pass in **Step 5**, against a
   finished foundation.
3. **Rubrics written against the old 3-file story model, then rewritten after AD-6.** → Fixed: story
   rubrics in Step 3 are authored to the **final one-file** target from the start (AD-6 is already
   decided).
4. **Rewriting the atomic skills' story logic (risky).** → Avoided: AD-6 is a *placement* concern,
   realized in the driver/contract; the skills get at most a **one-line save-location tweak**, their
   method untouched.

## Does it now know what to edit?
Yes — every step above lists exact file paths. `_shared/system-prompt.md` is touched in Step 1 (new
manifest section) and Step 5 (output table) — **different sections, never the same lines**. Drivers
touched once (Step 5). Story skills: **one-line placement tweak only** (Step 5), logic untouched.
Auditor once (Step 3). The two Node checkers are additive (Steps 2, 4).
