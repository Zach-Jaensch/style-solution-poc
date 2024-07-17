import type { UrlObject } from "node:url";
import type { TypographyProps } from "@safetyculture/sc-web-ui/react";
import { Typography } from "@safetyculture/sc-web-ui/react";
import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import { useTypedRouter } from "#/hooks/use-typed-router";
import { paramsWithLocaleSchema } from "#/pages-router-i18n";

type LinkProps = {
  variant?: TypographyProps["variant"];
} & Omit<TypographyProps, "variant"> &
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

function BaseLink({ href, ...props }: LinkProps) {
  const { locale } = useTypedRouter(paramsWithLocaleSchema).query;
  return <NextLink href={prefixHref(href, locale)} {...props} />;
}

export const Link = ({ ...props }: LinkProps) => (
  <Typography component={BaseLink} variant="inherit" {...props} />
);
