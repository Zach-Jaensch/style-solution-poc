export const defaultLocale = "en-US";
export const pseudoLocale = "pseudo";

// Add other locales as strings here, eg [defaultLocale, "en-GB", "fr-FR", pseudoLocale]
export const supportedLocales = [defaultLocale, pseudoLocale] as const;
export type SupportedLocale = (typeof supportedLocales)[number];
