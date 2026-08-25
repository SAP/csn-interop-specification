#!/usr/bin/env node
// Validates annotation vocabulary *source* files and repository wiring.
//
// This is complementary to the unit tests in
// src/__tests__/spec-v1/schemaConventions.test.ts: those check the *generated*
// schema shape (enum notation, flatness, descriptions, extension targets), which
// is the single source of truth for schema correctness. This script instead
// checks things that are only visible in the source tree — that every
// vocabulary file is wired into spec-toolkit.config.json, has an intro `.md`,
// and that a CHANGELOG entry is pending — plus a cheap early lint on the YAML so
// authors get feedback before running the full `npm run generate` + `npm run test`.
//
// Usage: node scripts/validate-annotations.mjs   (exits non-zero on failure)

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const annotationsDir = join(repoRoot, "spec/v1/annotations");
const configPath = join(repoRoot, "spec-toolkit.config.json");
const changelogPath = join(repoRoot, "CHANGELOG.md");

/** Extension targets an annotation may declare. Keep in sync with the unit test. */
const ALLOWED_EXTENSION_TARGETS = new Set([
  "Type",
  "Entity",
  "Service",
  "Context",
  "EnumDictionaryEntry",
  "IntegerType",
  "Int16Type",
  "Integer64Type",
  "UInt8Type",
  "DecimalType",
  "DoubleType",
  "StringType",
  "LargeStringType",
  "LargeBinaryType",
]);

const problems = [];
const fail = (msg) => problems.push(msg);

// ---------------------------------------------------------------------------
// 1. Wiring: annotation files <-> spec-toolkit.config.json <-> intro .md
// ---------------------------------------------------------------------------
const config = JSON.parse(readFileSync(configPath, "utf8"));
const docsConfig = Array.isArray(config.docsConfig) ? config.docsConfig : [];

const yamlFiles = readdirSync(annotationsDir).filter((f) =>
  f.endsWith(".yaml"),
);

const configuredYamlPaths = new Set(
  docsConfig
    .map((entry) => entry.sourceFilePath)
    .filter((p) => typeof p === "string" && p.includes("/annotations/"))
    .map((p) => basename(p)),
);

for (const file of yamlFiles) {
  const name = basename(file, ".yaml");

  // Every vocabulary file must be referenced by a docsConfig entry.
  if (!configuredYamlPaths.has(file)) {
    fail(
      `spec/v1/annotations/${file} is not wired into spec-toolkit.config.json — add a "specExtension" docsConfig entry (sourceFilePath, sourceIntroFilePath, targetDocumentId, mdFrontmatter).`,
    );
  }

  // Every vocabulary file needs a sibling intro `.md`.
  if (!existsSync(join(annotationsDir, `${name}.md`))) {
    fail(
      `spec/v1/annotations/${file} has no sibling intro file spec/v1/annotations/${name}.md`,
    );
  }
}

// Dangling config entries pointing at annotation files that no longer exist.
for (const configured of configuredYamlPaths) {
  if (!yamlFiles.includes(configured)) {
    fail(
      `spec-toolkit.config.json references spec/v1/annotations/${configured}, but that file does not exist.`,
    );
  }
}

// ---------------------------------------------------------------------------
// 2. Changelog: a non-empty "## [unreleased]" section must exist
// ---------------------------------------------------------------------------
const changelog = readFileSync(changelogPath, "utf8");
const unreleasedMatch = changelog.match(
  /##\s*\[unreleased\]\s*\n([\s\S]*?)(?:\n##\s|\n#\s|$)/i,
);
if (!unreleasedMatch) {
  fail('CHANGELOG.md has no "## [unreleased]" section.');
} else if (unreleasedMatch[1].trim().length === 0) {
  fail(
    'CHANGELOG.md "## [unreleased]" section is empty — add an Added/Changed/Fixed entry for your annotation.',
  );
}

// ---------------------------------------------------------------------------
// 3. Cheap per-annotation YAML lint (early signal before generate + test)
// ---------------------------------------------------------------------------
for (const file of yamlFiles) {
  let doc;
  try {
    doc = parseYaml(readFileSync(join(annotationsDir, file), "utf8"));
  } catch (error) {
    fail(`spec/v1/annotations/${file} is not valid YAML: ${error.message}`);
    continue;
  }
  const definitions = doc?.definitions ?? {};
  for (const [key, def] of Object.entries(definitions)) {
    if (!def || typeof def !== "object") {
      continue;
    }

    const targets = def["x-extension-targets"];
    const isAnnotationKey = key.startsWith("@");
    const isTopLevel = Array.isArray(targets);

    // Top-level annotation keys must be `@`-prefixed and dot-qualified.
    if (isTopLevel && !isAnnotationKey) {
      fail(
        `${file}: definition "${key}" declares x-extension-targets but its key does not start with "@".`,
      );
    }

    // Extension targets must come from the known set.
    if (isTopLevel) {
      const unknown = targets.filter((t) => !ALLOWED_EXTENSION_TARGETS.has(t));
      if (unknown.length > 0) {
        fail(
          `${file}: "${key}" declares unknown x-extension-targets ${JSON.stringify(unknown)}. Allowed: ${[...ALLOWED_EXTENSION_TARGETS].join(", ")}.`,
        );
      }
    }

    const properties = def.properties ?? {};

    // Reject a bare string enum that is not wrapped in a `#` property.
    if (Array.isArray(def.enum)) {
      fail(
        `${file}: "${key}" declares a bare "enum" on the annotation. Enumerations must use the { "#": "VALUE" } wrapper: properties: { "#": { type: string, oneOf: [{ const, description }] } }.`,
      );
    }

    // Enum-wrapper completeness.
    if (properties && typeof properties === "object" && properties["#"]) {
      const hash = properties["#"];
      if (hash.type !== "string") {
        fail(`${file}: "${key}" has a "#" property that is not type: string.`);
      }
      if (def.additionalProperties !== false) {
        fail(
          `${file}: "${key}" uses the "#" enum wrapper but does not set additionalProperties: false.`,
        );
      }
      if (!Array.isArray(def.required) || !def.required.includes("#")) {
        fail(
          `${file}: "${key}" uses the "#" enum wrapper but does not list "#" in required.`,
        );
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
if (problems.length === 0) {
  console.log(
    `✓ Annotation validation passed (${yamlFiles.length} vocabulary files checked).`,
  );
  console.log(
    "  Note: schema-shape correctness is enforced by `npm run test` (schemaConventions.test.ts).",
  );
  process.exit(0);
}

console.error(`✗ Annotation validation found ${problems.length} issue(s):\n`);
for (const problem of problems) {
  console.error(`  - ${problem}`);
}
console.error(
  "\nSee .claude/skills/add-annotation/SKILL.md for the annotation authoring conventions.",
);
process.exit(1);
