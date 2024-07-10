import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import styled from "styled-components";

export type PageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface LayoutProps {
  showBanner?: boolean;
  children?: React.ReactNode;
}

export const Layout = ({ showBanner = false, children }: LayoutProps) => {
  return (
    <LayoutContainer>
      {/* eslint-disable-next-line lingui/no-unlocalized-strings -- Placeholder */}
      <PlaceholderContentHeaderToImplement>
        Bread crumbs + search
      </PlaceholderContentHeaderToImplement>
      {showBanner && <PlaceholderContentBannerToImplement />}
      <Content>
        {/* eslint-disable-next-line lingui/no-unlocalized-strings -- Placeholder */}
        <PlaceholderSidebarToImplement>
          Categories go here
        </PlaceholderSidebarToImplement>
        <div>{children}</div>
      </Content>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.space.s8};
  row-gap: ${(p) => p.theme.space.s8};
`;

const Content = styled.div`
  display: flex;
  column-gap: ${(p) => p.theme.space.s8};
`;

const PlaceholderSidebarToImplement = styled.aside`
  min-width: 17.5rem;
  border: 1px solid black;
`;

const PlaceholderContentHeaderToImplement = styled.div``;
const PlaceholderContentBannerToImplement = styled.div`
  height: 15.625rem;
  border: 1px solid green;
`;
