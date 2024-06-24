import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Text, TextProps } from "@safetyculture/sc-web-ui/react";
import { useRouter } from "next/router";
import { SupportedLocale } from "../consts/i18n";
import { UrlObject } from "url";

type Params = {
  locale: SupportedLocale;
  [key: string]: string | string[];
};

type LinkProps = {
  variant?: TextProps["variant"];
} & Omit<TextProps, "variant"> &
  Omit<NextLinkProps, "locale" | "as" | "legacyBehavior">;

function prefixPathname(prefix: string, pathname: string) {
  let localizedHref = "/" + prefix;

  // Avoid trailing slashes
  if (/^\/(\?.*)?$/.test(pathname)) {
    pathname = pathname.slice(1);
  }

  localizedHref += pathname;

  return localizedHref;
}

// Taken from next-intl. If we find issues with navigation, we can use the next-intl package, or similar
// https://github.com/amannn/next-intl/blob/main/packages/next-intl/src/shared/utils.tsx#L63
function prefixHref(href: UrlObject | string, prefix: string) {
  let prefixedHref;
  if (typeof href === "string") {
    prefixedHref = prefixPathname(prefix, href);
  } else {
    prefixedHref = { ...href };
    if (href.pathname) {
      prefixedHref.pathname = prefixPathname(prefix, href.pathname);
    }
  }

  return prefixedHref;
}

export function Link({
  href,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  onMouseEnter,
  onTouchStart,
  onClick,
  ...props
}: LinkProps) {
  const { locale } = useRouter().query as Params;

  return (
    <NextLink
      href={prefixHref(href, locale)}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart}
      onClick={onClick}
    >
      <Text component="span" variant="inherit" {...props} />
    </NextLink>
  );
}
