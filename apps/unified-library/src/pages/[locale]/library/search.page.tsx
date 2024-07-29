import { t } from "@lingui/macro";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { z } from "zod";
import { Breadcrumbs } from "#/components/breadcrumbs";
import { createBreadCrumbs } from "#/components/breadcrumbs/utils";
import { ContentHeader } from "#/components/content-header";
import { SearchBar } from "#/components/search-bar/connected";
import { ContentContainer } from "#/layouts/content-container";
import { SidenavLayout } from "#/layouts/sidenav-layout";
import type { PageWithLayout } from "#/layouts/types";
import { loadCatalog, paramsWithLocaleSchema } from "#/pages-router-i18n";
import { mockRetrieveCategories } from "#/stubs/algolia.stub";
import { prefetchAlgoliaSearch } from "#/utils/algolia/search";
import type { pagePropsMinimumSchema } from "#/utils/base-page-props-schema";
import type { PageProps as LibraryPageProps } from "./index.page";
import LibraryPage from "./index.page";

const LibrarySearchPage: PageWithLayout<LibraryPageProps> = (props) => {
  return <LibraryPage {...props} />;
};

LibrarySearchPage.getLayout = (page) => {
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
        <SearchBar paramsSchema={paramsSchema} />
      </ContentHeader>

      <SidenavLayout>{page}</SidenavLayout>
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
type PageProps = z.infer<typeof pagePropsMinimumSchema>;

export const getServerSideProps: GetServerSideProps<PageProps, Params> = async (
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

  await prefetchAlgoliaSearch(queryClient, {
    query: ctx.params.q,
  });

  return {
    props: {
      translation,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default LibrarySearchPage;
