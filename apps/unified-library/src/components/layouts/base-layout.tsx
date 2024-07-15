import React from "react";
import styled from "styled-components";
import type { BreadcrumbItem } from "#/components/breadcrumbs";
import { ContentHeader } from "#/components/content-header/content-header";

interface LayoutProps {
  breadcrumbs?: BreadcrumbItem[];
  showBanner?: boolean;
  children?: React.ReactNode;
}

export default function BaseLayout({
  breadcrumbs,
  showBanner = false,
  children,
}: LayoutProps) {
  return (
    <LayoutContainer>
      <ContentHeader breadcrumbs={breadcrumbs} />
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

const PlaceholderContentBannerToImplement = styled.div`
  height: 15.625rem;
  border: 1px solid green;
`;
