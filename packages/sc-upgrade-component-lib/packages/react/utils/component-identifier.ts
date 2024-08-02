import { Fragment, isValidElement } from "react";

export type WithComponentIdentifier<
  ComponentProps,
  ComponentIdentifierValue extends string,
> = ComponentProps & {
  componentIdentifier: ComponentIdentifierValue;
};

/**
 * This function is used to add a `componentIdentifier` property to a component.
 *
 * This is useful for giving a component a unique identifier that can be used to
 * identify it in the component tree when using the Compound Component pattern.
 *
 * Example:
 *
 * ```tsx
 * const MyComponent = withComponentIdentifier(_MyComponent, "MyComponent");
 *
 * const MyComponentWrapper = ({ children }) => {
 *  const filteredChildren = React.Children.map(children, (child) => {
 *      return child.type.componentIdentifier === "MyComponent" ? child : null
 *  }
 *
 *  return <div>{filteredChildren}</div>;
 * }
 *
 * <MyComponentWrapper>
 *  <MyComponent /> // This will be rendered
 *  <div>Not a MyComponent</div> // This will not be rendered
 *  <MyComponent /> // This will be rendered
 * </MyComponentWrapper>
 * ```
 */
export const withComponentIdentifier = <C extends object, I extends string>(
  Component: C,
  componentIdentifier: I,
) => {
  return Object.assign(Component, {
    componentIdentifier,
  }) as WithComponentIdentifier<typeof Component, typeof componentIdentifier>;
};

/**
 * This function is used to check if a React node has a `componentIdentifier`
 * property and whether it matches the provided identifier.
 *
 * Example:
 *
 * ```tsx
 * React.Children.map(children, (child) => {
 *  const isMyComponent = doesNodeMatchComponentIdentifier(child, "MyComponent");
 * }
 * ```
 */
export const doesNodeMatchComponentIdentifier = (
  child: React.ReactNode,
  identifier: string,
): boolean => {
  if (
    isValidElement(child) &&
    child.type &&
    typeof child.type !== "string" &&
    typeof child.type !== "undefined" &&
    child.type !== Fragment &&
    "componentIdentifier" in child.type
  ) {
    return (child.type.componentIdentifier as string) === identifier;
  }

  return false;
};
