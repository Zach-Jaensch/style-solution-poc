import type { ThemedCssFunction } from "styled-components";
import type { Breakpoints, Theme } from "../../theme";
import type { Inherit } from "../utils/types";

export type StyledTheme = {
  _ui: Theme;
};

export type MediaScreen = {
  /**
   * This function is used to get media screen query string base on provided
   * breakpoint. It's normally used when styling in styled components.
   *
   * @param breakpoint
   * @returns String with a css media screen query to be used in styling
   */
  above: MediaQueryHelper;
  belowQueryString: (breakpoint: Breakpoints | undefined) => string | undefined;
  aboveQueryString: (breakpoint: Breakpoints | undefined) => string | undefined;
};

export type ThemeWithUtils = Inherit<
  {
    screen: MediaScreen;
  },
  Theme
>;

export type StyledThemeWithUtils = {
  _ui: ThemeWithUtils;
};

export type MediaQueryHelper = Record<
  Breakpoints,
  ThemedCssFunction<StyledTheme>
>;
