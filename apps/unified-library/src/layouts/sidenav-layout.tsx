import styled from "styled-components";
import { CategoryPanel } from "#/components/category-panel/category-panel";

interface SideNavLayout {
  showBanner?: boolean;
  children?: React.ReactNode;
}

export function SidenavLayout({ children }: SideNavLayout) {
  return (
    <LayoutContainer>
      <CategoryPanel />
      <Content>{children}</Content>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  column-gap: ${(p) => p.theme.space.s8};
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;
