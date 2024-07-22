import styled from "styled-components";

export const SidenavLayout = styled.div`
  display: flex;
  column-gap: ${(p) => p.theme.space.s8};
`;

export const SidenavLayoutContent = styled.div`
  flex: 1;
  min-width: 0;
`;
