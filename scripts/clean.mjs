import { readdirSync, rmdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const preservedFiles = new Set([
  "index.md",
  "index.mdx",
  "_category_.json",
  "consumption.md",
]);

function cleanDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      cleanDirectory(path);
      try {
        rmdirSync(path);
      } catch (error) {
        if (error.code !== "ENOTEMPTY") {
          throw error;
        }
      }
    } else if (!preservedFiles.has(entry.name)) {
      console.debug(`Deleting: ${path}`);
      rmSync(path, { force: true });
    }
  }
}

console.info(" ");
console.info(
  "==========================================================================",
);
console.info("CLEANUP PROJECT");
console.info(
  "==========================================================================",
);

for (const directory of [
  "./build",
  "./dist",
  "./docs/spec-v1/",
  "./static/spec-v1",
]) {
  console.info(`Cleaning up: ${directory}`);
  try {
    cleanDirectory(directory);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

console.info(
  "--------------------------------------------------------------------------",
);
console.info("SUCCESS: Cleanup done.");
console.info(
  "--------------------------------------------------------------------------",
);
console.info(" ");
