---
name: audit-skill
allowed-tools: Read, Glob, Grep, Bash, Edit, Write
description: >-
  Audit any Agent Skill against skill-authoring best practices, return a scored
  and fully-reasoned review, and — on request — rewrite it to 5/5. Works on any
  skill regardless of who wrote it or what domain it serves: pass a directory
  path, a skill name, pasted SKILL.md text, or a .skill package. Use whenever
  someone wants to check, review, critique, lint, QA, grade, or improve a skill,
  asks "is this skill any good?", "why won't my skill trigger?", "make this skill
  better", or right after writing or editing a skill. This audits skills
  themselves — not the artifacts a skill produces (documents, code, data).
---

# Audit a skill

Judge a skill the way a demanding reviewer would: does it trigger when it should,
load lean, point only at things that exist, read like it trusts the model, and
stay safe? The scoring is **deterministic** — the same skill must earn the same
score every run — because every check is decided by counting concrete
sub-criteria, not by overall impression.

This skill is **domain- and author-agnostic**. Never assume the skill under audit
belongs to any particular project, role, or toolkit. Judge it on its own terms;
the only subject is skill-authoring quality.

## Two modes

- **Audit** (default): produce the scored review. Read-only — no edits.
- **Remediate** (only after the user asks and acknowledges the plan): rewrite the
  skill to raise every check to 5/5, then re-audit and show before/after.

Never edit a skill in Audit mode — remediation changes someone's authored file, so
it waits for an explicit go-ahead.

## Mandatory steps (Audit)

1. **Ingest the skill.** Accept whichever form the user provides:
   - a **path** → read that `SKILL.md`;
   - a **name** → find `.claude/skills/<name>/SKILL.md`, then any `SKILL.md` under a
     matching directory anywhere in the project;
   - **pasted text** → audit it as-is; mark Check 5 (reference integrity)
     *intent-only*, since on-disk checks can't run, and say so;
   - a **`.skill` package** → unpack and read the `SKILL.md` inside.
   Read the whole `SKILL.md`, its frontmatter, and **every** bundled resource under
   `references/`, `scripts/`, and `assets/`. For "audit all skills", enumerate every
   `SKILL.md` under the skills directory and audit each. If no `SKILL.md`
   resolves for the target, stop and report the path(s) you checked and what to
   provide — never audit from assumption.
2. **Load the rubric.** Read `references/rubric.md` (next to this file). It defines
   ten checks, each with five binary sub-criteria and a detection method. Do not
   score from memory.
3. **Score each check deterministically.** For every check, test its five
   sub-criteria one by one using the rubric's detection method — running the greps,
   `wc -l`, and on-disk existence checks it names rather than eyeballing. Mark each
   sub-criterion met or not-met, then set **check score = count met (0–5)**. Apply
   any hard cap. Record the letters of the failed sub-criteria — the detailed
   finding is built from them.
4. **Verify references on disk, not by eye** (Check 5). For each path, file, or
   sibling skill the body names, confirm it exists (Glob/`ls`/Read). Dangling
   references are the most common serious defect and the easiest to miss by reading.
5. **Derive severity and verdict** from the score, using the rubric's fixed
   severity table and verdict rows. No judgment — the numbers decide.
6. **Report** using the format below, then offer remediation.

## Report format (Audit)

Lead with a **scorecard table** for the at-a-glance view, then give the reasoning as
**bullets and sub-bullets** — a table cell holds a score, but a finding's evidence
and fix need room to breathe. Produce exactly this structure:

````
## Skill audit — <skill-name>

**Verdict:** Ship / Revise / Rework
**Overall:** <mean> / 5   (<n> checks scored, <m> N/A)
**Decided by:** <the verdict row or hard gate that applied>

### Scorecard

| # | Check | Score | Severity | Sub-criteria met | Headline |
|---|-------|-------|----------|------------------|----------|
| 1 | Frontmatter validity | 4/5 | Minor | 1a, 1b, 1c, 1d | 1e — no allowed-tools on a file-editing skill |
| 2 | Description as trigger | 5/5 | Clean | 2a–2e | — |
| … | … | … | … | … | … |
| 10 | Least surprise & safety | 5/5 | Clean | 10a–10e | — |

### Findings

(one block per check scoring below 5, most severe first — bullets and sub-bullets)

#### Check <n> — <name> — <score>/5 — <severity>
- **Failed sub-criteria:** <letters, e.g. 1e>
- **Where:**
  - `<file:line>`
- **What I found:**
  - <specific observation, with the offending text quoted>
  - <second point if any>
- **Why it matters:**
  - <the real consequence: won't trigger, drifts, bloats context, unsafe, …>
- **Fix:**
  - <concrete change; show a rewritten snippet when it removes doubt>

### Strengths
- <1–3 genuine, specific strengths — so the author trusts the review>

### To reach 5/5
1. <the change that raises the score most> — lifts Check <n> <old>→5
2. …

Want me to apply these? I'll make the edits and re-audit so you see the new score.
````

Order findings by severity, not check number. Spend words where they change the
score; a 5/5 check needs no finding block — the scorecard already records it.

## Remediate mode (only after acknowledgement)

When the user says to fix it (or answers yes to the offer):

- **Restate the plan.** List the concrete edits, grouped by check, so the shape of
  the change is visible before any file moves.
- **Wait for the go-ahead**, and honor any narrowed scope ("just the description").
- **Apply the edits** to the real files. Fix causes, not symptoms:
  - a dangling reference is fixed by removing it or pointing at what exists — not by
    softening the wording;
  - a bloated body is fixed by moving detail into `references/` — not by deleting
    needed content.
- **Re-audit from scratch** and present a **before → after** score for every changed
  check, plus the new verdict. If something still isn't 5/5, say so — never inflate.
- **Never touch files outside the skill under audit.**

## Worked example

Input: "Audit the skill at `.claude/skills/example-greeting-skill`."

Scorecard row and matching finding (excerpt):

| # | Check | Score | Severity | Sub-criteria met | Headline |
|---|-------|-------|----------|------------------|----------|
| 5 | Reference integrity | 2/5 | Major | 5c, 5e | 5a/5b/5d — points at skills that don't exist |

#### Check 5 — Reference integrity — 2/5 — Major
- **Failed sub-criteria:** 5a, 5b, 5d (capped at 2 by the dangling-functional-reference rule)
- **Where:**
  - `SKILL.md:71` (Handoff section)
- **What I found:**
  - The Handoff tells the reader to use `polish-greeting` and `translate-greeting`.
  - Neither exists — `.claude/skills/` contains only this skill.
  - The `[style guide](styles/guide.md)` link resolves to no file.
- **Why it matters:**
  - A reader who follows the handoff hits nothing; the skill feels wired-up when it
    isn't, which erodes trust in the rest of it.
- **Fix:**
  - Remove the two sibling-skill references, or mark them "planned — not yet built".
  - Repoint or delete the dead `styles/guide.md` link.

Each finding stands on its own with failed sub-criteria, location, quoted evidence,
consequence, and fix.

## Scope and stance

- **Be fair, not just harsh.** Lead with what's broken, but name what works.
- **One subject: skills.** This grades skills, not the artifacts a skill emits.
