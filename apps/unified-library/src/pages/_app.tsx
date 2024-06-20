import type { AppProps } from "next/app";
import { Noto_Sans } from "next/font/google";
import Head from "next/head";
import { ConfigProvider, defaultConfig } from "@safetyculture/sc-web-ui/react";
import { GlobalStyle, maggie } from "@safetyculture/sc-web-ui";
import { ThemeProvider } from "styled-components";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SafetyCulture</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <ConfigProvider config={defaultConfig}>
        <ThemeProvider theme={maggie}>
          <main className={notoSans.className}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </ConfigProvider>
    </>
  );
}
