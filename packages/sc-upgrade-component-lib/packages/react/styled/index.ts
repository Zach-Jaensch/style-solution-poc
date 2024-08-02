import { createElement } from "react";
import type { FunctionComponent, PropsWithChildren } from "react";
import * as styledComponents from "styled-components";
import type {
  SimpleInterpolation,
  ThemedCssFunction,
  ThemedStyledComponentsModule,
} from "styled-components";
import type { Breakpoints, Theme } from "../../theme";
import maggie from "../../theme/themes/maggie";
import type {
  MediaQueryHelper,
  MediaScreen,
  StyledTheme,
  StyledThemeWithUtils,
} from "./types";

export interface WithThemeProps {
  theme: StyledThemeWithUtils;
}

const {
  default: styled,
  css,
  keyframes,
  // eslint-disable-next-line @typescript-eslint/unbound-method -- This is how sc-web-ui is using it
  useTheme: useOriginalTheme,
  ThemeProvider: OriginalThemeProvider,
} = styledComponents as unknown as ThemedStyledComponentsModule<StyledThemeWithUtils>;

export const generateMediaQuery = (theme: Theme): MediaQueryHelper => {
  const { breakpoints } = theme;
  return (Object.keys(breakpoints) as Breakpoints[]).reduce<
    Partial<MediaQueryHelper>
  >((helper, name) => {
    const size = breakpoints[name];
    helper[name] = ((
      strings: TemplateStringsArray,
      ...interpolations: SimpleInterpolation[]
    ) => {
      return css`
        @media (min-width: ${size}) {
          ${css(strings, ...interpolations)}
        }
      `;
    }) as ThemedCssFunction<StyledTheme>;
    return helper;
  }, {}) as MediaQueryHelper;
};

export const useUITheme = () => {
  const theme = useOriginalTheme();
  return { ...theme._ui };
};

export const ThemeProvider: FunctionComponent<
  PropsWithChildren<{
    theme?: Theme;
  }>
> = ({ theme = maggie, children }) => {
  const screen = getScreens(theme);
  return createElement(
    OriginalThemeProvider,
    { theme: { _ui: { ...theme, screen } } },
    children,
  );
};

/**
 * This util is used to provide helper functions for the screen responsive
 * layout.
 *
 * @param theme - Current theme of the application
 * @returns - Screen helper functions
 */
export const getScreens = (theme: Theme): MediaScreen => {
  /**
   * This function is used to get media screen query string base on provided
   * breakpoint. It's normally used when styling in styled components.
   *
   * @returns String with a css media screen query to be used in styling
   */
  const above = generateMediaQuery(theme);

  /**
   * This function is used to get max-width media query string base on provided
   * breakpoint. It's mainly used together with useMediaQuery hook.
   *
   * Param breakpoint Target that it should be below
   *
   * @returns String with a CSS media screen query to be used in styling
   */
  const belowQueryString = (breakpoint: Breakpoints | undefined) =>
    breakpoint && `(max-width: ${theme.breakpoints[breakpoint]})`;

  /**
   * This function is used to get min-width media query string base on provided
   * breakpoint. It's mainly used together with useMediaQuery hook.
   *
   * Param breakpoint Target that it should be above
   *
   * @returns String with a css media screen query to be used in styling
   */
  const aboveQueryString = (breakpoint: Breakpoints | undefined) =>
    breakpoint && `(min-width: ${theme.breakpoints[breakpoint]})`;

  return {
    above,
    belowQueryString,
    aboveQueryString,
  };
};
const st =
  // @ts-ignore
  typeof styled === "function" ? styled : (styled.default as typeof styled);
export default st;

export { css, keyframes };
