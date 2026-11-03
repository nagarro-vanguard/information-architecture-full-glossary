export const meta = {
  name: 'version-log',
  description: 'version-log — the audit-trail recorder. Snapshots the current Output artifacts into a versioned history entry (path · version stamp · short diff vs the previous version), so a later change-request (blast-radius) can diff what changed. Non-gated. Can also be wired as a save-hook so recording is automatic.',
  phases: [
    { title: 'Record' },
  ],
}

// args: {
//   stamp: string,                                  // caller-supplied version stamp (the script runtime has no clock)
//   artifacts: [{ path: string, text: string }],    // current artifacts to snapshot
//   previous?: [{ path: string, text: string }]     // prior versions, for the diff summary (optional)
// }
const stamp = (args && args.stamp) ? args.stamp : 'unstamped'
const artifacts = (args && Array.isArray(args.artifacts)) ? args.artifacts : []
const previous = (args && Array.isArray(args.previous)) ? args.previous : []

phase('Record')
if (artifacts.length === 0) {
  log('version-log: no artifacts to record. Pass args.artifacts (and args.stamp).')
  return { entry: null, note: 'Nothing to record.' }
}
log(`version-log: recording version "${stamp}" for ${artifacts.length} artifacts.`)

const prevByPath = {}
for (const p of previous) prevByPath[p.path] = p.text

const entry = await agent(
  `Write a versioned audit-trail entry under Output/audit-trail/${stamp}/. For each artifact, record its path, the version stamp "${stamp}", ` +
  `and a short diff summary vs its previous version if one is provided (added / removed / changed IDs and rules — no full re-paste). ` +
  `Return the trail entry (a table: path | stamp | change summary).\n\n` +
  `CURRENT ARTIFACTS:\n${artifacts.map(a => `--- ${a.path} ---\n${a.text}`).join('\n\n')}\n\n` +
  `PREVIOUS VERSIONS PROVIDED FOR: ${previous.map(p => p.path).join(', ') || '(none)'}`,
  { label: 'version-log-record' })

return { stamp, entry }
