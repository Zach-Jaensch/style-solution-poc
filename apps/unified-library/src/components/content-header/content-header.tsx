import { ChevronRight } from "@safetyculture/icons-react";
import styled from "styled-components";
import type { BreadcrumbItem } from "#/components/breadcrumbs";
import { Breadcrumbs } from "#/components/breadcrumbs";
import { SearchBar } from "#/components/search-bar";

interface ContentHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  showSearch?: boolean;
}

export const ContentHeader = ({
  breadcrumbs,
  showSearch,
}: ContentHeaderProps) => {
  return (
    <Container>
      <div>
        {breadcrumbs && (
          <Breadcrumbs
            items={breadcrumbs}
            separator={<ChevronRight size={12} />}
          />
        )}
      </div>
      {showSearch && <SearchBar />}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: auto minmax(3rem, 30rem);
  grid-template-rows: ${(p) => p.theme.space.s10};

  align-items: center;
  gap: ${(p) => p.theme.space.s8};

  padding: 0 ${(p) => p.theme.space.s1};
`;
