import React, { cloneElement, forwardRef } from "react";
import type { FlattenSimpleInterpolation } from "styled-components";
import styled, { css } from "../../styled";
import type { WithThemeProps } from "../../styled";
import pxToRem from "../../utils/px-to-rem";
import { createPolymorphicComponent } from "../../utils/types/polymorphic-component";
import { Button, iconSizeMap } from "../button-styled";
import { DEFAULT_SIZE } from "../constants";
import type {
  Size as ButtonSizeProps,
  StyleProps as ButtonStyleProps,
} from "../types";
import type { Props } from "./types";

const sizeStyleSelector = ({
  size = DEFAULT_SIZE,
  theme,
}: ButtonStyleProps & WithThemeProps) => {
  const { space } = theme._ui;

  const sizeStyles: Record<ButtonSizeProps, FlattenSimpleInterpolation> = {
    lg: css`
      width: ${pxToRem(48)};
      height: ${pxToRem(48)};
    `,
    md: css`
      width: ${pxToRem(40)};
      height: ${pxToRem(40)};
    `,
    sm: css`
      width: ${pxToRem(32)};
      height: ${pxToRem(32)};
    `,
  };

  const paddingStyles: Record<ButtonSizeProps, FlattenSimpleInterpolation> = {
    lg: css`
      padding: ${space.s3};
    `,
    md: css`
      padding: ${space.s3};
    `,
    sm: css`
      padding: ${space.s2};
    `,
  };

  return css`
    ${sizeStyles[size]}
    ${paddingStyles[size]}
  `;
};

const roundedStyleSelector = ({
  rounded,
  theme,
}: WithThemeProps & Omit<Props, "icon" | "ariaLabel">) => {
  const { radii } = theme._ui;
  if (!rounded) {
    return;
  }

  return `border-radius: ${radii.full}`;
};

 export const StyledButton = styled(Button).withConfig({
  shouldForwardProp: (prop) => !["rounded"].includes(prop as string),
})<Omit<Props, "icon" | "ariaLabel">>`
  svg {
    flex-shrink: 0;
  }
  ${sizeStyleSelector}
  ${roundedStyleSelector}
`;

export const IconButton = forwardRef<HTMLButtonElement, Props>(
  ({ icon, size = DEFAULT_SIZE, ...props }, ref) => {
    return (
      <StyledButton size={size} {...props} ref={ref}>
        {cloneElement<{ size: string }>(
          icon as React.ReactElement<{ size: string }>,
          { size: iconSizeMap[size] },
        )}
      </StyledButton>
    );
  },
);

export default createPolymorphicComponent<"button", Props>(IconButton);
