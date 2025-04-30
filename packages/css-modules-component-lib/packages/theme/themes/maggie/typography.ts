import tokens from "@safetyculture/design-tokens";

import type { TypographyTokens } from "../../types";

export const typography: TypographyTokens = {
  size: tokens.size.font,
  weight: tokens.font.weight,
  family: tokens.font.family,
  lineHeight: tokens.size["line-height"],
};
