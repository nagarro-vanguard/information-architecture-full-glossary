// Step-1 manifest validator — pure Node, no LLM. Run: node validate-manifest.mjs
// Proves the manifest contract: well-formed rows, files exist, story lookup, resume-skip, KPI.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, 'mini-spec');
const REQUIRED = ['id', 'type', 'stage', 'path', 'provenance', 'eval', 'defines', 'tracesTo'];
const DONE = new Set(['PASS', 'PASS_WITH_FINDINGS']); // skipped on resume
let pass = 0, fail = 0;
const ok = (m) => { pass++; console.log(`  PASS  ${m}`); };
const no = (m) => { fail++; console.log(`  FAIL  ${m}`); };

// 0. well-formed JSON
let m;
try { m = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8')); ok('manifest.json parses'); }
catch (e) { no(`manifest.json parses (${e.message})`); process.exit(1); }

// 1. required fields per row (+ story sub-states)
for (const a of m.artifacts) {
  const missing = REQUIRED.filter((k) => !(k in a));
  if (missing.length) no(`row ${a.id || '?'} missing: ${missing.join(', ')}`);
  else ok(`row ${a.id} has all required fields`);
  if (a.type === 'story' && !a.subStates) no(`story ${a.id} missing subStates (shell/body/ac)`);
}

// 2. every path exists on disk
for (const a of m.artifacts) {
  existsSync(join(root, a.path)) ? ok(`file exists: ${a.path}`) : no(`file MISSING: ${a.path}`);
}

// 3. story lookup by id
const lookup = (id) => m.artifacts.find((a) => a.id === id);
const s = lookup('STORY-001');
s && s.path.endsWith('STORY-001-toggle-dark-mode.md')
  ? ok(`lookup STORY-001 -> ${s.path}`)
  : no('lookup STORY-001 did not resolve to its file');

// 4. resume partition (skip done, run the rest) — on the fixture (all done)...
const partition = (arts) => ({
  skip: arts.filter((a) => DONE.has(a.eval.status)).map((a) => a.id),
  run: arts.filter((a) => !DONE.has(a.eval.status)).map((a) => a.id),
});
const p1 = partition(m.artifacts);
p1.run.length === 0
  ? ok(`resume (healthy run): skip all ${p1.skip.length}, run 0`)
  : no(`resume: expected to skip all, but would run ${p1.run.join(', ')}`);

// ...and on a mutated copy where STORY-002 FAILED — must be the only one re-run.
const mutated = JSON.parse(JSON.stringify(m.artifacts));
mutated.find((a) => a.id === 'STORY-002').eval.status = 'FAIL';
const p2 = partition(mutated);
p2.run.length === 1 && p2.run[0] === 'STORY-002'
  ? ok('resume (STORY-002 FAILED): re-runs only STORY-002, skips the 5 done')
  : no(`resume mutated: expected [STORY-002], got [${p2.run.join(', ')}]`);

// 5. KPI recompute + header consistency
const passed = m.artifacts.filter((a) => DONE.has(a.eval.status)).length;
const rate = passed / m.artifacts.length;
const hdr = m.run.kpi;
hdr.artifacts === m.artifacts.length && hdr.passed === passed && Math.abs(hdr.evalPassRate - rate) < 1e-9
  ? ok(`KPI header matches computed (${passed}/${m.artifacts.length} = ${rate.toFixed(2)})`)
  : no(`KPI header mismatch: header ${JSON.stringify(hdr)} vs computed ${passed}/${m.artifacts.length}`);
const ready = rate >= 0.95;
(ready && m.run.status === 'ok') || (!ready && m.run.status === 'blocked-human-needed')
  ? ok(`readiness consistent: rate ${rate.toFixed(2)} -> status "${m.run.status}"`)
  : no(`readiness inconsistent: rate ${rate.toFixed(2)} but status "${m.run.status}"`);

console.log(`\n${fail === 0 ? 'ALL PASS' : 'FAILURES'} — ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
