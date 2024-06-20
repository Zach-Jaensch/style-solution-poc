import nextJest from "next/jest.js";

const createJestConfig = nextJest();

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  resetMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
};

export default createJestConfig(config);
