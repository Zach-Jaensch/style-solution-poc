import React from "react";
import type { PropsWithChildren } from "react";
import { ThemeProvider } from "../styled";
import { configContext } from "./context";
import type { Config } from "./types";

export const ConfigProvider = ({
  config,
  children,
}: PropsWithChildren<{ config: Config }>) => {
  const { theme, ...restConfig } = config;
  return (
    <configContext.Provider value={restConfig}>
      <ThemeProvider theme={theme}>{children} </ThemeProvider>
    </configContext.Provider>
  );
};
