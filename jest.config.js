module.exports = {
  // General Setup
  preset: "ts-jest/presets/default",
  testEnvironment: "node",
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
