import React from "react";
import styled from "styled-components";

interface LayoutProps {
  showBanner?: boolean;
  children?: React.ReactNode;
}

export default function BaseLayout({
  showBanner = false,
  children,
}: LayoutProps) {
  return (
    <LayoutContainer>
      {/* eslint-disable-next-line lingui/no-unlocalized-strings -- Placeholder */}
      <PlaceholderContentHeaderToImplement>
        Bread crumbs + search
      </PlaceholderContentHeaderToImplement>
      {showBanner && <PlaceholderContentBannerToImplement />}
      {children}
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.space.s8};
  row-gap: ${(p) => p.theme.space.s8};
`;

const PlaceholderContentHeaderToImplement = styled.div``;
const PlaceholderContentBannerToImplement = styled.div`
  height: 15.625rem;
  border: 1px solid green;
`;
