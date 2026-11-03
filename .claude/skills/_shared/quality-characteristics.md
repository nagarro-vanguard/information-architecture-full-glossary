# QUALITY CHARACTERISTICS — the unit-level quality bar (shared)

**Load this alongside `system-prompt.md` whenever a layer produces discrete units** — a
`BR-xx`, an `FR-xx`, a feature, a story, an acceptance-criterion. The G-rules in
`system-prompt.md` govern *sourcing and format*; this file governs *whether each unit is
well-formed*. Skills and rubrics **reference these by code (Q1–Q10); they do not restate
them** — this file is the single source of truth.

Each characteristic has a **deterministic test**: a mechanical check with a yes/no answer,
so two graders reach the same verdict. Where a G-rule already enforces part of a
characteristic, the test points to it instead of repeating it.

---

## The ten characteristics

| Code | Characteristic | What it means (one line) | Deterministic test — fails when… |
|------|----------------|--------------------------|----------------------------------|
| **Q1** | **Atomic** | One unit = one capability, understandable on its own. | The name or description joins two capabilities with `and` / `/` / `,` / `plus`, **or** covers two distinct verb+object pairs that could ship separately. |
| **Q2** | **Complete** | Carries enough for the next stage to act without reopening the source. | A required field is blank, **or** the description names the capability but not the value/outcome it delivers. |
| **Q3** | **Concise** | No field restates another; no filler. | Two fields on the same unit carry the same information — e.g. a completion field that only rewords the description (see the ⊆ test in each layer's field contract). |
| **Q4** | **Unambiguous** | Exactly one reading. | An unbounded vague term is used with no limit — `etc.`, `and so on`, `as appropriate`, `as needed`, `flexible`, `various`, `robust` — **or** "is this unit met?" cannot be answered yes/no from its own text. |
| **Q5** | **Verifiable** | States an observable signal that it is fulfilled. | The completion signal describes an intention ("supports", "allows", "handles") rather than an outcome an outside observer could confirm. |
| **Q6** | **Consistent** | Does not conflict with or duplicate a sibling or the source. | Two units claim the same capability, **or** a unit contradicts another unit or its source. |
| **Q7** | **Understandable** | Business language, in the audience's terms. | Enforced by **G.3** (prohibited implementation terms) — fail on any G.3 term; nouns should come from the source's own domain vocabulary. |
| **Q8** | **Prioritized** | Carries an explicit rank. | No MoSCoW value (Must / Should / Could / Won't) is present on the unit. |
| **Q9** | **Feasible & sourced** | Grounded in a source; nothing invented. | Enforced by **G.1 / G.2** — a specific with no source token that is not marked `TBD` / `Proposed (needs confirmation)` fails. |
| **Q10** | **Legible** | One unit = one idea, stated so it reads on the first pass. | The statement stacks **two or more nested relative clauses** (a chain such as *…that…which…it…from*), **or** buries detail in an **em-dash or parenthetical aside** or a `by …-ing` mechanism clause. A statement **longer than the layer's word-flag threshold** is an **advisory flag, not a fail** — there is no authoritative maximum length, so length alone never fails a unit. |

---

## How layers use this

- A **skill** names the codes its output must satisfy and defines the *layer-specific
  field contract* that makes Q3/Q5 concrete (e.g. Description vs. Done-when for features).
  It does not copy the table above.
- A **rubric** maps its checks to these codes so the eval and the skill grade against the
  **same bar**. A rubric may test a subset (shape vs. soundness), but never a *different*
  definition.
- **Q7 and Q9 are delegated to the G-rules** — do not re-litigate them here; a single
  finding under G.3 or G.1/G.2 covers them.
- **Q10's length flag is advisory and per-layer** — the numeric word threshold that
  *triggers* the flag is set in each layer's field contract (the same way Q3/Q5 are made
  concrete per layer), not fixed here. Only the structural tests — nested relative clauses,
  dashed/parenthetical asides, `by …-ing` mechanism clauses — are universal and can fail a unit.
