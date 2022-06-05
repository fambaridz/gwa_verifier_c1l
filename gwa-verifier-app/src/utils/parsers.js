// code not mine, got it from https://sebhastian.com/javascript-csv-to-array/#:~:text=To%20convert%20or%20parse%20CSV,the%20string%20into%20an%20array%20.
/**
 *
 * @param {string} str String of text you want to convert to an array
 * @param {string} delimiter
 * @returns {Promise<Array<Object>>} A promise that resolves an array of grade records, terms, gwa, and recommended units
 */
export function csvToArray(str, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  // const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  return new Promise((resolve, reject) => {
    try {
      let rows = str
        .trim()
        .slice(str.indexOf("\n") + 1)
        .split("\n");
      const regex = /[A-Za-z]+\/[0-9]{2}\/[0-9]{2}/m;
      const footer = rows.splice(rows.length - 5, 5);

      let [, [, gwa], recommended] = footer;
      [recommended] = recommended.split(",");
      let arr = rows.map(function (row) {
        const values = row.split(delimiter);
        let [courseno, grade, units, enrolled, running_total, , term = ""] =
          values;

        // regex for term

        const match = term.match(regex);
        if (match) [term] = match;
        return {
          courseno,
          grade,
          units,
          enrolled,
          running_total,

          term,
        };
      });

      // loop through the array once again, but this time we will fill the "term"
      const newArr = [...arr];
      const terms = [];
      arr.forEach((row, idx) => {
        let { term } = row;

        if (regex.test(term)) {
          if (!terms.includes(term)) terms.push(term);
          let index = idx - 1;
          while (index >= 0 && !regex.test(arr[index].term)) {
            newArr[index] = {
              ...newArr[index],
              term,
            };
            index--;
            // curr = arr[index];
          }
        }
      });
      // return the array
      resolve([newArr, terms, gwa, recommended]);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * A utility function to extract a file's content
 * @param {File} file
 * @returns {string | ArrayBuffer} Content of the file passed
 */
export function fileReader(file) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = function () {
      reader.abort();
      reject(new DOMException("Problem parsing file"));
    };

    reader.onload = function (e) {
      resolve(reader.result);
    };

    reader.readAsText(file);
  });
}
