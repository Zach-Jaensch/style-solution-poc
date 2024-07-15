import type { ParsedUrlQuery } from "node:querystring";
import type { Messages } from "@lingui/core";
import { t } from "@lingui/macro";
import type { DehydratedState } from "@tanstack/react-query";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps } from "next";
import { createBreadCrumbs } from "#/components/breadcrumbs/utils";
import type { MockEnhancedStub } from "#/components/category-panel/category.stub";
import { mockStubRetrieval } from "#/components/category-panel/category.stub";
import type { PageWithLayout } from "#/components/layouts";
import { BaseLayout, SidenavLayout } from "#/components/layouts";
import { MockCardList } from "#/components/mock-card-list";
import type { SupportedLocale } from "#/constants/i18n";
import { supportedLocales } from "#/constants/i18n";
import { loadCatalog } from "#/pages-router-i18n";

const CategoryPage: PageWithLayout<PageProps> = () => {
  return <MockCardList />;
};

CategoryPage.getLayout = (page) => {
  const breadcrumbs = createBreadCrumbs([
    {
      title: t`Library`,
      href: "/library",
    },
    {
      title: page.props.pageTitle,
      href: `/library/${page.props.pageSlug}`,
    },
  ]);
  return (
    <BaseLayout breadcrumbs={breadcrumbs}>
      <SidenavLayout>{page}</SidenavLayout>
    </BaseLayout>
  );
};

interface Params extends ParsedUrlQuery {
  locale: SupportedLocale;
  category: string;
}
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

interface PageProps {
  translation: Messages;
  dehydratedState: DehydratedState;
  pageTitle: string;
  pageSlug: string;
}
export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx,
) => {
  const locale = ctx.params?.locale;
  const categorySlug = ctx.params?.category;
  const translation = await loadCatalog(locale);

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
