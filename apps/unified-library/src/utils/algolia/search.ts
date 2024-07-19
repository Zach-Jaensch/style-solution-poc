import {
  searchOptionsSchema,
  searchResponseSchema,
} from "@internal/zod-schema/algolia-search";
import type { FetchQueryOptions, QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { z } from "zod";
import { getAlgoliaBaseQueryKey, getAlgoliaClient } from "./client";

async function searchAlgolia({
  indexName,
  query,
  page,
  hitsPerPage,
}: z.infer<typeof searchOptionsSchema>) {
  const result = await getAlgoliaClient().initIndex(indexName).search(query, {
    page,
    hitsPerPage,
  });

  return searchResponseSchema.parse(result);
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

export function useAlgoliaSearch(
  opts: z.input<typeof searchOptionsSchema> = {},
) {
  return useQuery(searchAlgoliaQueryOptions(searchOptionsSchema.parse(opts)));
}
