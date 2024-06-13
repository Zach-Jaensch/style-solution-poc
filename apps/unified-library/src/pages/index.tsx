import { Avatar, Stack, Text } from "@safetyculture/sc-web-ui/react";
import styled from "styled-components";

const PaddedStack = styled(Stack)`
  padding: ${(props) => props.theme.space.s3};
`;

export default function Home() {
  return (
    <PaddedStack spacing="s3" align="center">
      <Avatar name="Hello World" size="medium" />
      <Stack direction="column">
        <Text component="h1" variant="titleLarge">
          Example title text in Noto Sans
        </Text>
        <Text variant="bodyMedium">Example body text in Noto Sans.</Text>
      </Stack>
    </PaddedStack>
  );
}
