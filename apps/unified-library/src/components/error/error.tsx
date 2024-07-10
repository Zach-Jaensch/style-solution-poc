import { Trans } from "@lingui/macro";
// eslint-disable-next-line import/namespace -- issue with eslint-plugin-import
import { ArrowLongLeft } from "@safetyculture/icons-react";
import { Button, Text as Typography } from "@safetyculture/sc-web-ui";
import { Poppins } from "next/font/google";
import styled from "styled-components";

interface ErrorProps {
  code: number | string;
  title: string;
  description: string;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Error({ code, title, description }: ErrorProps) {
  return (
    <RootContainer>
      <Surface>
        <ErrorCode className={poppins.className}>
          <ErrorLines />
          {code}
        </ErrorCode>
        <H1 className={poppins.className}>{title}</H1>
        <Description variant={"bodyMedium"}>{description}</Description>
        {/* TODO use the Link Component here when polymorphic buttons are merged in SC Web UI */}
        <BackButton size={"lg"} startIcon={<ArrowLongLeft />}>
          <Trans>Back to home</Trans>
        </BackButton>
      </Surface>
    </RootContainer>
  );
}

const RootContainer = styled.div`
  height: 100%;

  display: grid;
  place-content: center;
  grid-template: 1fr / 1fr;
  overflow: hidden;

  padding: ${(p) => p.theme.space.s6} ${(p) => p.theme.space.s4};
  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    padding: ${(p) => p.theme.space.s12};
  }
`;

const Surface = styled.div`
  border-radius: ${(p) => p.theme.radii.lg};
  // Colour not available as Token
  background-color: #f3f6fb;
  padding: ${(p) => p.theme.space.s4};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  font-size: 1.5625rem;
  text-align: center;

  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    font-size: 1.9375rem;
  }
`;

const ErrorCode = styled.span`
  position: relative;
  isolation: isolate;

  font-size: 7rem;
  font-weight: 700;
  line-height: 1;

  color: ${(p) => p.theme.colors.white.default};

  @media (min-width: ${(p) => p.theme.breakpoints.xs}) {
    font-size: 10rem;
  }
  @media (min-width: ${(p) => p.theme.breakpoints.sm}) {
    font-size: 13rem;
  }
  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    font-size: 16rem;
  }
  @media (min-width: ${(p) => p.theme.breakpoints.lg}) {
    font-size: 19rem;
  }
`;

const ErrorLines = styled.div`
  // Colour not available as Token
  background-color: #00d1ff;
  border-radius: 3.125rem 0 0 3.125rem;
  height: 17.5%;
  left: -10%;
  position: absolute;
  top: 48%;
  transform: translateY(-50%);
  width: 100vw;
  z-index: -1;

  &::before,
  &::after {
    border-radius: inherit;
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
  }

  &::before {
    background-color: ${(p) => p.theme.colors.accent.bg.default};
    bottom: calc(100% + 30%);
  }

  &::after {
    // Colour not available as Token
    background-color: #ffd700;
    top: calc(100% + 30%);
  }
`;

const Description = styled(Typography)`
  max-width: 65ch;
  text-align: center;
  margin-top: ${(p) => p.theme.space.s4};
`;

const BackButton = styled(Button)`
  &:not(:first-child) {
    margin-top: ${(p) => p.theme.space.s8};
  }
`;
