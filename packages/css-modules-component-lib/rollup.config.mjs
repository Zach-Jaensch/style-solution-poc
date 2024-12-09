import { pluginsSharedUi, rollupConfig } from "@kaizen/package-bundler";

export default rollupConfig({
  // Add extra entrypoints as required
  input: {
    index: "./packages/react/button/index.ts",
    styled: "./packages/react/styled/index.ts",
    theme: "packages/theme/index.ts",
  },
  plugins: pluginsSharedUi,
});
