// Tests the coverage gate: clean pack is fully traced; an FR covered by no feature and a feature
// placed in two EPICs are each caught AND named.  Run: node coverage-gate.test.mjs
import { checkCoverage } from './coverage-gate.mjs';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const fixture = join(here, '../_plans/fixtures/mini-spec');
const base = JSON.parse(readFileSync(join(fixture, 'manifest.json'), 'utf8'));
let pass = 0, fail = 0;
const ok = (m) => { pass++; console.log(`  PASS  ${m}`); };
const no = (m) => { fail++; console.log(`  FAIL  ${m}`); };
const findings = (r) => r.checks.filter((c) => !c.ok).map((c) => c.msg);
const writeTmp = (m) => { const d = mkdtempSync(join(tmpdir(), 'cov-')); writeFileSync(join(d, 'manifest.json'), JSON.stringify(m, null, 2)); return d; };
const clone = () => JSON.parse(JSON.stringify(base));

// A) clean pack is fully traced
{
  const r = checkCoverage(fixture);
  r.failed === 0 ? ok('clean pack fully traced (0 gaps)') : no(`clean should pass, got: ${findings(r).join(' | ')}`);
}

// B) an FR covered by no feature is caught + named
{
  const m = clone();
  m.artifacts.find((a) => a.id === 'PRD').defines.push('FR-07'); // no feature covers FR-07
  const r = checkCoverage(writeTmp(m));
  findings(r).some((f) => f.includes('FR-07')) ? ok('uncovered FR named (FR-07)') : no(`FR-07 not flagged: ${findings(r).join(' | ')}`);
}

// C) a feature placed in two EPICs is caught + named
{
  const m = clone();
  m.artifacts.push({ id: 'EPIC-002', type: 'epic', stage: '05-epics', path: '05-epics/EPIC-002.md', provenance: 'generated', eval: { status: 'PASS', loops: 0, findings: null }, defines: ['EPIC-002'], tracesTo: ['FEAT-01'] });
  const r = checkCoverage(writeTmp(m));
  findings(r).some((f) => f.includes('FEAT-01') && /placed in 2/.test(f)) ? ok('duplicate feature flagged (FEAT-01 in 2 EPICs)') : no(`dup not flagged: ${findings(r).join(' | ')}`);
}

console.log(`\n${fail === 0 ? 'ALL PASS' : 'FAILURES'} — ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
