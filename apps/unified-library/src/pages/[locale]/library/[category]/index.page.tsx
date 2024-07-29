import { t } from "@lingui/macro";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { z } from "zod";
import { Breadcrumbs } from "#/components/breadcrumbs";
import { createBreadCrumbs } from "#/components/breadcrumbs/utils";
import { ContentHeader } from "#/components/content-header";
import { MockCardList } from "#/components/mock-card-list";
import { SearchBar } from "#/components/search-bar/connected";
import { supportedLocales } from "#/constants/i18n";
import { ContentContainer } from "#/layouts/content-container";
import { SidenavLayout } from "#/layouts/sidenav-layout";
import type { PageWithLayout } from "#/layouts/types";
import { loadCatalog, paramsWithLocaleSchema } from "#/pages-router-i18n";
import {
  PageDescription,
  PageTitle,
} from "#/pages/[locale]/library/[category]/index.styled";
import type { MockEnhancedStub } from "#/stubs/algolia.stub";
import { mockRetrieveCategories } from "#/stubs/algolia.stub";
import { mockRetrieveCategoryDescriptions } from "#/stubs/contentful.stub";
import { pagePropsMinimumSchema } from "#/utils/base-page-props-schema";

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
    pageDescription: z.string(),
  })
  .merge(pagePropsMinimumSchema);

type Params = z.input<typeof ctxSchema>["params"];
type PageProps = z.infer<typeof pagePropsSchema>;

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
      <PageDescription variant="bodyMedium" component="p">
        {pageDescription}
      </PageDescription>
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

      <SidenavLayout>{page}</SidenavLayout>
    </ContentContainer>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery<MockEnhancedStub[]>({
    queryKey: ["fake-query-key-for-stubbing-categories"],
    queryFn: mockRetrieveCategories,
  });

  const paths = data
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
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  _ctx,
) => {
  const ctx = ctxSchema.parse(_ctx);

  const categorySlug = ctx.params.category;
  const translation = await loadCatalog(ctx);

  if (!translation) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();
  const categories = await queryClient.fetchQuery({
    queryKey: ["fake-query-key-for-stubbing-categories"],
    queryFn: mockRetrieveCategories,
  });
  const pageTitle = categories.find((c) => c.slug === categorySlug)?.name;

  const descriptions = await queryClient.fetchQuery({
    queryKey: ["fake-query-key-for-stubbing-category-descriptions"],
    queryFn: mockRetrieveCategoryDescriptions,
  });
  const pageDescription = descriptions.find(
    (d) => d.name === pageTitle,
  )?.description;

  if (!pageTitle || !pageDescription || !categorySlug) {
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
      pageSlug: categorySlug,
    },
  };
};

export default CategoryPage;
