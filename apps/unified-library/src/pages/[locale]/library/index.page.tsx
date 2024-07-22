import { Trans, t } from "@lingui/macro";
import { Typography, VStack } from "@safetyculture/sc-web-ui/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps } from "next";
import styled from "styled-components";
import { z } from "zod";
import { Breadcrumbs } from "#/components/breadcrumbs";
import { createBreadCrumbs } from "#/components/breadcrumbs/utils";
import { CategoryPanel } from "#/components/category-panel/category-panel";
import { ContentHeader } from "#/components/content-header";
import { FeaturedContent } from "#/components/featured-content";
import { MockCardList } from "#/components/mock-card-list";
import { SearchBar } from "#/components/search-bar/connected";
import { supportedLocales } from "#/constants/i18n";
import { useTypedRouter } from "#/hooks/use-typed-router";
import { ContentContainer } from "#/layouts/content-container";
import { SidenavLayout, SidenavLayoutContent } from "#/layouts/sidenav-layout";
import type { PageWithLayout } from "#/layouts/types";
import { loadCatalog, paramsWithLocaleSchema } from "#/pages-router-i18n";
import { mockRetrieveFeaturedTemplates } from "#/stubs/commercetools.stub";
import { fetchAlgoliaSearch, useAlgoliaSearch } from "#/utils/algolia/search";
import { pagePropsMinimumSchema } from "#/utils/base-page-props-schema";
import {
  enrichCategories,
  enrichedCategoriesSchema,
  getCategories,
} from "#/utils/categories/get-categories";

const LibraryPage: PageWithLayout<PageProps> = () => {
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
  background-image: url("/assets/banner-bg-gradient.png");
  background-size: cover;
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
      <SidenavLayout>
        <CategoryPanel categories={page.props.categories} />
        <SidenavLayoutContent>{page}</SidenavLayoutContent>
      </SidenavLayout>
    </ContentContainer>
  );
};

const paramsSchema = z.intersection(
  z.object({
    q: z.string().optional().default(""),
  }),
  paramsWithLocaleSchema,
);

const ctxSchema = z.object({
  params: paramsSchema,
});

type Params = z.input<typeof ctxSchema>["params"];

const pagePropsSchema = z
  .object({ categories: enrichedCategoriesSchema })
  .merge(pagePropsMinimumSchema);
export type PageProps = z.infer<typeof pagePropsSchema>;

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
  const categories = await getCategories(queryClient);
  const searchResults = await fetchAlgoliaSearch(queryClient);
  const enrichedCategories = enrichCategories(
    searchResults.facets["industries.name"],
    categories,
  );
  if (!enrichedCategories) {
    return {
      notFound: true,
    };
  }

  await queryClient.prefetchQuery({
    queryKey: ["fake-query-key-for-featured-templates"],
    queryFn: mockRetrieveFeaturedTemplates,
  });

  return {
    props: {
      translation,
      dehydratedState: dehydrate(queryClient),
      categories: enrichedCategories,
    },
  };
};
export default LibraryPage;
