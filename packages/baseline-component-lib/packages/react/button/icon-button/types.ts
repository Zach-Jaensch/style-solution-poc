import type { ReactElement } from "react";

import type { ButtonProps } from "..";

export type Props = Omit<
  ButtonProps,
  "startIcon" | "endIcon" | "ariaLabel" | "children"
> & {
  /** Accepts Icon component from `@safetyculture/icons-react`. */
  icon: ReactElement;
  /** Required prop on an iconButton for accessibility. Must be a meaningful text */
  ariaLabel: string;
  /** Allows for the button be rendered in a circle */
  rounded?: boolean;
};
