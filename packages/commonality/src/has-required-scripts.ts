import type { Check } from "commonality";
import { hasJsonFile } from "commonality-checks-recommended";

const check = hasJsonFile("package.json", {
  scripts: {
    eslint: "eslint",
    typecheck: "tsc",
  },
});

export default {
  ...check,
  validate: async (ctx) => {
    const result = await check.validate(ctx);

    // This package is excluded as it has no code.
    if (ctx.package.relativePath.endsWith("typescript-config")) {
      return true;
    }

    // Replaces the default message with something more specific.
    if (
      typeof result === "object" &&
      result.message === "File does not contain expected content"
    ) {
      // Replace the default message with something more specific.
      result.message = `"package.json" does not contain required scripts`;
    }

    return result;
  },
} satisfies Check;
