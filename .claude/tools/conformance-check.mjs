// Conformance check — deterministic, pure Node (needs fs, so NOT a Workflow script).
// Verifies a produced pack matches the contract + manifest.
// CLI:  node conformance-check.mjs [packDir]   (defaults to the mini-spec fixture)
// API:  import { checkPack } from './conformance-check.mjs'
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REQUIRED = ['id', 'type', 'stage', 'path', 'provenance', 'eval', 'tracesTo'];
const DONE = new Set(['PASS', 'PASS_WITH_FINDINGS']);

function walkMd(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, d.name);
    if (d.isDirectory()) out.push(...walkMd(p));
    else if (d.name.endsWith('.md')) out.push(p);
  }
  return out;
}

export function checkPack(root) {
  const checks = [];
  const ok = (m) => checks.push({ ok: true, msg: m });
  const no = (m) => checks.push({ ok: false, msg: m });

  let m;
  try { m = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8')); ok('manifest.json parses'); }
  catch (e) { no(`manifest.json parses (${e.message})`); return { checks, failed: 1 }; }

  const rows = m.artifacts || [];
  const rowPaths = new Set(rows.map((r) => r.path));

  // 1. each row: required fields present + its file exists (no ghost rows)
  for (const r of rows) {
    const miss = REQUIRED.filter((k) => !(k in r));
    if (miss.length) no(`row ${r.id || '?'} missing field(s): ${miss.join(', ')}`);
    existsSync(join(root, r.path))
      ? ok(`row ${r.id}: file present`)
      : no(`row ${r.id}: MISSING file "${r.path}" (ghost row)`);
  }

  // 2. no orphan files — every .md under a NN-* stage folder must have a row
  for (const d of readdirSync(root, { withFileTypes: true })) {
    if (d.isDirectory() && /^\d\d-/.test(d.name)) {
      for (const f of walkMd(join(root, d.name))) {
        const rel = relative(root, f).split('\\').join('/');
        rowPaths.has(rel) ? null : no(`orphan file on disk (no manifest row): "${rel}"`);
      }
    }
  }

  // 3. no dangling links — every tracesTo id must resolve to a known id
  const known = new Set();
  rows.forEach((r) => { known.add(r.id); (r.defines || []).forEach((x) => known.add(x)); });
  for (const r of rows) for (const t of (r.tracesTo || [])) {
    known.has(t) ? null : no(`row ${r.id}: dangling tracesTo id "${t}" (resolves to nothing)`);
  }

  // 4. KPI + readiness consistency
  const passed = rows.filter((r) => DONE.has(r.eval?.status)).length;
  const rate = rows.length ? passed / rows.length : 0;
  if (m.run?.kpi) {
    (m.run.kpi.passed === passed && m.run.kpi.artifacts === rows.length)
      ? ok('KPI header consistent with rows')
      : no(`KPI header mismatch (computed ${passed}/${rows.length})`);
  }
  const want = rate >= 0.95 ? 'ok' : 'blocked-human-needed';
  m.run?.status === want
    ? ok(`run status "${m.run.status}" consistent with rate ${rate.toFixed(2)}`)
    : no(`run status "${m.run?.status}" but rate ${rate.toFixed(2)} implies "${want}"`);

  return { checks, failed: checks.filter((c) => !c.ok).length };
}

// ---- CLI ----
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const here = dirname(fileURLToPath(import.meta.url));
  const root = process.argv[2] || join(here, '../_plans/fixtures/mini-spec');
  const { checks, failed } = checkPack(root);
  for (const c of checks) console.log(`  ${c.ok ? 'PASS' : 'FAIL'}  ${c.msg}`);
  console.log(`\n${failed === 0 ? 'CONFORMS' : 'NON-CONFORMING'} — ${checks.length - failed} passed, ${failed} failed`);
  process.exit(failed === 0 ? 0 : 1);
}
