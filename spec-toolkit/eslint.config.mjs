import { withCustomConfig } from "@sap/eslint-config";
import { configs as tsConfigs } from "@typescript-eslint/eslint-plugin";

const conf = withCustomConfig([
  {
    ignores: ["dist"],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["src/**/*.ts"],
    ...tsConfigs.recommendedTypeChecked,
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
    },
  },
]);

export default conf;
