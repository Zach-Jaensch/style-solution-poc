import { t } from "@lingui/macro";
import { SearchInput } from "@safetyculture/sc-web-ui/react";

export const SearchBar = () => {
  return (
    <form role="search">
      <SearchInput
        aria-label={t`search categories`}
        placeholder={t`Search industry, activity or categories.`}
      />
    </form>
  );
};
