#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { basename } from "path";
import minimist from "minimist";

import { parseCode } from "./lib/tokenizer.js";
import { Generator } from "./lib/generator.js";

const args = minimist(process.argv.slice(2), {
  boolean: ["help", "line", "file"],
  alias: {
    h: "help",
    p: "pattern",
    o: "output",
    l: "line",
    f: "file",
  },
});

if (args.help) {
  console.log(
    readFileSync(__dirname + "/help.txt")
      .toString()
      .trim()
  );
  return;
}

if (args._.length != 1) {
  console.error("No file.");
  return;
}

var text = readFileSync(args._[0]).toString();

var tokens = parseCode(text);

var g = new Generator({
  addLineNumber: args.line,
  addFileHeader: args.file,
  file: basename(args._[0]),
});

if (args.pattern === undefined) {
  args.pattern = "cpp"; // default pattern
}

require(`./lib/patterns/${args.pattern}.js`).applyToGenerator(g);

g.generate(tokens);

var md = g.doc.join("\n");

if (args.o) {
  writeFileSync(args.o, md);
} else {
  console.log(md);
}

//console.log(tokens);
