export const Capitalise = (string) => {
  let workingString = string.toString().toLowerCase();
  return workingString.slice(0, 1).toUpperCase() + workingString.slice(1);
};
