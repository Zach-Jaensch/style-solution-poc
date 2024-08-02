import React, { forwardRef } from "react";
import pxToRem from "../utils/px-to-rem";
import { createPolymorphicComponent } from "../utils/types/polymorphic-component";
import BaseButton from "./button";
import { button } from "./button-styled.css";
import { DEFAULT_SIZE } from "./constants";
import type { Props, Size } from "./types";

export const iconSizeMap: Record<Size, string> = {
  lg: pxToRem(20),
  md: pxToRem(18),
  sm: pxToRem(18),
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
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
      React.cloneElement<{ size: string }>(
        startIconProp as React.ReactElement<{ size: string }>,
        {
          size: iconSizeMap[size],
        },
      );

    const endIcon =
      endIconProp &&
      React.cloneElement<{ size: string }>(
        endIconProp as React.ReactElement<{ size: string }>,
        {
          size: iconSizeMap[size],
        },
      );

    return (
      <BaseButton
        className={button({
          variation: !disabled ? variation : undefined,
          size: !disabled ? size : undefined,
        })}
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
