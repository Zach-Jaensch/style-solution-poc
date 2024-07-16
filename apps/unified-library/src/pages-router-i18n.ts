import type { Messages } from "@lingui/core";
import { i18n } from "@lingui/core";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";
import { defaultLocale, localeSchema } from "./constants/i18n";

export const paramsWithLocaleSchema = z.object({
  locale: localeSchema,
});

export const ctxWithLocaleSchema = z.object({
  params: paramsWithLocaleSchema.optional().default({}),
});

export async function loadCatalog(
  ctx: z.input<typeof ctxWithLocaleSchema>,
): Promise<Messages | null> {
  const locale = ctxWithLocaleSchema.parse(ctx).params.locale;

  try {
    const catalog = (await import(`#/locales/${locale}.po`)) as {
      messages: Messages;
    };
    return catalog.messages;
  } catch {
    return null;
  }
}

export function useLinguiInit(messages: Messages) {
  const isClient = typeof window !== "undefined";
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? defaultLocale;

  if (!isClient && locale !== i18n.locale) {
    // there is single instance of i18n on the server
    // note: on the server, we could have an instance of i18n per supported locale
    // to avoid calling loadAndActivate for (worst case) each request, but right now that's what we do
    i18n.loadAndActivate({ locale, messages });
  }
  if (isClient && !i18n.locale) {
    // first client render
    i18n.loadAndActivate({ locale, messages });
  }

  useEffect(() => {
    const localeDidChange = locale !== i18n.locale;
    if (localeDidChange) {
      i18n.loadAndActivate({ locale, messages });
    }
  }, [locale, messages]);

  return i18n;
}
