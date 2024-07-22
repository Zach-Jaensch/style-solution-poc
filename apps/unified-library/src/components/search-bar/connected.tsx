/*
 * This component is not a pattern we wish to promote. It is a connected
 * component that is tightly coupled to the query params only because the search
 * bar is used in the `getLayout` function of the page, which is not a react
 * component, and thus cannot use the required hooks.
 */
import type { z } from "zod";
import { SearchBar as SearchBarUI } from "#/components/search-bar";
import { useUpdateSearchParams } from "#/hooks/use-update-search-params";

interface SearchBarProps<T extends z.Schema> {
  paramsSchema: T;
}

export function SearchBar<T extends z.Schema>({
  paramsSchema,
}: SearchBarProps<T>) {
  const [searchParams, updateSearchParams] =
    useUpdateSearchParams(paramsSchema);

  function handleSearch(query: string) {
    const newSearch = new URLSearchParams(searchParams);
    newSearch.delete("q");
    if (query) {
      newSearch.append("q", query);
    }
    updateSearchParams(newSearch);
  }

  const initialValue = searchParams.get("q") ?? undefined;
  return <SearchBarUI onSearch={handleSearch} initialValue={initialValue} />;
}
