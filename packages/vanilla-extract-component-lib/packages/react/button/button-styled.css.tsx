import { recipe } from "@vanilla-extract/recipes";
import { theme } from "../styled/index.css";
import pxToRem from "../utils/px-to-rem";
import { DEFAULT_SIZE, DEFAULT_VARIATON } from "./constants";

export const button = recipe({
  base: {
    margin: "0",
    border: "1px solid",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: theme.font.size.label.medium,
    lineHeight: "22px",
    transition: "background-color 200ms ease 0s",
    userSelect: "none",

    ":disabled": {
      color: theme.colors.surface.text.disabled,
      background: theme.colors.surface.bg.disabled,
      borderColor: "transparent",
    },
  },
  variants: {
    size: {
      lg: {
        minHeight: pxToRem(48),
        minWidth: pxToRem(48),
        borderRadius: theme.radii.md,
        padding: `${theme.space.s3} ${theme.space.s4}`,
        gap: theme.space.s2,
      },
      md: {
        minHeight: pxToRem(40),
        minWidth: pxToRem(40),
        borderRadius: theme.radii.sm,
        padding: `${theme.space.s2} ${theme.space.s3}`,
        gap: theme.space.s2,
      },
      sm: {
        minHeight: pxToRem(32),
        minWidth: pxToRem(32),
        borderRadius: theme.radii.sm,
        padding: `${theme.space.s1} ${theme.space.s3}`,
        gap: theme.space.s1,
      },
    },
    variation: {
      primary: {
        color: theme.colors.white.default,
        background: theme.colors.accent.bg.default,
        borderColor: theme.colors.accent.bg.default,
        ":hover": {
          background: theme.colors.accent.bg.hover,
          borderColor: "transparent",
        },
        ":focus-visible": {
          background: theme.colors.accent.bg.hover,
          outline: `${pxToRem(2)} solid ${theme.colors.focus.default}`,
          outlineOffset: pxToRem(2),
          border: `1px solid ${theme.colors.accent.bg.hover}`,
        },
        ":active": {
          background: theme.colors.accent.bg.pressed,
          borderColor: "transparent",
        },
      },
      secondary: {
        color: theme.colors.accent.text.default,
        background: theme.colors.surface.bg.default,
        borderColor: theme.colors.surface.border.default,
        ":hover": {
          background: theme.colors.accent.bg.weakerHover,
          borderColor: "transparent",
        },
        ":focus-visible": {
          background: theme.colors.accent.bg.weakerHover,
          outline: `${pxToRem(2)} solid ${theme.colors.focus.default}`,
          outlineOffset: pxToRem(2),
          border: `1px solid ${theme.colors.surface.border.default}`,
        },
        ":active": {
          background: theme.colors.accent.bg.weakerPressed,
          borderColor: "transparent",
        },
      },
      tertiary: {
        color: theme.colors.accent.text.default,
        background: "transparent",
        borderColor: "transparent",
        ":hover": {
          background: theme.colors.accent.bg.weakerHover,
          borderColor: "transparent",
        },
        ":focus-visible": {
          background: theme.colors.accent.bg.weakerHover,
          outline: `${pxToRem(2)} solid ${theme.colors.focus.default}`,
          outlineOffset: pxToRem(2),
          border: `1px solid ${theme.colors.surface.border.default}`,
        },
        ":active": {
          background: theme.colors.accent.bg.weakerPressed,
          borderColor: "transparent",
        },
        ":disabled": {
          background: "transparent",
        },
      },
      success: {
        color: theme.colors.white.default,
        background: theme.colors.positive.bg.default,
        borderColor: theme.colors.positive.bg.default,
        ":hover": {
          background: theme.colors.positive.bg.hover,
          borderColor: "transparent",
        },
        ":focus-visible": {
          background: theme.colors.positive.bg.hover,
          outline: `${pxToRem(2)} solid ${theme.colors.focus.default}`,
          outlineOffset: pxToRem(2),
          border: `1px solid ${theme.colors.positive.bg.hover}`,
        },
        ":active": {
          background: theme.colors.positive.bg.pressed,
          borderColor: "transparent",
        },
      },
      error: {
        color: theme.colors.white.default,
        background: theme.colors.negative.bg.default,
        borderColor: theme.colors.negative.bg.default,
        ":hover": {
          background: theme.colors.negative.bg.hover,
          borderColor: "transparent",
        },
        ":focus-visible": {
          background: theme.colors.negative.bg.hover,
          outline: `${pxToRem(2)} solid ${theme.colors.focus.default}`,
          outlineOffset: pxToRem(2),
          border: `1px solid ${theme.colors.negative.bg.hover}`,
        },
        ":active": {
          background: theme.colors.negative.bg.pressed,
          borderColor: "transparent",
        },
      },
      inherit: {
        color: "inherit",
        background: "inherit",
        borderColor: "transparent",
        ":hover": {
          background: "inherit",
          borderColor: "transparent",
        },
        ":focus-visible": {
          background: "inherit",
          outline: `${pxToRem(2)} solid ${theme.colors.focus.default}`,
          outlineOffset: pxToRem(2),
          border: "1px solid transparent",
        },
        ":active": {
          background: "inherit",
          borderColor: "transparent",
        },
        ":disabled": {
          background: "inherit",
        },
      },
    },
  },
  defaultVariants: {
    size: DEFAULT_SIZE,
    variation: DEFAULT_VARIATON,
  },
});
