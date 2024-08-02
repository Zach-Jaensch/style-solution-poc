// Function related utils

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction<T extends Function = Function>(
  value: any,
): value is T {
  return typeof value === "function";
}

export function runIfFunction<T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}
