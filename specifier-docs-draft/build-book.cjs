'use strict';
// build-book.cjs — writes book-of-knowledge.md from the facts in facts/, and checks that every item in the kit is in it.
//
// Usage: node build-book.cjs
//   Reads  every file in facts/: the facts gathered from the kit, the change skills, and the shorter flow lists
//   Writes book-of-knowledge.md, next to this file
//   Fails  when a skill, program, template or shared file in the kit has no row, when a row names something
//          the kit doesn't have, or when the page won't render (the kit's own md-lint).
// Reads the kit only. It never writes inside it.

const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const KIT = path.join(HERE, '..', 'specifier_v3');
const OUT = path.join(HERE, 'book-of-knowledge.md');
const facts = (f) => JSON.parse(fs.readFileSync(path.join(HERE, 'facts', f), 'utf8'));

const id = facts('ideas-documents.json');
const sk = facts('skills.json');
const pg = facts('programs.json');
const ts = facts('templates-shared.json');

const problems = [];

// ---------------------------------------------------------------- cells
const list = (v) => (v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]).filter((x) => String(x).trim() !== '');
function cell(v) {
  const items = list(v).map((x) => String(x).trim());
  let s;
  if (items.length === 0) s = 'none';
  else if (items.length === 1) s = items[0];
  else s = items.map((x) => '• ' + x).join('<br>');
  if (s.includes('|')) problems.push(`a cell holds "|": ${s.slice(0, 80)}`);
  if (s.includes('§')) problems.push(`a cell holds the section sign: ${s.slice(0, 80)}`);
  return s.replace(/\n+/g, ' ');
}
const bold = (s) => `**${s}**`;
function table(headers, rows) {
  const out = ['| ' + headers.join(' | ') + ' |', '|' + headers.map(() => '---').join('|') + '|'];
  for (const r of rows) out.push('| ' + r.map(cell).join(' | ') + ' |');
  return out.join('\n');
}
const pick = (o, ...keys) => { for (const k of keys) if (o[k] !== undefined) return o[k]; return undefined; };

// ---------------------------------------------------------------- the forward flow and the change flow
const fwd = (arr) => arr.filter((x) => !x.changeOnly);
const chg = (arr) => arr.filter((x) => x.changeOnly);

const workflows = sk.workflows;
const skills = sk.skills;
const programs = pg.programs;
const templates = ts.templates;
const shared = ts.shared;

// ---------------------------------------------------------------- the page
const L = [];
L.push('# Book of knowledge');
L.push('');
L.push('> **What this is:** every idea, document and item of the specifier, written like a glossary. Each row says what the item is and where it sits in the flow. It also says what the item takes in, what it gives out, and the gate where you decide.');
L.push('>');
L.push('> **What it is not:** how to run the kit, which is `README.md`. It is not the rules a skill follows either. Those are in `.claude/skills/_shared/`. It never overrides a skill: where they differ, the skill is right, and this book is rebuilt.');
L.push('>');
L.push('> **Who uses it:** a specifier, the BA or the PO. Use it to look up what something is, and where it fits.');
L.push('');
L.push('**Being rebuilt:** handling a change. The change workflow is being redesigned, so part 9 lists its pieces as they are today, and says no more. Everything else in this book is the kit as it stands.');
L.push('');
const parts = [
  'The ideas', 'The documents', 'Workflows', 'Skills', 'Programs', 'Templates', 'Shared files', 'Examples and test data', 'Handling a change: being rebuilt',
];
L.push('**Contents**');
parts.forEach((p, i) => L.push(`${i + 1}. ${p}`));
L.push('');

let n = 0;
const part = (title, count) => { n++; L.push('---', '', `## ${n}. ${title}${count === undefined ? '' : ` (${count})`}`, ''); };

// 1. ideas
// The ideas come in an order where each builds on the ones before. Each group starts at the term named here.
const IDEA_GROUPS = [
  ['People, skills and gates', 'the specifiers'],
  ['What every document has', 'the status line'],
  ['Kinds of document, and how facts move', 'living document'],
  ['What a document may say', 'the labels for unknowns'],
  ['Questions', 'the Question log'],
  ['Simple writing', 'simple writing'],
  ['Words: the Glossary', 'agreed words'],
  ['The data model', 'the data model'],
  ['From requirements to stories', 'a requirement\'s kind'],
];
const ideas = id.ideas.filter((x) => x.status !== 'gone');
part(parts[0], ideas.length);
const starts = IDEA_GROUPS.map(([g, t]) => {
  const k = ideas.findIndex((x) => x.term === t);
  if (k < 0) problems.push(`idea group "${g}" starts at "${t}", which is not an idea`);
  return k;
});
IDEA_GROUPS.forEach(([g], k) => {
  const rows = ideas.slice(starts[k], k + 1 < starts.length ? starts[k + 1] : ideas.length);
  L.push(`### ${g}`, '');
  L.push(table(['Term', 'What it means', 'Where you meet it'], rows.map((x) => [bold(x.term), x.meaning, pick(x, 'whereYouMeetIt', 'where')])));
  L.push('');
});

// 2. documents
const docs = fwd(id.documents);
part(parts[1], docs.length);
L.push('Kinds: **living** changes only as a new version, made by its own skill. A **record** is written once, and later entries are added. A **generated** file is rebuilt by a program, never edited by hand. **External** comes from outside the workflow.');
L.push('');
L.push(table(['Document', 'What it holds', 'Kind', 'Written by', 'Read by', 'Looked up by ID by', 'Where'],
  docs.map((d) => [bold(d.document), d.whatItHolds, d.kind, d.writtenBy, d.readBy, d.lookedUpByIdBy, d.where ? '`' + d.where + '`' : ''])));
L.push('');

// 3, 4. workflows and skills
// What every skill does is said once, above the table, and left out of each row. Each pattern below is one of
// those shared steps. A row's own steps, such as its check program, stay.
const SHARED_STEPS = [
  /^It says its mode first/, /^Mode: /, /^Mark \d/, /^It marks each Glossary change as it goes/,
  /runs `scaffold-project\.cjs`[^.]*\.$/, /^When you accept, it runs `accept\.cjs`/, /^Last, it runs `accept\.cjs`/,
  /^It can run on its own/, /^You can run it on its own/,
];
function ownSteps(x) {
  return list(x.inFlow).flatMap((b) => {
    const m = b.match(/^It runs `probing-questions-author`, then `grade-questions\.cjs`, then its check, (`[^`]+`)\.$/);
    if (m) return [`Its check is ${m[1]}.`];
    return SHARED_STEPS.some((re) => re.test(b)) ? [] : [b];
  });
}
const itemRow = (x) => [`\`${x.name}\``, x.what, x.takesIn, x.givesOut, x.name === 'probing-questions-author' ? x.inFlow : ownSteps(x), x.gate];
const ITEM = ['Item', 'What it is', 'Takes in', 'Gives out', 'In the flow', 'Your gate'];
part(parts[2], workflows.length);
L.push('Each workflow runs one piece, then stops. Run it again for the next piece. Nothing runs everything at once.');
L.push('');
L.push(table(ITEM, workflows.map(itemRow)));
L.push('');
part(parts[3], skills.length);
L.push('What every skill does, and so is left out of each row:');
L.push('- It says its mode first, in one sentence: a new build, picking up where it stopped, a change, or nothing to do.');
L.push('- Before it writes, it runs `scaffold-project.cjs`, so the project\'s folders exist.');
L.push('- After it drafts, it runs `probing-questions-author`, then `grade-questions.cjs`, then its own check program. The data model\'s two skills, `things-author` and `data-model-author`, are the exception: their decisions stay in the data model\'s decisions file, never in the Question log.');
L.push('- When you accept, it runs `accept.cjs`, then `status.cjs`.');
L.push('- It also runs on its own, without its workflow, and behaves the same.');
L.push('');
L.push(table(ITEM, skills.map(itemRow)));
L.push('');

// 5. programs
const fp = fwd(programs);
const OVERRIDE = facts('overrides.json').programs;
for (const k of Object.keys(OVERRIDE)) if (!programs.some((x) => x.name === k)) problems.push(`override for a program with no row: ${k}`);
part(parts[4], fp.length);
L.push('A program never holds a gate. You can run any of them yourself, from the kit folder, with `node tools/{program}`.');
L.push('');
L.push(table(['Item', 'What it is', 'Takes in', 'Gives out', 'In the flow'],
  fp.map((x) => [`\`${x.name.replace(/`/g, '')}\``, x.what, x.takesIn, x.givesOut, OVERRIDE[x.name] || x.inFlow])));
L.push('');

// 6. templates
const ft = fwd(templates);
part(parts[5], ft.length);
// A template's main parts only: its sub-parts, such as "4: In scope", and what every template has are left out.
const EVERY_TEMPLATE = /^(Status line|Title and status line|Check record|Placeholders)/;
function mainParts(holds) {
  const all = list(holds);
  const kept = all.filter((h) => !/^\d+: /.test(h) && !EVERY_TEMPLATE.test(h));
  return kept.length ? kept : all;
}
L.push('Each document has one template, in `.claude/skills/_shared/templates/`. It sets the document\'s shape. Every template also has a status line at the top, a check record, and notes on each placeholder, so these are left out of the table.');
L.push('');
L.push(table(['Item', 'What it is', 'What it holds', 'Filled by', 'Checked by'],
  ft.map((x) => [bold(x.name), x.what, mainParts(x.holds), pick(x, 'filledBy', 'filledByOrReadBy'), x.checkedBy])));
L.push('');

// 7. shared files, and the glossary method
const fs7 = fwd(shared).concat(fwd(ts.glossaryMethod || []));
part(parts[6], fs7.length);
L.push(table(['Item', 'What it is', 'What it holds', 'Read by'],
  fs7.map((x) => [x.path ? `\`${x.path.replace(/\\/g, '/').replace(/^\.claude\/skills\/_shared\//, '')}\`` : bold(x.name), x.what, x.holds, pick(x, 'readBy', 'filledBy', 'filledByOrReadBy')])));
L.push('');

// 8. examples and fixtures
const ex = (ts.examples || []).concat(ts.fixtures || []);
part(parts[7], ex.length);
L.push(table(['Item', 'What it is', 'What it holds', 'Used by'],
  ex.map((x) => [x.path ? `\`${x.path.replace(/\\/g, '/')}\`` : bold(x.name), x.what, x.holds, pick(x, 'readBy', 'usedBy', 'filledBy', 'filledByOrReadBy')])));
L.push('');

// 9. change, being rebuilt
part(parts[8]);
L.push('The change workflow is being redesigned. These are its pieces as they are today, so you can find them. They will be described in full once the new design is in the kit.');
L.push('');
L.push('**The ideas, as the kit has them today**');
L.push('');
L.push(table(['Term', 'What it means today'], (id.changeIdeas || []).map((x) => [bold(x.term), x.meaning])));
L.push('');
const ci = []
  .concat(facts('change-skills.json').change)
  .concat(chg(programs).map((x) => ({ name: x.name.replace(/`/g, ''), what: x.what })))
  .concat(chg(templates).map((x) => ({ name: x.name, what: x.what })))
  .concat(chg(id.documents).map((x) => ({ name: x.document, what: x.whatItHolds })));
L.push('**The pieces**');
L.push('');
L.push(table(['Item', 'What it is today'], ci.map((x) => [/\.cjs$|-/.test(x.name) && !/ /.test(x.name) ? '`' + x.name + '`' : bold(x.name), x.what])));
L.push('');

const text = L.join('\n');

// ---------------------------------------------------------------- is every item in the kit in the book, and only those?
const CHANGE_SKILLS = ['change-impact-author', 'adversarial-check', 'feature-impact', 'requirement-update-workflow'];
const skillDirs = fs.readdirSync(path.join(KIT, '.claude', 'skills')).filter((d) => !d.startsWith('_'));
const named = new Set(workflows.concat(skills).map((x) => x.name.replace(/`/g, '')));
for (const d of skillDirs) if (!named.has(d) && !CHANGE_SKILLS.includes(d)) problems.push(`skill with no row: ${d}`);
for (const x of named) if (!skillDirs.includes(x)) problems.push(`row for a skill the kit doesn't have: ${x}`);

const progFiles = fs.readdirSync(path.join(KIT, 'tools')).filter((f) => f.endsWith('.cjs'))
  .concat(fs.readdirSync(path.join(KIT, 'tools', 'lib')).filter((f) => f.endsWith('.cjs')).map((f) => 'lib/' + f));
const progNamed = new Set(programs.map((x) => x.name.replace(/`/g, '').replace(/^tools\//, '')));
for (const f of progFiles) if (!progNamed.has(f)) problems.push(`program with no row: ${f}`);
for (const x of progNamed) if (!progFiles.includes(x)) problems.push(`row for a program the kit doesn't have: ${x}`);

const norm = (p) => (p || '').replace(/\\/g, '/');
const tDir = path.join(KIT, '.claude', 'skills', '_shared', 'templates');
const walk = (d, base = '') => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name), base + e.name + '/') : [base + e.name]);
const tPaths = new Set(templates.map((x) => norm(x.path).replace(/^.*templates\//, '')));
for (const f of walk(tDir)) if (!tPaths.has(f)) problems.push(`template with no row: ${f}`);
const sPaths = new Set(shared.map((x) => norm(x.path).replace(/^.*_shared\//, '')));
for (const f of fs.readdirSync(path.join(KIT, '.claude', 'skills', '_shared')).filter((f) => f.endsWith('.md')))
  if (!sPaths.has(f)) problems.push(`shared file with no row: ${f}`);

// ---------------------------------------------------------------- renders?
const { lint } = require(path.join(KIT, 'tools', 'lib', 'md-lint.cjs'));
for (const p of lint(text)) problems.push(`md-lint line ${p.line}: ${p.problem}`);

fs.writeFileSync(OUT, text);
console.log(`wrote ${path.basename(OUT)}: ${text.split('\n').length} lines`);
console.log(`  ideas ${id.ideas.filter((x) => x.status !== 'gone').length}, documents ${docs.length}, workflows ${workflows.length}, skills ${skills.length}, programs ${fp.length}, templates ${ft.length}, shared ${fs7.length}, change pieces ${ci.length}`);
if (problems.length) { console.log(`${problems.length} problems:`); for (const p of problems) console.log('  ' + p); process.exitCode = 1; }
else console.log('pass: every item in the kit has a row, and the page renders');
