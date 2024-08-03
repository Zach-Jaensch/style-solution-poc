import React, { forwardRef } from "react";
import { tv } from "tailwind-variants";
import { createPolymorphicComponent } from "../utils/types/polymorphic-component";
import BaseButton from "./button";
import { DEFAULT_SIZE, DEFAULT_VARIATON } from "./constants";
import type { Props } from "./types";

/*
  requires IDE configuration to get the tailwind IDE intellisense to work with tailwind-variants
  ```
  "tailwindCSS.experimental.classRegex": [
    ["tv\\((([^()]*|\\([^()]*\\))*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
  ```
*/
const button = tv({
  base: [
    "m-0 border-1 flex justify-center items-center text-label-medium leading-[22px] transition-[background-color] duration-200 select-none",
    "hover:cursor-pointer",
    "disabled:hover:cursor-not-allowed",
  ],
  defaultVariants: {
    size: DEFAULT_SIZE,
    variation: DEFAULT_VARIATON,
  },
  variants: {
    size: {
      lg: "min-h-[48px] min-w-[48px] rounded-md px-s3 py-s4 gap-s2",
      md: "min-h-[40px] min-w-[40px] rounded-sm px-s2 py-s3 gap-s2",
      sm: "min-h-[32px] min-w-[32px] rounded-sm px-s1 py-s3 gap-s1",
    },
    variation: {
      primary: [
        // Only fully migrated primary as an example
        "text-white-default bg-accent-bg-default border-accent-bg-default border",
        "enabled:hover:bg-accent-bg-hover",
        "enabled:focus-visible:bg-accent-bg-hover enabled:focus-visible:outline-2 enabled:focus-visible:outline-accent-bg-hover enabled:focus-visible:border-accent-bg-hover",
        "enabled:active:bg-accent-bg-pressed",
        "disabled:bg-surface-bg-disabled disabled:border-transparent disabled:text-surface-text-disabled",
      ],
      secondary: "text-accent-default bg-white border-accent-default",
      tertiary: "text-accent-default bg-white border-accent-default",
      success: "text-white bg-success-default border-success-default",
      error: "text-white bg-error-default border-error-default",
      inherit: "text-inherit bg-inherit border-inherit",
    },
  },
});

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
      React.cloneElement<{ size: Props["size"] }>(
        startIconProp as React.ReactElement<{ size: Props["size"] }>,
        {
          size,
        },
      );

    const endIcon =
      endIconProp &&
      React.cloneElement<{ size: Props["size"] }>(
        endIconProp as React.ReactElement<{ size: Props["size"] }>,
        {
          size,
        },
      );

    return (
      <BaseButton
        className={button({
          variation: !disabled ? variation : undefined,
          size: !disabled ? size : undefined,
          className,
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

export default createPolymorphicComponent<"button", Props>(Button);
