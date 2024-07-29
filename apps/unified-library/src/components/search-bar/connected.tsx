/*
 * This component is not a pattern we wish to promote. It is a connected
 * component that is tightly coupled to the query params only because the search
 * bar is used in the `getLayout` function of the page, which is not a react
 * component, and thus cannot use the required hooks.
 */
import { Trans } from "@lingui/macro";
import {
  ArrowDownToBracket,
  ClipboardChecklist,
} from "@safetyculture/icons-react";
import { IconLabel } from "@safetyculture/sc-web-ui";
import { useMemo, useState } from "react";
import type { z } from "zod";
import { SearchBar as SearchBarUI } from "#/components/search-bar";
import { useDebouncedValue } from "#/hooks/use-debounced-value";
import { useTypedRouter } from "#/hooks/use-typed-router";
import { useUpdateSearchParams } from "#/hooks/use-update-search-params";
import { paramsWithLocaleSchema } from "#/pages-router-i18n";
import type { SearchResponse } from "#/utils/algolia/search";
import { useAlgoliaSearch } from "#/utils/algolia/search";
import { ScreenReaderOnly } from "../accessibility/helpers";

const requiredSchema = paramsWithLocaleSchema;
type RequiredSchema = z.Schema<
  z.output<typeof requiredSchema>,
  z.ZodTypeDef,
  z.input<typeof requiredSchema>
>;
interface SearchBarProps<T extends RequiredSchema> {
  paramsSchema: T;
}

function mapAlgoliaHitToAutocompleteResult(locale: string) {
  return (hit: SearchResponse["hits"][number]) => ({
    id: hit.objectID,
    label: (
      <>
        <ScreenReaderOnly>{hit.type}:</ScreenReaderOnly> {hit.title}
      </>
    ),
    subLabel: (
      <IconLabel icon={<ArrowDownToBracket aria-hidden />} variant="labelSmall">
        <ScreenReaderOnly>
          <Trans comment="SR only label in search autocomplete suggestion">
            ; Download count:
          </Trans>
        </ScreenReaderOnly>{" "}
        {hit.downloadCount.toString()}
      </IconLabel>
    ),
    icon: <ClipboardChecklist aria-hidden />,
    href: `/${locale}/library/content/${hit.slug}`,
  });
}

export function SearchBar<T extends RequiredSchema>({
  paramsSchema,
}: SearchBarProps<T>) {
  const [searchParams, updateSearchParams] =
    useUpdateSearchParams(paramsSchema);
  const router = useTypedRouter(paramsSchema);

  function handleSearch(query: string) {
    const newSearch = new URLSearchParams(searchParams);
    newSearch.delete("q");
    if (query) {
      newSearch.append("q", query);
    }
    updateSearchParams(newSearch);
  }

  const initialValue = searchParams.get("q") ?? undefined;

  const [value, setValue] = useState("");
  const debouncedValue = useDebouncedValue(value, 350);

  const showAutocomplete = value.length > 0;

  const { data, isLoading } = useAlgoliaSearch(
    {
      query: debouncedValue,
      hitsPerPage: 5,
    },
    {
      enabled: showAutocomplete,
    },
  );

  const isAutocompleteResultsLoading =
    isLoading || (showAutocomplete && value !== debouncedValue);

  const locale = router.query.locale;
  const results = useMemo(
    () =>
      showAutocomplete
        ? data?.hits.map(mapAlgoliaHitToAutocompleteResult(locale))
        : undefined,
    [data, showAutocomplete, locale],
  );

  return (
    <SearchBarUI
      onSearch={handleSearch}
      onValueChange={setValue}
      initialValue={initialValue}
      autocompleteResults={results}
      isAutocompleteResultsLoading={isAutocompleteResultsLoading}
    />
  );
}
