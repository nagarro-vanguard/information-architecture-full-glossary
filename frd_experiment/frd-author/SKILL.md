---
name: frd-author
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(node:*)
description: >-
  Write a capability FRD — the always-true "The system shall…" rules for one capability — from an approved
  feature catalog and its requirements doc, with review stops where the person decides. Use when someone asks
  to write, draft, or generate an FRD, the functional rules, or the "the system shall" rules for a capability
  or a module — e.g. "write the FRD for source management", "turn the Setup features into FRDs". Runs after
  the feature catalog exists, in parallel with clustering. Not the catalog (define-features), EPICs
  (cluster-features), or user stories (draft-stories).
---

# Author a capability FRD

- Turns one **capability** — a group of related features within one module of the feature catalog — into
  its FRD: the rules the system must always obey.
- Every rule is traced to its source and ready for acceptance criteria to prove.
- You **draft**; the person **decides** every suggested rule, every open question, and whether to accept the
  changes.
- The FRD is a **living document**: it never carries a status. Its Decision record says what was decided,
  by whom and when.

## Words used in this skill

| Word | What it means | Where it comes from | Example |
|---|---|---|---|
| Feature catalog | the list of numbered features, each with a "Done when" line | the catalog file you are given | `modernization-control-plane-features-v3.md` |
| Module | a numbered section of the feature catalog | the catalog's section headings | 3. Setup |
| Capability | a group of related features within one module; one FRD covers one capability | decided at the Step 1 review stop | Team & roles |
| Requirement | one numbered entry in the requirements doc | the requirements file you are given, column "Requirement" | "Name the team and their roles" (REQ-3.1) |
| "Done when" | the catalog's line saying when a feature counts as finished | the catalog, column "Done when" | Each member is named with an email and role(s) and can be set active or inactive, with bulk import |
| Clause | one separate condition within a "Done when" line, numbered dw1, dw2 | • split by you at Step 1<br>• decided at its review stop<br>• kept in the FRD's Coverage table | can be set active or inactive (dw2) |
| Rule | one "The system shall…" sentence, numbered per feature | written by you at Step 2, in the FRD's Rules table | let a member be set active or inactive (F-15.5) |
| Suggested rule | a rule you suggest, written `proposed`, because the sources name the options but not which applies | written by you at Step 2; the person keeps or drops it | start each new member as active |
| Decided rule | a rule added or kept because of the person's decision, written `decided`, with a note | written by you at Step 3 | not accept a member whose email another member already has |
| Note | "Updated from the requirement on the basis of Decision n: what changed" — wherever the FRD differs from the requirements doc | written by you, next to what changed | Updated from the requirement on the basis of Decision 4: two members may not share an email |
| Open question | a gap only the person can answer; an unknown is marked TBD (to be decided) | written by you at Step 2, in the FRD's Open questions | Duplicate emails |
| Standard questions | the same questions asked about every thing in the FRD's Data | the Standard questions section of the conventions | Can it be removed? |
| Review stop | where you stop and wait for the person's decisions | the end of each step | the Step 1 review stop |
| Decision record | the FRD's section recording, for each decision:<br>• the question<br>• every option offered<br>• the choice<br>• who decided, and when | written by you at each review stop | Decision 4 — Can two members have the same email? |
| Last changed | the date and number of the latest decision, near the top of the FRD | the Decision record | 2026-10-13, Decision 12 |
| Gates | a section inside the FRD, not the same as a review stop:<br>• what must be true before<br>• what it makes possible<br>• what undoes it | the catalog, columns "Depends on" and "Done when" | In: the "Done when" of Project workspace |
| The check | the checking program; Step 1 mode checks only what Step 1 fills, full mode checks everything | `scripts/check-frd.cjs` | `--step1` |
| Check record | the FRD's last section: the program's record of the latest passing check | pasted by you from the program | 37 of 37 structure checks passed |

## Invoke it with

| You give | Example |
|---|---|
| the **capability** — a name, a set of feature IDs, or a whole module to split | • `source management`<br>• `F-16–F-19`<br>• `the Setup module` |
| the **feature catalog** file | `Output/03-features/<name>-features.md` |
| the **requirements doc** file | `Output/mcp-requirements-v4.md` |
| **who decides** — a name or a role, for the Decision record | `Product owner` |

- Use only these inputs — never facts from chat or memory.
- If the capability or a file is missing, ask and stop. If who decides is missing, ask at the first review
  stop.

## Load first

- `references/conventions.md` — the rules. **Enforce them; don't restate them.**
- `references/frd-template.md` — the document's layout, and which step fills each part. **Fill it; don't
  re-describe it here.**
- `references/talking-to-the-person.md` — how you speak at every review stop. **Every message the person sees
  follows it.**
- `scripts/check-frd.cjs` — the check you run before every review stop and after every decision.

## How the template marks the steps

- A `<!-- Step 1 -->` or `<!-- Step 2 -->` marker covers everything below it, up to the next marker.
- Fill only the parts for the step you are on.
- Remove each marker, and every `<…>` placeholder, as you fill its part.

## Step 1 — Scope

- Create the FRD file from the template, named per the conventions.
- Fill only the parts marked Step 1. The Decision record and the Check record start as `None yet.`, and so
  does Last changed.
- Given a whole module, propose how it splits into capabilities:
  - one file per capability
  - which features group together, and why
  - propose it; don't impose it
- Flag any thin "Done when" (see the Done when section of the conventions) in your message.
- Run the check in Step 1 mode (add `--step1` to the command). It checks only the parts filled so far.
- **Review stop.** Follow `talking-to-the-person.md`. The person decides:
  - the features in each capability
  - how each "Done when" is split into clauses
  - the name, when a capability covers several features
- Record each decision as soon as it is made (rule 5 of `talking-to-the-person.md`). Once decided, all three
  are fixed.

## Step 2 — Draft

- Fill the parts marked Step 2.
- Everything except the rules is copying or derivation that the template and conventions already specify.
  **The rules are the work.** Per feature:
  1. Use the "Done when" clauses exactly as decided. Never change the split; if it proves wrong, stop and
     return to the Step 1 review stop.
  2. Write one `The system shall…` rule per behaviour, tagging its source:
     - from a "Done when" clause → `F-nn.dwN`
     - from the requirement's own text, beyond the "Done when" → `req`
     - a gap where the sources name the possible answers but not which applies → `proposed — Why: <the
       options, and why this one>`. Also list it under **From your decisions** in the Coverage section, and
       as a **Keep or drop?** question in Open questions.
     - any other gap → an Open question marked `TBD`, never a rule (the Never invent section of the
       conventions)
  3. Limits and must-nots are rules too (use **not** or **only**). A limit the source states — a count, a
     closed list of values, or "only" — is its own rule, separate from the allowing rule (the Rules section
     of the conventions).
  4. Fill **Proved by** in the Coverage table: every clause gets at least one rule.
- Fill the Standard questions section: for each thing in Data, each standard question is answered from the
  documents with its place, or becomes an Open question (the Standard questions section of the conventions).
- Every rule appears in the flow at least once.
- Run the check in full mode (no flag).
- **Review stop.** Follow `talking-to-the-person.md`: the program's block first, then each open question,
  one at a time, each recorded as soon as it is answered.

## Step 3 — Changes and acceptance

Follow the Changes and acceptance section of the conventions:
- Apply every decision:
  - a kept suggested rule becomes `decided — see Decision n`, with its note
  - a dropped suggested rule is deleted from the Rules table and the From your decisions list
  - each rule an answer adds or changes is `decided — see Decision n`, with its note
  - each open question stays, with ` Decided — see Decision n.` added at its end
- Rebuild the Actors, Gates, Flow and Data from the final rules, with notes where they changed.
- Update the Standard questions answers to name the decisions and rules.
- Never decide a suggested rule or an open question yourself.
- Run the check in full mode. Show the person the program's block — it lists everything that changed.
- Ask about each tension between decisions, one at a time.
- Ask **Accept these changes into the document?** If the answer is **Change something first**, make the
  change, run the check, and show the review again.
- After **Accept**, run the check once more and paste the program's closing block. Never write a status.

## The check — before the person sees anything

```
node <this skill's folder>/scripts/check-frd.cjs <FRD file> <feature catalog> <requirements doc> [--step1]
```

- Give all three files as full paths. It needs Node.
- Two modes:
  - **Step 1 mode** — add `--step1`. Use it during Step 1. It checks only the parts Step 1 fills, because
    the rest is not written yet.
  - **Full mode** — no flag. Use it during Steps 2 and 3. It checks the whole document.
- On any FAIL, fix the document by following `conventions.md`, then run it again.
- **Never show the person anything while a check fails.** The script only reports; it never edits.
- When every check passes, the program prints three blocks — "For the person", "One line" and "For the
  file". Use them exactly as rule 1 of `talking-to-the-person.md` says.
- Then read the document yourself for the things the script cannot check — it lists them at the end.

## Output

- The file `FRD-<module><capability letter>-<name in lowercase, with hyphens>.md`, alongside the other FRDs:
  - `frd_experiment/` now
  - `Output/03-features/frd/` once the skill is wired into the pipeline
- The file holds the FRD only — no notes to the person, and no status.
- Everything said to the person goes in the message, in the layouts of `talking-to-the-person.md`.
