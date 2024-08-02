import "styled-components";
import type { StyledThemeWithUtils } from "./packages/react/styled/types";

declare module "styled-components" {
  export interface DefaultTheme extends StyledThemeWithUtils {}
}
