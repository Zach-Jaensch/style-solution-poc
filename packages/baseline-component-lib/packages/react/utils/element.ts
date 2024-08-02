import { createElement } from "react";
import type { Ref } from "react";

import filterProps from "./filter-props";

// Create HTML element without any theme relevant properties
// unfortunately the "props" is not type safe...
export const createNativeElement = <T>(
  tag: string,
  props: Record<string, any>,
  ref?: Ref<T>,
) => createElement(tag, { ...filterProps(props), ref });
