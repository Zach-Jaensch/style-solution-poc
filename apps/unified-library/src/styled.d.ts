import "styled-components";
import { Theme } from "@safetyculture/sc-web-ui";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
