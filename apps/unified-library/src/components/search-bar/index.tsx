import { t } from "@lingui/macro";
import { SearchInput } from "@safetyculture/sc-web-ui/react";

export const SearchBar = () => (
  <SearchInput placeholder={t`Search industry, activity or categories.`} />
);
