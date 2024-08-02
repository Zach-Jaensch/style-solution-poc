import React from "react";
import type { PropsWithChildren } from "react";
import { configContext } from "./context";
import type { Config } from "./types";

export const ConfigProvider = ({
  config,
  children,
}: PropsWithChildren<{ config: Config }>) => {
  const { theme, ...restConfig } = config;
  return (
    <configContext.Provider value={restConfig}>
      {children}
    </configContext.Provider>
  );
};
