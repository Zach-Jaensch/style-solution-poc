import styled from "styled-components";
import type { BreadcrumbItem } from "#/components/breadcrumbs";
import { ContentHeader } from "#/components/content-header/content-header";
import { LandingBanner } from "#/components/landing-banner";

interface LayoutProps {
  breadcrumbs: BreadcrumbItem[];
  showTopSearch?: boolean;
  showBanner?: boolean;
  children?: React.ReactNode;
}

export default function BaseLayout({
  breadcrumbs,
  showTopSearch = true,
  showBanner = false,
  children,
}: LayoutProps) {
  return (
    <LayoutContainer>
      <ContentHeader breadcrumbs={breadcrumbs} showSearch={showTopSearch} />
      {showBanner && <LandingBanner />}
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
