import { HStack } from "@safetyculture/sc-web-ui/react";
import type { ReactNode } from "react";
import styled from "styled-components";
import { Link } from "#/components/link";

export interface BreadcrumbItem {
  title: ReactNode;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator: ReactNode;
}

export const Breadcrumbs = ({ items, separator }: BreadcrumbsProps) => {
  return (
    <nav aria-label="breadcrumbs">
      <HStack align="center" spacing="s1" component="ol">
        {items.map((item, index) => (
          <ListItem key={item.href}>
            <span hidden={index === 0} aria-hidden>
              {separator}
            </span>
            <LinkStyled
              href={item.href}
              variant="bodyExtraSmall"
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.title}
            </LinkStyled>
          </ListItem>
        ))}
      </HStack>
    </nav>
  );
};

const LinkStyled = styled(Link)`
  display: flex;

  text-decoration: none;
  text-transform: capitalize;
`;

const ListItem = styled.li`
  display: inline-flex;
  align-items: center;
  column-gap: ${(p) => p.theme.space.s1};

  & > * {
    color: ${(p) => p.theme.colors.surface.text.disabled};
  }

  &:last-of-type > ${LinkStyled} {
    color: ${(p) => p.theme.colors.surface.text.default};
  }
`;
