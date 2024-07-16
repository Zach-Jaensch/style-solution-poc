import { TransportProvider } from "@bufbuild/connect-query";
import type { Messages } from "@lingui/core";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import { I18nProvider } from "@lingui/react";
import { CssReset } from "@safetyculture/safetyculture-next-shared/cssreset";
import { Footer } from "@safetyculture/safetyculture-next-shared/footer";
import { Header } from "@safetyculture/safetyculture-next-shared/header";
import "@safetyculture/safetyculture-next-shared/style";
import { GlobalStyle, maggie } from "@safetyculture/sc-web-ui";
import { ConfigProvider, defaultConfig } from "@safetyculture/sc-web-ui/react";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { Noto_Sans } from "next/font/google";
import Head from "next/head";
import { useRef, useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import type { PageWithLayout } from "#/components/layouts";
import { SkipToContent } from "#/components/skip-to-content";
import { pagePropsMinimumSchema } from "#/utils/base-page-props-schema";
import { publicTransport } from "#/utils/s12/transport";
import { useLinguiInit } from "../pages-router-i18n";
import footer from "./menus/footer.json";
import header from "./menus/header.json";
import legal from "./menus/legal.json";

const NextGlobalStyles = createGlobalStyle`
  body > div:first-child,
  div#__next,
  div#__next > main:first-child {
    height: 100%;
  }

  body {
    min-width: 20rem;
    color: ${(p) => p.theme.colors.surface.text.default};
  }
`;

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

interface ExtendedAppProps {
  dehydratedState: unknown;
  translation: Messages;
}

const menus = {
  header: header,
  footer: footer,
  legal: legal,
};

interface AppPropsWithLayout extends AppProps<ExtendedAppProps> {
  Component: PageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Check that the pageProps are valid to the minimum schema, will throw an error if not
  pagePropsMinimumSchema.parse(pageProps);

  const mainRef = useRef<HTMLElement>(null);
  const [queryClient] = useState(() => new QueryClient());
  useLinguiInit(pageProps.translation);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div className={notoSans.className}>
      <Head>
        <title key="title">{t`Content Library - Templates & Courses | SafetyCulture`}</title>
        <meta
          key="description"
          name="description"
          content={t`Explore our library of templates, training courses, and content collections you can customize and easily share from SafetyCulture.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>

      <GlobalStyle />

      <I18nProvider i18n={i18n}>
        <ConfigProvider config={defaultConfig}>
          <ThemeProvider theme={maggie}>
            <NextGlobalStyles />
            <TransportProvider transport={publicTransport}>
              <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={pageProps.dehydratedState}>
                  <SkipToContent targetRef={mainRef} />
                  <CssReset>
                    <Header
                      // @ts-expect-error -- typed incorrectly
                      menus={menus}
                      customise={{
                        navigationStatus: true,
                        notification: false,
                        languageToggle: false,
                        loginAndSignUpButtonsStatus: false,
                      }}
                      locale="en"
                      website="safetyculture"
                    />
                  </CssReset>
                  <main id="main" ref={mainRef}>
                    {getLayout(<Component {...pageProps} />)}
                  </main>
                  <CssReset>
                    <Footer
                      // @ts-expect-error -- typed incorrectly
                      menus={menus}
                      customise={{
                        mainMenu: true,
                        legalMenu: true,
                        products: true,
                        title: t`SafetyCulture`,
                      }}
                      website="safetyculture"
                    />
                  </CssReset>
                </HydrationBoundary>
                <ReactQueryDevtools />
              </QueryClientProvider>
            </TransportProvider>
          </ThemeProvider>
        </ConfigProvider>
      </I18nProvider>
    </div>
  );
}
