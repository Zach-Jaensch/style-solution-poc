import styled from "styled-components";

export const ContentHeader = styled.div`
  display: grid;
  grid-template-columns: auto minmax(3rem, 30rem);
  grid-template-rows: ${(p) => p.theme.space.s10};

  align-items: center;
  gap: ${(p) => p.theme.space.s8};

  padding: 0 ${(p) => p.theme.space.s1};
  margin: -${(p) => p.theme.space.s4} 0;
`;
