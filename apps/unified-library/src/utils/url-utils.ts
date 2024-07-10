export const formatForUrl = (text: string) => {
  return text.toLocaleLowerCase().replaceAll(/\s+/g, "-");
};
