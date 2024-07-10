import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

export { default as BaseLayout } from "./base-layout";
export { default as SidenavLayout } from "./sidenav-layout";

export type PageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
