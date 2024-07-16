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
import { supportedLocales } from "#/constants/i18n";
import { loadCatalog } from "#/pages-router-i18n";

const LibraryPage: PageWithLayout = () => {
  return <MockCardList />;
};

LibraryPage.getLayout = (page) => {
  const breadcrumbs = createBreadCrumbs([
    {
      title: t`Library`,
      href: "/library",
    },
  ]);

  return (
    <BaseLayout breadcrumbs={breadcrumbs} showBanner showTopSearch={false}>
      <SidenavLayout>{page}</SidenavLayout>
    </BaseLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
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
}
export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const translation = await loadCatalog(ctx);

  if (!translation) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["fake-query-key-for-stubbing-categories"],
    queryFn: mockStubRetrieval,
  });

  return {
    props: {
      translation,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default LibraryPage;
