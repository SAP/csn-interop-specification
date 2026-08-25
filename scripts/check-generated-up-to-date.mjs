#!/usr/bin/env node
// Fails if the committed generated output is stale with respect to the spec sources.
//
// Rationale: `npm run generate` produces the TypeScript types under
// `src/generated/` from the spec YAML. Those generated files are committed, but
// nothing forced them to stay in sync — so a spec change could be merged while
// the generated types lagged behind (this happened on main: `@Consumption.aiHint`
// existed in the YAML but the committed `.ts` never included it).
//
// This check regenerates and then verifies that no committed generated file
// changed. Run it in CI after `npm ci`. If it fails, the fix is simply to run
// `npm run generate` and commit the result.
//
// Usage: node scripts/check-generated-up-to-date.mjs   (exits non-zero when stale)

import { execFileSync } from "node:child_process";

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

// 2. Regenerate.
console.log("Running `npm run generate`…");
run("npm", ["run", "generate"]);

// 3. Any diff now means the committed output was stale.
const diff = git(["status", "--porcelain", "--", ...GENERATED_PATHS]).trim();
if (diff) {
  console.error(
    "\n✗ Generated output is out of date. `npm run generate` produced changes in:\n",
  );
  console.error(
    git(["--no-pager", "diff", "--stat", "--", ...GENERATED_PATHS]),
  );
  console.error(
    "Run `npm run generate` and commit the result so the generated types match the spec.",
  );
  process.exit(1);
}

console.log("✓ Generated output is up to date with the spec sources.");
