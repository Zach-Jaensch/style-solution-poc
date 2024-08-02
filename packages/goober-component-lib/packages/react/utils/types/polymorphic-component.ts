/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any, tsdoc/syntax -- copied from sc-web-ui */
// Credit: https://github.com/mantinedev/mantine/blob/5c1d77209f92fb14377d75c7cdc8d36f84705b63/src/mantine-utils/src/create-polymorphic-component/create-polymorphic-component.ts
import type React from "react";
import type { FunctionComponent } from "react";

type ExtendedProps<Props = {}, OverrideProps = {}> = OverrideProps &
  Omit<Props, keyof OverrideProps>;

export type ElementType =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>;

type PropsOf<C extends ElementType> = JSX.LibraryManagedAttributes<
  C,
  React.ComponentPropsWithoutRef<C>
>;

export interface ComponentProp<C> {
  component?: C;
}

/*
 * The InheritedProps allows us to get the props of a generic component and apply direct component props on top of it.
 * The component props will take precedence over the generic props.
 * For example, if we use a <'a'> as the generic, it will have an `href` prop. If component props also have an `href` prop then it will override type for the prop of native `<a>` tag.
 */
type InheritedProps<C extends ElementType, Props = {}> = ExtendedProps<
  PropsOf<C>,
  Props
>;

export type PolymorphicRef<C> = C extends React.ElementType
  ? React.ComponentPropsWithRef<C>["ref"]
  : never;

/**
 * PolymorphicComponentProps enables us to create a React component which will
 * accept an `component` prop which will inherit the types of a given generic.
 */
export type PolymorphicComponentProps<
  C, // Generic for element type. Could be an HTML tag (i.e. <'span'>) or another React component (<MyComponent>)
  Props = {}, // Direct Props for the component being created
> = C extends React.ElementType
  ? InheritedProps<C, Props & ComponentProp<C>> & { ref?: PolymorphicRef<C> } // If the generic type is recognised as a React Element then create a union of generic's props, component props, inject `component` prop and `ref` for `forwardRef` usage
  : Props & { component: React.ElementType }; // If the generic type is not recognised as a React element then pass through component's props and allow the functionality to override the generic type via `component` prop

/**
 * WithComponentProp can be used to inject the `component` prop into your
 * component props. Example:
 *
 *     type _MyComponentProps = {
 *       foo: string;
 *       bar: number;
 *     };
 *
 *     export type MyComponentProps = WithComponentProp<_MyComponentProps>;
 */
export type WithComponentProp<C> = C & {
  component?: ElementType;
  as?: never;
};

/**
 * Usage instructions:
 *
 * First, inititalise an intermediate component that uses a default
 * tag/component to satisfy the TS generic requirements (can be overriden
 * later):
 *
 *     const _MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
 *       ({ component = "div", ...rest }, ref) => {
 *         const Component = component;
 *
 *         return <Component ref={ref} {...rest} />;
 *       },
 *     );
 *
 * Then apply the `createPolymorphicComponent` util to allow the functionality
 * for polymorphism
 *
 *     export const MyComponent = createPolymorphicComponent<
 *       "div",
 *       MyComponentProps
 *     >(_MyComponent);
 *
 * You can override the default element type when using the component like so:
 *
 *     <MyComponent component="button" />;
 *
 * When using the ref property, in some cases the editor can't infer type
 * correctly. You can provide the generic type manually:
 *
 *     <MyComponent<"button"> component="button" />;
 *
 * More detailed usage documentation: https://mantine.dev/guides/polymorphic/
 */
export function createPolymorphicComponent<
  ComponentDefaultType,
  Props,
  StaticComponents = Record<string, never>,
>(component: any) {
  type ComponentProps<C> = PolymorphicComponentProps<C, Props>;

  type _PolymorphicComponent = <C = ComponentDefaultType>(
    props: ComponentProps<C>,
  ) => React.ReactElement;

  type ComponentProperties = Omit<
    FunctionComponent<ComponentProps<any>>,
    never
  >;

  type PolymorphicComponent = _PolymorphicComponent &
    ComponentProperties &
    StaticComponents;

  return component as PolymorphicComponent;
}

/* eslint-enable -- copied from sc-web-ui */
