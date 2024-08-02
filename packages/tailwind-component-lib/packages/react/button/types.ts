import type { ComponentPropsWithRef, ReactElement } from "react";

export const BUTTON_SIZES = ["lg", "md", "sm"] as const;
export type Size = (typeof BUTTON_SIZES)[number];

export const BUTTON_VARIATIONS = [
  "primary",
  "secondary",
  "tertiary",
  "success",
  "error",
  "inherit",
] as const;
export type Variation = (typeof BUTTON_VARIATIONS)[number];

export interface AccessibilityProps {
  /** Label to set when a button has no text. I.e. on an Icon button */
  ariaLabel?: string;
}

export interface StatesProps {
  /** Flag to set the button on disabled state. */
  disabled?: boolean;
  /** Flag to set the button on loading state. */
  isLoading?: boolean;
}

export interface StyleProps {
  /**
   * Button size
   *
   * Default md
   */
  size?: Size;
  /** Button style variations */
  variation?: Variation;
}

export interface ComponentProps {
  /**
   * Shows icon on the left side of the button. Receives Icon component from
   * `@safetyculture/icons-react`
   */
  startIcon?: ReactElement;
  /**
   * Shows icon on the right side of the button. Receives Icon component from
   * `@safetyculture/icons-react`
   */
  endIcon?: ReactElement;
  /** Anchor for targeting with automation */
  dataAnchor?: string;

  children?: React.ReactNode;
}

export interface Props
  extends ComponentProps,
    StatesProps,
    StyleProps,
    AccessibilityProps,
    ComponentPropsWithRef<"button"> {}
