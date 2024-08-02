import "@internal/vanilla-extract-component-lib/style.css";
import { themeClass } from "@internal/vanilla-extract-component-lib/styled";
import type { AppProps } from "next/app";
import { Noto_Sans } from "next/font/google";
import Head from "next/head";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={notoSans.className + " " + themeClass}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>

      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
