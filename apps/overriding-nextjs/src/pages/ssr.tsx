import { Button as _SCButton } from "@internal/baseline-component-lib/button";
import { Button as _TWButton } from "@internal/tailwind-component-lib/button";
import { Button as _VEButton } from "@internal/vanilla-extract-component-lib/button";
import styled from "styled-components";

const HStack = styled.div`
  display: flex;
  gap: 1rem;
`;

const VStack = styled.div`
  display: flex;
  flex-direction: column;
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
    <VStack>
      <h1>Base components</h1>
      <HStack>
        <_SCButton onClick={console.log}>Styled components</_SCButton>
        <_VEButton onClick={console.log}>Vanilla extract</_VEButton>
        <_TWButton onClick={console.log}>Tailwind</_TWButton>
      </HStack>

      <h1>Overridden with styled-components</h1>
      <HStack>
        <SCButton onClick={console.log}>Styled components</SCButton>
        <VEButton onClick={console.log}>Vanilla extract</VEButton>
        <TWButton onClick={console.log}>Tailwind</TWButton>
      </HStack>
    </VStack>
  );
}
