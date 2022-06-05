import { BACKEND_URI } from "../constants.js";

/**
 * A class to handle all comment-related transactions
 */
export default class CommentHandler {
  /**
   * Saves a new comment to the database by sending a POST request to the backend.
   * @param {Object} kwargs
   * @param {string} kwargs.email
   * @param {number} kwargs.studno
   * @param {string} kwargs.comment
   */
  async save(kwargs) {
    const { email, studno, comment } = kwargs;
    const payload = {
      email,
      studno,
      comment,
    };
    console.log(payload);
    const res = await fetch(
      `${BACKEND_URI}/add-edit-record-api/addComment.php`,
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
}
