import { fixupPluginRules } from "@eslint/compat";
import next from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { baseConfig } from "./base.js";

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
];

export default tseslint.config(...nextConfig);
