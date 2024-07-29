import { t } from "@lingui/macro";
import {
  IconLabel,
  List as _List,
  ListItem as _ListItem,
  SearchInput as _SearchInput,
  Skeleton as _Skeleton,
} from "@safetyculture/sc-web-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";
import { ScreenReaderOnly } from "../accessibility/helpers";

interface AutocompleteResult {
  id: string;
  label: React.ReactNode;
  subLabel?: React.ReactNode;
  icon: React.JSX.Element;
  href: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  onValueChange?: (query: string) => void;
  initialValue?: string;
  autocompleteResults?: AutocompleteResult[];
  isAutocompleteResultsLoading?: boolean;
}

const SearchForm = styled.form`
  display: grid;
  max-width: 30rem;
  width: 100%;
  position: relative;
`;

const Option = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: ${(p) => p.theme.space.s2};
`;

const OptionLabel = styled(IconLabel)`
  margin-right: auto;
`;

const List = styled(_List)`
  position: absolute;
  top: calc(100% + ${(p) => p.theme.space.s1});
  left: 0;
  right: 0;

  z-index: 1;

  box-shadow: ${(p) => p.theme.shadows.md};
  border-radius: ${(p) => p.theme.radii.sm};
  background-color: ${(p) => p.theme.colors.surface3.bg.default};

  padding-block: ${(p) => p.theme.space.s2};
  gap: 0px;
`;

const ListItem = styled(_ListItem)`
  border-radius: 0px;
`;

const SearchInput = styled(_SearchInput)`
  /* clears the ‘X’ from Chrome */
  &[type="search"]::-webkit-search-decoration,
  &[type="search"]::-webkit-search-cancel-button,
  &[type="search"]::-webkit-search-results-button,
  &[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
`;

export const SearchBar = ({
  onSearch,
  onValueChange: onChange,
  initialValue = "",
  autocompleteResults,
  isAutocompleteResultsLoading,
}: SearchBarProps) => {
  const [value, setValue] = useState(initialValue);
  const [activeDescendant, setActiveDescendant] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(true);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur(event?: React.FocusEvent<HTMLFormElement>) {
    if (event && formRef.current?.contains(event.relatedTarget as Node)) {
      return;
    }
    setIsFocused(false);
  }

  function handleSubmit(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    handleBlur();
    onSearch(value);
  }

  function handleChange(newValue: string) {
    setValue(newValue);
    onChange?.(newValue);
    setActiveDescendant(null);
  }

  function handleClear() {
    handleChange("");
    onSearch("");
  }

  const label = t`Search industry, activity or categories`;

  const dataListId = useId();
  const labelId = useId();
  const inputId = useId();

  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!autocompleteResults) {
      return;
    }

    switch (event.key) {
      case "Home":
        event.preventDefault();
        setActiveDescendant(0);
        break;
      case "End":
        event.preventDefault();
        setActiveDescendant(autocompleteResults.length - 1);
        break;
      case "ArrowDown":
        event.preventDefault();
        setActiveDescendant((prev) =>
          prev == null || prev === autocompleteResults.length - 1
            ? 0
            : prev + 1,
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveDescendant((prev) =>
          prev == null || prev === 0
            ? autocompleteResults.length - 1
            : prev - 1,
        );
        break;
      case "Enter": {
        if (activeDescendant === null) {
          return;
        }

        const result = autocompleteResults[activeDescendant];
        if (!result) {
          return;
        }

        event.preventDefault();
        router.push(result.href);
        break;
      }
      case "Escape":
        event.preventDefault();
        handleChange("");
        break;
    }
  }

  const showAutocomplete =
    isFocused && autocompleteResults && autocompleteResults.length > 0;

  function getOptionId(index: number | null) {
    if (!showAutocomplete || index == null) {
      return undefined;
    }

    return `${dataListId}-${index.toLocaleString()}`;
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!formRef.current?.contains(event.target as Node)) {
        handleBlur();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <SearchForm
      ref={formRef}
      role="search"
      onSubmit={handleSubmit}
      noValidate
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
    >
      <label id={labelId} htmlFor={inputId}>
        <ScreenReaderOnly>{label}</ScreenReaderOnly>
        <SearchInput
          id={inputId}
          name="q"
          type="search"
          role="combobox"
          debounceWaitTime={0}
          placeholder={label}
          value={value}
          onChange={handleChange}
          onClearClick={handleClear}
          onKeyDown={handleKeyDown}
          list={dataListId}
          required
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={dataListId}
          aria-expanded={showAutocomplete}
          aria-activedescendant={getOptionId(activeDescendant)}
        />
      </label>

      <div role="listbox" id={dataListId} aria-labelledby={labelId}>
        {isAutocompleteResultsLoading && <LoadingResults />}
        {!isAutocompleteResultsLoading && showAutocomplete && (
          <List
            onMouseLeave={() => {
              setActiveDescendant(null);
            }}
          >
            {autocompleteResults.map((result, index) => {
              const isActive = activeDescendant === index;
              return (
                <ListItem key={result.id}>
                  <Option
                    tabIndex={-1}
                    href={result.href}
                    role="option"
                    id={getOptionId(index)}
                    aria-selected={isActive}
                    onMouseOver={() => {
                      setActiveDescendant(index);
                    }}
                  >
                    <OptionLabel icon={result.icon} variant="labelMedium">
                      {result.label}
                    </OptionLabel>

                    {result.subLabel}
                  </Option>
                </ListItem>
              );
            })}
          </List>
        )}
      </div>
    </SearchForm>
  );
};

const Skeleton = styled(_Skeleton)`
  width: ${({ chWidth }: { chWidth: number }) => chWidth}ch;
  padding-block: 0.125rem;
  display: block;
  margin-inline: ${(p) => p.theme.space.s2};
  /* A normal result is 1.25rem high, with s2 padding. Emulating with 1rem height to match the text look, and s2 + 0.125 margin, creates the same total height */
  height: 1rem;
  margin-block: calc(${(p) => p.theme.space.s2} + 0.125rem);
  flex-grow: 0;
`;

function LoadingResult() {
  // random integer between 20 and 35
  const chWidth = useRef(Math.floor(Math.random() * 16) + 20);

  return (
    <ListItem>
      <Skeleton chWidth={chWidth.current} />
    </ListItem>
  );
}

function LoadingResults() {
  return (
    <List role="presentation">
      {Array.from({ length: 5 }).map((_, i) => {
        return <LoadingResult key={i} />;
      })}
    </List>
  );
}
