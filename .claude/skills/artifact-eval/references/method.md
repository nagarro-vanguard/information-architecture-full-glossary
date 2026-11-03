# The method — how a master specialist writes an eval

An eval is a **measurement instrument**, not a checklist. You are manufacturing the ground
truth that a machine (the same class of model that wrote the artifact, with no oracle of its
own) will be graded against. Everything below serves one goal: **a stranger who never saw the
artifact can trust the PASS** — because your rubric, not anyone's judgment, did the work.

## Whose checks these are

Write from the seat of someone who has shipped hundreds of this artifact and carries the scars.
That changes what you check:

- **Failure modes, not features.** A novice lists what should be *present* (has sections). That
  measures completeness — the cheapest thing to fake; an artifact with every section and all of
  them wrong sails through. Instead ask *"what does a bad one look like, and how would I catch it
  red-handed?"* Each answer is a check.
- **The vacuous-pass check.** The expert's tell: a check that the artifact can pass *every other
  check and still be wrong*. (For AC: all criteria testable, categorized, green — yet none tests
  the rule that matters.) Novices never write it.
- **Few and lethal.** The 6 checks that catch 95% of real defects beat 20 shallow ones. Ruthless
  prioritisation is the expertise.
- **Severity by downstream cost**, not template centrality. A missing negative-path case ships
  more bugs than a mis-categorised one, so it outranks it — regardless of which *feels* core.

## The north-star question

Every artifact type has one. It's the question the master asks before signing their name, in the
form *"could this pass every check and still be wrong?"* The whole rubric is the enumeration of
**what would make the answer "no."** Write this first; derive checks from it.

## The three passes (grade cheapest first)

1. **Shape** — is it well-formed? Binary, intrinsic (needs only the artifact). Failures are
   **Minor** (drift). No "unsure" here — so the adversarial fail-if-unsure heuristic does **not**
   apply to shape checks.
2. **Soundness** — is each part individually a real, unambiguous unit? Intrinsic but a judgment
   call — this is where adversarial "quote it or pass it" earns its keep. The core failure here
   is usually a **Blocker**.
3. **Coverage** — does the *set* match its source: every in-scope item covered (completeness),
   nothing out-of-scope asserted (containment)? Needs an **oracle**. Both directions are usually
   **Blockers** (a gap ships untested behaviour; an orphan is invented scope).

## Five decisions per check (drop the check if you can't answer all five)

1. **Plane** — shape / soundness / coverage. Never bundle two planes in one check (that's what
   makes results nondeterministic and mis-severitied).
2. **Oracle** — compared against what, and can the caller supply it? Self-evident (shape),
   same-file (a story's own body rules — still *intrinsic to the file*), or an upstream doc
   (truly relational). **A check with no reachable oracle is unwriteable** — the model invents.
3. **Firing rule + anchor** — the exact trigger and *what verbatim string gets quoted*. If you
   can't name the quote ("fire on vague verbs — 'works', 'is fast'"), the check is too soft.
   Un-anchored findings are dropped.
4. **Severity** — pre-assigned by rule class so two runs agree. `B` structural/traceability/
   invented-fact with a definite test · `M` required content missing or unfit · `m` style/order.
5. **Stance** — adversarial on soundness/coverage; binary on shape.

## Intrinsic vs relational — and the same-file trick

Split the rubric so **intrinsic** checks (always runnable) sit above **oracle-dependent** ones.
A key move: because of a one-evolving-file artifact (e.g. a story = shell + body + AC in one
file), a coverage check like "every body rule has ≥1 AC" is checkable **within the single file** —
it is *intrinsic-to-the-file*, not a cross-file relational gate. The only requirement is that the
runner is told its **input is the whole file** and the body is the **oracle**. Genuinely
cross-*file* checks (does `BR-07` exist in the BRD?) and cross-*sibling* checks (are all story
titles unique across the batch?) do **not** belong in a per-artifact eval — they are a set-level
gate that runs after any fan-out joins.

## Runtime shape (the eval runs at formation, in parallel)

The eval is invoked the moment an artifact is born, often by an agent fanning out (N stories at
once). So it must be a **pure, stateless, sibling-blind function**: `(artifact, oracle) →
(verdict, findings)`. It **declares its input contract**; if the oracle isn't supplied it marks
those checks `not-evaluable` and raises an open question rather than blocking the batch or
guessing. Its verdict is **machine-branchable** (`PASS | PASS_WITH_FINDINGS | FAIL` + findings),
so a workflow can branch and a manifest can record it. Cost scales with stakes: cheap types
single-pass, high-stakes types get a 2–3 auditor panel with majority vote.

## A finding is a routed repair order

On FAIL, each finding must let the next remediation loop actually recover:

- **fix** = a concrete edit traced to the oracle ("Replace 'system works' with 'the refund is
  credited within 24h (per BR-07)'") — not "make it testable".
- **fixOwner** = `agent` (an edit from existing sources — feeds the ≤3-loop auto-fix) or `human`
  (closing it would require **inventing a fact** no source provides — G.1). **The anti-fabrication
  rule:** a needs-human finding never enters the auto-loop, or the loop will fabricate a number to
  green its own eval. Agent-fixable findings feed the loop; human-owned findings short-circuit to
  the handoff report.

## The two properties you're buying

- **Reproducibility** — same input, same verdict. Bought by objective anchors + pre-set severity.
  If two runs can disagree, you have a soft check or grader-assigned severity somewhere.
- **Defensibility** — a human reads the rubric and agrees it's the right bar *without trusting the
  model at all*. Bought because the rubric is human-authored and versioned.

## The tell (self-check before you ship the eval)

> Hand the rubric to someone who has never seen the artifact. Would they reach the same verdict
> you would? If not, the soft checks need sharper anchors — or they're not checks yet.

## Compression

> A master's eval is a **pure, sibling-blind function run when an artifact is born**: few lethal
> checks derived from a north-star "would this pass yet still be wrong?", each anchored to a
> quotable failure and a pre-set severity, oracle-dependent checks that degrade rather than
> block — and every finding is a **routed repair order** so the auto-loop fixes what it can and
> can never fabricate to pass itself.
