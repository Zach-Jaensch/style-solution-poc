import { t } from "@lingui/macro";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps } from "next";
import { z } from "zod";
import { createBreadCrumbs } from "#/components/breadcrumbs/utils";
import type { PageWithLayout } from "#/components/layouts";
import { BaseLayout, SidenavLayout } from "#/components/layouts";
import { MockCardList } from "#/components/mock-card-list";
import { supportedLocales } from "#/constants/i18n";
import { useTypedRouter } from "#/hooks/use-typed-router";
import { ctxWithLocaleSchema, loadCatalog } from "#/pages-router-i18n";
import { mockRetrieveCategories } from "#/stubs/algolia.stub";
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

  return <MockCardList data={data?.hits} />;
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

  return {
    props: {
      translation,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default LibraryPage;
