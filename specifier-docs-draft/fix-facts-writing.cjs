'use strict';
// fix-facts-writing.cjs — one pass over facts/*.json for two simple-writing rules the agents' text broke:
//   a semicolon joins two ideas: "a; b" becomes "a. B"
//   a side note in brackets: "a (b)" at the end becomes "a: b", and in the middle becomes "a, b,"
// Text inside backticks or double quotes is left alone. Prints each change.
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'facts');

function fixPlain(s) {
  s = s.replace(/; (\S)/g, (m, c) => '. ' + c.toUpperCase());
  s = s.replace(/ \(([^()]+)\)$/g, ': $1');
  s = s.replace(/ \(([^()]+)\)([.,]?) /g, (m, inner, p) => `, ${inner}${p || ','} `);
  s = s.replace(/ \(([^()]+)\)\./g, ', $1.');
  return s;
}
function fix(s) {
  // split into protected spans (backticks, double quotes) and plain text
  return s.split(/(`[^`]*`|"[^"]*")/).map((part, k) => (k % 2 ? part : fixPlain(part))).join('');
}
let n = 0;
function walk(v, key) {
  if (typeof v === 'string') {
    if (key === 'note' || key === 'evidence' || key === 'path' || key === 'name' || key === 'term') return v;
    const f = fix(v);
    if (f !== v) { n++; console.log(`- ${v}\n+ ${f}`); }
    return f;
  }
  if (Array.isArray(v)) return v.map((x) => walk(x, key));
  if (v && typeof v === 'object') { for (const k of Object.keys(v)) v[k] = walk(v[k], k); return v; }
  return v;
}
for (const f of fs.readdirSync(DIR).filter((f) => f.endsWith('.json'))) {
  const p = path.join(DIR, f);
  const j = walk(JSON.parse(fs.readFileSync(p, 'utf8')));
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
}
console.log(`${n} strings changed`);
