import { Trans, t } from "@lingui/macro";
import { Typography, VStack } from "@safetyculture/sc-web-ui/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import styled from "styled-components";
import { z } from "zod";
import { Breadcrumbs } from "#/components/breadcrumbs";
import { createBreadCrumbs } from "#/components/breadcrumbs/utils";
import { ContentHeader } from "#/components/content-header";
import { FeaturedContent } from "#/components/featured-content";
import { MockCardList } from "#/components/mock-card-list";
import { SearchBar } from "#/components/search-bar/connected";
import { supportedLocales } from "#/constants/i18n";
import { useTypedRouter } from "#/hooks/use-typed-router";
import { ContentContainer } from "#/layouts/content-container";
import { SidenavLayout } from "#/layouts/sidenav-layout";
import type { PageWithLayout } from "#/layouts/types";
import { ctxWithLocaleSchema, loadCatalog } from "#/pages-router-i18n";
import { mockRetrieveCategories } from "#/stubs/algolia.stub";
import { mockRetrieveFeaturedTemplates } from "#/stubs/commercetools.stub";
import {
  prefetchAlgoliaSearch,
  useAlgoliaSearch,
} from "#/utils/algolia/search";
import type { pagePropsMinimumSchema } from "#/utils/base-page-props-schema";

const LibraryPage: PageWithLayout = () => {
  const query = useTypedRouter(paramsSchema).query.q;
  const { data } = useAlgoliaSearch({
    query,
  });

  return (
    <>
      <FeaturedContent />
      <MockCardList data={data?.hits} />
    </>
  );
};

const Description = styled(Typography)`
  max-width: 65ch;
`;

const LandingBannerContainer = styled(VStack)`
  position: relative;
  row-gap: ${(p) => p.theme.space.s4};
  border-radius: ${(p) => p.theme.radii.md};
  padding: ${(p) => p.theme.space.s4};
  min-height: 15.625rem;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  isolation: isolate;
`;

LibraryPage.getLayout = (page) => {
  const breadcrumbs = createBreadCrumbs([
    {
      title: t`Library`,
      href: "/library",
    },
  ]);

  return (
    <ContentContainer>
      <ContentHeader>
        <Breadcrumbs items={breadcrumbs} />
      </ContentHeader>

      <LandingBannerContainer component="section" aria-label={t`page banner`}>
        <Image
          src="/assets/banner-bg-gradient.png"
          alt={t`color gradient`}
          style={{ zIndex: -1 }}
          fill
          aria-hidden
          priority
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

        <SearchBar paramsSchema={paramsSchema} />
      </LandingBannerContainer>

      <SidenavLayout>{page}</SidenavLayout>
    </ContentContainer>
  );
};

const paramsSchema = z.object({
  q: z.string().optional().default(""),
});

const ctxSchema = z.intersection(
  ctxWithLocaleSchema,
  z.object({
    params: paramsSchema,
  }),
);

type Params = z.input<typeof ctxSchema>["params"];
export type PageProps = z.infer<typeof pagePropsMinimumSchema>;

export const getStaticPaths: GetStaticPaths = () => {
  const paths = supportedLocales.map((locale) => ({
    params: {
      locale,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  _ctx,
) => {
  const ctx = ctxSchema.parse(_ctx);

  const translation = await loadCatalog(ctx);

  if (!translation) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["fake-query-key-for-stubbing-categories"],
    queryFn: mockRetrieveCategories,
  });

  await prefetchAlgoliaSearch(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ["fake-query-key-for-featured-templates"],
    queryFn: mockRetrieveFeaturedTemplates,
  });

  return {
    props: {
      translation,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default LibraryPage;
