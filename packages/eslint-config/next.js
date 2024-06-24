import { fixupPluginRules } from "@eslint/compat";
import next from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import testingLibrary from "eslint-plugin-testing-library";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import lingui from "eslint-plugin-lingui";
import { baseConfig } from "./base.js";
import { TEST_GLOB } from "./utils/constants.js";

/** @type {import('eslint').Linter.FlatConfig[]} */
const nextConfig = [
  ...baseConfig,
  {
    ignores: [".next/*", "next.config.mjs"],
  },
  // React rules
  {
    plugins: {
      react: react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
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
      "testing-library": fixupPluginRules({
        rules: testingLibrary.rules,
      }),
    },
    rules: testingLibrary.configs.react.rules,
  },
  // Tanstack Query
  {
    plugins: {
      "tanstack-query": tanstackQuery,
    },
    rules: tanstackQuery.configs.recommended.rules,
  },
  // Lingui rules
  // NOTE: these rules are experimental and can be removed if found to be problematic
  {
    plugins: {
      lingui: fixupPluginRules(lingui),
    },
    rules: {
      "lingui/no-unlocalized-strings": "error",
      "lingui/t-call-in-function": "error",
      "lingui/no-single-variables-to-translate": "error",
      "lingui/no-expression-in-message": "error",
      "lingui/no-single-tag-to-translate": "error",
      "lingui/no-trans-inside-trans": "error",
    },
  },
];

export default tseslint.config(...nextConfig);
