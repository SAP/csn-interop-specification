import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { extname } from "node:path";

const require = createRequire(import.meta.url);

/** Compare code after formatting; preserve literal values and documentation. */
export function normalizeGeneratedOutput(path, content) {
  const extension = extname(path);
  if (![".ts", ".json", ".jsonc"].includes(extension)) return content;

  return execFileSync(
    process.execPath,
    [
      require.resolve("@biomejs/biome/bin/biome"),
      "format",
      // Auto expansion preserves some input line breaks instead of canonicalizing.
      "--expand=always",
      // Generated paths are excluded from Biome's ordinary repository checks.
      // Use a synthetic root filename to format both inputs with the same rules.
      `--stdin-file-path=generated${extension}`,
    ],
    { input: content, encoding: "utf8", maxBuffer: 8 * 1024 * 1024 },
  );
}
