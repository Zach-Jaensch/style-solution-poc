import nextConfig from "@internal/eslint-config/next";

export default [
  ...nextConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
