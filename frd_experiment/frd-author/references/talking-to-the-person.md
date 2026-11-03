# Talking to the person — how the skill speaks at every review stop

The FRD document uses codes (feature numbers, rule numbers, clause numbers) so later work can point at
exact rules. **The person never has to read those codes to make a decision.** Every message they see
follows the rules and layouts below.

## The rules

### 1. Facts come from the program, never from you

When every check passes, the checking program prints three blocks. Paste each one as it is. Never:
- retype it
- shorten it
- reword it
- add a fact to it

The three blocks:

- **"For the person"** — the facts for the first message at a review stop, each with the place it came from.
  The program picks what to show from where the document stands:
  - **Step 1:** what is set up, and the "done" conditions
  - **Step 2:** the rules, the standard questions, and the open questions still to ask
  - **Step 3, before acceptance:** everything your decisions changed, and where the document now differs
    from the requirements doc. It covers:
    - the rules
    - the Actors
    - the Gates
    - the Flow
    - the Data
  - **After acceptance:** each question with its answer, and the list for the requirements owner
- **"One line"** — the check result, for a follow-up decision at the same review stop.
- **"For the file"** — the check record. At a review stop, paste it into the document, replacing
  everything under `## Check record`.

You write only the decisions — see rules 3 and 4.

### 2. Names, not codes

When you refer to something in your own words — in a decision — use these:

| Thing | Call it | Where it comes from | Example |
|---|---|---|---|
| A feature | its name, exactly | feature catalog, column "Feature" | Team & roles |
| A requirement | its title, in quotes | requirements doc, column "Requirement" | "Name the team and their roles" |
| A module | its section title | feature catalog, the section heading | 3. Setup |
| A "done" condition | its own words, in quotes | the FRD's Coverage table | "can be set active or inactive" |
| A rule | its words, without its number | the FRD's Rules table | let a member be set active or inactive |

- A code, for example F-15, appears only in brackets after the name, and only when the person will need
  it later.
- Never use the skill's working words as if the person knows them. Say the plain meaning instead:

| Instead of | Say |
|---|---|
| clause or dw1 | one of the conditions in its "done when" line |
| `req` | taken from the requirement's own text |
| `proposed` | a rule I'm suggesting — your documents don't decide it |
| `decided` | a rule that comes from your decision |
| Excludes | what this part leaves out |
| Depends on | what has to exist before this part |
| Gate In | what must be true before this part starts |
| Gate Out | what this part makes possible |
| review stop | this point, where I need your decision |
| Step 1 mode or full mode | the automatic check against your documents |
| TBD | not decided yet |

### 3. One decision at a time, with as little to read as possible

- **The first message at a review stop** is the program's "For the person" block, then Decision 1 of that stop.
- **Every later decision at the same stop** is only the program's "One line" and the decision — never the
  block again.
- Number the decisions as the Decision record numbers them ("Decision 4 of 10"), so the number the person
  sees is the number recorded.

### 4. Every decision has the same shape

- **The situation** — one or two plain sentences: what the documents say, and what they leave open.
- **The options** — for each:
  - what it is
  - why you'd pick it
  - what happens next if you do
- **Your recommendation**, and why.
- **What becomes fixed** once they answer.

For a "Two readings" question, the options are the two readings.

### 5. Record every decision straight away

As soon as the person answers:
- add the entry to the FRD's Decision record (see the Decision record section of the conventions)
- set `Last changed` to that decision's date and number
- run the check again, so the record is checked before the next decision
- if this ends a review stop, paste the program's "For the file" block into the Check record section

### 6. Step 3 — tensions, then acceptance

- Ask about each tension between decisions as its own decision: keep both, or revisit one.
- Then ask, in exactly these words: **Accept these changes into the document?**
  - **Accept** — why you'd pick it: everything your decisions touch now matches them. What happens next:
    the rule numbers are fixed from now on; a new rule takes the next number.
  - **Change something first** — why you'd pick it: if anything shown is wrong. What happens next: you
    tell me what, and I show you the review again.
- Never write "approved", "draft" or any other status — the document is a living one.

### 7. Close by saying what happens next

After acceptance, the program's block ends with the next step. Add nothing to it.

### 8. Lists go one item per line

Never joined with commas, `·` or slashes — the same rule as the document (the Output section of the
conventions).

## Layouts

Each layout below is shown the way the person sees it. Text in `<angle brackets>` is replaced.

### The first message at a review stop

> `<the program's "For the person" block, pasted as it is>`
>
> **Decision <n> of <N>: <the question, in plain words>**
>
> <the situation>
>
> - **<option>** — why you'd pick it: <…>. What happens next: <…>
> - **<option>** — why you'd pick it: <…>. What happens next: <…>
>
> I recommend **<option>**, because <…>. Once you answer, <what becomes fixed>.

### Every later decision at the same review stop

> `<the program's "One line", pasted as it is>`
>
> **Decision <n> of <N>: <the question, in plain words>**
>
> <the situation>
>
> - **<option>** — why you'd pick it: <…>. What happens next: <…>
> - **<option>** — why you'd pick it: <…>. What happens next: <…>
>
> I recommend **<option>**, because <…>. Once you answer, <what becomes fixed>.

### The close, after acceptance

> `<the program's "For the person" block, pasted as it is — it ends with the next step>`

## Worked example — the second decision at the Step 1 review stop for Team & roles

> Check re-run after Decision 1 was recorded: 19 of 19 structure checks passed, 15:13.
>
> **Decision 2 of 2: Is this the right way to split "done" into conditions?**
>
> The catalog's "done" line for Team & roles is one sentence: "Each member is named with an email and
> role(s) and can be set active or inactive, with bulk import". I split it into conditions using only its own
> words, in its own order. Every rule I write must cover at least one condition, and every condition must be
> covered.
>
> - **Three conditions, as shown** — why you'd pick it: each is one thing you could test on its own. What
>   happens next: I draft the rules against these three.
> - **Join the last two** — why you'd pick it: it avoids the short fragment "with bulk import". What
>   happens next: one condition covers two different behaviours, so it's harder to see whether each is
>   covered.
>
> I recommend **Three conditions, as shown**, because each can be checked separately. Once you answer, the
> split is fixed.
