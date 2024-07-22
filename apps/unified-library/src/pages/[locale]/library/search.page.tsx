import { t } from "@lingui/macro";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { z } from "zod";
import { Breadcrumbs } from "#/components/breadcrumbs";
import { createBreadCrumbs } from "#/components/breadcrumbs/utils";
import { CategoryPanel } from "#/components/category-panel/category-panel";
import { ContentHeader } from "#/components/content-header";
import { SearchBar } from "#/components/search-bar/connected";
import { ContentContainer } from "#/layouts/content-container";
import { SidenavLayout, SidenavLayoutContent } from "#/layouts/sidenav-layout";
import type { PageWithLayout } from "#/layouts/types";
import { loadCatalog, paramsWithLocaleSchema } from "#/pages-router-i18n";
import { fetchAlgoliaSearch } from "#/utils/algolia/search";
import { pagePropsMinimumSchema } from "#/utils/base-page-props-schema";
import {
  enrichCategories,
  enrichedCategoriesSchema,
  getCategories,
} from "#/utils/categories/get-categories";
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
  query: paramsSchema,
});

type Params = z.input<typeof ctxSchema>["params"];
const pagePropsSchema = z
  .object({ categories: enrichedCategoriesSchema })
  .merge(pagePropsMinimumSchema);
export type PageProps = z.infer<typeof pagePropsSchema>;

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
  const categories = await getCategories(queryClient);
  const searchResults = await fetchAlgoliaSearch(queryClient, {
    query: ctx.query.q,
  });
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
      categories: enrichedCategories,
    },
  };
};

export default LibrarySearchPage;
