import playwright from "eslint-plugin-playwright";
import tseslint from "typescript-eslint";
import { baseConfig } from "./base.mjs";

/** @type {import("eslint").Linter.FlatConfig[]} */
const playwrightConfig = [
  ...baseConfig,
  {
    files: ["tests/**"],
    ...playwright.configs["flat/recommended"],
  },
];

export default tseslint.config(...playwrightConfig);
