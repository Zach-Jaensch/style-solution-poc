import type { Theme } from "@internal/baseline-component-lib/theme";
import "styled-components";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface -- This converts the type to an interface.
  export interface DefaultTheme extends Theme {}
}
