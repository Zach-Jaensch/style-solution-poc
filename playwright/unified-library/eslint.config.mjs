import playwrightConfig from "@internal/eslint-config/playwright";

export default [
  ...playwrightConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
