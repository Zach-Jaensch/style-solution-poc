import { useContext } from "react";

import { configContext } from "./context";

export const useLocalization = () => {
  const { localization } = useContext(configContext);
  return localization;
};
