export type Inherit<T extends {}, A extends {}> = T & Omit<A, keyof T>;

export type ForwardRefWithStaticComponents<
  Props extends Record<string, any>,
  Static extends Record<string, any>,
> = ((props: Props) => React.ReactElement) & Static;

export type TestDataAttributes = {
  "data-anchor"?: string;
  "data-testid"?: string;
};
