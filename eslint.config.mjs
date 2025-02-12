import { withCustomConfig } from "@sap/eslint-config";

export default withCustomConfig([
  {
    ignores: [
      "dist",
      "build",
      "spec-toolkit",
      ".docusaurus",
      "tmp",
      "src/types/",
      "src/types/v1/CSN-Interop-Effective.ts",
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
