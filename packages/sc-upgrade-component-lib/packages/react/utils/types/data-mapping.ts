/**
 * `PathsToStringProps` can be used to generate a union of all possible object
 * leaves as an array.
 *
 * Example:
 *
 * ```ts
 * type MyObjType = {
 *   someVal: {
 *     nested: string;
 *   };
 *   anotherVal: {
 *     nested: {
 *       evenMore: string;
 *     };
 *   };
 * };
 *
 * type MyObjPaths = PathsToStringProps<MyObjType>;
 * // Returns: ['someVal', 'nested'] | ['anotherVal', 'nested', 'evenMore']
 * ```
 */
export type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

/**
 * `Join` can be used to join a union of string arrays into a union of strings
 * using a delimiter of your choice.
 *
 * Example:
 *
 * ```ts
 * type MyStringsUnion =
 *   | ["someVal", "nested"]
 *   | ["anotherVal", "nested", "evenMore"];
 * type MyStringPaths = Join<MyStringsUnion, ".">;
 * // Returns: 'someVal.nested' | 'anotherVal.nested.evenMore'
 * ```
 */
export type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
      ? F extends string
        ? `${F}${D}${Join<Extract<R, string[]>, D>}`
        : never
      : string;

/**
 * `FilterUnionByPartialString` can be used to filter a string union for a match
 * of a specific string.
 *
 * Example:
 *
 * ```ts
 * type MyStringsUnion =
 *   | "someKey.optional.val"
 *   | "otherKey.val"
 *   | "val.optional";
 * type FilteredUnion = FilterUnionByPartialString<
 *   MyStringsUnion,
 *   "optional"
 * >;
 * // Returns: 'someKey.optional.val' | 'val.optional';
 * ```
 */
export type FilterUnionByPartialString<
  UnionType extends string,
  PartialString extends string,
> = UnionType extends `${infer _Prefix}${PartialString}${infer _Suffix}`
  ? UnionType
  : never;
