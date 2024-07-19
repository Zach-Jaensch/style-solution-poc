import { t } from "@lingui/macro";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { z } from "zod";
import { createBreadCrumbs } from "#/components/breadcrumbs/utils";
import type { PageWithLayout } from "#/components/layouts";
import { BaseLayout, SidenavLayout } from "#/components/layouts";
import { ctxWithLocaleSchema, loadCatalog } from "#/pages-router-i18n";
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
    <BaseLayout breadcrumbs={breadcrumbs}>
      <SidenavLayout>{page}</SidenavLayout>
    </BaseLayout>
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
