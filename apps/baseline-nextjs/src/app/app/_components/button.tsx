"use client";

import { Button as _Button } from "@internal/baseline-component-lib/button";

export function Button({ children }: { children: React.ReactNode }) {
  return <_Button onClick={console.log}>{children}</_Button>;
}
