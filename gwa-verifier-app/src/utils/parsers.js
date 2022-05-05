// code not mine, got it from https://sebhastian.com/javascript-csv-to-array/#:~:text=To%20convert%20or%20parse%20CSV,the%20string%20into%20an%20array%20.
export function csvToArray(str, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  // const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  const regex = /(l|Il|M)\/[0-9]{2}\/[0-9]{2}/m;
  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  let arr = rows.map(function (row) {
    const values = row.split(delimiter);
    let [courseno, grade, units, enrolled, running_total, , term = ""] = values;

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
    // const el = headers.reduce(function (object, header, index) {
    //   object[header] = values[index];
    //   return object;
    // }, {});
    // return el;
  });

  // loop through the array once again, but this time we will fill the "term"
  const newArr = [...arr];
  const terms = [];
  arr.forEach((row, idx) => {
    let { term } = row;

    if (regex.test(term)) {
      terms.push(term);
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
  return [newArr, terms];
}
