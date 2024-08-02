import React, { forwardRef } from "react";
import type { FlattenSimpleInterpolation } from "styled-components";
import { SpinnerBase } from "../animations/spinner";
import type { WithThemeProps } from "../styled";
import styled, { css } from "../styled";
import pxToRem from "../utils/px-to-rem";
import { createPolymorphicComponent } from "../utils/types/polymorphic-component";
import BaseButton from "./button";
import { DEFAULT_SIZE, DEFAULT_VARIATON } from "./constants";
import type { Props, Size, StatesProps, StyleProps, Variation } from "./types";

export const iconSizeMap: Record<Size, string> = {
  lg: pxToRem(20),
  md: pxToRem(18),
  sm: pxToRem(18),
};

const sizeStyleSelector = ({
  size = DEFAULT_SIZE,
  variation = DEFAULT_VARIATON,
  theme,
}: StyleProps & WithThemeProps) => {
  const { space, radii } = theme._ui;
  const minSizeStyles: Record<Size, FlattenSimpleInterpolation> = {
    lg: css`
      min-height: ${pxToRem(48)};
      min-width: ${pxToRem(48)};
    `,
    md: css`
      min-height: ${pxToRem(40)};
      min-width: ${pxToRem(40)};
    `,
    sm: css`
      min-height: ${pxToRem(32)};
      min-width: ${pxToRem(32)};
    `,
  };
  const styles: Record<Size, FlattenSimpleInterpolation> = {
    lg: css`
      border-radius: ${radii.md};
      padding: ${space.s3} ${space.s4};
      gap: ${space.s2};
    `,
    md: css`
      border-radius: ${radii.sm};
      padding: ${space.s2} ${space.s3};
      gap: ${space.s1};
    `,
    sm: css`
      border-radius: ${radii.sm};
      padding: ${space.s1} ${space.s3};
      gap: ${space.s1};
    `,
  };

  return css`
    ${styles[size]}
    ${variation !== "inherit" && minSizeStyles[size]}
  `;
};

const stateStyleSelector = ({
  variation = DEFAULT_VARIATON,
  theme,
}: StyleProps & WithThemeProps) => {
  const { colors } = theme._ui;
  const DEFAULT_BORDER_STYLE = "border-color: transparent";

  const borderStyle: Record<Variation, string> = {
    primary: DEFAULT_BORDER_STYLE,
    secondary: "",
    tertiary: DEFAULT_BORDER_STYLE,
    success: DEFAULT_BORDER_STYLE,
    error: DEFAULT_BORDER_STYLE,
    inherit: "",
  };

  const extendedMessageStates = {
    primary: {
      hover: colors.accent.bg.hover,
      pressed: colors.accent.bg.pressed,
    },
    secondary: {
      hover: colors.accent.bg.weakerHover,
      pressed: colors.accent.bg.weakerPressed,
    },
    tertiary: {
      hover: colors.accent.bg.weakerHover,
      pressed: colors.accent.bg.weakerPressed,
    },
    success: {
      hover: colors.positive.bg.hover,
      pressed: colors.positive.bg.pressed,
    },
    error: {
      hover: colors.negative.bg.hover,
      pressed: colors.negative.bg.pressed,
    },
    inherit: { hover: "inherit", pressed: "inherit", focused: "inherit" },
  };

  const outlineBorderColor: Record<Variation, string> = {
    primary: extendedMessageStates[variation].hover,
    secondary: colors.surface.border.default,
    tertiary: colors.surface.border.default,
    success: extendedMessageStates[variation].hover,
    error: extendedMessageStates[variation].hover,
    inherit: "transparent",
  };

  const buttonStateStyles = `
      :not([disabled]) {
        &:hover {
          background: ${extendedMessageStates[variation].hover};
          ${borderStyle[variation]};
        }

        &:focus-visible {
          background: ${extendedMessageStates[variation].hover};
          outline: ${pxToRem(2)} solid ${colors.focus.default};
          outline-offset: ${pxToRem(2)};
          border: 1px solid ${outlineBorderColor[variation]};
        }

        &:active {
          background: ${extendedMessageStates[variation].pressed};
          ${borderStyle[variation]};
        }
      }`;

  return buttonStateStyles;
};

const variationStyleSelector = ({
  variation = DEFAULT_VARIATON,
  theme,
  disabled,
  isLoading,
}: StyleProps & WithThemeProps & StatesProps) => {
  const { colors } = theme._ui;
  const styles: Record<Variation, string> = {
    primary: `
      color: ${colors.white.default};
      background: ${colors.accent.bg.default};
      border-color: ${colors.accent.bg.default};
    `,
    secondary: `
      color: ${colors.accent.text.default};
      background: ${colors.surface.bg.default};
      border-color: ${colors.surface.border.default};
    `,
    tertiary: `
      color: ${colors.accent.text.default};
      background: transparent;
      border-color: transparent;
    `,
    success: `
      color: ${colors.white.default};
      background: ${colors.positive.bg.default};
      border-color: ${colors.positive.bg.default};
    `,
    error: `
      color: ${colors.white.default};
      background: ${colors.negative.bg.default};
      border-color: ${colors.negative.bg.default};
    `,
    inherit: `
      color: inherit;
      background: inherit;
      border-color: transparent;
    `,
  };

  const commonDisabledStyle = css`
    color: ${colors.surface.text.disabled};
    background: ${colors.surface.bg.disabled};
    border-color: transparent;
  `;

  const disabledStyles: Record<Variation, ReturnType<typeof css>> = {
    primary: commonDisabledStyle,
    secondary: commonDisabledStyle,
    tertiary: css`
      ${commonDisabledStyle}
      background: transparent;
    `,
    inherit: css`
      ${commonDisabledStyle}
      background: inherit;
    `,
    success: commonDisabledStyle,
    error: commonDisabledStyle,
  };

  return disabled && !isLoading ? disabledStyles[variation] : styles[variation];
};

export const buttonStyles = css<StyleProps>`
  margin: 0;
  border: 1px solid;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme._ui.font.size.label.medium};
  line-height: 22px;
  transition: background-color 200ms ease 0s;
  user-select: none;

  :not([disabled]):hover {
    cursor: pointer;
  }

  :disabled:hover {
    cursor: not-allowed;
  }

  ${sizeStyleSelector}
  ${variationStyleSelector}
  ${stateStyleSelector}
`;

export const StyledButton = styled(BaseButton)`
  ${buttonStyles}
`;

// We need to do this as spinner size and text are different
// We need to make the button height the same, when it has text or spinner
// At the moment, spinner only has fixed size for all button sizes.
const SpinnerBaseStyled = styled(SpinnerBase)`
  margin: ${pxToRem(3)} auto;
`;

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      isLoading,
      disabled,
      size = DEFAULT_SIZE,
      startIcon: startIconProp,
      endIcon: endIconProp,
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
      <StyledButton
        disabled={disabled ?? isLoading}
        isLoading={isLoading}
        ariaLabel={isLoading ? "loading" : undefined}
        size={size}
        {...props}
        ref={ref}
      >
        {isLoading ? (
          <SpinnerBaseStyled data-anchor="button-spinner" />
        ) : (
          <>
            {startIcon}
            {children}
            {endIcon}
          </>
        )}
      </StyledButton>
    );
  },
);

export default createPolymorphicComponent<"button", Props>(Button);
