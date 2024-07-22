import type { SearchOptions, SearchResponse } from "@algolia/client-search";
import { z } from "zod";

// TODO retrieve this from s12 api
export const IndustryFacet = "industries.name";

//  https://safetyculture.atlassian.net/wiki/x/MYHx1Q
export const searchResponseHitSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  type: z.string(),
  imageUrl: z.string(),
  publisher: z.object({
    id: z.string(),
    logoUrl: z.string(),
    name: z.string(),
  }),
  downloadCount: z.number(),
  searchContent: z.array(z.string()),
  industries: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
    }),
  ),
  categories: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
    }),
  ),
  regions: z.array(z.string()),
  languages: z.array(z.string()),
  objectID: z.string(),
});

export const searchResponseSchema = z.object({
  hits: z.array(searchResponseHitSchema),
  nbHits: z.number(),
  page: z.number(),
  nbPages: z.number(),
  hitsPerPage: z.number(),
  processingTimeMS: z.number(),
  exhaustiveNbHits: z.boolean(),
  query: z.string(),
  params: z.string(),
  facets: z.intersection(
    z.object({
      [IndustryFacet]: z.record(z.string(), z.number()),
    }),
    z.record(z.string(), z.record(z.string(), z.number())),
  ),
}) satisfies z.ZodType<SearchResponse>;

export const searchOptionsSchema = z.object({
  // This is the current primary index. Once we load up the actual data, this can be updated.
  indexName: z.string().optional().default("digital_store"),
  query: z.string().optional().default(""),
  page: z.number().optional().default(0),
  hitsPerPage: z.number().optional().default(10),
  facets: z.array(z.string()).optional().default([IndustryFacet]),
}) satisfies z.ZodType<SearchOptions>;
