import { Card, HStack, Typography } from "@safetyculture/sc-web-ui/react";
import type { ReactNode } from "react";
import styled from "styled-components";

interface CarouselCardProps {
  title: string;
  description: string;
  publisherSlot: ReactNode;
  ctaSlot: ReactNode;
  tagSlot?: ReactNode;
}
export const ContentCard = ({
  title,
  description,
  publisherSlot,
  ctaSlot,
  tagSlot,
}: CarouselCardProps) => {
  return (
    <CardStyled padding="s6">
      {publisherSlot}
      <div>
        <Typography variant="headlineSmall" component="h2">
          {title}
        </Typography>
        <Typography variant="bodyMedium">{description}</Typography>
      </div>
      <HStack spacing="s4" align="center">
        {ctaSlot} {tagSlot}
      </HStack>
    </CardStyled>
  );
};

const CardStyled = styled(Card)`
  &:not(#dummy-for-specificity) {
    height: 16rem;
    align-items: flex-start;
    row-gap: ${(p) => p.theme.space.s6};
    padding: ${(p) => p.theme.space.s6} ${(p) => p.theme.space.s14};
  }
`;
