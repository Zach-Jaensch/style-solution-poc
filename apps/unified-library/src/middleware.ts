/*
 * For more info see
 * https://nextjs.org/docs/app/building-your-application/routing/internationalization
 * */
import { type NextRequest, NextResponse } from "next/server";

import Negotiator from "negotiator";
import {
  supportedLocales,
  defaultLocale,
  SupportedLocale,
} from "./consts/i18n";

const LOCALE_COOKIE = "S12_LOCALE";

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const currentLocal = supportedLocales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (currentLocal) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, currentLocal);
    return response;
  }

  // Redirect if there is no locale
  const locale = getRequestLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en/products
  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set(LOCALE_COOKIE, locale);
  return response;
}

function getRequestLocale(request: NextRequest): SupportedLocale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE);
  if (cookieLocale && isSupportedLocale(cookieLocale.value)) {
    return cookieLocale.value;
  }

  const langHeader = request.headers.get("accept-language") || undefined;
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
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
