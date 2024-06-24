import {
  supportedLocales,
  defaultLocale,
  pseudoLocale,
} from "./src/consts/i18n";

/** @type {import('@lingui/conf').LinguiConfig} */
export default {
  // Lingui configuration expects a string[] for locales
  locales: [...supportedLocales],

  pseudoLocale: pseudoLocale,
  sourceLocale: defaultLocale,
  fallbackLocales: {
    default: defaultLocale,
  },
  catalogs: [
    {
      path: "src/locales/{locale}",
      include: ["src/", "node_modules/@safetyculture/sc-web-ui/"],
    },
  ],
};
