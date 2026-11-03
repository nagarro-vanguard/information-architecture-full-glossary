'use strict';
// build-workflows-page.cjs — writes specifier-workflows.html: the forward flow at a glance, one swimlane per
// workflow, who reads what, and the documents table.
//
// Usage: node build-workflows-page.cjs
//   Reuses the look and the drawing code of the last published page, specifier-v3-workflows-2026-10-22.html,
//   and gives it new content: page-data.js, next to this file.
// Reads the kit only. It never writes inside it.

const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const OLD = path.join(HERE, '..', 'specifier_v3', 'old-vs-new-workflows', 'specifier-v3-workflows-2026-10-22.html');
const OUT = path.join(HERE, 'specifier-workflows.html');
const old = fs.readFileSync(OLD, 'utf8').split('\n');

// The pieces kept from the old page, found by their first and last lines, so a wrong slice fails loudly.
function slice(startRe, endRe) {
  const a = old.findIndex((l) => startRe.test(l));
  const b = old.findIndex((l, i) => i >= a && endRe.test(l));
  if (a < 0 || b < 0) throw new Error(`can't find ${startRe} .. ${endRe} in the old page`);
  return old.slice(a, b + 1).join('\n');
}
const head = slice(/^<title>/, /^<\/style>/).replace(/<title>[^<]*<\/title>/, '<title>Specifier v3 Workflows</title>');
const legend = slice(/<div class="legend" aria-label="Legend">/, /^  <\/div>$/);
// el, wrap, lanes, path, label, render: everything from the first helper up to the old page's own data
const drawing = slice(/^var NS = /, /^var QL = /).split('\n').slice(0, -1).join('\n');
if (!/^function render\(id, rows\)\{$/m.test(drawing)) throw new Error('the drawing code has no render()');
// esc, has, listHTML, stepsHTML, the matrix and documents table. The old "How it changes" column goes: the change
// workflow is being redesigned.
let tables = slice(/^function esc\(t\)/, /^\}\)\(\);$/);
const before = tables;
tables = tables.replace(' +\n      "<td>" + esc(d.changes) + "</td></tr>";', ' + "</tr>";').replace('<th>How it changes</th>', '');
if (tables === before || tables.includes('How it changes') || tables.includes('d.changes')) throw new Error('could not take out the "How it changes" column');

// The documents table comes from the same facts as the book, so the two can't disagree. Each document a step
// in page-data.js names gets a row; the rest are in the book only.
const ID = {
  'Sources': 'SRC', 'Discovery brief': 'DB', 'BRD': 'BRD', 'PRD': 'PRD', 'Question log': 'QL', 'Glossary': 'GL',
  'Glossary gate log': 'GLOG', 'Glossary decision register': 'GREC', 'Things file': 'TH', 'Data model file': 'DMF',
  'Data model decisions file': 'DMD', 'Feature catalog': 'FC', 'EPIC grouping': 'CL', 'EPIC register': 'REG',
  'EPIC sequencing': 'SEQ', 'EPIC mapping': 'MAP', 'FRD': 'FRD', 'EPIC brief': 'ED', 'Story list': 'SL', 'Story': 'ST',
  'Version log': 'VL', 'Traceability map': 'TM',
};
const docsFacts = JSON.parse(fs.readFileSync(path.join(HERE, 'facts', 'ideas-documents.json'), 'utf8')).documents;
const stepsText = fs.readFileSync(path.join(HERE, 'page-data.js'), 'utf8');
const used = new Set([...stepsText.matchAll(/"([A-Z]{2,4})"/g)].map((m) => m[1]));
const DOCS = [];
for (const [name, id] of Object.entries(ID)) {
  const d = docsFacts.find((x) => x.document === name);
  if (!d) throw new Error(`no document "${name}" in the facts`);
  if (!used.has(id)) continue;
  DOCS.push({ id, name: name === 'Story' ? 'Stories' : name, path: [d.where], kind: d.kind, contains: d.whatItHolds });
}
for (const id of used) if (!Object.values(ID).includes(id)) throw new Error(`a step names ${id}, which is no document`);
const data = stepsText.replace('/*DOCS*/', 'var DOCS = ' + JSON.stringify(DOCS, null, 1) + ';');
const body = fs.readFileSync(path.join(HERE, 'page-body.html'), 'utf8');

const html = [head, body.replace('{{LEGEND}}', legend), '<script>', '(function(){', '"use strict";', drawing, data, tables.replace(/\}\)\(\);$/, '})();'), '})();', '</script>', ''].join('\n');

// No "v3" or build history in what the page says, past its title. No section sign.
const problems = [];
if (html.includes('§')) problems.push('the page holds the section sign');
for (const w of ['MASTER-PLAN', 'today, and no longer']) if (body.includes(w) || data.includes(w)) problems.push(`the page still says "${w}"`);

fs.writeFileSync(OUT, html);
console.log(`wrote ${path.basename(OUT)}: ${Math.round(html.length / 1024)} KB`);
if (problems.length) { for (const p of problems) console.log('  ' + p); process.exitCode = 1; }
