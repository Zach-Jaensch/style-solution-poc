import path from "node:path";
import { resolve } from "node:path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vanillaExtractPlugin(),
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],

  build: {
    target: "esnext",
    minify: false,
    sourcemap: true,
    lib: {
      entry: {
        theme: resolve(__dirname, "packages/theme/index.ts"),
        button: resolve(__dirname, "packages/react/button/index.ts"),
        styled: resolve(__dirname, "packages/react/styled/index.css.ts"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // "@vanilla-extract/css"
      external: ["react", "react-dom", /^react\//],
      input: {
        theme: resolve(__dirname, "packages/theme/index.ts"),
        button: resolve(__dirname, "packages/react/button/index.ts"),
        styled: resolve(__dirname, "packages/react/styled/index.css.ts"),
      },
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },

  define: { "process.env.NODE_ENV": '"production"' },
});
