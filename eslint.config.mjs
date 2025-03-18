import { withCustomConfig } from "@sap/eslint-config";

export default withCustomConfig([
  {
    ignores: [
      "dist",
      "build",
      "spec-toolkit",
      ".docusaurus",
      "tmp",
      "src/generated/spec-v1/types/csn-interop-effective.ts",
    ],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
