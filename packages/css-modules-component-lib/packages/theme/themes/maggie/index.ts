import type { Theme } from "../../types";
import { breakpoints } from "./breakpoints";
import { dark, light } from "./colors";
import { radii } from "./radii";
import { shadows } from "./shadows";
import { space } from "./space";
import { typography } from "./typography";

const maggie: Theme = {
  name: "maggie-light",
  breakpoints,
  colors: light,
  font: typography,
  radii,
  shadows,
  space,
};

export const maggieDark: Theme = {
  ...maggie,
  colors: dark,
};

export default maggie;
