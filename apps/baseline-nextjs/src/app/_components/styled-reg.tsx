"use client";

import {
  ConfigProvider,
  defaultConfig,
} from "@internal/baseline-component-lib/config";
import { GlobalStyle, maggie } from "@internal/baseline-component-lib/theme";
import { useServerInsertedHTML } from "next/navigation";
import React, { useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { ThemeProvider } from "styled-components";

type StyledComponentsRegistryProps = {
  children: React.ReactNode;
};

export const StyledComponentsRegistry = ({
  children,
}: StyledComponentsRegistryProps) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <>
        <GlobalStyle />

        <ConfigProvider config={defaultConfig}>
          <ThemeProvider theme={maggie}>{children}</ThemeProvider>
        </ConfigProvider>
      </>
    </StyleSheetManager>
  );
};
