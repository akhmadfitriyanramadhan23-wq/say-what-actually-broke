// Say What Actually Broke — make.fun entry
// One line of software error copy, at most 200 characters, that tells the
// user the brutal truth about what went wrong and makes them laugh.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "We lost your file. Not misplaced — lost. It is gone, and the autosave, it turns out, was also a lie.";
const MAX_CHARS = 200;

// The gate: a single line within the limit (counted in code points).
const chars = [...ENTRY].length;
if (chars > MAX_CHARS) {
  throw new Error(`entry is ${chars} chars, over the ${MAX_CHARS} limit`);
}
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");
// Read-back: what landed on disk must be exactly the gated entry.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY + "\n") throw new Error("read-back mismatch in /output/entry.txt");
console.log(`wrote ${chars} chars to /output/entry.txt`);
