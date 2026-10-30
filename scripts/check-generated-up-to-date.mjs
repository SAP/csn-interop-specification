#!/usr/bin/env node
// Fails if the committed generated output is stale with respect to the spec sources.
//
// Rationale: `npm run generate` produces the TypeScript types under
// `src/generated/` from the spec YAML. Those generated files are committed, but
// nothing forced them to stay in sync — so a spec change could be merged while
// the generated types lagged behind (this happened on main: `@Consumption.aiHint`
// existed in the YAML but the committed `.ts` never included it).
//
// This check regenerates and compares TypeScript and JSON after formatting both
// versions with Biome. Other generated files are compared verbatim.
// Run it in CI after `npm ci`. If it fails, the fix is simply to run
// `npm run generate` and commit the result.
//
// Usage: node scripts/check-generated-up-to-date.mjs   (exits non-zero when stale)

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { normalizeGeneratedOutput } from "./generated-output-comparison.mjs";

/** Tracked paths that `npm run generate` is responsible for. */
const GENERATED_PATHS = ["src/generated"];

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" });
}

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: "inherit" });
}

// 1. Make sure we start from a clean generated tree, so any diff we see is
//    caused by regeneration and not by pre-existing uncommitted edits.
const dirtyBefore = git([
  "status",
  "--porcelain",
  "--",
  ...GENERATED_PATHS,
]).trim();
if (dirtyBefore) {
  console.error(
    "✗ Generated files have uncommitted changes before regeneration:\n" +
      dirtyBefore +
      "\n\nCommit or stash them first, then re-run this check.",
  );
  process.exit(1);
}

const trackedPaths = git(["ls-files", "-z", "--", ...GENERATED_PATHS])
  .split("\0")
  .filter(Boolean);
const before = new Map(
  trackedPaths.map((path) => [path, readFileSync(path, "utf8")]),
);

// 2. Regenerate.
console.log("Running `npm run generate`…");
run("npm", ["run", "generate"]);

// 3. Formatting-only differences do not make generated output stale.
const changedPaths = trackedPaths.filter((path) => {
  if (!existsSync(path)) return true;
  const after = readFileSync(path, "utf8");
  const original = before.get(path);
  if (original === after) return false;
  return (
    normalizeGeneratedOutput(path, original) !==
    normalizeGeneratedOutput(path, after)
  );
});
const addedPaths = git([
  "ls-files",
  "--others",
  "--exclude-standard",
  "-z",
  "--",
  ...GENERATED_PATHS,
])
  .split("\0")
  .filter(Boolean);

if (changedPaths.length || addedPaths.length) {
  console.error(
    "\n✗ Generated output is out of date. `npm run generate` produced changes in:\n",
  );
  if (changedPaths.length) {
    console.error(git(["--no-pager", "diff", "--stat", "--", ...changedPaths]));
  }
  for (const path of addedPaths) console.error(`New generated file: ${path}`);
  console.error(
    "Run `npm run generate` and commit the result so the generated types match the spec.",
  );
  process.exit(1);
}

console.log(
  "✓ Generated output is up to date with the spec sources after formatting.",
);
