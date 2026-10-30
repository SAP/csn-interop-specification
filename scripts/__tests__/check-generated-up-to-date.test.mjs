import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));

function check(t, path, before, after, extraFiles = {}) {
  const cwd = mkdtempSync(join(tmpdir(), "csn-generated-check-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  mkdirSync(join(cwd, "scripts"));
  mkdirSync(join(cwd, "src/generated"), { recursive: true });
  for (const script of [
    "check-generated-up-to-date.mjs",
    "generated-output-comparison.mjs",
  ]) {
    cpSync(join(root, "scripts", script), join(cwd, "scripts", script));
  }
  cpSync(join(root, "biome.json"), join(cwd, "biome.json"));
  symlinkSync(
    join(root, "node_modules"),
    join(cwd, "node_modules"),
    "junction",
  );
  writeFileSync(
    join(cwd, "package.json"),
    JSON.stringify({
      scripts: { generate: "node regenerate.mjs" },
    }),
  );
  writeFileSync(join(cwd, path), before);
  const files = { [path]: after, ...extraFiles };
  writeFileSync(
    join(cwd, "regenerate.mjs"),
    `import {writeFileSync, rmSync} from 'node:fs';
    for (const [path, content] of Object.entries(${JSON.stringify(files)})) {
      if (content === null) rmSync(path); else writeFileSync(path, content);
    }`,
  );
  const git = (args) => execFileSync("git", args, { cwd, stdio: "pipe" });
  git(["init"]);
  git(["add", "."]);
  git([
    "-c",
    "user.name=Generated check test",
    "-c",
    "user.email=test@example.com",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "-m",
    "Fixture",
  ]);
  return spawnSync(
    process.execPath,
    ["scripts/check-generated-up-to-date.mjs"],
    {
      cwd,
      encoding: "utf8",
    },
  );
}

test("accepts TypeScript formatting differences", (t) => {
  const result = check(
    t,
    "src/generated/types.ts",
    "export type Value = {label:string;};\n",
    "export type Value = {\n  label: string;\n};\n",
  );
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

test("accepts JSON formatting differences", (t) => {
  const result = check(
    t,
    "src/generated/schema.json",
    '{"type":"string"}\n',
    '{\n  "type": "string"\n}\n',
  );
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

for (const [name, path, before, after, extras] of [
  [
    "type changes",
    "src/generated/types.ts",
    "export type Value = string;\n",
    "export type Value = number;\n",
  ],
  [
    "whitespace inside literals",
    "src/generated/types.ts",
    'export type Value = "a b";\n',
    'export type Value = "a  b";\n',
  ],
  [
    "annotation changes",
    "src/generated/types.ts",
    'export interface Value { "@Semantics.text"?: boolean; }\n',
    'export interface Value { "@Semantics.uuid"?: boolean; }\n',
  ],
  [
    "schema changes",
    "src/generated/schema.json",
    '{"type":"string"}',
    '{"type":"number"}',
  ],
  [
    "documentation changes",
    "src/generated/docs.md",
    "Original documentation\n",
    "Updated documentation\n",
  ],
  [
    "deleted files",
    "src/generated/types.ts",
    "export type Value = string;\n",
    null,
  ],
  [
    "new files",
    "src/generated/types.ts",
    "export type Value = string;\n",
    "export type Value = string;\n",
    { "src/generated/new.ts": "export type Added = boolean;\n" },
  ],
]) {
  test(`rejects ${name}`, (t) => {
    const result = check(t, path, before, after, extras);
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stderr, /Generated output is out of date/);
  });
}
