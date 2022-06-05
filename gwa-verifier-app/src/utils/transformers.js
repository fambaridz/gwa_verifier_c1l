export function fromMapToArray(obj, keyName) {
  return Object.keys(obj).map((key) => ({ ...obj[key], [keyName]: key }));
}

/**
 * A utility function used to convert a semester to a numerical equivalent
 * @param {I | II | M} sem
 * @returns {number} a numerical equivalent of the semester
 */
function convertSemToNumeric(sem) {
  const semNumeric = {
    I: 1,
    II: 2,
    M: 3,
  };
  if (!Object.keys(semNumeric).includes(sem)) return -1;

  return semNumeric[sem];
}

/**
 * A utility function to extract the semester, start year, and end year in a string
 * @param {string} term The term of a grade record, must follow the regex /^(I|II|M)\/[0-9]{2}\/[0-9]{2}$/
 */
function extractData(term) {
  const termRegex = /^(I|II|M)\/([0-9]{2})\/([0-9]{2})$/;
  if (!termRegex.test(term)) {
    throw new Error(`term '${term}' is not a valid term`);
  }

  const match = termRegex.exec(term);
  const [, ...matches] = match;
  if (matches.length !== 3) {
    throw new Error(`term '${term}' is not a valid term`);
  }

  const [sem, startYear, endYear] = matches;
  return { sem, startYear, endYear };
}

/**
 * A utility function to sort grade records by term. Internally it calls convertSemToNumeric() and extractData()
 * @param {Array<{
 *  courseno: string;
 *  total: string;
 *  grade: string;
 *  units: string;
 *  enrolled: string;
 *  term: string;}>} items
 * @returns {Array<{
 *  courseno: string;
 *  total: string;
 *  grade: string;
 *  units: string;
 *  enrolled: string;
 *  term: string;}>} A copy of the items passed but sorted in terms
 */
export function sortGradeRecordsArray(items) {
  return items.sort(function (a, b) {
    const { term: term1 } = a;
    const { term: term2 } = b;
    try {
      const semYear1 = extractData(term1);

      const semYear2 = extractData(term2);

      let diff =
        parseInt(semYear1.startYear) +
        parseInt(semYear1.endYear) -
        (parseInt(semYear2.startYear) + parseInt(semYear2.endYear));
      // if diff === 0

      if (!diff) {
        const { sem: sem1 } = semYear1;

        const { sem: sem2 } = semYear2;

        return convertSemToNumeric(sem1) - convertSemToNumeric(sem2);
      }
      return diff;
    } catch (error) {
      console.warn(error.message);
    }
    return 0;
  });
}
