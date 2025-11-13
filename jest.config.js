/** @type {import('jest').Config} */
module.exports = {
  // General Setup
  preset: "ts-jest",
  testEnvironment: "node",
  testEnvironmentOptions: {
    NODE_OPTIONS: "--experimental-vm-modules",
  },
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["ts", "js", "json", "d.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  clearMocks: true,

  // TypeScript Configuration
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: {
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
  },

  // Coverage
  coverageDirectory: "reports/coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/src/types/"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.ts", "!src/types/**", "!src/**/*.d.ts", "!src/**/*.test.ts"],
  coverageReporters: ["json", "lcov", "text", "html"],

  // Watch Plugins
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
};
