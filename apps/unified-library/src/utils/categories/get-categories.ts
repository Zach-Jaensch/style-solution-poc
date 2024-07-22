import { CategoryType } from "@safetyculture/s12-apis-connect-web/s12/contentlibrary/v1/category_pb";
import type { ListCategoriesPublicResponse } from "@safetyculture/s12-apis-connect-web/s12/contentlibrary/v1/response_pb";
import type { QueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { publicUnifiedLibraryQueryService } from "#/utils/s12/public-unified-library";
import { publicServerSideTransport } from "#/utils/s12/transport";

export interface Category {
  name: string;
  description: string | null;
  slug: string;
}

export interface CategoryEnriched extends Category {
  count: number;
}

export const enrichedCategoriesSchema = z.array(
  z.object({
    name: z.string(),
    description: z.string().nullable(),
    slug: z.string(),
    count: z.number(),
  }),
);

export const getCategories = async (
  queryClient: QueryClient,
): Promise<Category[]> => {
  const { queryKey: listCategoriesQueryKey, queryFn: listCategoriesQueryFn } =
    publicUnifiedLibraryQueryService.listCategoriesPublic.createUseQueryOptions(
      { categoryType: CategoryType.INDUSTRY },
      { transport: publicServerSideTransport },
    );

  const listCategoriesResponse: ListCategoriesPublicResponse =
    await queryClient.fetchQuery({
      queryKey: listCategoriesQueryKey,
      queryFn: async (args) => {
        const result = await listCategoriesQueryFn(args);
        return result.toJson();
      },
    });

  return listCategoriesResponse.categories;
};

export const enrichCategories = (
  facets: Record<string, number> | null,
  categories: Category[],
): CategoryEnriched[] | null => {
  if (!facets) {
    return null;
  }

  // Enrich categories with facet data, and remove categories without a facet.
  const result: CategoryEnriched[] = [];
  Object.entries(facets).forEach(([facetName, facetCount]) => {
    const category = categories.find((c) => c.name === facetName);
    if (category) {
      result.push({
        name: facetName,
        count: facetCount,
        slug: category.slug,
        description: category.description ?? null,
      });
    }
  });

  const parsed = enrichedCategoriesSchema.safeParse(result);
  if (!parsed.success) {
    throw fromZodError(parsed.error);
  }
  return parsed.data;
};
