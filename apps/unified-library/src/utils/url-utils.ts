import slugify from "slugify";

export const formatForUrl = (text: string) => {
  return slugify(text, { lower: true });
};
