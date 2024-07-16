import { Trans, t } from "@lingui/macro";
import { Text as Typography, VStack } from "@safetyculture/sc-web-ui/react";
import Image from "next/image";
import styled from "styled-components";
import { SearchBar } from "#/components/search-bar";

export const LandingBanner = () => {
  return (
    <Container
      align="center"
      justify="center"
      component="section"
      aria-label={t`page banner`}
    >
      <Image
        src="/assets/banner-bg-gradient.png"
        alt={t`color gradient`}
        style={{ zIndex: -1 }}
        fill
        aria-hidden
      />
      <Typography variant="headlineLarge" textAlign="center" component="h1">
        <Trans>Everything you need to get started with SafetyCulture</Trans>
      </Typography>
      <Description variant="bodyMedium" textAlign="center">
        <Trans>
          Browse thousands of ready-made resources designed to help your teams
          reach higher standards, work safely, and improve every day
        </Trans>
      </Description>
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>
    </Container>
  );
};

const Container = styled(VStack)`
  position: relative;
  row-gap: ${(p) => p.theme.space.s4};
  border-radius: ${(p) => p.theme.radii.md};
  padding: ${(p) => p.theme.space.s4};
  min-height: 15.625rem;

  overflow: hidden;
  isolation: isolate;
`;

const Description = styled(Typography)`
  max-width: 65ch;
`;

const SearchBarContainer = styled.div`
  display: grid;
  max-width: 30rem;
  width: 100%;
`;
