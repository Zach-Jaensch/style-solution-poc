// Lazily typed as this is all it was doing. We can more strictly type this if we need to, but could mean keeping it in sync with the actual types of 3rd party libs.
// https://github.com/colinhacks/zod/issues/52#issuecomment-629897855
import type { Messages } from "@lingui/core";
import type { DehydratedState } from "@tanstack/react-query";
import { z } from "zod";

export const pagePropsMinimumSchema = z.object({
  dehydratedState: z.unknown().optional() as z.ZodType<DehydratedState>,
  translation: z.unknown() as z.ZodType<Messages>,
});
