# Change Plan — 06-stories accretion model

**Goal:** replace the stage-sliced story output (`06-story-shells / 07-groomed-stories / 08-acceptance-criteria`)
with per-EPIC folders under `06-stories/`, where each story is one **title-named** file that accretes
shell → grooming → AC in place. Traceability = an inline `Delivers: F-xx (REQ)` line. No prefix codes.

**Locked decisions**
- Folder: `Output/06-stories/<epic-stem>/` (epic-stem inherited verbatim from the `05-epics` filename).
- Index file: `<epic-stem>-stories-draft.md` (approval gate + coverage view).
- Story file: `<title-slug>.md` — title is the unique identity (rubric S1). No `S1/S2`, no epic/feature prefix.
- Trace: inline `Delivers: F-xx (REQ-x.x)`. No matrix, no prefix code.
- Creation: **on demand / on progress** — never empty scaffolds.
- Evals: stay flat in `Output/_eval/` (separate cleanup, out of scope here).
- Feedback file (`_TODO-process-feedback.md`): not read, not referenced, does not influence this run. Fate noted only as an afterthought at the end.

**Safety net:** full snapshot of `.claude/` + `Output/` in scratchpad; path in `scratchpad/LAST_BACKUP_PATH.txt`.

**Verification:** `scratchpad/check-06-stories.sh <repo-root>` — mechanical gates (stale refs, links, structure, coverage, Delivers). Run after every phase. Prose correctness = human review + the EPIC-005 draft→grade functional test.

---

## Phases (checkpoint = run the checker after each; a failed gate stops the run)

### Phase 1 — Data migration  ✅ DONE (2026-09-25) — GATE 2/3 green for all 5 epics
- [x] Migrate `004, 006, 007, 012` from flat `06-story-shells/` → `06-stories/<epic-stem>/` (index + title-named story files, each with Status + `| Delivers | F-xx (REQ) |` + accretion sections). (005 already done.)
- [x] Repoint their `_eval/*` artifact links to the new index paths.
- [x] Delete migrated flat shells, then **remove `06-story-shells/` entirely** (2026-09-25): pre-Q10 archive → `06-stories/_archive/`; `_TODO-process-feedback.md` → `Output/` root (untouched).
- Note: canonical trace format locked as the table row `| Delivers | F-xx (REQ) |` (checker caught the earlier `Delivers:` drift).

### Phase 2 — Governance (single sources of truth)  ✅ DONE (2026-09-25)
- [x] `_shared/system-prompt.md` — Output-location registry: 06/07/08 rows collapsed into one `06-stories/<epic-stem>/` folder + accretion row.
- [x] `_shared/standard-formats.md` — added *Story folder, index & file* schema: folder/file naming, **title = identity (no story-id)**, **two-field trace `Req ID` + `Feature ID`** (not "Delivers"), fixed index section order (Stories → Out of scope → Coverage → Open Questions), accretion, story-file layout. Also fixed the per-stage endpoints table (438–439) → `06-stories/`.
- [x] `_shared/pipeline.md` — step 6 now `06-stories/<epic-stem>/` (index + `<title-slug>.md`, accretion), trace via Feature ID + Req ID.
- Note: manifest story-`id` reconciliation (STORY-001 → slug/path) deferred to Phase 5 with `manifest.json`.

### Phase 3 — Skills  ✅ DONE (2026-09-25) — all three skills clean in GATE 1
- [x] `draft-stories` (SKILL + reference) — create folder + index (fixed section order, Req ID/Feature ID columns); on approval, title-named story files seeded from the index.
- [x] `groom-stories` (SKILL + reference) — append into each story's `## Grooming` in place; Status → groomed; drop 07 output.
- [x] `write-acceptance-criteria` (SKILL + reference) — append into `## Acceptance Criteria` in place; Status → AC-complete; drop 08 output.
- [ ] `specifier` (orchestrator) — check/update stage/handoff references (rolled into Phase 4 review).

### Phase 4 — Workflows  ✅ DONE (2026-09-25) — auto-spec.js syntax-checked; no workflow references old paths
- [x] `auto-spec.js` — Stories phase rewritten: draft writes `06-stories/<epic-stem>/` (index + title files); groom & AC **append into the files in place** (Status → groomed → AC-complete); fallback single-pass updated. `node --check` passes.
- [x] `compliance-audit` — **no change needed**: takes artifact `{id,type,path}` as args (caller supplies the story-file path); `story-shell/body/ac` types map to existing rubrics; sections within one file grade by path.
- [x] `version-log` / `blast-radius` — **no change needed**: no hardcoded story paths (operate on manifest/args).
- [x] `specifier` — clean (only skill-name references, no stale story paths).

### Phase 5 — Rubrics / manifest / docs  ✅ DONE (2026-09-25)
- [x] `rubrics/story-shell.md` — S11 (legible/one-altitude), sync gate, title-identity already added in the Q10 work; no stale refs.
- [x] `rubrics/story-body.md` + AC rubric — verified: no stale folder paths; they grade the story file's `## Grooming` / `## Acceptance Criteria` sections by path+type (compliance-audit supplies both). No change needed.
- [x] `_plans/fixtures/mini-spec/manifest.json` — story `path`s → `06-stories/EPIC-001-appearance/<title-slug>.md`. `Output/manifest.json` does not exist yet (target/not-wired per rollout note). **Open: manifest story `id` kept as surrogate `STORY-00N` (machine key) — awaiting confirm.**
- [x] `README.md` — Output tree collapsed to `06-stories/`; skill-input + auto-spec rows updated. `ARCHITECTURE.md` already consistent (ID spine, "not a separate file"); `WORKFLOW.md` clean.
- [x] `_plans/*` logs (BUILD-LOG, FIXES, BUILD-ORDER) — left as historical record (no rewrite, per plan).

### Final  ✅
- [x] Full checker run = **ALL PASS** (GATE 1 = 0 stale refs; GATE 2/3 green for all 5 epics).
- [x] Structure/sync/trace verified by the checker across 33 story files + 5 indexes.
- [x] Afterthought — `_TODO-process-feedback.md` (in `06-stories/`... actually left in the retired `06-story-shells/`): **not read, not acted on** during this run. Fate suggestion (do later, not now): review its contents separately and either fold into the skills or delete; it played no part here.

---

## Addendum (2026-09-25) — batch navigation index
- Added `Output/06-stories/epics-list-draft.md` — flat map: `EPIC | Story Index (link) | Stories | Review Status` (Review Status ∈ Pending review / Reviewed / Changes requested).
- Governed in: `_shared/standard-formats.md` (*Story folder, index & file* → Batch navigation index), `_shared/system-prompt.md` (registry row), `_shared/pipeline.md` (step 6), `README.md` (Output tree).
- Maintained by: `draft-stories` (adds/updates a row per EPIC index) and `auto-spec.js` (single post-fan-out writer to avoid races). Checker GATE 4 verifies every EPIC folder is linked.
