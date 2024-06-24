/**
 * @type {import("prettier").Config}
 * @see https://prettier.io/docs/en/configuration.html
 */
const config = {
  // Based on the import/order defaults - "builtin", "external", "internal", "parent", "child", "sibling".
  importOrder: [
    "^node:(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^#/(.*)$",
    "^\\.\\.\\/(.*)$",
    "^\\.\\/(.*)\\/",
    "^[./]",
  ],
  importOrderSortSpecifiers: true,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-jsdoc",
    "prettier-plugin-packagejson",
  ],
  trailingComma: "all",
};

export default config;
