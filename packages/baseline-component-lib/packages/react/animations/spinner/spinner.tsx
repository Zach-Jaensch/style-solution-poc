import React from "react";
import type { FunctionComponent } from "react";

import styled, { css, keyframes } from "../../styled";
import type { Props } from "./types";

const DEFAULT_TIMEOUT = 300;

const bounceKeyFrames = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
`;

export const bounce = (timeout = DEFAULT_TIMEOUT, option: string) => css`
  animation: ${bounceKeyFrames} ${timeout}ms ${option ? option : ""} ease-out;
`;

const Container = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bounce = styled.div<Props>`
  background: ${(props) => props.color || "currentColor"};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 100%;
  display: inline-block;
  ${bounce(1400, "infinite")};
`;

const BounceOne = styled(Bounce)`
  animation-delay: -0.32s;
`;

const BounceTwo = styled(Bounce)`
  animation-delay: -0.16s;
`;

export const Spinner: FunctionComponent<Props> = ({
  size = "1rem",
  color,
  ...rest
}) => {
  return (
    <Container data-anchor="loading-icon" {...rest}>
      <BounceOne color={color} size={size} />
      <BounceTwo color={color} size={size} />
      <Bounce color={color} size={size} />
    </Container>
  );
};

export default Spinner;
