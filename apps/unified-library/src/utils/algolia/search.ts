import {
  searchOptionsSchema,
  searchResponseSchema,
} from "@internal/zod-schema/algolia-search";
import type {
  FetchQueryOptions,
  QueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { getAlgoliaBaseQueryKey, getAlgoliaClient } from "./client";

export type SearchResponse = z.infer<typeof searchResponseSchema>;

async function searchAlgolia({
  indexName,
  query,
  page,
  hitsPerPage,
  facets,
}: z.infer<typeof searchOptionsSchema>) {
  const result = await getAlgoliaClient().initIndex(indexName).search(query, {
    page,
    hitsPerPage,
    facets,
  });

  const parsedResponse = searchResponseSchema.safeParse(result);

  if (!parsedResponse.success) {
    throw fromZodError(parsedResponse.error);
  }

  return parsedResponse.data;
}

function searchAlgoliaQueryOptions(opts: z.infer<typeof searchOptionsSchema>) {
  return {
    queryKey: getAlgoliaSearchBaseQueryKey().concat([opts]),
    queryFn: () => searchAlgolia(opts),
  } satisfies FetchQueryOptions;
}

export function getAlgoliaSearchBaseQueryKey() {
  return getAlgoliaBaseQueryKey().concat(["search"]);
}

export function prefetchAlgoliaSearch(
  client: QueryClient,
  opts: z.input<typeof searchOptionsSchema> = {},
) {
  return client.prefetchQuery(
    searchAlgoliaQueryOptions(searchOptionsSchema.parse(opts)),
  );
}

export function fetchAlgoliaSearch(
  client: QueryClient,
  opts: z.input<typeof searchOptionsSchema> = {},
) {
  return client.fetchQuery(
    searchAlgoliaQueryOptions(searchOptionsSchema.parse(opts)),
  );
}

export function useAlgoliaSearch(
  opts: z.input<typeof searchOptionsSchema> = {},
  queryOpts?: Omit<
    UseQueryOptions<z.infer<typeof searchResponseSchema>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    ...queryOpts,
    ...searchAlgoliaQueryOptions(searchOptionsSchema.parse(opts)),
  });
}
