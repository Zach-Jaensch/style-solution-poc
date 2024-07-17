import { Typography } from "@safetyculture/sc-web-ui/react";
import styled from "styled-components";

export const PageTitle = styled(Typography)`
  margin: ${(p) => p.theme.space.s6} 0;
`;
export const PageDescription = styled(Typography)`
  margin-bottom: ${(p) => p.theme.space.s10};
  max-width: 48rem;
`;
