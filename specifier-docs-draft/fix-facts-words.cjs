'use strict';
// fix-facts-words.cjs — the simple-writing fixes the check names one by one, each an exact replacement in facts/.
// Fails when a phrase isn't found, so a fix that no longer applies is seen.
const fs = require('fs');
const path = require('path');
const R = [
  ['ideas-documents.json', 'sends every data model gap to one place only, by its kind', 'sends each data model gap to exactly one document, by its kind'],
  ['templates-shared.json', 'The one place the method', 'The only file where the method'],
  ['programs.json', 'Running it again changes nothing that is already there', 'Running it again changes no folder or file that already exists'],
  ['programs.json', "the document's path, and whether the file is there", "the document's path, and whether the file exists"],
  ['programs.json', 'or one line when there is none', 'or one line when nothing differs'],
  ['programs.json', 'but use it only when there is a change.', 'but use it only for an open change.'],
  ['programs.json', 'It follows the links downstream, from', 'It follows the links forward, from'],
  ['programs.json', 'you chose to run the path; `change-impact-author`', 'you chose to run the path. `change-impact-author`'],
];
let bad = 0;
for (const [f, a, b] of R) {
  const p = path.join(__dirname, 'facts', f);
  const s = fs.readFileSync(p, 'utf8');
  if (!s.includes(a)) { console.log(`not found in ${f}: ${a}`); bad++; continue; }
  fs.writeFileSync(p, s.split(a).join(b));
}
console.log(`${R.length - bad} of ${R.length} applied`);
