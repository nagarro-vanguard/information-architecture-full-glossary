/* the swimlanes: one per workflow, each row a step */
var QL = {name:"Question log", sub:"gaps, as rated questions"};
var DMD = {name:"Data model's decisions", sub:"DM and GC entries", kind:"record"};
render("wf-req", [
  {id:"r0", lane:"skill", shape:"pill", lines:["Start: the client's", "requirement files, in sources/"], nowrite:true, docs:[{name:"Requirement files", sub:"as you received them", kind:"external"}]},
  {id:"r1", lane:"skill", shape:"skill", name:"discovery-author", tag:"list-sources.cjs lists the files first; proposes which kind of document wins; compares every topic; each gap becomes a question", stop:["Accept the","Discovery brief?"], docs:[{name:"Discovery brief", sub:"sources, authority, topics, clashes", kind:"record"}, QL]},
  {id:"r2", lane:"skill", shape:"skill", name:"brd-author", tag:"from the Discovery brief and the files it marks Used; every line says where it came from", stop:["Accept","the BRD?"], docs:[{name:"BRD", sub:"business requirements BR-01 onward"}, QL]},
  {id:"r3", lane:"skill", shape:"skill", name:"prd-author", tag:"one requirement per row, in simple words, each with its kind, the client's words and its source", stop:["Accept","the PRD?"], docs:[{name:"PRD", sub:"requirements, journey, NFRs"}, QL]},
  {id:"r4", lane:"skill", shape:"pill", lines:["Next: the Glossary"]}
]);
render("wf-gl", [
  {id:"g0", lane:"skill", shape:"pill", lines:["Start: the PRD is accepted"]},
  {id:"g1", lane:"skill", shape:"skill", name:"glossary-author", tag:"agrees one word per meaning, from the BRD and PRD", stop:["Gate 1: are the","words settled?"], docs:[{name:"Glossary gate log", sub:"the only glossary decision record", kind:"record"}]},
  {id:"g2", lane:"skill", shape:"skill", name:"glossary-author", tag:"writes the definitions", docs:[{name:"Glossary", sub:"seven pages"}]},
  {id:"g3", lane:"prog", shape:"prog", pw:248, lines:["fill-also-written-as.cjs"], sub:"run by glossary-author before Gate 2: fills \"Also written as\" from Gate 1", stop:["Gate 2: are the","definitions settled?"], back:"g2", docs:[{name:"Glossary gate log", sub:"Gate 2, with \"Also written as\"", kind:"record"}]},
  {id:"g4", lane:"prog", shape:"prog", pw:248, lines:["build-glossary-records.cjs"], sub:"fills the records from the gate log", docs:[{name:"Decision register", kind:"generated"}, {name:"Section decisions", kind:"generated"}]},
  {id:"g5", lane:"prog", shape:"prog", pw:248, lines:["build-retired-words-tables.cjs"], sub:"fills each kind page's retired-words table from the gate log", docs:[{name:"Retired-words tables", sub:"on each kind page", kind:"generated"}]},
  {id:"g6", lane:"skill", shape:"pill", lines:["Next: the data model"]}
]);
render("wf-dm", [
  {id:"m0", lane:"skill", shape:"pill", lines:["Start: the Glossary is written"]},
  {id:"m1", lane:"skill", shape:"skill", name:"things-author", tag:"every thing the product keeps information about, by its Glossary family; the decisions every family shares", stop:["Gate 1: the decisions,","then Accept","the things?"], docs:[{name:"Things file", sub:"things, by family"}, DMD]},
  {id:"m2", lane:"prog", shape:"router", lines:["Next family?", "one file for each"], no:"m5", noLabel:"every file accepted"},
  {id:"m3", lane:"skill", shape:"skill", name:"data-model-author", tag:"one family: what people do with each thing, the rules for each field, how each thing moves", stop:["Gate 2: the decisions,","then Accept the","{family} data model?"], loopTo:"m2", loopLabel:"next family", docs:[{name:"Data model file", sub:"one per family, such as lending.md"}, DMD]},
  {id:"m5", lane:"skill", shape:"skill", name:"glossary-disposition", tag:"only when a Glossary change waits: once, with every one as a batch; new words go to glossary-author together, in one run", stop:["How should the","Glossary settle","each change?"], docs:[{name:"Glossary"}, {name:"Glossary gate log", kind:"record"}]},
  {id:"m6", lane:"skill", shape:"skill", name:"both skills, in a change", tag:"things-author, then data-model-author, only when the Glossary settled a change: for the changed words only", stop:["Their own gates,","for what changed"], docs:[{name:"Things file and", sub:"data model files"}]},
  {id:"m7", lane:"skill", shape:"pill", lines:["Next: features and EPICs"]}
]);
render("wf-fe", [
  {id:"f0", lane:"skill", shape:"pill", lines:["Start: the data model is accepted"]},
  {id:"f1", lane:"skill", shape:"skill", name:"feature-author", tag:"features in the Glossary's words; \"Done when\" pieces; priority with its basis; every action and move of the data model given to a feature", stop:["Accept the","Feature catalog?","\"?\" rows first"], docs:[{name:"Feature catalog"}, QL]},
  {id:"f2", lane:"skill", shape:"skill", name:"epic-grouping-author", tag:"2 or 3 groupings; finds clashes; proposes the EPIC brief list", stop:["Pick a grouping,","settle its clashes,","confirm the EPIC","brief list"], docs:[{name:"EPIC grouping", sub:"options, pick, clashes, list", kind:"record"}, QL]},
  {id:"f3", lane:"skill", shape:"skill", name:"epic-author", tag:"register mode: copies the pick into the EPIC register", docs:[{name:"EPIC register"}]},
  {id:"f4", lane:"prog", shape:"prog", pw:248, lines:["check-register.cjs"], sub:"proves the copy; a pass counts as acceptance; if it fails, back to epic-author"},
  {id:"f5", lane:"prog", shape:"prog", pw:248, lines:["build-sequencing-mapping.cjs"], sub:"rearranges the EPIC register; a loop in the dependencies goes back to the grouping", docs:[{name:"EPIC sequencing", kind:"generated"}, {name:"EPIC mapping", kind:"generated"}]},
  {id:"f6", lane:"skill", shape:"pill", lines:["Next: the FRD workflow"]}
]);
render("wf-frd", [
  {id:"d0", lane:"skill", shape:"pill", lines:["Start: the EPIC register is written"]},
  {id:"d1", lane:"prog", shape:"router", lines:["Next capability?", "route-next-capability.cjs", "waiting, parked last"], noEnd:["Every FRD accepted:", "next, the Stories workflow"]},
  {id:"d2", lane:"skill", shape:"skill", name:"frd-author", tag:"written whole; each rule traced to a \"Done when\" piece; its Data copied word for word from the data model", docs:[{name:"FRD", sub:"one per capability"}, QL]},
  {id:"d3", lane:"prog", shape:"prog", lines:["check-frd.cjs"], stop:["Accept the FRD?","Must answer","questions first"], back:"d2", loopTo:"d1", loopLabel:"next capability"}
]);
render("wf-st", [
  {id:"s0", lane:"skill", shape:"pill", lines:["Start: the FRDs of the", "EPIC's features are accepted"]},
  {id:"s1", lane:"prog", shape:"router", lines:["Next EPIC?", "route-next-epic.cjs", "waiting, parked last"], noEnd:["Every EPIC's", "stories ready"]},
  {id:"s2", lane:"prog", shape:"router", lines:["route-brief-list.cjs:", "on the EPIC brief list?"], no:"s4"},
  {id:"s3", lane:"skill", shape:"skill", name:"epic-author", tag:"brief mode: writes the EPIC brief", stop:["Accept the","EPIC brief?"], docs:[{name:"EPIC brief"}, QL]},
  {id:"s4", lane:"skill", shape:"skill", name:"story-drafter", tag:"splits the EPIC into stories along the FRD flows, in the order they are worked", stop:["Approve the split?","all stories together"], docs:[{name:"Story list"}, QL]},
  {id:"s5", lane:"skill", shape:"skill", name:"story-groomer", tag:"scope, roles, and the FRD rules it delivers, in flow order", stop:["Accept the grooming?","all stories together"], docs:[{name:"Stories", sub:"groomed"}, QL]},
  {id:"s6", lane:"skill", shape:"skill", name:"ac-author", tag:"3 to 7 Given/When/Then scenarios, each naming the FRD rules it proves", docs:[{name:"Stories", sub:"with acceptance criteria"}, QL]},
  {id:"s7", lane:"prog", shape:"prog", lines:["coverage-check.cjs"], sub:"every rule of the EPIC's features is proved", stop:["Accept the criteria?","this marks the","stories ready"], back:"s6", loopTo:"s1", loopLabel:"next EPIC", docs:[{name:"Story list", sub:"ready marks"}]}
]);

/* one data block: every step, what it reads, looks up and writes */
var GROUPS = ["Requirements", "Glossary", "Data model", "Features and EPICs", "FRD", "Stories", "Every acceptance", "Any time"];
var STEPS = [
  {g:"Requirements", name:"list-sources.cjs", prog:true, reads:["SRC"]},
  {g:"Requirements", name:"discovery-author", reads:["SRC"], writes:["DB","QL"]},
  {g:"Requirements", name:"brd-author", reads:["DB","SRC"], writes:["BRD","QL"]},
  {g:"Requirements", name:"prd-author", reads:["BRD","DB","SRC"], writes:["PRD","QL"]},
  {g:"Glossary", name:"glossary-author", reads:["BRD","PRD"], writes:["GL","GLOG","QL"]},
  {g:"Glossary", name:"fill-also-written-as.cjs", prog:true, reads:["GLOG"], writes:["GLOG"]},
  {g:"Glossary", name:"build-glossary-records.cjs", prog:true, reads:["GLOG"], writes:["GREC"]},
  {g:"Glossary", name:"build-retired-words-tables.cjs", prog:true, reads:["GLOG"], writes:["GL"]},
  {g:"Data model", name:"things-author", reads:["GL","BRD","PRD"], writes:["TH","DMD"]},
  {g:"Data model", name:"data-model-author", reads:["TH","DMD","GL","BRD","PRD"], writes:["DMF","DMD"]},
  {g:"Data model", name:"glossary-disposition", reads:["DMD"], looks:["GL"], writes:["GL","GLOG"]},
  {g:"Features and EPICs", name:"feature-author", reads:["PRD","DMF"], looks:["GL","BRD"], writes:["FC","QL"]},
  {g:"Features and EPICs", name:"epic-grouping-author", reads:["FC"], writes:["CL","QL"]},
  {g:"Features and EPICs", name:"epic-author, register", reads:["CL"], looks:["FC"], writes:["REG"]},
  {g:"Features and EPICs", name:"check-register.cjs", prog:true, reads:["REG","CL"]},
  {g:"Features and EPICs", name:"build-sequencing-mapping.cjs", prog:true, reads:["REG","CL"], looks:["FC"], writes:["SEQ","MAP"]},
  {g:"FRD", name:"route-next-capability.cjs", prog:true, reads:["REG","FC","FRD"]},
  {g:"FRD", name:"frd-author", reads:["FC"], looks:["PRD","GL","DMF"], writes:["FRD","QL"]},
  {g:"Stories", name:"route-next-epic.cjs", prog:true, reads:["REG","SL"]},
  {g:"Stories", name:"route-brief-list.cjs", prog:true, reads:["CL"]},
  {g:"Stories", name:"epic-author, brief", reads:["REG"], looks:["BRD","PRD","FC"], writes:["ED","QL"]},
  {g:"Stories", name:"story-drafter", reads:["REG","FRD","ED"], looks:["GL","BRD","PRD"], writes:["SL","QL"]},
  {g:"Stories", name:"story-groomer", reads:["SL","ST"], looks:["FRD","FC","BRD","ED","GL"], writes:["ST","QL"]},
  {g:"Stories", name:"ac-author", reads:["ST"], looks:["FRD","GL","QL"], writes:["ST","SL","QL"]},
  {g:"Stories", name:"coverage-check.cjs", prog:true, reads:["REG","FRD","ST"]},
  {g:"Every acceptance", name:"version-log.cjs", prog:true, writes:["VL"]},
  {g:"Every acceptance", name:"traceability-map.cjs", prog:true, writes:["TM"]},
  {g:"Any time", name:"status.cjs", prog:true, reads:["VL","SL","QL","FRD","DMD"]}
];
/*DOCS*/
