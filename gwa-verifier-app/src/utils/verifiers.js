import * as validators from "./validators.js";
import { BACKEND_URI } from "../constants.js";
export class Verifiers {
  getErrorMessages(data) {
    const {
      hk11_required,
      hk11_taken,
      hk1213_required,
      hk1213_taken,
      nstp1_required,
      nstp1_taken,
      nstp2_required,
      nstp2_taken,
      recommended_required,
      recommended,
      major_units_required,
      major_units_taken,
      ge_units_required,
      ge_units_taken,
      elective_units_required,
      elective_units_taken,
      records_remarks,
    } = data;

    const studentRecordErrors = [];
    const studentInfoErrors = [];

    if (hk11_required !== hk11_taken)
      studentRecordErrors.push(
        `HK11 is not enough. Currently taken is ${hk11_taken} but required is ${hk11_required}`
      );
    if (hk1213_required !== hk1213_taken)
      studentRecordErrors.push(
        `HK12 and HK13 is not enough. Currently taken is ${hk1213_taken} but required is ${hk1213_required}`
      );

    if (nstp1_required !== nstp1_taken)
      studentRecordErrors.push(
        `NSTP 1 is not enough. Currently taken is ${nstp1_taken} but required is ${nstp1_required}`
      );
    if (nstp2_required !== nstp2_taken)
      studentRecordErrors.push(
        `NSTP 2 is not enough. Currently taken is ${nstp2_taken} but required is ${nstp2_required}`
      );

    if (recommended < recommended_required)
      studentInfoErrors.push(
        `Provided recommended units (${recommended}) is less than actual recommended units: ${recommended_required}`
      );
    if (major_units_taken < major_units_required)
      studentRecordErrors.push(
        `Major units taken (${major_units_taken}) is less than major units required: ${major_units_required}`
      );
    if (ge_units_taken < ge_units_required)
      studentRecordErrors.push(
        `GE units taken (${ge_units_taken}) is less than GE units required: (${ge_units_required})`
      );
    if (elective_units_taken < elective_units_required)
      studentRecordErrors.push(
        `Elective units taken  (${elective_units_taken}) is less than elective units required (${elective_units_required})`
      );

    // loop through record remarks
    for (const record_remark of records_remarks) {
      const {
        remarks,
        valid_entry,
        valid_units,
        valid_grade,
        valid_enrolled,
        valid_total,
        valid_term,
      } = record_remark;
      if (
        !valid_entry ||
        !valid_units ||
        !valid_grade ||
        !valid_enrolled ||
        !valid_total ||
        !valid_term
      ) {
        studentRecordErrors.push(remarks);
      }
    }

    return [studentInfoErrors, studentRecordErrors];
  }

  locallyVerifyStudent({ studno, recommended }) {
    if (
      !validators.studentNoRegex.test(studno) ||
      !validators.recommendedUnitsRegex.test(recommended)
    ) {
      return false;
    }
    return true;
  }
  locallyVerifyGradeRecords({ gradeRecords }) {
    return new Promise((resolve, reject) => {
      const gradeRecordsReady = Object.keys(gradeRecords)
        // .filter((grUid) => gradeRecords[grUid].srUid === uid)
        .map((grUid) => {
          let record = { ...gradeRecords[grUid] };
          const { grade, units, term, running_total } = record;

          if (
            !validators.gradeRegex.test(grade) ||
            !validators.termRegex.test(term) ||
            !validators.unitsRegex.test(units) ||
            !validators.defaultRegex.test(running_total)
          ) {
            reject();
          }
          Object.assign(record, {
            id: grUid,
            total: record.running_total,
          });
          delete record["running_total"];
          return record;
        });
      resolve(gradeRecordsReady);
    });
  }
  verifyStudentRecords({ studno, gradeRecordsReady, recommended, degree }) {
    return new Promise(async (resolve, reject) => {
      try {
        const payload2 = {
          studno: Number.parseInt(studno),
          degree,
          student_record: gradeRecordsReady.map((record) => {
            const { courseno, total, grade, units, enrolled, term } = record;
            return {
              courseno,
              total,
              grade,
              units,
              enrolled,
              term,
            };
          }),
        };

        console.log(JSON.stringify(payload2));

        const _res = await fetch(
          `${BACKEND_URI}/add-edit-record-api/verify-student-record.php`,

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload2),
          }
        );

        const data = await _res.json();
        if (!data) throw new Error("Cannot parse json data");

        if (!_res.ok) {
          const { msg } = data;
          reject([[], [msg]]);
          throw new Error(msg);
        }

        const { error, records_remarks } = data;

        if (!error) {
          resolve();
        }

        // compose error message
        const [studentInfoErrors, studentRecordErrors] = this.getErrorMessages({
          ...data,
          recommended: parseInt(recommended),
        });

        reject([studentInfoErrors, studentRecordErrors]);

        console.table(records_remarks);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}
