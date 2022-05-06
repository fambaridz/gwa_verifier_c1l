import { v4 as uuidv4 } from "uuid";
import { csvToArray, fileReader } from "./parsers.js";

/**
 *
 * @param {string} text content of csv file the user uploaded
 */
export async function csvExtracter(text) {
  let [name, degree, studNo, ...rest] = text.split("\n");
  const [lname, fname, mname = "", suffix = ""] = name.split(",");
  [degree] = degree.split(",");
  rest = rest.join("\n");
  [studNo] = studNo.split(",");
  const [grades, terms, gwa, recommended] = await csvToArray(rest);

  return {
    lname,
    fname,
    mname,
    suffix,
    degree,
    studNo,
    gwa,
    recommended,
    grades,
    terms,
  };
}

/**
 *
 * @param {File[]} files files array uploaded by the user
 * @returns {Promise<[studentRecords: object, srUidPageMap: [], gradeRecords: object, srUidTermMap: object]>} a promise that resolves an array of objects
 */
export function extractFromFile(files) {
  return new Promise(async (resolve, reject) => {
    const studentRecords = {},
      srUidPageMap = [],
      gradeRecords = {},
      srUidTermMap = {};

    for (const file of files) {
      try {
        const text = await fileReader(file);

        const { grades, terms, ...studentInfo } = await csvExtracter(text);
        const sruid = uuidv4();
        Object.assign(studentRecords, {
          [sruid]: {
            ...studentInfo,
          },
        });
        srUidPageMap.push(sruid);

        grades.forEach((grade) => {
          let gruid = uuidv4();
          // continue getting a new gruid until gruid is unique, this is to catch the near 0.1% chance of collision
          while (gradeRecords[gruid]) {
            gruid = uuidv4();
          }

          Object.assign(gradeRecords, {
            [gruid]: grade,
          });
        });
        Object.assign(srUidTermMap, {
          [sruid]: terms,
        });
      } catch (error) {
        console.warn(error);
        reject(error);
      }
    }
    resolve([studentRecords, srUidPageMap, gradeRecords, srUidTermMap]);
  });
}
