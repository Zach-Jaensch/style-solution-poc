import type { Theme } from "@safetyculture/sc-web-ui";
import "styled-components";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface -- This converts the type to an interface.
  export interface DefaultTheme extends Theme {}
}
