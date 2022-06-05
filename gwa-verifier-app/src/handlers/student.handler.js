import { BACKEND_URI } from "../constants.js";

/**
 * A class to handle all student-related transactions
 */
export default class StudentHandler {
  /**
   * Get student info from the backend
   * @param {Object} kwargs
   * @param {number} kwargs.studno
   * @returns {Object} Student record fetched from the backend.
   */
  async getInfo(kwargs) {
    const { studno } = kwargs;
    const res = await fetch(`${BACKEND_URI}/record-details-api/details.php`, {
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
    // const student = await res.json();
    if (!student) throw new Error("Failed to get student");
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
   * A method to save a new student in the database. It sends a POST request to the backend.
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
  /**
   * Updates a student's information by sending a request to the backend
   * @param {Object} kwargs
   * @param {string} kwargs.email
   * @param {Object} kwargs.studentRecord
   * @param {string | number} kwargs.studentRecord.old_stud_no
   * @param {string | number} kwargs.studentRecord.new_stud_no
   * @param {string} kwargs.studentRecord.lname
   * @param {string} kwargs.studentRecord.fname
   * @param {mname} kwargs.studentRecord.mname
   * @param {string} kwargs.studentRecord.degree
   * @param {string} kwargs.studentRecord.suffix
   * @param {string | number} kwargs.studentRecord.recommended
   * @param {string | number} kwargs.studentRecord.credited
   * @param {string | number} kwargs.studentRecord.gwa
   * @param {string} kwargs.studentRecord.status
   */
  async updateInfo(kwargs) {
    const { studentRecord, email } = kwargs;
    const {
      old_stud_no,
      new_stud_no,
      lname,
      fname,
      mname,
      degree,
      suffix,
      recommended: rec_units,
      credited: cred_units,
      gwa,
      status,
    } = studentRecord;

    console.table(studentRecord);

    const payload = {
      old_stud_no,
      new_stud_no,
      lname,
      fname,
      mname,
      degree,
      suffix,
      rec_units,
      cred_units,
      gwa,
      status,
      email,
    };
    let res = await fetch(
      `${BACKEND_URI}/add-edit-record-api/update_student.php`,
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
