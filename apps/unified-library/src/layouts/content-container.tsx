import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.space.s8} ${(p) => p.theme.space.s4};
  row-gap: ${(p) => p.theme.space.s8};

  max-width: 110rem;
  margin: auto;
`;
