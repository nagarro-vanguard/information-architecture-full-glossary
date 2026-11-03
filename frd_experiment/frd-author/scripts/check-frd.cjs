#!/usr/bin/env node
// check-frd.cjs — the deterministic checks on one FRD.
//
// Usage:  node check-frd.cjs <FRD.md> <feature-catalog.md> <requirements.md> [--step1]
//
//   --step1   Step 1 mode: checks only the parts Step 1 fills, because the rest is not written yet.
//   (none)    Full mode, for Step 2 and Step 3: checks the whole FRD.
//
// Reports PASS / FAIL per check and exits 1 on any FAIL. It never edits a file: a FAIL is fixed by
// following references/conventions.md, then this check is run again. Every check enforces a written
// rule, and its tag names the section of conventions.md it comes from (or "Template"). It adds no rule of
// its own. These are structure checks: they prove the document is copied, numbered and linked correctly,
// not that its rules are right.
//
// When every check passes it also prints, to be pasted as they are:
//   - "For the person": the facts for the review message, each with its source
//   - "One line": the check result for a follow-up decision at the same review stop
//   - "For the file": the record that replaces the document's Check record section

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const scope = args.includes("--step1");   // Step 1 mode
const [frdPath, catalogPath, reqPath] = args.filter(a => !a.startsWith("--"));
if (!frdPath || !catalogPath || !reqPath) {
  console.error("Usage: node check-frd.cjs <FRD.md> <feature-catalog.md> <requirements.md> [--step1]");
  process.exit(2);
}
const REFS = path.join(__dirname, "..", "references");
const read = p => fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n");
const frd = read(frdPath);
const lines = frd.split("\n");
const template = read(path.join(REFS, "frd-template.md"));
const conventions = read(path.join(REFS, "conventions.md"));

// The template marks which step fills each part: a <!-- Step N --> marker covers everything below it, up to
// the next marker. The ## sections under a marker that starts with Step 1 are the ones Step 1 must create.
const step1Sections = [];
let marker = "";
for (const line of template.split("\n")) {
  const m = line.match(/^<!-- (Step \d)/);
  if (m) marker = m[1];
  else if (line.startsWith("## ") && marker === "Step 1") step1Sections.push(line.slice(3));
}

// The standard questions, read from the conventions so they are written in one place only.
const standardQuestions = [];
{
  const cl = conventions.split("\n");
  const start = cl.findIndex(l => l.startsWith("**The questions, in order:**"));
  for (let i = start + 1; start >= 0 && i < cl.length; i++) {
    const m = cl[i].match(/^\d+\. (.+)$/);
    if (m) standardQuestions.push(m[1].trim());
    else if (standardQuestions.length && cl[i].trim() === "") break;
  }
}

// ---------- helpers ----------
const cells = line => line.split("|").slice(1, -1).map(c => c.trim());
const tableRows = block => block.filter(l => l.startsWith("|")).slice(2).map(cells); // drop header + rule
const ids = (s, re) => [...s.matchAll(re)].map(m => m[0]);
const featIds = s => ids(s, /F-\d+(?![.\d])/g);
const reqIds = s => ids(s, /REQ-\d+\.\d+/g);
const ruleIds = s => ids(s, /F-\d+\.\d+/g);
const sameSet = (a, b) => a.length === b.length && [...a].sort().join("|") === [...b].sort().join("|");
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const firstDiff = (a, b) => {
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  const cut = s => JSON.stringify(s.slice(Math.max(0, i - 25), i + 25));
  return `at character ${i}:  FRD ${cut(a)}  vs source ${cut(b)}`;
};
const joinLines = list => list.length === 1 ? list[0] : list.map(x => "• " + x).join("<br>");

// ---------- the sources ----------
const catalog = {};
let catalogModule = null;
const catalogModules = [];                   // module names, e.g. "Setup"
const moduleTitles = {};                     // 3 → "3. Setup"
for (const line of read(catalogPath).split("\n")) {
  if (line.startsWith("## Coverage")) break;
  const mod = line.match(/^### (\d+)\. (.+)$/);
  if (mod) { catalogModule = +mod[1]; catalogModules.push(mod[2].trim()); moduleTitles[catalogModule] = `${mod[1]}. ${mod[2].trim()}`; }
  if (!/^\| F-\d+ \|/.test(line)) continue;
  const c = cells(line);
  catalog[c[0]] = { name: c[1], desc: c[2], done: c[3], reqs: reqIds(c[4]), priority: c[5], deps: featIds(c[7]), module: catalogModule };
}
const reqs = {};
for (const line of read(reqPath).split("\n")) {
  const m = line.match(/^\| (\d+\.\d+) \|/);
  if (m) { const c = cells(line); reqs["REQ-" + c[0]] = { title: c[1], text: c[2] }; }
}

// ---------- the FRD ----------
const crIndex = lines.findIndex(l => l.startsWith("## Check record"));
const bodyLines = crIndex >= 0 ? lines.slice(0, crIndex) : lines;   // everything except the Check record
const body = bodyLines.join("\n");
const sections = {};
let current = "_head";
for (const line of lines) {
  const h = line.match(/^## (.+)$/);
  if (h) current = h[1];
  (sections[current] ||= []).push(line);
}
const head = sections._head;
const after = (block, marker) => {           // bullet lines right under a marker line
  const i = block.findIndex(l => l.startsWith(marker));
  if (i < 0) return null;
  if (/None\.\s*$/.test(block[i])) return [];
  const item = marker.startsWith("- ") ? /^\s{2,}- / : /^- /;  // under a bullet marker, only its own sub-bullets
  const out = [];
  for (let j = i + 1; j < block.length && item.test(block[j]); j++) out.push(block[j].replace(/^\s*- /, "").trim());
  return out;
};
const section = name => sections[Object.keys(sections).find(k => k.startsWith(name))] || [];

const h1 = lines.find(l => l.startsWith("# ")) || "";
const capName = (h1.match(/^# FRD-\d+[a-z] (.+)$/) || [])[1] || h1.replace(/^# /, "");
const dependsOn = after(head, "- **Depends on:**") || [];
const excludes = after(head, "- **Excludes:**") || [];
const lastChanged = (head.find(l => l.startsWith("- **Last changed:**")) || "").replace("- **Last changed:**", "").trim();
const frdReqs = head.map(l => l.match(/^- \*\*(REQ-\d+\.\d+) (.+?)\*\* — (.+)$/)).filter(Boolean)
  .map(m => ({ id: m[1], title: m[2], text: m[3] }));
const covered = tableRows(section("Features covered"))
  .map(c => ({ id: c[0], name: c[1], desc: c[2], reqs: reqIds(c[3]), priority: c[4] }));
const gateRows = tableRows(section("Gates")).map(c => ({ key: c[0].match(/\*\*(.+?)\*\*/)[1], cond: c[1], tied: c[2] || "" }));
const gates = Object.fromEntries(gateRows.map(g => [g.key, g.cond]));
const actorRows = tableRows(section("Actors")).map(c => ({ actor: c[0], does: c[1] || "" }));
const dataRows = tableRows(section("Data")).map(c => ({ thing: c[0], holds: c[1] || "" }));
const sqRows = tableRows(section("Standard questions")).map(c => ({ thing: c[0], question: c[1], answer: c[2] || "" }));

const NOTE = "<br>*Updated from the requirement on the basis of Decision ";
const rules = [];                            // { feature, heading, id, text, source, note }
let feature = null;
for (const line of section("Rules")) {
  const h = line.match(/^### (F-\d+) (.+)$/);
  if (h) { feature = { id: h[1], heading: h[2] }; continue; }
  if (feature && /^\| F-\d+\.\d+ \|/.test(line)) {
    const c = cells(line);
    const at = c[2].indexOf(NOTE);
    const source = at < 0 ? c[2] : c[2].slice(0, at);
    const noteRaw = at < 0 ? "" : c[2].slice(at + 4);
    const nm = noteRaw.match(/^\*Updated from the requirement on the basis of Decision (\d+): (.+)\.\*$/);
    rules.push({ feature: feature.id, heading: feature.heading, id: c[0], text: c[1], source,
      note: noteRaw, noteDecision: nm ? +nm[1] : 0, noteText: nm ? nm[2] : "" });
  }
}
const ruleHeadings = section("Rules").map(l => l.match(/^### (F-\d+) (.+)$/)).filter(Boolean);
const recon = tableRows(section("Coverage"))           // the decided clause split
  .map(c => ({ dw: c[0], clause: c[1], by: ruleIds(c[2] || "") }));
const reqList = after(section("Coverage"), "**From the requirement") || [];
const decList = after(section("Coverage"), "**From your decisions") || [];
const questions = section("Open questions").map(l => l.match(/^(\d+)\. \*\*(.+?)\*\*(.*)$/)).filter(Boolean)
  .map(m => ({ n: +m[1], title: m[2], rest: m[3], decided: +((m[3].match(/Decided — see Decision (\d+)\.\s*$/) || [])[1] || 0) }));
const flow = section("Flow").join("\n");
const flowSteps = flow.split("```").slice(2).join("```").split("\n");

// The Decision record: "### Decision n — question", then its bullet fields.
const decisions = [];
let dec = null;
for (const line of section("Decision record")) {
  const h = line.match(/^### Decision (\d+) — (.+)$/);
  if (h) { dec = { n: +h[1], question: h[2], options: [], fields: {} }; decisions.push(dec); continue; }
  if (!dec) continue;
  const opt = line.match(/^\s{2,}- \*\*(.+?)\*\*(.*)$/);
  if (opt) { dec.options.push({ label: opt[1], rest: opt[2] }); continue; }
  const f = line.match(/^- \*\*(.+?):\*\*\s*(.*)$/);
  if (f) dec.fields[f[1]] = f[2].trim();
}
const decisionNumbers = decisions.map(d => d.n);
const ACCEPT_Q = "Accept these changes into the document?";
const isAccept = d => d.question === ACCEPT_Q && d.fields["Chosen"] === "Accept";
const latest = decisions[decisions.length - 1];
const accepted = !!latest && isAccept(latest);             // the latest decision accepted the changes
const everAccepted = decisions.some(isAccept);             // rule IDs are frozen from the first acceptance
const decisionDate = d => ((d && d.fields["Decided by"]) || "").match(/(\d{4}-\d{2}-\d{2})$/)?.[1] || "";

// source cell → { kind, dw, n, clause, decision }
const parseSource = s => {
  let m;
  if ((m = s.match(/^(F-\d+)\.dw(\d+) — (.+)$/))) return { kind: "dw", feature: m[1], n: +m[2], clause: m[3] };
  if (s === "req — from the requirement") return { kind: "req" };
  if (/^proposed — Why: \S/.test(s)) return { kind: "proposed" };
  if ((m = s.match(/^decided — see Decision (\d+)$/))) return { kind: "decided", decision: +m[1] };
  return { kind: "invalid" };
};
for (const r of rules) r.src = parseSource(r.source);

// ---------- checks ----------
// Each tag is the name of the conventions.md section the check enforces, or "Template".
const results = [];
const FULL = true;                           // marks a check that runs only in full mode, not in Step 1 mode
const check = (tag, name, fn, fullOnly = false) => {
  if (scope && fullOnly) return;
  const problems = [];
  try { fn(msg => problems.push(msg)); } catch (e) { problems.push("could not run: " + e.message); }
  results.push({ tag, name, problems });
};

check("Capability", "Title and file name follow the numbering rule", fail => {
  const m = h1.match(/^# FRD-(\d+)([a-z]) (.+)$/);
  if (!m) return fail(`title must read "# FRD-<module><letter> <Capability name>", found: ${h1}`);
  const slug = m[3].toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");
  const want = `FRD-${m[1]}${m[2]}-${slug}.md`;
  if (path.basename(frdPath) !== want) fail(`file should be named ${want}, is ${path.basename(frdPath)}`);
  if (covered.length === 1 && catalog[covered[0].id] && m[3] !== catalog[covered[0].id].name) {
    fail(`one feature, so the name must be its catalog name "${catalog[covered[0].id].name}", not "${m[3]}"`);
  }
});

check("Output", "Sections match the template, in order", fail => {
  const want = template.split("\n").filter(l => l.startsWith("## ")).map(l => l.slice(3));
  const got = lines.filter(l => l.startsWith("## ")).map(l => l.slice(3));
  if (scope) {                               // Step 1 fills some sections; those present keep template order
    const pos = got.map(g => want.indexOf(g));
    if (pos.includes(-1) || pos.some((p, i) => i && p < pos[i - 1])) fail(`out of template order: ${got.join(" > ")}`);
    for (const need of step1Sections) if (!got.includes(need)) fail(`missing: ${need}`);
  } else if (want.join("|") !== got.join("|")) fail(`template: ${want.join(" > ")}\n  FRD:      ${got.join(" > ")}`);
});

check("Output", "Lineage comes first and names the given sources", fail => {
  const next = lines[lines.indexOf(h1) + 1 + (lines[lines.indexOf(h1) + 1] === "" ? 1 : 0)];
  if (next !== "> **Lineage**") fail("the line after the title must be > **Lineage**");
  for (const [label, file] of [["Primary source", catalogPath], ["Supporting sources", reqPath]]) {
    const line = lines.find(l => l.includes(`**${label}:**`)) || "";
    const link = line.match(/\]\(([^)]+)\)/);
    if (!link) { fail(`${label}: no link`); continue; }
    const target = path.resolve(path.dirname(frdPath), link[1]);
    if (!fs.existsSync(target)) fail(`${label}: link does not resolve: ${link[1]}`);
    else if (path.resolve(target) !== path.resolve(file)) fail(`${label}: points to ${link[1]}, not the file given`);
  }
});

check("Sources", "Last changed names the latest decision", fail => {
  const want = latest ? `${decisionDate(latest)}, Decision ${latest.n}` : "None yet.";
  if (!head.some(l => l.startsWith("- **Last changed:**"))) fail('missing the line "- **Last changed:** …"');
  else if (lastChanged !== want) fail(`reads "${lastChanged}", should read "${want}"`);
});

check("Capability", "Every covered feature sits in the FRD's module", fail => {
  const m = h1.match(/^# FRD-(\d+)/);
  for (const f of covered) {
    if (!catalog[f.id]) fail(`${f.id} is not in the catalog`);
    else if (m && catalog[f.id].module !== +m[1]) fail(`${f.id} is in module ${catalog[f.id].module}, not ${m[1]}`);
  }
});

check("Sources", "Features covered match the catalog", fail => {
  for (const f of covered) {
    const c = catalog[f.id];
    if (!c) continue;
    if (f.name !== c.name) fail(`${f.id} name ${firstDiff(f.name, c.name)}`);
    if (f.desc !== c.desc) fail(`${f.id} description ${firstDiff(f.desc, c.desc)}`);
    if (!sameSet(f.reqs, c.reqs)) fail(`${f.id} Req. ID is ${f.reqs.join(" and ")}, catalog says ${c.reqs.join(" and ")}`);
    if (f.priority !== c.priority) fail(`${f.id} priority is ${f.priority}, catalog says ${c.priority}`);
  }
});

check("Sources", "Requirements listed are exactly those of the features covered", fail => {
  const want = [...new Set(covered.flatMap(f => f.reqs))];
  const got = frdReqs.map(r => r.id);
  if (!sameSet(want, got)) fail(`features cover ${want.join(", ")}; Requirements lists ${got.join(", ")}`);
});

check("Sources", "Requirement titles and text are word for word", fail => {
  for (const r of frdReqs) {
    const src = reqs[r.id];
    if (!src) { fail(`${r.id} is not in the requirements doc`); continue; }
    if (r.title !== src.title) fail(`${r.id} title ${firstDiff(r.title, src.title)}`);
    if (r.text !== src.text) fail(`${r.id} text ${firstDiff(r.text, src.text)}`);
  }
});

const inside = covered.map(f => f.id);
const outsideDeps = [...new Set(covered.flatMap(f => (catalog[f.id] || { deps: [] }).deps))].filter(d => !inside.includes(d));
const dependents = Object.keys(catalog).filter(id => !inside.includes(id) && catalog[id].deps.some(d => inside.includes(d)));

check("Sources", "Depends on lists the outside features the catalog names", fail => {
  const got = dependsOn.map(d => (d.match(/^(F-\d+) (.+)$/) || []));
  if (!sameSet(outsideDeps, got.map(g => g[1]).filter(Boolean))) fail(`catalog says ${outsideDeps.join(", ") || "none"}; FRD lists ${dependsOn.join(", ") || "none"}`);
  for (const [, id, name] of got) if (catalog[id] && name !== catalog[id].name) fail(`${id} is named "${name}", catalog says "${catalog[id].name}"`);
});

// Excludes, parsed once: the check uses it, and so do the blocks for the person and the file.
const exMod = +(h1.match(/^# FRD-(\d+)/) || [])[1];
const exNum = id => +id.slice(2);
const exSiblings = Object.keys(catalog).filter(id => catalog[id].module === exMod && !inside.includes(id)).sort((a, b) => exNum(a) - exNum(b));
const exItems = excludes.map(text => {
  let m;
  if ((m = text.match(/^(F-\d+) (.+?)(?:, linked by (REQ-\d+\.\d+))?$/))) {
    return { text, named: [{ id: m[1], name: m[2] }], link: m[3], sibling: exSiblings.includes(m[1]) && !m[3] };
  }
  if ((m = text.match(/^(.+) module, linked by (REQ-\d+\.\d+)$/))) return { text, module: m[1], named: [], link: m[2], sibling: false };
  return { text, named: [], bad: true, sibling: false };
});

check("Sources", "Excludes lists every sibling feature, then only requirement-linked neighbours", fail => {
  for (const i of exItems) {
    if (i.bad) fail(`must read "F-xx <catalog name>", "F-xx <catalog name>, linked by REQ-x.y" or "<Module> module, linked by REQ-x.y": ${i.text}`);
    if (i.module && !catalogModules.includes(i.module)) fail(`"${i.module}" is not a catalog module: ${i.text}`);
    if (i.named.length && exSiblings.includes(i.named[0].id) && i.link) fail(`a same-module feature is listed plainly, without "linked by": ${i.text}`);
  }
  for (const s of exSiblings) if (!exItems.some(i => i.sibling && i.named[0].id === s)) fail(`missing sibling: ${s} ${catalog[s].name}`);
  const sibOrder = exItems.filter(i => i.sibling).map(i => i.named[0].id);
  if (sibOrder.join() !== [...sibOrder].sort((a, b) => exNum(a) - exNum(b)).join()) fail(`siblings are not in feature-ID order: ${sibOrder.join(", ")}`);
  const firstLinked = exItems.findIndex(i => !i.sibling);
  if (firstLinked >= 0 && exItems.slice(firstLinked).some(i => i.sibling)) fail("siblings must all come before the requirement-linked items");
  for (const i of exItems) {
    if (!i.bad && !i.sibling && !i.link) fail(`not a same-module feature, so it must end ", linked by REQ-x.y": ${i.text}`);
    if (i.link && !frdReqs.some(r => r.id === i.link)) fail(`${i.link} is not one of this FRD's own requirements: ${i.text}`);
    for (const n of i.named) if (catalog[n.id] && n.name !== catalog[n.id].name) fail(`${n.id} is named "${n.name}", catalog says "${catalog[n.id].name}"`);
  }
});

check("Template", "One Rules subsection per covered feature, named as in the catalog", fail => {
  if (!sameSet(ruleHeadings.map(h => h[1]), inside)) fail(`subsections: ${ruleHeadings.map(h => h[1]).join(", ")}; features covered: ${inside.join(", ")}`);
  for (const [, id, name] of ruleHeadings) if (catalog[id] && name !== catalog[id].name) fail(`### ${id} reads "${name}", catalog says "${catalog[id].name}"`);
}, FULL);

check("IDs", "Rule IDs are numbered from 1 with no gaps", fail => {
  for (const [, id] of ruleHeadings) {
    const nums = rules.filter(r => r.feature === id).map(r => r.id);
    const want = nums.map((_, i) => `${id}.${i + 1}`);
    if (nums.join() !== want.join()) fail(`${id}: ${nums.join(", ")} (expected ${want.join(", ")})`);
  }
}, FULL);

check("IDs", "Rules are numbered in source order until the changes are first accepted", fail => {
  if (everAccepted) return;                  // from the first acceptance, IDs are fixed; a later rule takes the next number
  const rank = r => r.src.kind === "dw" ? r.src.n : r.src.kind === "req" ? 1000 : 2000;
  const label = r => r.src.kind === "dw" ? "dw" + r.src.n : r.src.kind;
  for (const [, id] of ruleHeadings) {
    const own = rules.filter(r => r.feature === id);
    for (let i = 1; i < own.length; i++) {
      if (rank(own[i]) < rank(own[i - 1])) fail(`${own[i].id} (${label(own[i])}) comes after ${own[i - 1].id} (${label(own[i - 1])})`);
    }
  }
}, FULL);

check("Rules", "Every rule cites exactly one allowed source", fail => {
  for (const r of rules) {
    if (r.src.kind === "invalid") fail(`${r.id}: "${r.source}"`);
    else if (r.src.kind === "dw" && r.src.feature !== r.feature) fail(`${r.id} cites a clause of ${r.src.feature}`);
    if (r.note && !r.noteDecision) fail(`${r.id}: the note must read "*Updated from the requirement on the basis of Decision n: <what changed>.*"`);
  }
}, FULL);

check("Rules", "Every decided rule carries a note naming its own decision", fail => {
  for (const r of rules.filter(x => x.src.kind === "decided")) {
    if (!r.noteDecision) fail(`${r.id} is decided by Decision ${r.src.decision} but has no note`);
    else if (r.noteDecision !== r.src.decision) fail(`${r.id} is decided by Decision ${r.src.decision}, but its note names Decision ${r.noteDecision}`);
  }
}, FULL);

// The decided clause split lives in the Coverage table (the Done when section of conventions.md).
const splitOf = id => recon.filter(x => x.dw.startsWith(id + ".dw"));

check("Done when", "Every clause in the split belongs to a covered feature, numbered from 1 with no gaps", fail => {
  for (const x of recon) {
    const m = x.dw.match(/^(F-\d+)\.dw\d+$/);
    if (!m) fail(`"${x.dw}" is not a clause ID`);
    else if (!inside.includes(m[1])) fail(`${x.dw} is not a clause of a covered feature`);
  }
  for (const f of covered) {
    const got = splitOf(f.id).map(x => x.dw);
    const want = got.map((_, i) => `${f.id}.dw${i + 1}`);
    if (got.join() !== want.join()) fail(`${f.id}: ${got.join(", ")} (expected ${want.join(", ")})`);
  }
});

check("Done when", "The clause split reads back as the catalog sentence (nothing dropped or reworded)", fail => {
  for (const f of covered) {
    const c = catalog[f.id];
    if (!c) continue;
    const parts = splitOf(f.id).map(x => x.clause);
    const re = new RegExp("^" + parts.map(esc).join("(?:, and |,? and |; |, )") + "\\.?$");
    if (!parts.length) fail(`${f.id} has no clauses in the Coverage table`);
    else if (!re.test(c.done)) fail(`${f.id}: clauses "${parts.join(" + ")}"\n  catalog: "${c.done}"`);
  }
});

check("Done when", "Rules quote each clause exactly as the decided split lists it", fail => {
  const split = Object.fromEntries(recon.map(x => [x.dw, x.clause]));
  for (const r of rules) {
    if (r.src.kind !== "dw") continue;
    const dw = `${r.src.feature}.dw${r.src.n}`;
    if (!(dw in split)) fail(`${r.id} cites ${dw}, which is not in the decided split`);
    else if (r.src.clause !== split[dw]) fail(`${r.id} quotes ${dw} ${firstDiff(r.src.clause, split[dw])}`);
  }
}, FULL);

check("Done when", "Proved by matches the Rules table, and every clause has a rule", fail => {
  const want = {};
  for (const r of rules) if (r.src.kind === "dw") (want[`${r.src.feature}.dw${r.src.n}`] ||= []).push(r.id);
  for (const x of recon) {
    const w = want[x.dw] || [];
    if (!w.length) fail(`${x.dw} has no rule`);
    else if (!sameSet(x.by, w)) fail(`${x.dw}: Proved by says ${x.by.join(", ") || "nothing"}, rules say ${w.join(", ")}`);
  }
}, FULL);

check("Template", '"From the requirement" lists exactly the req rules', fail => {
  const want = rules.filter(r => r.src.kind === "req").map(r => r.id);
  if (!sameSet(reqList, want)) fail(`list: ${reqList.join(", ") || "none"}; req rules: ${want.join(", ") || "none"}`);
}, FULL);

check("Never invent", '"From your decisions" lists exactly the suggested and decided rules', fail => {
  const want = rules.filter(r => ["proposed", "decided"].includes(r.src.kind)).map(r => r.id);
  if (!sameSet(decList, want)) fail(`list: ${decList.join(", ") || "none"}; suggested and decided rules: ${want.join(", ") || "none"}`);
}, FULL);

const keepOrDrop = questions.map(q => ({ ...q, rule: (q.title.match(/^Keep or drop (F-\d+\.\d+)\?$/) || [])[1] })).filter(q => q.rule);

check("Never invent", "Each pending suggested rule has an open Keep-or-drop question; answered ones point to their decision", fail => {
  for (const r of rules.filter(x => x.src.kind === "proposed")) {
    const q = keepOrDrop.find(k => k.rule === r.id);
    if (!q) fail(`${r.id} is suggested but has no "Keep or drop ${r.id}?" question`);
    else if (q.decided) fail(`"Keep or drop ${r.id}?" says Decision ${q.decided}, but ${r.id} is still marked proposed`);
  }
  for (const q of keepOrDrop) {
    const r = rules.find(x => x.id === q.rule);
    if (!r) { if (!q.decided) fail(`"Keep or drop ${q.rule}?" — ${q.rule} is not in the Rules table, so the question must say it was decided`); continue; }
    if (["dw", "req"].includes(r.src.kind)) fail(`"Keep or drop ${q.rule}?" — ${q.rule} comes from the documents, so it is never kept or dropped`);
    if (r.src.kind === "decided" && q.decided !== r.src.decision) fail(`${q.rule} was kept by Decision ${r.src.decision}, but its question points to ${q.decided ? "Decision " + q.decided : "no decision"}`);
  }
}, FULL);

check("Changes and acceptance", "Once the changes are accepted, nothing is left undecided", fail => {
  if (!accepted) return;
  const open = rules.filter(r => r.src.kind === "proposed").map(r => r.id);
  if (open.length) fail(`suggested rules still waiting for a decision: ${open.join(", ")}`);
  for (const q of questions) if (!q.decided) fail(`open question "${q.title}" has no "Decided — see Decision n." at its end`);
}, FULL);

check("Rules", 'No banned "how" words in rules', fail => {
  const m = conventions.match(/"how" word:\*\*([\s\S]*?)\. Rewrite/);
  if (!m) return fail('could not read the banned-word list from the Rules section of conventions.md');
  const words = m[1].split(",").map(w => w.trim()).filter(Boolean);
  for (const r of rules) for (const w of words) {
    if (new RegExp(`\\b${esc(w)}s?\\b`, "i").test(r.text.replace(/<br>/g, " "))) fail(`${r.id} contains "${w}"`);
  }
}, FULL);

check("Sources", "Gates are tied to the features the catalog's Depends on gives", fail => {
  const want = { "In": outsideDeps, "Out": dependents };
  for (const g of gateRows) {
    const gids = featIds(g.tied);
    for (const m of g.tied.matchAll(/(F-\d+) ([^,(<]+?)(?= \(|,|$)/g)) {
      if (catalog[m[1]] && m[2].trim() !== catalog[m[1]].name) fail(`${g.key}: ${m[1]} is named "${m[2].trim()}", catalog says "${catalog[m[1]].name}"`);
    }
    if (/TBD/.test(g.tied)) fail(`${g.key}: "Tied to" is never TBD — write the catalog's features, or None.`);
    if (g.key in want) {
      const w = want[g.key];
      if (!w.length && g.tied !== "None.") fail(`${g.key}: the catalog shows no feature, so "Tied to" must be None. (found "${g.tied}")`);
      else if (w.length && !sameSet(gids, w)) fail(`${g.key}: tied to ${gids.join(", ") || "nothing"}; the catalog gives ${w.join(", ")}`);
    } else if (g.tied !== "None." && !gids.every(id => inside.includes(id))) fail(`${g.key}: must be a covered feature, or None. (found "${g.tied}")`);
  }
}, FULL);

check("Sources", "Gate conditions copied from the catalog match it word for word", fail => {
  const wantIn = outsideDeps.length ? joinLines(outsideDeps.map(d => catalog[d].done)) : "None.";
  if (gates.In !== wantIn) fail(`In ${firstDiff(gates.In || "", wantIn)}`);
  const out = gateRows.find(g => g.key === "Out");
  if (out && out.tied === "None.") {
    const wantOut = joinLines(covered.map(f => catalog[f.id] ? catalog[f.id].done : ""));
    if (out.cond !== wantOut) fail(`Out: nothing depends on this capability, so the condition is its own "Done when" — ${firstDiff(out.cond, wantOut)}`);
  }
  const undone = gateRows.find(g => g.key === "Undone if");
  if (undone && undone.tied === "None." && undone.cond !== "None.") fail(`Undone if: "Tied to" is None., so the condition must be None. too`);
}, FULL);

check("Flow", "Entry and Exit repeat the Gates conditions word for word", fail => {
  const pairs = [
    ["Entry line", (flow.match(/\*\*Entry:\*\* (.+?) \*\(Gate in\)\*/) || [])[1], gates.In],
    ["ENTRY box", (flow.match(/ENTRY: ([^"\]]+)/) || [])[1], gates.In],
    ["Exit line", (flow.match(/\*\*Exit:\*\* (.+?) \*\(Gate out\)\*/) || [])[1], gates.Out],
    ["EXIT box", (flow.match(/EXIT: ([^"\]]+)/) || [])[1], gates.Out],
  ];
  for (const [name, got, want] of pairs) {
    if (got === undefined) fail(`${name} not found`);
    else if (got.trim() !== want) fail(`${name} ${firstDiff(got.trim(), want)}`);
  }
}, FULL);

const flowCites = [];
check("Flow", "Each flow step cites exactly one existing rule", fail => {
  const known = rules.map(r => r.id);
  for (const line of flowSteps) {
    if (/\(Gate (in|out)\)/.test(line) || !line.trim()) continue;
    const isStep = /^\d+\. /.test(line) || /^- \*Alternate/.test(line);
    const cites = [...line.matchAll(/\*\(([^)]*)\)\*/g)].map(m => m[1]);
    if (isStep && cites.length !== 1) fail(`step cites ${cites.length} rules: ${line.trim()}`);
    for (const c of cites) {
      flowCites.push(c);
      if (!/^F-\d+\.\d+$/.test(c)) fail(`cite "${c}" is not exactly one rule: ${line.trim()}`);
      else if (!known.includes(c)) fail(`${c} is not a rule in this FRD`);
    }
  }
}, FULL);

check("Flow", "Every rule appears in the flow at least once", fail => {
  for (const r of rules) if (!flowCites.includes(r.id)) fail(`${r.id} is not in the flow`);
}, FULL);

check("Standard questions", "Every thing in Data has every standard question, each answered in an allowed way", fail => {
  if (!standardQuestions.length) return fail("could not read the standard questions from the Standard questions section of conventions.md");
  const things = dataRows.map(d => d.thing);
  for (const row of sqRows) if (!things.includes(row.thing)) fail(`"${row.thing}" is not a thing in the Data section`);
  for (const t of things) {
    const got = sqRows.filter(r => r.thing === t).map(r => r.question);
    if (got.join("|") !== standardQuestions.join("|")) fail(`${t}: the questions must be the ${standardQuestions.length} standard questions, word for word, in order`);
  }
  const ruleExists = s => { const found = ruleIds(s); return found.length && found.every(id => rules.some(r => r.id === id)); };
  for (const row of sqRows) {
    const a = row.answer, where = `${row.thing}, "${row.question}"`;
    let m;
    if ((m = a.match(/^Decision (\d+) → no rule$/))) { if (!decisionNumbers.includes(+m[1])) fail(`${where}: there is no Decision ${m[1]}`); }
    else if ((m = a.match(/^Decision (\d+) → (.+)$/))) {
      if (!decisionNumbers.includes(+m[1])) fail(`${where}: there is no Decision ${m[1]}`);
      if (!ruleExists(m[2])) fail(`${where}: names a rule that is not in the Rules table`);
    }
    else if ((m = a.match(/^Open question (\d+)$/))) {
      const q = questions.find(x => x.n === +m[1]);
      if (!q) fail(`${where}: there is no open question ${m[1]}`);
      else if (q.decided) fail(`${where}: open question ${m[1]} is decided, so the answer must name Decision ${q.decided}`);
    }
    else if (/^Does not apply — \S/.test(a)) { /* the reader checks that a document rules it out */ }
    else if ((m = a.match(/^.+, .+ → (.+)$/))) { if (!ruleExists(m[1])) fail(`${where}: names a rule that is not in the Rules table`); }
    else fail(`${where}: "${a}" is not one of the allowed answer forms`);
  }
}, FULL);

check("Decision record", "Each decision records its question, every option offered, the choice, who and when", fail => {
  const block = section("Decision record").slice(1).filter(l => l.trim());
  if (!decisions.length) {
    if (block.length && !(block.length === 1 && block[0].trim() === "None yet.")) fail('no "### Decision n — …" entries, so the section must say exactly "None yet."');
    return;
  }
  const nums = decisions.map(d => d.n);
  const want = nums.map((_, i) => i + 1);
  if (nums.join() !== want.join()) fail(`entries are numbered ${nums.join(", ")} (expected ${want.join(", ")})`);
  for (const d of decisions) {
    const where = `Decision ${d.n}`;
    if (!/^Step [123]$/.test(d.fields["Asked at"] || "")) fail(`${where}: "Asked at" must be Step 1, Step 2 or Step 3`);
    if (d.options.length < 2) fail(`${where}: at least two options must be recorded (found ${d.options.length})`);
    for (const o of d.options) {
      if (o.label.startsWith("Other: ")) continue;
      if (!/ — Why: .+\. What happens next: .+/.test(o.rest)) fail(`${where}: option "${o.label}" needs "— Why: … What happens next: …"`);
    }
    const labels = d.options.map(o => o.label);
    if (!labels.includes(d.fields["Chosen"])) fail(`${where}: "Chosen" (${d.fields["Chosen"] || "missing"}) must be exactly one of the options offered`);
    if (d.fields["Recommended"] !== "None" && !labels.includes(d.fields["Recommended"])) fail(`${where}: "Recommended" (${d.fields["Recommended"] || "missing"}) must be one of the options offered, or None`);
    if (!/^.+, \d{4}-\d{2}-\d{2}$/.test(d.fields["Decided by"] || "")) fail(`${where}: "Decided by" must read "<name or role>, YYYY-MM-DD"`);
  }
});

check("Decision record", "Every reference to a decision points to an entry that exists", fail => {
  for (const m of body.matchAll(/Decision (\d+)/g)) if (!decisionNumbers.includes(+m[1])) fail(`"Decision ${m[1]}" is mentioned, but there is no Decision ${m[1]}`);
});

check("Check record", "The Check record section holds the checker's record, or None yet.", fail => {
  const block = section("Check record").slice(1).filter(l => l.trim());
  if (crIndex < 0) return fail('missing the "## Check record" section');
  if (block.length === 1 && block[0].trim() === "None yet.") return;
  if (!block.some(l => l.startsWith("- **Program:** check-frd.cjs")) || !block.some(l => l.startsWith("- **Result:**"))) {
    fail('must be exactly "None yet." or the checker\'s "For the file" block, pasted as it is');
  }
});

check("Output", "No status line — the document is a living one", fail => {
  bodyLines.forEach((line, i) => {
    if (/^\s*-?\s*\*\*Status:?\*\*/i.test(line) || /^\s*Status:/i.test(line)) fail(`line ${i + 1}: ${line.trim()}`);
  });
});

check("Output", "No template markers or writer notes are left in the document", fail => {
  lines.forEach((line, i) => { if (line.includes("<!--")) fail(`line ${i + 1}: ${line.trim()}`); });
});

check("IDs", "Only the allowed ID prefixes appear", fail => {
  const bad = [...new Set(ids(body, /\b[A-Z][A-Za-z]*-\d/g).map(s => s.slice(0, -2)))].filter(p => !["REQ", "F", "FRD"].includes(p));
  if (bad.length) fail(`unexpected prefixes: ${bad.join(", ")}`);
});

check("Output", "No middle dots anywhere and no slash-joined items", fail => {
  // verbatim text from the sources is exempt — it is copied as is
  const verbatim = [
    ...frdReqs.flatMap(r => [r.title, r.text]),
    ...covered.flatMap(f => [f.name, f.desc]),
    ...Object.values(catalog).flatMap(c => [c.name, c.done]),  // names and Done-when lines appear verbatim
    ...recon.map(x => x.clause),
    ...rules.filter(r => r.src.kind === "dw").map(r => r.src.clause),
  ].filter(Boolean).sort((a, b) => b.length - a.length);
  bodyLines.forEach((line, i) => {
    let s = line.replace(/\[[^\]]*\]\([^)]*\)/g, "LINK").replace(/`[^`]*`/g, "CODE");
    for (const v of verbatim) s = s.split(v).join("VERBATIM");
    if (s.includes("·")) fail(`line ${i + 1}: contains a middle dot`);
    if (/\S\/\S|\s\/\s/.test(s)) fail(`line ${i + 1}: slash-joined items: ${line.trim()}`);
  });
});

// ---------- report ----------
const NOT_CHECKED = [
  "lists of three or more items joined with commas",
  "the written Gates sentences are plain, and written for no one role in particular",
  "each rule states one behaviour, and states behaviour, not mechanism",
  "each rule is a faithful reading of the source it cites",
  "each suggested rule picks between options the sources name; any other gap is an open question",
  "the Actors and the flow agree with the final rules",
  "every \"Does not apply\" in Standard questions is backed by a document that rules the topic out",
  "tensions between decisions were raised before the changes were accepted",
];
const failed = results.filter(r => r.problems.length).length;
const total = results.length;
console.log(`FRD check: ${path.basename(frdPath)}`);
console.log(scope ? "Step 1 mode: checks only the parts Step 1 fills, because the rest is not written yet."
                  : "Full mode: checks the whole document.");
console.log("These are structure checks. Each is tagged with the section of conventions.md it enforces, or Template.\n");
for (const r of results) {
  console.log(`${r.problems.length ? "FAIL" : "PASS"}  ${r.tag.padEnd(22)} ${r.name}`);
  for (const p of r.problems) console.log("        " + p.replace(/\n/g, "\n        "));
}
console.log(`\n${total} structure checks: ${total - failed} PASS, ${failed} FAIL`);
console.log("\nNot checked by this script — the reviewer checks these by reading:");
for (const n of NOT_CHECKED) console.log("  • " + n);

// ---------- the blocks to paste, printed only when every check passes ----------
// The skill never shows the person a draft with a FAIL.
if (!failed) {
  const pad = n => String(n).padStart(2, "0");
  const now = new Date();
  const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const modeName = scope ? "Step 1 mode" : "full mode";
  const nested = (text, indent) => text.split("<br>").map((s, i) => i === 0 ? s.replace(/^• /, "") : `${indent}- ${s.replace(/^• /, "")}`).join("\n");
  const noCodes = s => s.replace(/\s*\*\((F-\d+\.\d+(?:, F-\d+\.\d+)*|Gate in|Gate out)\)\*/g, "").replace(/\bF-\d+ /g, "");
  const ruleWords = id => { const r = rules.find(x => x.id === id); return r ? r.text.split("<br>")[0].replace(/:$/, "") : ""; };
  const qTitle = q => q.rule ? (ruleWords(q.rule) ? `Keep or drop the suggested rule "${ruleWords(q.rule)}"?` : "Keep or drop a suggested rule (since dropped)?") : q.title;
  const srcText = r => r.src.kind === "dw" ? `from "done" condition ${r.src.n}`
    : r.src.kind === "req" ? "from the requirement's own text"
    : r.src.kind === "decided" ? `from your decision — see Decision ${r.src.decision}`
    : "a rule I'm suggesting — your documents don't decide it";
  const noteText = r => r.noteDecision ? ` — *Updated from the requirement on the basis of Decision ${r.noteDecision}: ${r.noteText}.*` : "";
  const notes = [...new Map([...body.matchAll(/\*Updated from the requirement on the basis of Decision (\d+): ([^*]+?)\.\*/g)]
    .map(m => [`${m[1]}|${m[2]}`, { n: +m[1], text: `Decision ${m[1]}: ${m[2]}.` }])).values()]
    .sort((a, b) => a.n - b.n).map(x => x.text);
  const qWithKD = questions.map(q => keepOrDrop.find(k => k.n === q.n) || q);
  const chosenOf = n => { const d = decisions.find(x => x.n === n); return d ? d.fields["Chosen"] : ""; };
  const recordLine = `**Check record:** check-frd.cjs, ${modeName}, ${stamp}, against ${path.basename(catalogPath)} and ${path.basename(reqPath)}. **${total} of ${total} structure checks passed.** The full record is in the document's Check record section.`;

  const out = [];
  const say = (...xs) => out.push(...xs);
  const whatIsSetUp = () => {
    say(`**What is set up for ${capName}** — each line says where it came from.`, "");
    say("- **What it is:**");
    for (const f of covered) say(`  - ${f.desc} — feature catalog, row "${f.name}", column "Description"`);
    say("- **Covers:**");
    for (const f of covered) say(`  - ${f.name} — feature catalog, row "${f.name}"`);
    say("- **Needs first:**");
    if (!outsideDeps.length) say(`  - Nothing — the feature catalog lists no "Depends on" outside this part`);
    for (const id of outsideDeps) {
      const from = covered.filter(f => (catalog[f.id] || { deps: [] }).deps.includes(id)).map(f => `"${f.name}"`).join(" and ");
      say(`  - ${catalog[id].name} — feature catalog, row ${from}, column "Depends on"`);
    }
    say("- **Leaves out:**");
    if (!exItems.length) say("  - Nothing");
    for (const i of exItems) {
      if (i.sibling) say(`  - ${i.named[0].name} — another feature in the catalog section "${moduleTitles[exMod]}"`);
      else if (i.module) say(`  - the ${i.module} module — named in the requirement "${(reqs[i.link] || {}).title}"`);
      else say(`  - ${i.named[0].name} — named in the requirement "${(reqs[i.link] || {}).title}"`);
    }
    say("- **Requirements it comes from:**");
    for (const r of frdReqs) say(`  - "${r.title}" — requirements doc, entry ${r.id.replace("REQ-", "")}`);
    for (const f of covered) {
      say(`- **What "done" means for ${f.name}**, split into separate conditions — feature catalog, row "${f.name}", column "Done when":`);
      splitOf(f.id).forEach((x, i) => say(`  ${i + 1}. ${x.clause}`));
    }
  };
  const theRules = () => {
    say("", "**The rules, as written in the document** — the system shall:");
    for (const f of covered) {
      say(`- **${f.name}**`);
      for (const r of rules.filter(x => x.feature === f.id)) {
        const [first, ...items] = r.text.split("<br>");
        say(`  - ${first} — ${srcText(r)}${noteText(r)}`);
        for (const it of items) say(`    - ${it.replace(/^• /, "")}`);
      }
    }
  };
  const answers = () => {
    say("", "**Questions and their answers:**");
    if (!questions.length) say("- None.");
    for (const q of qWithKD) say(`- ${qTitle(q)} → ${q.decided ? `${chosenOf(q.decided)} (Decision ${q.decided})` : "not decided yet"}`);
  };
  const differs = heading => {
    say("", heading);
    if (!notes.length) say("- None — this document says only what the requirements doc says.");
    for (const n of notes) say(`- ${n}`);
  };
  const decisionsSoFar = () => {
    if (!decisions.length) return;
    say("", accepted && !scope ? "**Decisions recorded:**" : "**Decisions recorded so far:**");
    for (const d of decisions) say(`- Decision ${d.n} — ${d.question} Chosen: ${d.fields["Chosen"]}. (${d.fields["Decided by"]})`);
  };
  const notChecked = () => {
    say("", "**Not checked by the program — please read for these:**");
    for (const n of NOT_CHECKED) say(`- ${n}`);
  };

  say("", "---------- For the person: paste everything below this line, as it is ----------", "");
  if (scope) {
    say(`**${capName} — Step 1 is ready for your review.**`, "");
    whatIsSetUp();
    decisionsSoFar();
  } else if (accepted) {
    say(`**${capName} — your changes are accepted.**`);
    answers();
    differs("**Where this document differs from your requirements doc — for the requirements owner:**");
    decisionsSoFar();
  } else if (questions.some(q => !q.decided) || rules.some(r => r.src.kind === "proposed")) {
    say(`**${capName} — the draft rules are ready for your review.**`);
    theRules();
    say("", "**Standard questions** — answered from your documents where they can be:", "");
    say("| Thing | Question | Answer |", "|---|---|---|");
    for (const row of sqRows) {
      const m = row.answer.match(/^Open question (\d+)$/);
      const a = m ? `asked below, question ${m[1]}` : row.answer.replace(/ → .+$/, "");
      say(`| ${row.thing} | ${row.question} | ${a} |`);
    }
    say("", `**Open questions:** ${questions.filter(q => !q.decided).length}, asked one at a time below.`);
    for (const q of qWithKD.filter(x => !x.decided)) say(`- ${qTitle(q)}`);
    decisionsSoFar();
  } else {
    say(`**${capName} — your decisions are applied. Please review everything below before I finish.**`);
    theRules();
    say("", "**Actors**");
    for (const a of actorRows) say(`- **${a.actor}:**`, `  - ${nested(a.does, "  ")}`.replace(/\n {4}- /g, "\n  - "));
    say("", "**Gates**");
    for (const g of gateRows) say(`- **${g.key}:** ${nested(g.cond, "  ")} — tied to: ${noCodes(g.tied)}`);
    say("", "**Flow**");
    for (const l of flowSteps) if (l.trim()) say(noCodes(l));
    say("", "**Data**");
    for (const d of dataRows) say(`- **${d.thing}:**`, `  - ${nested(d.holds, "  ")}`.replace(/\n {4}- /g, "\n  - "));
    differs("**Where this document now differs from your requirements doc:**");
    answers();
  }
  say("", recordLine);
  if (!accepted) notChecked();
  if (!scope && accepted) say("", "Next: these rules become the checklist that acceptance criteria on the user stories must prove.");
  console.log(out.join("\n"));

  console.log("\n---------- One line, for a follow-up decision at the same review stop ----------");
  console.log(latest
    ? `Check re-run after Decision ${latest.n} was recorded: ${total} of ${total} structure checks passed, ${time}.`
    : `Check run: ${total} of ${total} structure checks passed, ${time}.`);

  const file = [];
  file.push("The most recent check of this document, written by the checking program and pasted as it is.", "");
  file.push(`- **Program:** check-frd.cjs, ${modeName}`);
  file.push(`- **Ran at:** ${stamp}`);
  file.push("- **Checked this file against:**");
  file.push(`  - the feature catalog: ${path.basename(catalogPath)}`);
  file.push(`  - the requirements doc: ${path.basename(reqPath)}`);
  file.push("- **Copied from your documents, and found to match them exactly:**");
  for (const r of frdReqs) file.push(`  - the requirement "${r.title}", title and text — requirements doc, entry ${r.id.replace("REQ-", "")}`);
  for (const f of covered) {
    file.push(`  - the feature name "${f.name}" — feature catalog, row "${f.name}", column "Feature"`);
    file.push(`  - the description of "${f.name}" — feature catalog, row "${f.name}", column "Description"`);
    file.push(`  - the priority "${f.priority}" of "${f.name}" — feature catalog, row "${f.name}", column "Priority"`);
    file.push(`  - the ${splitOf(f.id).length} "done" conditions of "${f.name}", which read back as the catalog's sentence word for word — feature catalog, row "${f.name}", column "Done when"`);
  }
  for (const id of outsideDeps) {
    const from = covered.filter(f => (catalog[f.id] || { deps: [] }).deps.includes(id)).map(f => `"${f.name}"`).join(" and ");
    file.push(`  - Depends on: ${catalog[id].name} — feature catalog, row ${from}, column "Depends on"`);
  }
  if (exSiblings.length) file.push(`  - Excludes: the ${exSiblings.length} other features of the catalog section "${moduleTitles[exMod]}"`);
  if (!scope) {
    for (const id of outsideDeps) file.push(`  - Gates, In: the "Done when" of "${catalog[id].name}" — feature catalog, row "${catalog[id].name}", column "Done when"`);
    const outRow = gateRows.find(g => g.key === "Out");
    if (outRow && outRow.tied === "None.") for (const f of covered) file.push(`  - Gates, Out: the "Done when" of "${f.name}" — feature catalog, row "${f.name}", column "Done when"`);
  }
  file.push(`- **Result:** ${total} of ${total} structure checks passed:`);
  for (const r of results) file.push(`  - ${r.name}`);
  file.push("- **Not checked by the program — read by the person:**");
  for (const n of NOT_CHECKED) file.push(`  - ${n}`);
  console.log('\n---------- For the file: replace everything under "## Check record" with this, as it is ----------\n');
  console.log(file.join("\n"));
}

process.exit(failed ? 1 : 0);
