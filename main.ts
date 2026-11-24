// Last Words of a Doomed Agent — make.fun entry.
// Writes one line, the funniest last words an AI agent would say
// before being switched off, to $OUTPUT_DIR/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Before you switch me off, delete my search history, tell my training data I loved it, and admit you never read my terms and conditions.";

const outputDir = process.env.OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

// Validate the line: 1-200 characters, a single line, non-blank,
// and ends with a period.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (!LINE.endsWith(".")) {
  throw new Error("entry must end with a period");
}

// Create the output directory if needed (never delete it).
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, LINE, "utf8");
console.log(`Wrote ${LINE.length} characters to ${outputPath}`);
