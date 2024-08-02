import type { HTMLAttributes } from "react";

import type { Inherit } from "../../utils/types";

export type Props = Inherit<
  {
    /**
     * CSS size property string
     *
     * @default 1rem
     */
    size?: string;
    /**
     * CSS color string
     *
     * @default currentColor
     */
    color?: string;
  },
  HTMLAttributes<HTMLDivElement>
>;
