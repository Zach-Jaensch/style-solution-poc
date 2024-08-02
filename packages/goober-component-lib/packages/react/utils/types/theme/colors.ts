import type { Colors } from "../../../../theme/types";
import type {
  FilterUnionByPartialString,
  Join,
  PathsToStringProps,
} from "../data-mapping";

export type ColorStringPaths = Join<PathsToStringProps<Colors>, ".">;
export type ThemeTextColors =
  | FilterUnionByPartialString<ColorStringPaths, ".text.">
  | "currentColor"
  | "white.default"
  | "black.default"
  | "inherit";

export type ThemeBackgroundColors = FilterUnionByPartialString<
  ColorStringPaths,
  ".bg."
>;
