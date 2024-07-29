import assert from "node:assert";
import path from "node:path";
import { fixupPluginRules } from "@eslint/compat";
import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import { findWorkspaceDir } from "@pnpm/find-workspace-dir";
// @ts-expect-error -- No types supplied
import eslintComments from "eslint-plugin-eslint-comments";
// @ts-expect-error -- No types supplied
import importPlugin from "eslint-plugin-import";
// @ts-expect-error -- No types supplied
import jest from "eslint-plugin-jest";
import tsdoc from "eslint-plugin-tsdoc";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";
import { TEST_GLOB, TS_GLOB } from "../utils/constants.mjs";

const workspaceDir = await findWorkspaceDir(import.meta.url);
assert(workspaceDir);
const gitignorePath = path.resolve(workspaceDir, ".gitignore");

/** @type {import("typescript-eslint").ConfigWithExtends[]} */
export const baseConfig = [
  includeIgnoreFile(gitignorePath),
  eslint.configs.recommended,
  {
    rules: {
      eqeqeq: ["error", "smart"],
    },
  },
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  // Import rules
  {
    plugins: {
      // Doesn't support ESLint 9.x.
      import: fixupPluginRules(importPlugin),
    },
    rules: importPlugin.configs.recommended.rules,
  },
  {
    ...importPlugin.configs.typescript,
    rules: {
      "import/consistent-type-specifier-style": "error",
      // Currently has unknown issues with flat config
      // https://github.com/import-js/eslint-plugin-import/issues/2556
      "import/namespace": "off",
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
  // TSDoc rules
  {
    files: [TS_GLOB],
    plugins: {
      tsdoc: tsdoc,
    },
    rules: {
      "tsdoc/syntax": "error",
    },
  },
  // Jest rules
  {
    files: [TEST_GLOB],
    ...jest.configs["flat/recommended"],
  },
  // Unicorn rules
  {
    plugins: {
      unicorn: unicorn,
    },
    rules: {
      "unicorn/filename-case": "error",
      "unicorn/prefer-node-protocol": "error",
      "unicorn/throw-new-error": "error",
    },
  },
  // Comment rules
  {
    plugins: {
      "eslint-comments": eslintComments,
    },
    rules: {
      ...eslintComments.configs.recommended.rules,
      "eslint-comments/require-description": "error",
    },
  },
];

export default tseslint.config(...baseConfig);
