import type { Space } from "../../theme";
import type { StyledThemeWithUtils } from "../styled/types";

/**
 * GenerateSpacing will create spacing for a style name. For example ("gap",4)
 * will return css`gap: "1rem"`
 */
export const generateSpacing = (
  cssName: string,
  spacing: string | number | undefined,
  theme: StyledThemeWithUtils,
): string | undefined => {
  switch (typeof spacing) {
    case "undefined":
      return;
    case "number":
      return `${cssName}: ${spacing * 0.25}rem`;
    default:
      if (Object(theme._ui.space).hasOwnProperty(spacing)) {
        return `${cssName}: ${theme._ui.space[spacing as keyof Space]}`;
      }
      return `${cssName}: ${spacing}`;
  }
};
