import type { ParsedUrlQuery } from "node:querystring";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps, GetStaticPaths } from "next";
import { categoryStub } from "#/components/category-panel/category.stub";
import { BaseLayout, SidenavLayout } from "#/components/layouts";
import type { PageWithLayout } from "#/components/layouts";
import type { SupportedLocale } from "#/constants/i18n";
import { supportedLocales } from "#/constants/i18n";
import { loadCatalog } from "#/pages-router-i18n";
import { formatForUrl } from "#/utils/url-utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Placeholder
interface PageProps {}

interface Params extends ParsedUrlQuery {
  locale: SupportedLocale;
  category: string;
}

/** TODO Delete when first page is implemented */
const CategoryTestPage: PageWithLayout = () => {
  // eslint-disable-next-line lingui/no-unlocalized-strings -- mock
  return <span>Pretend there is stuff here</span>;
};

CategoryTestPage.getLayout = (page) => {
  return (
    <BaseLayout>
      <SidenavLayout>{page}</SidenavLayout>
    </BaseLayout>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = categoryStub
    .map((c) => c.name)
    .map((category) =>
      supportedLocales.map((locale) => ({
        params: {
          locale,
          category: formatForUrl(category),
        },
      })),
    )
    .flat();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetServerSideProps<PageProps, Params> = async (
  ctx,
) => {
  const locale = ctx.params?.locale;
  const translation = await loadCatalog(locale);

  if (!translation) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["fake-query-key-for-stubbing-categories"],
    queryFn: () => categoryStub,
  });

  return {
    props: {
      translation,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CategoryTestPage;
