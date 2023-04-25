export const replaceDateHyphensForSlashes = (date: String) => {
  return new Date(date.replace(/-/g, "/"));
};
