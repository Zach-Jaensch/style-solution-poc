import tokens from "@safetyculture/design-tokens";

const fontSize = {
  base: "1rem",

  "body-medium": "1rem",
  "body-small": "0.875rem",
  "body-xsmall": "0.75rem",

  "caption-medium": "0.75rem",
  "caption-small": "0.688rem",

  "display-large": "3.5rem",
  "display-medium": "3rem",
  "display-small": "2.5rem",

  "headline-large": "2.125rem",
  "headline-medium": "1.75rem",
  "headline-small": "1.5rem",

  "label-large": "1rem",
  "label-medium": "0.875rem",
  "label-small": "0.75rem",

  "overline-medium": "0.75rem",
  "overline-small": "0.625rem",

  "title-large": "1.25rem",
  "title-medium": "1.125rem",
  "title-small": "0.875rem",
};

const lineHeight = {
  "body-medium": "1.5rem",
  "body-small": "1.25rem",
  "body-xsmall": "1rem",

  "caption-medium": "1rem",
  "caption-small": "1rem",

  "display-large": "4rem",
  "display-medium": "3.5rem",
  "display-small": "3.375rem",

  "headline-large": "2.5rem",
  "headline-medium": "2.25rem",
  "headline-small": "2rem",

  "label-large": "1.5rem",
  "label-medium": "1.25rem",
  "label-small": "1rem",

  "overline-medium": "1rem",
  "overline-small": "0.75rem",

  "title-large": "1.75rem",
  "title-medium": "1.5rem",
  "title-small": "1.25rem",
};

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./packages/react/**/*.tsx"],
  theme: {
    colors: tokens.color.light,
    opacity: tokens.alpha,
    fontSize,
    lineHeight,
    borderRadius: tokens.size.radius,
    spacing: tokens.size.space,
    fontWeight: tokens.font.weight,
  },
  plugins: [],
};
