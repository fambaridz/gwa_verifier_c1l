import { BACKEND_URI } from "../constants.js";

export default class StudentHandler {
  /**
   *
   * @param {Object} kwargs
   * @param {number} kwargs.studno
   * @returns Student record
   */
  async getInfo(kwargs) {
    const { studno } = kwargs;
    const res = await fetch(`${BACKEND_URI}/details.php`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        action: "get-student",
        student_number: studno,
      }),
    });
    const body = await res.text();
    const student = JSON.parse(body)[0];
    const {
      student_number,
      lastname: lname,
      firstname: fname,
      middlename: mname,
      degree_program: degree,
      recommended_number_units: recommended,
      ...rest
    } = student;
    return {
      ...rest,
      lname,
      fname,
      mname,
      degree,
      recommended,
      studNo: `${student_number.toString().slice(0, 4)}-${student_number
        .toString()
        .slice(4)}`,
    };
  }
  /**
   *
   * @param {Object} kwargs
   * @param {Object} kwargs.studentRecord
   * @param {string} kwargs.email
   * @param {number} kwargs.studno
   * @param {string} kwargs.status
   * @param {number} kwargs.cred_units
   * @param {number} kwargs.gwa
   */
  async saveInfo(kwargs) {
    const {
      studentRecord,
      email,
      studno,
      status = "UNCHECKED",
      cred_units = 0,
      gwa = 0,
    } = kwargs;
    const { recommended: rec_units } = studentRecord;
    const payload = {
      ...studentRecord,
      email,
      studno,
      status,
      rec_units,
      cred_units,
      gwa,
    };
    console.table(payload);
    let res = await fetch(
      `${BACKEND_URI}/add-edit-record-api/add-student.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      console.table(res);
      const data = await res.json();
      const { msg } = data;
      throw new Error(msg);
    }
  }
}
