import fs from "fs";
import { pathsToModuleNameMapper } from "ts-jest";

const { compilerOptions } = JSON.parse(fs.readFileSync("./tsconfig.json"));

export default {
  // General Setup
  preset: "ts-jest/presets/default-esm",
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { useESM: true }),
  testEnvironment: "node",
  testEnvironmentOptions: {
    NODE_OPTIONS: "--experimental-vm-modules",
  },
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["js", "json", "ts", "d.ts"],
  moduleDirectories: ["node_modules"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  clearMocks: true,
  resetMocks: false,
  resetModules: false,

  // Coverage
  coverageDirectory: "reports/coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/src/types"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  collectCoverage: false,
  collectCoverageFrom: ["src/**/{!(types),}.ts"],
  coverageReporters: ["json", "lcov", "text"],

  // Jest Plugins
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
};
