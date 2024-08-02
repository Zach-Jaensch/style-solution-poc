export const defaultPropsToFilter = [
  "theme",
  "size",
  "variation",
  "isLoading",
  "state",
];

const filterProps = <T extends Record<string, any>>(
  obj: T,
  keys: string[] = defaultPropsToFilter,
) => {
  const res: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    if (!keys.includes(key)) {
      res[key] = obj[key];
    }
  });
  return res;
};

export default filterProps;
