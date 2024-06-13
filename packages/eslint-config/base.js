import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc";

/** @type {import('eslint').Linter.FlatConfig[]} */
export const baseConfig = [
  eslint.configs.recommended,
  {
    ignores: ["eslint.config.mjs"],
  },
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
  // JSDoc rules
  {
    plugins: {
      jsdoc: jsdoc,
    },
    rules: {
      "jsdoc/require-description": "error",
      "jsdoc/check-values": "error",
    },
  },
];

export default tseslint.config(...baseConfig);
