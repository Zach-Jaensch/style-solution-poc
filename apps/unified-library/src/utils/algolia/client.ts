import type { QueryKey } from "@tanstack/react-query";
import algolia from "algoliasearch/lite";
import { z } from "zod";
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from "#/constants/app";

const id = z.string().parse(ALGOLIA_APP_ID);
const key = z.string().parse(ALGOLIA_API_KEY);

export function getAlgoliaClient() {
  return algolia(id, key);
}

export function getAlgoliaBaseQueryKey(): QueryKey {
  return ["algolia"];
}
