// Tests the conformance checker: clean pack conforms; an orphan file and a dangling link
// each make it fail AND name the offending id/path.  Run: node conformance-check.test.mjs
import { checkPack } from './conformance-check.mjs';
import { cpSync, writeFileSync, readFileSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const fixture = join(here, '../_plans/fixtures/mini-spec');
let pass = 0, fail = 0;
const ok = (m) => { pass++; console.log(`  PASS  ${m}`); };
const no = (m) => { fail++; console.log(`  FAIL  ${m}`); };
const findings = (r) => r.checks.filter((c) => !c.ok).map((c) => c.msg);

// A) clean fixture conforms
{
  const r = checkPack(fixture);
  r.failed === 0 ? ok('clean pack conforms (0 failures)') : no(`clean pack should conform, got: ${findings(r).join(' | ')}`);
}

// B) orphan file (on disk, no manifest row) is caught and named
{
  const dir = mkdtempSync(join(tmpdir(), 'conf-orphan-'));
  cpSync(fixture, dir, { recursive: true });
  writeFileSync(join(dir, '03-features', 'stray-note.md'), '# not in the manifest\n');
  const r = checkPack(dir);
  const hit = findings(r).some((f) => /orphan/i.test(f) && f.includes('stray-note.md'));
  hit ? ok('orphan file caught and named (stray-note.md)') : no(`orphan not caught. findings: ${findings(r).join(' | ')}`);
}

// C) dangling link (tracesTo an id that doesn't exist) is caught and named
{
  const dir = mkdtempSync(join(tmpdir(), 'conf-dangle-'));
  cpSync(fixture, dir, { recursive: true });
  const mf = join(dir, 'manifest.json');
  const m = JSON.parse(readFileSync(mf, 'utf8'));
  m.artifacts.find((a) => a.id === 'STORY-001').tracesTo.push('FR-999');
  writeFileSync(mf, JSON.stringify(m, null, 2));
  const r = checkPack(dir);
  const hit = findings(r).some((f) => /dangling/i.test(f) && f.includes('FR-999'));
  hit ? ok('dangling link caught and named (FR-999)') : no(`dangling not caught. findings: ${findings(r).join(' | ')}`);
}

console.log(`\n${fail === 0 ? 'ALL PASS' : 'FAILURES'} — ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
