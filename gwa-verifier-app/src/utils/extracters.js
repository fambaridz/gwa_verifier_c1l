import { csvToArray } from "./parsers.js";

/**
 *
 * @param {string} text content of csv file the user uploaded
 */
export function csvExtracter(text) {
  let [name, degree, ...rest] = text.split("\n");
  const [lname, fname, mname = "", suffix = ""] = name.split(",");
  [degree] = degree.split(",");
  rest = rest.join("\n");
  const [grades, terms] = csvToArray(rest);

  return {
    lname,
    fname,
    mname,
    suffix,
    degree,
    grades,
    terms,
  };
}
