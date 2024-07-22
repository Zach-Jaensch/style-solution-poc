import { fixupPluginRules } from "@eslint/compat";
import next from "@next/eslint-plugin-next";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import jsxA11y from "eslint-plugin-jsx-a11y";
import lingui from "eslint-plugin-lingui";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import testingLibrary from "eslint-plugin-testing-library";
import tseslint from "typescript-eslint";
import { STUB_GLOB, TEST_GLOB } from "../utils/constants.js";
import { baseConfig } from "./base.mjs";

/** @type {import("eslint").Linter.FlatConfig[]} */
const nextConfig = [
  ...baseConfig,
  // React rules
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    plugins: {
      "react-hooks": fixupPluginRules(reactHooks),
    },
    rules: reactHooks.configs.recommended.rules,
  },
  // Next.js rules
  {
    plugins: {
      // Doesn't support ESLint 9.x.
      "@next/next": fixupPluginRules(next),
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "error",
    },
  },
  // Accessibility rules
  {
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: jsxA11y.configs.recommended.rules,
  },
  // Testing Library rules
  {
    files: [TEST_GLOB],
    plugins: {
      // Doesn't support ESLint 9.x.
      "testing-library": fixupPluginRules({
        rules: testingLibrary.rules,
      }),
    },
    rules: testingLibrary.configs.react.rules,
  },
  // Tanstack Query
  {
    plugins: {
      "@tanstack/query": tanstackQuery,
    },
    rules: tanstackQuery.configs.recommended.rules,
  },
  // Lingui rules
  // NOTE: these rules are experimental and can be removed if found to be problematic
  {
    plugins: {
      lingui: fixupPluginRules(lingui),
    },
    ignores: [STUB_GLOB, TEST_GLOB],
    rules: {
      "lingui/no-expression-in-message": "error",
      "lingui/no-single-tag-to-translate": "error",
      "lingui/no-single-variables-to-translate": "error",
      "lingui/no-trans-inside-trans": "error",
      "lingui/no-unlocalized-strings": "error",
      "lingui/t-call-in-function": "error",
    },
  },
];

export default tseslint.config(...nextConfig);
