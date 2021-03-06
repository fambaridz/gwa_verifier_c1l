import { BACKEND_URI } from "../constants.js";

/**
 * A class to handle all student-record-related transactions
 */
export default class RecordHandler {
  /**
   * Fetches records from the database
   * @param {number} studno Student number
   * @returns An array, first element is terms, second element is the courses in Object / Hashmap form
   */
  async fetchCourses(studno) {
    const course = {
      action: "get-courses",
      student_number: studno,
    };
    const res = await fetch(`${BACKEND_URI}/record-details-api/details.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });

    if (!res.ok) {
      console.table(res);
      const data = await res.json();
      const { msg } = data;
      throw new Error(msg);
    }

    const body = await res.text();
    const parsed = JSON.parse(body);

    // loop through all courses, get terms
    const _terms = [];
    const coursesMap = {};

    parsed.forEach((course) => {
      const { id, term, course_number: courseno, ...rest } = course;

      if (!term) return;
      if (!_terms.includes(term)) _terms.push(term);

      Object.assign(coursesMap, {
        [id]: {
          ...rest,
          term,
          courseno,
        },
      });
    });
    const coursesCount = Object.keys(coursesMap).length;
    console.log(
      "🚀 ~ file: record.handler.js ~ line 51 ~ RecordHandler ~ fetchCourses ~ coursesCount",
      coursesCount
    );

    return [_terms, coursesMap];
  }

  /**
   *  Saves a list of grade records to the database by sending a POST request to the backend.
   * @param {Object} kwargs
   * @param {number} kwargs.studno
   * @param {string} kwargs.email
   * @param {[Object]} kwargs.lst
   */
  async saveGradeRecords(kwargs) {
    const { studno, email, lst } = kwargs;
    const payload = {
      studno,
      email,
      lst,
    };

    console.log(JSON.stringify(payload));

    const res = await fetch(
      `${BACKEND_URI}/add-edit-record-api/addStudentRecord.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const error = res.status;
      throw new Error(error);
    }
  }

  /**
   * Updates a list of grade records by sending this list to the backend.
   * @param {Object} kwargs
   * @param {number} kwargs.studno
   * @param {Array.<{id: number, student_number: number, course_number: string, grade: number | string, units: number | string, enrolled: number | string, runnnig_total: number | string}>} kwargs.list
   */
  async updateGradeRecords(kwargs) {
    const { studno, lst } = kwargs;
    const payload = {
      studno,
      lst,
    };

    const res = await fetch(
      `${BACKEND_URI}/add-edit-record-api/edit_student_record.php`,
      {
        method: "PUT",
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
   * Deletes records deleted by the user in edit student record page.
   * @param {Array<string | number>} ids IDs of records to delete
   */
  async deleteGradeRecords(ids) {
    const payload = {
      ids,
    };

    const res = await fetch(
      `${BACKEND_URI}/add-edit-record-api/delete-record.php`,
      {
        method: "DELETE",
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
