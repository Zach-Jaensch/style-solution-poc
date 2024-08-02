import { createContext } from "react";

import defaultLocalization from "./localization";
import type { ConfigInContext } from "./types";

export const defaultConfig: ConfigInContext = {
  localization: defaultLocalization,
};
export const configContext = createContext(defaultConfig);
