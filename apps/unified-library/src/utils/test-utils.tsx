import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { maggie } from "@safetyculture/sc-web-ui";
import { ConfigProvider, defaultConfig } from "@safetyculture/sc-web-ui/react";
import type { RenderOptions } from "@testing-library/react";
import { render as _render } from "@testing-library/react";
import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { defaultLocale } from "#/constants/i18n";

i18n.load({
  // Force default messages to be used
  // https://github.com/lingui/js-lingui/issues/1304#issuecomment-1742539536
  [defaultLocale]: {},
});

export function DefaultWrapper({ children }: { children: ReactNode }) {
  i18n.activate(defaultLocale);

  return (
    <I18nProvider i18n={i18n}>
      <ConfigProvider config={defaultConfig}>
        <ThemeProvider theme={maggie}>{children}</ThemeProvider>
      </ConfigProvider>
    </I18nProvider>
  );
}

/**
 * A custom render to setup providers. Extends regular render options with
 * `providerProps` to allow injecting different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
export const render = (ui: ReactNode, renderOptions?: RenderOptions) => {
  return _render(ui, {
    wrapper: DefaultWrapper,
    ...renderOptions,
  });
};
