export const meta = {
  name: 'blast-radius',
  description: 'blast-radius — change-request determination. Given a requirement change and the artifacts the traceability map links to it, fan out the change-impact judgement across the whole blast radius in parallel and return the Change Impact Report (update / new / no-change per item). Determination only — applying the changes stays gated via the specifier.',
  phases: [
    { title: 'Locate' },
    { title: 'Determine' },
  ],
}

// args: {
//   change: string,                       // the before/after of the changed BR/FR
//   affected: [{ id: string, text: string }]   // artifacts the traceability map links to the change
// }
// Where the skill package lives, relative to the run's working directory. If you install this
// package somewhere other than `.claude/`, change this ONE line.
const SKILLS = '.claude/skills'

const change = (args && args.change) ? args.change : ''
const affected = (args && Array.isArray(args.affected)) ? args.affected : []

phase('Locate')
if (!change || affected.length === 0) {
  log('blast-radius: need the change text and the linked artifacts (from the traceability map). Nothing to assess.')
  return { report: [], note: 'No change or no affected artifacts supplied.' }
}
log(`blast-radius: assessing ${affected.length} artifacts against the change.`)

phase('Determine')
const verdicts = await parallel(affected.map((a) => () =>
  agent(
    `Follow the change-impact skill (${SKILLS}/change-impact/SKILL.md). Assess ONE artifact against the change and return its verdict block ` +
    `(Affected? · Impact class None/Cosmetic/Substantive/Breaking · Recommendation No-change/Update/New story · Specific edits · Ripple · Confidence).\n\n` +
    `CHANGE:\n${change}\n\nARTIFACT ${a.id}:\n${a.text}`,
    { label: `impact:${a.id}` })
))

const report = verdicts.filter(Boolean)
log(`blast-radius: ${report.length} verdicts produced. Review, then apply the accepted ones via the gated specifier.`)
return { change, report }
