/**
 * This utility type can be used to make a subset of keys mandatory in an object
 * type.
 *
 * Example 1: Make all keys mandatory
 *
 * ```ts
 * type MyType = {
 *   a?: string;
 *   b?: number;
 * };
 *
 * type MyTypeWithMandatoryKeys = MakeKeysMandatory<MyType>;
 * // Output: {
 * //   a: string;
 * //   b: number;
 * // }
 * ```
 *
 * Example 2: Make a subset of keys mandatory
 *
 * ```ts
 * type MyType = {
 *   a?: string;
 *   b?: number;
 *   c?: boolean;
 * };
 *
 * type MyTypeWithMandatoryKeys = MakeKeysMandatory<MyType, "a" | "b">;
 * // Output: {
 * //   a: string;
 * //   b: number;
 * //   c?: boolean;
 * // }
 * ```
 */
export type MakeKeysMandatory<T, K extends keyof T = keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
