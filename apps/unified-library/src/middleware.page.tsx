/* eslint-disable lingui/no-unlocalized-strings -- Strings in this file are not used in UI */

/*
 * For more info see
 * https://nextjs.org/docs/app/building-your-application/routing/internationalization
 * */
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { SupportedLocale } from "#/constants/i18n";
import { defaultLocale, supportedLocales } from "#/constants/i18n";
import { IS_PREVIEW } from "./constants/app";

const LOCALE_COOKIE = "S12_LOCALE";

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const { pathname } = request.nextUrl;

  //
  // Handle locale
  //

  const currentLocal = supportedLocales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (!currentLocal) {
    // Redirect if there is no locale
    const locale = getRequestLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    // e.g. incoming request is /products
    // The new URL is now /en/products
    const redirect = NextResponse.redirect(request.nextUrl);
    redirect.cookies.set(LOCALE_COOKIE, locale);
    return redirect;
  }

  // End locale

  //
  // Handle CSP
  //

  const [cspValue, nonce] = getCSPHeader();
  // nonce is not currently used in due to limitations with static page generation and styled components
  // however the implementation is here for future use
  // https://github.com/styled-components/styled-components/issues/3468#issuecomment-895474540
  // https://github.com/vercel/next.js/discussions/49648#discussioncomment-6889976
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspValue);

  // End CSP

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.cookies.set(LOCALE_COOKIE, currentLocal as string);
  response.headers.set("Content-Security-Policy", cspValue);

  return response;
}

function getCSPHeader(): [string, string] {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  let cspHeader = `
    default-src 'self';
    connect-src 'self' *.sentry.io/ ${IS_PREVIEW ? "https://vercel.live wss://ws-us3.pusher.com" : ""};
    script-src 'self' 'unsafe-inline' 'unsafe-eval' ${IS_PREVIEW ? "https://vercel.live" : ""};
    style-src 'self' 'unsafe-inline' ${IS_PREVIEW ? "https://vercel.live" : ""};
    worker-src 'self' blob:;
    img-src 'self' ${IS_PREVIEW ? "https://vercel.live https://vercel.com" : ""} blob: data:;
    font-src 'self' ${IS_PREVIEW ? "https://vercel.live https://assets.vercel.com" : ""};
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    frame-src ${IS_PREVIEW ? "https://vercel.live" : ""};
`;

  if (process.env.NODE_ENV === "development") {
    // This causes Safari to redirect to HTTPS for localhost.
    cspHeader = cspHeader.replace("upgrade-insecure-requests;", "");
  }

  // Replace newline characters and spaces
  return [cspHeader.replace(/\s{2,}/g, " ").trim(), nonce];
}

function getRequestLocale(request: NextRequest): SupportedLocale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE);
  if (cookieLocale && isSupportedLocale(cookieLocale.value)) {
    return cookieLocale.value;
  }

  const langHeader = request.headers.get("accept-language") ?? undefined;
  const language = new Negotiator({
    headers: { "accept-language": langHeader },
  }).language(supportedLocales.slice());

  if (language && isSupportedLocale(language)) {
    return language;
  }

  return defaultLocale;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|shared|sitemap).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

/* eslint-enable lingui/no-unlocalized-strings -- Strings in this file are not used in UI */
