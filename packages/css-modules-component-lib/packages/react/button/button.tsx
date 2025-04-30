import classnames from "classnames";
import React, { forwardRef } from "react";
import styles from "./button.module.css";
import type { Props } from "./types";

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    ariaLabel,
    dataAnchor,
    component = "button",
    className,
    size = "md",
    variation = "primary",
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      data-anchor={dataAnchor}
      className={classnames(
        styles.button,
        styles[size],
        styles[variation],
        className,
      )}
      {...rest}
    />
  );
});

export default Button;
