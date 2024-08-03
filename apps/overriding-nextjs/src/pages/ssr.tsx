import { Button as _SCButton } from "@internal/baseline-component-lib/button";
import { Button as _TWButton } from "@internal/tailwind-component-lib/button";
import { Button as _VEButton } from "@internal/vanilla-extract-component-lib/button";
import styled from "styled-components";

const Stack = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
`;

const SCButton = styled(_SCButton)`
  background-color: hotpink;
`;

const VEButton = styled(_VEButton)`
  background-color: hotpink;
`;

const TWButton = styled(_TWButton)`
  background-color: hotpink;
`;

export default function Page() {
  return (
    <Stack>
      <SCButton onClick={console.log}>Styled components</SCButton>
      <VEButton onClick={console.log}>Vanilla extract</VEButton>
      <TWButton onClick={console.log}>Tailwind</TWButton>
    </Stack>
  );
}
