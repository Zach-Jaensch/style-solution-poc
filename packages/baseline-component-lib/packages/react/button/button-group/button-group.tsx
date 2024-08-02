import React, { Children, cloneElement, isValidElement } from "react";
import type { FunctionComponent, ReactElement } from "react";
import styled from "../../styled";
import type { WithThemeProps } from "../../styled";
import type { Variation } from "../types";
import type { ButtonProps } from "..";
import type { Props } from "./types";

interface LocalStyleProps {
  $disabled?: boolean;
}

const borderStyleSelector = ({
  variation = "primary",
  theme,
  $disabled,
}: Omit<Props, "children"> & WithThemeProps & LocalStyleProps) => {
  const { colors } = theme._ui;
  const styles: Record<Variation, string> = {
    primary: $disabled
      ? colors.surface.border.disabled
      : colors.accent.border.default,
    secondary: $disabled
      ? colors.surface.border.disabled
      : colors.surface.border.default,
    tertiary: "transparent",
    success: $disabled
      ? colors.surface.border.disabled
      : colors.positive.border.default,
    error: $disabled
      ? colors.surface.border.disabled
      : colors.negative.border.default,
    inherit: "transparent",
  };

  return styles[variation];
};

const attachedStyles = ({
  isAttached,
  theme,
  ...props
}: Omit<Props, "children"> & WithThemeProps) => {
  const attachedStyle = `

    & > *:first-of-type:not(:last-of-type) {
        border-end-end-radius: 0;
        border-start-end-radius: 0;
        border-right: 0;
    }
    & > *:not(:first-of-type):not(:last-of-type) {
        border-radius: 0;
        border-right: 0;
        border-left: 1px solid ${borderStyleSelector({
          theme,
          ...props,
        })};

    }
    & > *:not(:first-of-type):last-of-type {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
        border-left: 1px solid ${borderStyleSelector({
          theme,
          ...props,
        })};
    }
  `;

  const defaultStyle = `

    && > *:not(:first-of-type) {
        margin-left: ${theme._ui.space.s1};
    }
  `;
  return isAttached ? attachedStyle : defaultStyle;
};

const ButtonsWrapper = styled.div<LocalStyleProps & Props>`
  display: flex;
  align-items: center;
  ${attachedStyles}
`;

export const ButtonGroup: FunctionComponent<Props> = ({
  children,
  isAttached,
  size,
  variation,
  disabled,
  ...props
}) => {
  const arrayChildren = Children.toArray(children);

  return (
    <ButtonsWrapper
      isAttached={isAttached}
      variation={variation}
      // this is using transient prop. It's used to prevent style props being rendered in the DOM.
      // we don't use filterProps util because other elements supports it i.e buttons.
      // ref: https://styled-components.com/docs/api#transient-props
      $disabled={disabled}
      {...props}
    >
      {arrayChildren.reduce((res: ReactElement[], child) => {
        if (!isValidElement(child)) {
          return res;
        }

        const childProps: ButtonProps = child.props as ButtonProps;

        res.push(
          cloneElement<ButtonProps>(child as ReactElement<ButtonProps>, {
            key: `button-group-${res.length.toString()}`,
            variation: variation ?? childProps.variation,
            disabled: disabled ?? childProps.disabled,
            size: size ?? childProps.size,
          }),
        );
        return res;
      }, [])}
    </ButtonsWrapper>
  );
};

export default ButtonGroup;
