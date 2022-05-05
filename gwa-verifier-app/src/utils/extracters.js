import { csvToArray } from "./parsers.js";

/**
 *
 * @param {string} text content of csv file the user uploaded
 */
export async function csvExtracter(text) {
  let [name, degree, ...rest] = text.split("\n");
  const [lname, fname, mname = "", suffix = ""] = name.split(",");
  [degree] = degree.split(",");
  rest = rest.join("\n");

  const [grades, terms, gwa, recommended] = await csvToArray(rest);

  return {
    lname,
    fname,
    mname,
    suffix,
    degree,
    gwa,
    recommended,
    grades,
    terms,
  };
}
