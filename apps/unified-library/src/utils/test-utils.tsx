import { ReactNode } from "react";
import { RenderOptions, render as _render } from "@testing-library/react";
import { ConfigProvider, defaultConfig } from "@safetyculture/sc-web-ui/react";
import { maggie } from "@safetyculture/sc-web-ui";
import { ThemeProvider } from "styled-components";

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
export const render = (ui: ReactNode, renderOptions?: RenderOptions) => {
  return _render(
    <ConfigProvider config={defaultConfig}>
      <ThemeProvider theme={maggie}>{ui}</ThemeProvider>
    </ConfigProvider>,
    renderOptions,
  );
};
