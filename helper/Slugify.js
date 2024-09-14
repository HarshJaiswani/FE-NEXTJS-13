export const slugify = (text) => {
  return text.toString().replaceAll(" ", "-").toLowerCase();
};
