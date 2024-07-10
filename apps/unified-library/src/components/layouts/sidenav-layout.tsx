import React from "react";
import styled from "styled-components";
import { CategoryPanel } from "#/components/category-panel/category-panel";

interface SideNavLayout {
  showBanner?: boolean;
  children?: React.ReactNode;
}

export default function SidenavLayout({ children }: SideNavLayout) {
  return (
    <LayoutContainer>
      <CategoryPanel />
      <div>{children}</div>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  column-gap: ${(p) => p.theme.space.s8};
`;