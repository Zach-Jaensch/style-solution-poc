import path from "node:path";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
        style: resolve(__dirname, "packages/react/config/index.ts"),
        config: resolve(__dirname, "packages/react/config/index.ts"),
        theme: resolve(__dirname, "packages/theme/index.ts"),
        button: resolve(__dirname, "packages/react/button/index.ts"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // "@vanilla-extract/css"
      external: ["react", "react-dom", /^react\//],
      input: {
        config: resolve(__dirname, "packages/react/config/index.ts"),
        theme: resolve(__dirname, "packages/theme/index.ts"),
        button: resolve(__dirname, "packages/react/button/index.ts"),
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
