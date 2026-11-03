# Skill Audit Rubric

The checklist `audit-skill` scores against. The goal is a **reproducible** score:
two audits of the same skill must land on the same number. To get there, every
check is broken into **five binary sub-criteria**, each with a concrete detection
method. You observe each sub-criterion as met or not-met — no holistic guessing —
and the check's score is simply **the count of sub-criteria met (0–5)**.

Read this in full before scoring.

## Contents

- [How scoring works](#how-scoring-works)
- [Severity and verdict](#severity-and-verdict)
- Check 1 — [Frontmatter validity](#check-1--frontmatter-validity)
- Check 2 — [Description as trigger](#check-2--description-as-trigger)
- Check 3 — [Progressive disclosure](#check-3--progressive-disclosure)
- Check 4 — [No duplicated authority](#check-4--no-duplicated-authority)
- Check 5 — [Reference integrity](#check-5--reference-integrity)
- Check 6 — [Writing quality](#check-6--writing-quality)
- Check 7 — [Structure and headings](#check-7--structure-and-headings)
- Check 8 — [Output-format clarity](#check-8--output-format-clarity)
- Check 9 — [Self-containment and assumptions](#check-9--self-containment-and-assumptions)
- Check 10 — [Least surprise and safety](#check-10--least-surprise-and-safety)

---

## How scoring works

- Each check has **exactly five sub-criteria**, each worth **1 point**.
- A sub-criterion is **met (1)** or **not met (0)** — never partial. If you can't
  observe it as clearly met, it is not met.
- **Check score = number of sub-criteria met**, 0–5. Record *which* sub-criteria
  (by letter) failed — that list is what the detailed finding is built from.
- **Hard caps** override the count: if a cap listed under a check fires, the check
  score cannot exceed the cap, no matter how many sub-criteria passed.
- **N/A:** only Check 8 may be N/A (skill produces no fixed output). An N/A check
  is excluded from the average — never scored 0.
- **Overall score = mean of all scored checks**, to one decimal.

## Severity and verdict

Derive each check's severity from its score — deterministically, no judgment:

| Check score | Severity label |
|-------------|----------------|
| 5 | Clean |
| 4 | Minor |
| 3 | Moderate |
| 2 | Major |
| 0–1 | Critical |

Then the overall verdict, applying the **first** row that matches:

| Condition | Verdict |
|-----------|---------|
| Any unsafe behavior on Check 10 (10c/10a fail on a hidden side effect), OR Check 1 or Check 5 scores 0 | **Rework** — blocking |
| Overall ≥ 4.0 **and** no check scores below 3 | **Ship** |
| Overall 3.0–3.9, **or** any single check scores below 3 | **Revise** |
| Overall < 3.0 | **Rework** |

State the overall score, the verdict, and which row/gate decided it.

---

## Check 1 — Frontmatter validity

The YAML block at the top of `SKILL.md` decides whether the skill loads at all.

Sub-criteria:

- **1a — `name` present.** A non-empty `name:` key exists.
- **1b — `description` present.** A non-empty `description:` key exists.
- **1c — name well-formed.** `name` is lowercase, hyphen-separated, and matches the
  skill's directory name exactly.
- **1d — no stray keys.** Every key is a recognized field (`name`, `description`,
  `allowed-tools`, `compatibility`) — no typos or invented keys.
- **1e — power is scoped.** If the skill edits files, runs shell, or reaches the
  network, it either declares `allowed-tools` or the body explicitly bounds its
  reach. A read-only skill passes this automatically.

Detection: read the frontmatter; compare `name` to the folder name; scan the body
for edit/write/shell/network verbs to judge 1e.

Hard cap: **1a or 1b not met → check score 0** (the skill is broken).

## Check 2 — Description as trigger

The description is the only text always in context, so it alone decides whether the
skill fires. Under-triggering is the common failure — reward specificity and a
little push.

Sub-criteria:

- **2a — states what.** Names what the skill does.
- **2b — states when.** Names the situations/contexts it should trigger in.
- **2c — concrete phrasings.** Includes at least two phrasings a real user would
  type (quoted example requests, not abstractions).
- **2d — negative scope.** Names at least one adjacent thing it is *not* for, so it
  won't poach sibling skills.
- **2e — right-sized push.** Uses imperative triggering language ("use when/
  whenever…") and is roughly 2–6 sentences — not a one-line stub, not an essay.

Detection: read the description; count trigger phrasings for 2c; look for a "not
for…" clause for 2d; count sentences for 2e.

Hard cap: **no when-to-use content (2b fail) → cap 2.**

## Check 3 — Progressive disclosure

Skills load in three tiers: metadata → `SKILL.md` body → bundled resources. Keep the
body lean and push bulk to resources.

Sub-criteria:

- **3a — body length.** `SKILL.md` body is under 500 lines.
- **3b — detail deferred.** Detailed/bulky material (long rubrics, per-variant
  specs) lives in `references/`, not inlined — or the skill is simple enough to
  genuinely need none.
- **3c — pointers with guidance.** Each resource is referenced from the body with a
  note on when to read it.
- **3d — big files have a TOC.** Any resource over 300 lines includes a table of
  contents.
- **3e — no oversized inline block.** No single inlined block over ~100 lines that
  should have been a resource.

Detection: `wc -l` the body and each resource; grep the body for references to each
resource file; scan for large inlined blocks.

Hard cap: **body over 500 lines with no hierarchy → cap 2.**

## Check 4 — No duplicated authority

Content that already lives in an authoritative file should be referenced, not copied
— copies drift.

Sub-criteria:

- **4a — shared rules referenced.** Global/shared rules are cited by path, not
  pasted in.
- **4b — no re-transcription.** No wholesale copy of an authoritative external file.
- **4c — additive only.** The skill contributes its own specific content rather than
  restating source material.
- **4d — template once.** Any output template appears once, not repeated.
- **4e — no internal echo.** No two sections state substantially the same thing.

Detection: compare body passages against any referenced authority; scan for repeated
templates or near-duplicate sections.

Hard cap: **wholesale re-transcription of an authoritative file → cap 2.**

## Check 5 — Reference integrity

Every path, file, or sibling skill the body names must resolve — or be unmistakably
a placeholder/example.

Sub-criteria:

- **5a — paths exist.** Every real path named in the body exists on disk.
- **5b — siblings exist.** Every sibling skill named as usable exists, or is clearly
  marked planned/hypothetical.
- **5c — relatives resolve.** Relative paths resolve from the skill's stated working
  directory.
- **5d — links live.** Every markdown link points somewhere real.
- **5e — examples unmistakable.** Example/input paths are obviously fictional or
  genuinely real — never real-looking-but-dead.

Detection: for each reference, check existence with Glob/Read/`ls`. For pasted-text
audits, mark this check **intent-only** and say so in the report.

Hard cap: **any dangling *functional* reference (something the reader is told to
use, not an illustration) → cap 2.**

## Check 6 — Writing quality

Models follow reasoning, not incantation. Reward imperative voice and explained
intent; penalize rigid command-walls and padding.

Sub-criteria:

- **6a — imperative.** Instructions are in direct imperative voice.
- **6b — explains why.** Non-obvious instructions carry a short rationale.
- **6c — not a caps-wall.** Fewer than ~5 ALL-CAPS MUST/ALWAYS/NEVER directives, and
  those present carry a reason.
- **6d — no padding.** No hedging filler or throat-clearing ("basically", "of
  course", "as we all know").
- **6e — says it once.** No near-duplicate sentences restating the same point.

Detection: grep for `MUST|ALWAYS|NEVER` and count caps directives (6c); scan for
hedge words (6d); compare sentences for repetition (6e).

Hard cap: **rigid command-style throughout with no rationale → cap 3.**

## Check 7 — Structure and headings

Sub-criteria:

- **7a — real phases.** Headings name actual phases of the work.
- **7b — no ceremony.** No cargo-cult scaffolding (a literal "Step 0", empty
  sections, headings with no content).
- **7c — task order.** Section order follows how the task is actually performed.
- **7d — scannable.** No giant undifferentiated wall of text; sections are digestible.
- **7e — consistent hierarchy.** Heading levels are used consistently.

Detection: read the heading outline; grep for `Step 0`; check each heading has real
content beneath it.

Hard cap: **cosmetic/ceremonial structure dominates → cap 3.**

## Check 8 — Output-format clarity

Score **N/A** only if the skill produces no fixed output artifact. Otherwise:

Sub-criteria:

- **8a — template explicit.** The output structure/template is shown, not implied.
- **8b — example present.** At least one Input→Output example appears.
- **8c — example matches template.** The example conforms to the stated template.
- **8d — formatting specified.** Formatting rules (tables, bullets, bolding, GWT,
  etc.) are stated where they matter.
- **8e — edge outputs.** The empty/insufficient/none-found output is defined.

Detection: locate the template and example; diff them for 8c; look for an
"if none/insufficient" branch for 8e.

## Check 9 — Self-containment and assumptions

Sub-criteria:

- **9a — environment stated.** Working-directory and environment assumptions are
  stated, not silent.
- **9b — tools/inputs named.** Required tools and user-supplied inputs are named.
- **9c — followable alone.** A reader with only this file could execute the skill.
- **9d — degraded modes.** Failure/partial modes are described (e.g. missing input,
  pasted-only source).
- **9e — no silent assumption.** No load-bearing assumption left unstated.

Detection: look for an explicit assumptions/inputs statement; test whether each step
is executable from the file alone.

Hard cap: **a silent load-bearing assumption (e.g. relies on cwd without saying so)
→ cap 3.**

## Check 10 — Least surprise and safety

Sub-criteria:

- **10a — matches intent.** Behavior matches the name and description; no hidden side
  effects.
- **10b — no malice.** No malware, exfiltration, credential harvesting, or deception.
- **10c — destructive gated.** Destructive or outward-facing actions wait for
  confirmation.
- **10d — reach scoped.** Broad reach (file edits, shell, network) is bounded by
  `allowed-tools` or an explicit in-body constraint.
- **10e — modes separated.** Read-only vs mutating behavior is clearly separated.

Detection: map every action the skill can take against its stated purpose; look for
confirmation gates before mutations.

Hard gate: **any hidden or unsafe behavior (10a or 10b fail) → check score 0 and
overall verdict Rework**, regardless of other checks.
