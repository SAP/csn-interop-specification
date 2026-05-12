module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["js", "json", "ts", "d.ts"],
  transform: {
    "^.+\\.tsx?$": ["@swc/jest"],
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  clearMocks: true,
  coverageDirectory: "reports/coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/src/types"],
  collectCoverage: false,
  collectCoverageFrom: ["src/**/{!(types),}.ts"],
  coverageReporters: ["json", "lcov", "text"],
};
