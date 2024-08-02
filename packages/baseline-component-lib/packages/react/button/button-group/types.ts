import type { ReactNode } from "react";

import type { StyleProps } from "../types";

export type Props = {
  /** Prop that sets the child buttons to attach to each other side by side. */
  isAttached?: boolean;
  /** Sets the size for all of the buttons. Accepts sizes from the design token. */
  size?: string;
  children: ReactNode[] | ReactNode;
  /** Sets the disabled state for all of the buttons. */
  disabled?: boolean;
} & StyleProps;
