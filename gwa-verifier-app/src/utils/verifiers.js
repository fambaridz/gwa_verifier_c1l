/**
 *
 * @param {*} { studno: string, recommended: string }
 * @returns a boolean if the student info is valid or not
 */
export function localVerifyStudentInfo({ studno, recommended }) {
  return (
    !validators.studentNoRegex.test(studno) ||
    !validators.recommendedUnitsRegex.test(recommended)
  );
}
