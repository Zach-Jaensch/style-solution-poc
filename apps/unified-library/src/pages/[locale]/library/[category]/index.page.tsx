import { t } from "@lingui/macro";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { z } from "zod";
import { Breadcrumbs } from "#/components/breadcrumbs";
import { createBreadCrumbs } from "#/components/breadcrumbs/utils";
import { CategoryPanel } from "#/components/category-panel";
import { ContentHeader } from "#/components/content-header";
import { MockCardList } from "#/components/mock-card-list";
import { SearchBar } from "#/components/search-bar/connected";
import { supportedLocales } from "#/constants/i18n";
import { ContentContainer } from "#/layouts/content-container";
import { SidenavLayout, SidenavLayoutContent } from "#/layouts/sidenav-layout";
import type { PageWithLayout } from "#/layouts/types";
import { loadCatalog, paramsWithLocaleSchema } from "#/pages-router-i18n";
import {
  PageDescription,
  PageTitle,
} from "#/pages/[locale]/library/[category]/index.styled";
import { fetchAlgoliaSearch } from "#/utils/algolia/search";
import { pagePropsMinimumSchema } from "#/utils/base-page-props-schema";
import {
  enrichCategories,
  enrichedCategoriesSchema,
  getCategories,
} from "#/utils/categories/get-categories";

const paramsSchema = z.intersection(
  z.object({
    q: z.string().optional().default(""),
    category: z.string(),
  }),
  paramsWithLocaleSchema,
);

const ctxSchema = z.object({
  params: paramsSchema,
});

const pagePropsSchema = z
  .object({
    pageTitle: z.string(),
    pageSlug: z.string(),
    pageDescription: z.string().nullable(),
    categories: enrichedCategoriesSchema,
  })
  .merge(pagePropsMinimumSchema);
type PageProps = z.infer<typeof pagePropsSchema>;
type Params = z.input<typeof ctxSchema>["params"];

const CategoryPage: PageWithLayout<PageProps> = ({
  pageTitle,
  pageDescription,
}: PageProps) => {
  return (
    <>
      <Head>
        <title key="title">{t`${pageTitle} | SafetyCulture Library`}</title>
        <meta
          key="description"
          name="description"
          content={t`Discover free customizable templates and training courses for ${pageTitle} from the SafetyCulture library.`}
        />
      </Head>
      <PageTitle variant="headlineLarge" component="h1">
        {pageTitle}
      </PageTitle>
      {pageDescription && (
        <PageDescription variant="bodyMedium" component="p">
          {pageDescription}
        </PageDescription>
      )}
      <MockCardList />
    </>
  );
};

CategoryPage.getLayout = (page) => {
  const props = pagePropsSchema.parse(page.props);

  const breadcrumbs = createBreadCrumbs([
    {
      title: t`Library`,
      href: "/library",
    },
    {
      title: props.pageTitle,
      href: `/library/${props.pageSlug}`,
    },
  ]);
  return (
    <ContentContainer>
      <ContentHeader>
        <Breadcrumbs items={breadcrumbs} />
        <SearchBar paramsSchema={paramsSchema} />
      </ContentHeader>

      <SidenavLayout>
        <CategoryPanel categories={page.props.categories} />
        <SidenavLayoutContent>{page}</SidenavLayoutContent>
      </SidenavLayout>
    </ContentContainer>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const queryClient = new QueryClient();

  const categories = await getCategories(queryClient);
  const paths = categories
    .map((category) =>
      supportedLocales.map((locale) => ({
        params: {
          locale,
          category: category.slug,
        },
      })),
    )
    .flat();

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  _ctx,
) => {
  const ctx = ctxSchema.parse(_ctx);

  const pageSlug = ctx.params.category;
  const translation = await loadCatalog(ctx);

  if (!translation) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();
  const categories = await getCategories(queryClient);
  const matchedCategory = categories.find((c) => c.slug === pageSlug);
  if (!matchedCategory) {
    return {
      notFound: true,
    };
  }
  const pageTitle = matchedCategory.name;
  const pageDescription = matchedCategory.description ?? null;

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

  return {
    props: {
      translation,
      dehydratedState: dehydrate(queryClient),
      pageTitle,
      pageDescription,
      pageSlug,
      categories: enrichedCategories,
    },
  };
};

export default CategoryPage;
