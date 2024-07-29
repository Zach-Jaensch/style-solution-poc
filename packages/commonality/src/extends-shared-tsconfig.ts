import type { Check } from "commonality";
import { hasJsonFile } from "commonality-checks-recommended";

const check = hasJsonFile("tsconfig.json", {
  extends: ["@internal/typescript-config"],
});

export default {
  ...check,
  validate: async (ctx) => {
    const result = await check.validate(ctx);

    // This package is excluded as it has no code.
    if (ctx.package.relativePath.endsWith("typescript-config")) {
      return true;
    }

    return result;
  },
} satisfies Check;
