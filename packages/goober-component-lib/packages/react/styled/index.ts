import { setup } from "goober";
import { createContext, createElement, useContext } from "react";
import maggie from "../../theme/themes/maggie";

const ThemeContext = createContext(maggie);
const useTheme = () => useContext(ThemeContext);

setup(createElement, undefined, useTheme);
