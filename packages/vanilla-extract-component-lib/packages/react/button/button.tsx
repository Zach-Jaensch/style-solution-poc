import React, { forwardRef } from "react";
import { createPolymorphicComponent } from "../utils/types/polymorphic-component";
import type { Props } from "./types";

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { ariaLabel, dataAnchor, ...rest } = props;

  return (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      data-anchor={dataAnchor}
      {...rest}
    />
  );
});

export default createPolymorphicComponent<"button", Props>(Button);
