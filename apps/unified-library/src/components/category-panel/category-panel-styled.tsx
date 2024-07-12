import { Card, Text as Typography } from "@safetyculture/sc-web-ui/react";
import styled from "styled-components";
import { Link } from "#/components/link";

export const Panel = styled(Card)`
  min-width: 17.5rem;
  height: fit-content;

  &:not(#dummy-for-specificity) {
    align-items: normal;
  }
`;

export const PanelTitle = styled(Typography)`
  padding: ${(p) => p.theme.space.s1} 0;
  margin-bottom: ${(p) => p.theme.space.s2};
`;

export const Categories = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  row-gap: ${(p) => p.theme.space.s1};
`;

export const CategoryLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: ${(p) => p.theme.space.s1};

  cursor: pointer;
  background-color: transparent;
  padding: ${(p) => p.theme.space.s2} ${(p) => p.theme.space.s2};
  height: ${(p) => p.theme.space.s10};

  border: unset;
  border-radius: ${(p) => p.theme.radii.sm};

  text-decoration: none;

  &:not([disabled]) {
    &:hover,
    &:focus {
      background-color: ${(p) => p.theme.colors.bg.weak};
    }

    &[data-selected="true"] {
      color: ${(p) => p.theme.colors.accent.text.onWeaker};
      background-color: ${(p) => p.theme.colors.accent.bg.weakerHover};
    }

    &:active {
      color: ${(p) => p.theme.colors.accent.text.onWeaker};
      background-color: ${(p) => p.theme.colors.accent.bg.weakerPressed};
    }
  }
`;

export const CategoryLabel = styled.span<{ active?: boolean }>`
  font-size: ${(p) => p.theme.font.size.body.small};
  color: ${(p) => (p.active ? p.theme.colors.accent.text.onWeaker : "inherit")};
  text-transform: capitalize;
`;

export const CategoryCount = styled.span`
  font-size: ${(p) => p.theme.font.size.body.xsmall};
`;
