import { t } from "@lingui/macro";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { z } from "zod";
import { createBreadCrumbs } from "#/components/breadcrumbs/utils";
import type { MockEnhancedStub } from "#/components/category-panel/category.stub";
import { mockStubRetrieval } from "#/components/category-panel/category.stub";
import type { PageWithLayout } from "#/components/layouts";
import { BaseLayout, SidenavLayout } from "#/components/layouts";
import { MockCardList } from "#/components/mock-card-list";
import { supportedLocales } from "#/constants/i18n";
import { ctxWithLocaleSchema, loadCatalog } from "#/pages-router-i18n";
import { pagePropsMinimumSchema } from "#/utils/base-page-props-schema";

const ctxSchema = z.intersection(
  ctxWithLocaleSchema,
  z.object({
    params: z.object({
      category: z.string(),
    }),
  }),
);

const pagePropsSchema = z
  .object({
    pageTitle: z.string(),
    pageSlug: z.string(),
  })
  .merge(pagePropsMinimumSchema);

type Params = z.infer<typeof ctxSchema>["params"];
type PageProps = z.infer<typeof pagePropsSchema>;

const CategoryPage: PageWithLayout<PageProps> = ({ pageTitle }: PageProps) => {
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
    <BaseLayout breadcrumbs={breadcrumbs}>
      <SidenavLayout>{page}</SidenavLayout>
    </BaseLayout>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery<MockEnhancedStub[]>({
    queryKey: ["fake-query-key-for-stubbing-categories"],
    queryFn: mockStubRetrieval,
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
  const data = await queryClient.fetchQuery({
    queryKey: ["fake-query-key-for-stubbing-categories"],
    queryFn: mockStubRetrieval,
  });

  const pageTitle = data.find((d) => d.slug === categorySlug)?.name;

  if (!pageTitle || !categorySlug) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      translation,
      dehydratedState: dehydrate(queryClient),
      pageTitle,
      pageSlug: categorySlug,
    },
  };
};

export default CategoryPage;
