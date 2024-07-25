import { Plural, Trans, t } from "@lingui/macro";
import { ArrowDownToBracket } from "@safetyculture/icons-react";
import {
  Carousel,
  HStack,
  PolymorphicButton,
  Thumbnail,
  Typography,
} from "@safetyculture/sc-web-ui/react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Link } from "#/components/link";
import { mockRetrieveFeaturedTemplates } from "#/stubs/commercetools.stub";
import { ContentCard } from "./content-card";

export const FeaturedContent = () => {
  const { data: featuredContent } = useQuery({
    queryKey: ["fake-query-key-for-featured-templates"],
    queryFn: mockRetrieveFeaturedTemplates,
  });

  if (!featuredContent || featuredContent.length === 0) {
    return null;
  }

  return (
    <Container>
      <Carousel
        controls="always"
        indicators
        aria-label={t`featured content`}
        slidesPerView={1}
      >
        {featuredContent.map((feature) => (
          <ContentCard
            key={feature.link}
            title={feature.title}
            description={feature.description}
            publisherSlot={
              <HStack align="center" spacing="s2">
                <Thumbnail src={feature.publisher.logoUrl} />
                <Trans context="denotes the publisher of a piece of content">
                  by
                  <Link href={feature.publisher.url}>
                    {feature.publisher.name}
                  </Link>
                </Trans>
              </HStack>
            }
            ctaSlot={
              <PolymorphicButton component={StyledLink} href={feature.link}>
                <Typography variant={"labelMedium"} color="white.default">
                  <Trans>Get template</Trans>
                </Typography>
              </PolymorphicButton>
            }
            tagSlot={
              <HStack spacing="s1">
                <ArrowDownToBracket size={16} />
                <Typography variant={"labelSmall"}>
                  <Plural
                    value={feature.downloadCount}
                    one="# Download"
                    other="# Downloads"
                  />
                </Typography>
              </HStack>
            }
          />
        ))}
      </Carousel>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: ${(p) => p.theme.space.s10};
`;

const StyledLink = styled(Link)`
  min-width: fit-content;
  text-decoration: none;
`;
