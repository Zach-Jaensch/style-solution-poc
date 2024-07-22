import { t } from "@lingui/macro";
import { SearchInput } from "@safetyculture/sc-web-ui/react";
import { useState } from "react";
import styled from "styled-components";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchForm = styled.form`
  display: grid;
  max-width: 30rem;
  width: 100%;
`;

export const SearchBar = ({ onSearch, initialValue = "" }: SearchBarProps) => {
  const [value, setValue] = useState(initialValue);
  function handleSubmit(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    onSearch(value);
  }

  function handleClear() {
    setValue("");
    onSearch("");
  }

  const label = t`Search industry, activity or categories`;

  return (
    <SearchForm role="search" onSubmit={handleSubmit}>
      <SearchInput
        role="searchbox"
        debounceWaitTime={0}
        aria-label={label}
        placeholder={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        onClearClick={handleClear}
      />
    </SearchForm>
  );
};
