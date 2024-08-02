import type { color, shadow, size } from "@safetyculture/design-tokens";

export type FontVariantScaleGeneric = {
  large: string;
  medium: string;
  small: string;
};
export type FontVariantScaleBody = {
  medium: string;
  small: string;
  xsmall: string;
};
export type FontVariantScaleCaption = {
  medium: string;
  small: string;
};
export type FontVariantScaleOverline = {
  medium: string;
  small: string;
};
type FontSizes = {
  display: FontVariantScaleGeneric;
  headline: FontVariantScaleGeneric;
  title: FontVariantScaleGeneric;
  label: FontVariantScaleGeneric;
  body: FontVariantScaleBody;
  caption: FontVariantScaleCaption;
  overline: FontVariantScaleOverline;
  base: string;
};
type FontLineHeights = Omit<FontSizes, "base">;
type FontWeights = {
  display: string;
  headline: string;
  title: string;
  label: string;
  body: string;
  bodyStrong: string;
  caption: string;
  overline: string;
};

export type TypographyTokens = {
  size: FontSizes;
  family: {
    base: string;
  };
  weight: FontWeights;
  lineHeight: FontLineHeights;
};

export type Breakpoints = keyof typeof size.breakpoints;
export type Colors = typeof color.light;
export type Radii = typeof size.radius;
export type Shadows = typeof shadow;
export type Space = typeof size.space;

export type Theme = {
  name: string;
  breakpoints: Record<Breakpoints, string>;
  colors: Colors;
  font: TypographyTokens;
  radii: Radii;
  shadows: Shadows;
  space: Space;
};
