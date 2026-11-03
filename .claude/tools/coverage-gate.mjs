// Coverage / traceability gate — deterministic, pure Node (needs fs; not a Workflow).
// Set-level check the per-artifact auditor CAN'T see: does every id flow down the spine,
// and is nothing orphaned or double-placed? Reads the manifest's defines/tracesTo.
// CLI:  node coverage-gate.mjs [packDir]
// API:  import { checkCoverage } from './coverage-gate.mjs'
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const byType = (rows, t) => rows.filter((r) => r.type === t);
const prefixed = (ids, pfx) => ids.filter((id) => id.startsWith(pfx));

export function checkCoverage(root) {
  const checks = [];
  const ok = (m) => checks.push({ ok: true, msg: m });
  const no = (m) => checks.push({ ok: false, msg: m });

  let m;
  try { m = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8')); }
  catch (e) { no(`manifest parse: ${e.message}`); return { checks, failed: 1 }; }
  const rows = m.artifacts || [];

  // one boundary: every id DEFINED at the upper layer must be COVERED (referenced in a tracesTo)
  // by the lower layer — optionally exactly once (exclusive placement).
  const boundary = (label, definedTypes, pfx, coverTypes, exclusive = false) => {
    const defRows = definedTypes.flatMap((t) => byType(rows, t));
    const defined = [...new Set(prefixed(defRows.flatMap((r) => r.defines || []), pfx))];
    const covered = [];
    for (const t of coverTypes) for (const r of byType(rows, t)) for (const id of (r.tracesTo || [])) {
      if (id.startsWith(pfx)) covered.push(id);
    }
    const coveredSet = new Set(covered);
    let clean = true;
    for (const id of defined) if (!coveredSet.has(id)) { no(`${label}: "${id}" is covered by nothing downstream`); clean = false; }
    if (exclusive) {
      const count = {};
      covered.forEach((id) => { count[id] = (count[id] || 0) + 1; });
      for (const [id, c] of Object.entries(count)) if (c > 1 && defined.includes(id)) { no(`${label}: "${id}" placed in ${c} (must be exactly one)`); clean = false; }
    }
    if (clean) ok(`${label}: all ${defined.length} covered${exclusive ? ' exactly once' : ''}`);
  };

  boundary('BR→FR', ['brd'], 'BR-', ['prd']);
  boundary('FR→Feature', ['prd'], 'FR-', ['features']);
  boundary('Feature→EPIC', ['features'], 'FEAT-', ['epic'], true);
  boundary('Feature→Story', ['features'], 'FEAT-', ['story']);

  return { checks, failed: checks.filter((c) => !c.ok).length };
}

// ---- CLI ----
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const here = dirname(fileURLToPath(import.meta.url));
  const root = process.argv[2] || join(here, '../_plans/fixtures/mini-spec');
  const { checks, failed } = checkCoverage(root);
  for (const c of checks) console.log(`  ${c.ok ? 'PASS' : 'FAIL'}  ${c.msg}`);
  console.log(`\n${failed === 0 ? 'FULLY TRACED' : 'COVERAGE GAPS'} — ${checks.length - failed} passed, ${failed} failed`);
  process.exit(failed === 0 ? 0 : 1);
}
