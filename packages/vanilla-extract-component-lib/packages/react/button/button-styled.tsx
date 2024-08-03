import cx from "classnames";
import React, { forwardRef } from "react";
import { createPolymorphicComponent } from "../utils/types/polymorphic-component";
import BaseButton from "./button";
import { button } from "./button-styled.css";
import { DEFAULT_SIZE } from "./constants";
import type { Props, Size } from "./types";

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      children,
      isLoading,
      disabled,
      size = DEFAULT_SIZE,
      startIcon: startIconProp,
      endIcon: endIconProp,
      variation,
      ...props
    }: Props,
    ref,
  ) => {
    const startIcon =
      startIconProp &&
      React.cloneElement<{ size: Size }>(
        startIconProp as React.ReactElement<{ size: Size }>,
        {
          size,
        },
      );

    const endIcon =
      endIconProp &&
      React.cloneElement<{ size: Size }>(
        endIconProp as React.ReactElement<{ size: Size }>,
        {
          size,
        },
      );

    return (
      <BaseButton
        className={cx(
          className,
          button({
            variation: !disabled ? variation : undefined,
            size: !disabled ? size : undefined,
          }),
        )}
        disabled={disabled ?? isLoading}
        isLoading={isLoading}
        ariaLabel={isLoading ? "loading" : undefined}
        {...props}
        ref={ref}
      >
        {isLoading ? (
          <>Loading</>
        ) : (
          <>
            {startIcon}
            {children}
            {endIcon}
          </>
        )}
      </BaseButton>
    );
  },
);

export const Bu = React.memo(Button);

export default createPolymorphicComponent<"button", Props>(Button);
