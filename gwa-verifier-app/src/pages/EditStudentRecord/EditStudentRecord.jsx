import React, { useState, useEffect, useMemo } from "react";
import { Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import StudentRecordForm from "Components/StudentRecordForm/";
import GradeRecordTable from "Components/GradeRecordTable";
import Cookies from "universal-cookie";
import Box from "@mui/material/Box";
import StudentFormFooter from "Components/StudentFormFooter";
import { StudentHandler, RecordHandler, CommentHandler } from "../../handlers";
import { Verifiers } from "../../utils/verifiers.js";
import { fromMapToArray } from "../../utils/transformers.js";
import * as validators from "../../utils/validators.js";
import ForceSaveDialog from "Components/ForceSaveDialog";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useSnackbar } from "notistack";
// edit this to create the edit student record page
function EditStudentRecord() {
  const params = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [saving, setSaving] = useState(false);
  const [studentRecord, setStudentRecord] = useState({});
  const [terms, setTerms] = useState([""]);
  const [term, setTerm] = useState("");

  const [gradeRecords, setGradeRecords] = useState({});
  const [comment, setComment] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [studentInfoErrors, setStudentInfoErrors] = useState([]);
  const [studentRecordErrors, setStudentRecordErrors] = useState([]);

  const [showForceSave, setShowForceSave] = useState(false);

  function handleGradeRecordChange({ uid, columnId, value }) {
    const record = gradeRecords[uid];

    if (!record) return;
    Object.assign(record, {
      [columnId]: value,
    });
    setGradeRecords({ ...gradeRecords, [uid]: record });
  }
  async function fetchCourses() {
    const handler = new RecordHandler();
    try {
      const [newTerms, coursesMap] = await handler.fetchCourses(studno);
      console.log(coursesMap);
      setTerms(newTerms);
      setTerm(newTerms[0]);
      setGradeRecords(coursesMap);
    } catch (error) {
      console.warn(error);
    }
  }

  const convertedGrades = useMemo(() => {
    const records = fromMapToArray(gradeRecords, "uid").filter(
      (record) => record.term === term
    );
    return records;
  }, [gradeRecords, term]);

  function getField(name) {
    const res = studentRecord[name];
    if (!res) return "";
    return res;
  }

  function handleCommentChange(newComment) {
    setComment(newComment);
  }

  function goBack() {
    // navigate back to previous page
    navigate(-2);
  }

  async function onSave() {
    // save the data w/ respect to the current page
    const verifiers = new Verifiers();
    const studentHandler = new StudentHandler();
    const commentHandler = new CommentHandler();
    const recordHandler = new RecordHandler();

    console.log("SAVING?");

    let { studNo: studno, recommended, degree } = studentRecord;
    // input validation for student info

    if (
      !validators.studentNoRegex.test(studno) ||
      !validators.recommendedUnitsRegex.test(recommended)
    ) {
      enqueueSnackbar("Cannot save all students, some still have errors", {
        variant: "error",
      });
      return;
    }

    studno = studno.split("-").join("");

    let gradeRecordsReady = [];

    // verify student records / grade records locally
    try {
      gradeRecordsReady = await verifiers.locallyVerifyGradeRecords({
        gradeRecords,
      });
    } catch (error) {
      console.warn(error);

      enqueueSnackbar(
        "Cannot save all student records, some still have errors",
        {
          variant: "error",
        }
      );
      return;
    }
    setSaving(true);
    // verify if student records are valid by sending a request to the backend
    try {
      await verifiers.verifyStudentRecords({
        studno,
        degree,
        gradeRecordsReady,
        recommended,
      });
    } catch (error) {
      console.warn(error);
      if (error && error.length) {
        const [studentInfoErrors, studentRecordErrors] = error;
        setStudentInfoErrors(studentInfoErrors);
        setStudentRecordErrors(studentRecordErrors);
        enqueueSnackbar("Errors in student records. Please see message", {
          variant: "error",
        });
      } else {
        // assume that the error is plaintext
        enqueueSnackbar(
          error.message || "Invalid records, please check logs.",
          {
            variant: "error",
          }
        );
      }
      setSaving(false);
      return;
    }

    try {
      // creating student record info is working
      await studentHandler.saveInfo({
        studentRecord,
        email,
        studno,
        status: "UNCHECKED",
      });
      // ready the data
    } catch (error) {
      console.warn(error);
      setSaving(false);
      enqueueSnackbar(`Error in saving record: ${error}`, {
        variant: "error",
      });
      return;
    }

    // save grade records
    try {
      await recordHandler.saveGradeRecords({
        studno,
        email,
        lst: gradeRecordsReady,
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`Error in saving record: ${error}`, {
        variant: "error",
      });
      setSaving(false);
      return;
    }
    enqueueSnackbar(`Student successfully saved.`, {
      variant: "success",
    });

    // Ian moved this code down since the grade records should be verified first before saving the comment
    // addComment POST request
    if (comment.trim() !== "") {
      try {
        await commentHandler.save({
          email,
          studno,
          comment: comments[page].trim(),
        });
      } catch (error) {}
    }

    setSaving(false);
  }

  async function forceSave() {
    // save the data w/ respect to the current page
    const verifiers = new Verifiers();
    const studentHandler = new StudentHandler();
    const recordHandler = new RecordHandler();
    const commentHandler = new CommentHandler();
    const cookie = new Cookies();
    const email = cookie.get("email");
    const { studNo: studno, old_studNo, recommended } = studentRecord;
    // input validation for student info

    if (!verifiers.locallyVerifyStudent({ studno, recommended })) {
      enqueueSnackbar("Cannot save all students, some still have errors", {
        variant: "error",
      });
      return;
    }

    const newStudNo = studno.split("-").join("");
    const oldStudNo = old_studNo.split("-").join("");
    let gradeRecordsReady = [];

    // verify student records / grade records locally
    try {
      gradeRecordsReady = await verifiers.locallyVerifyGradeRecords({
        gradeRecords,
      });
    } catch (error) {
      console.warn(error);
      enqueueSnackbar(
        "Cannot save all student records, some still have errors",
        {
          variant: "error",
        }
      );
      return;
    }
    setSaving(true);

    try {
      // creating student record info is working
      await studentHandler.updateInfo({
        studentRecord: {
          ...studentRecord,
          old_stud_no: oldStudNo,
          new_stud_no: newStudNo,
          status: "INCOMPLETE",
          credited: 0,
          gwa: 0,
        },

        email,
      });

      // ready the data
    } catch (error) {
      console.warn(error);
      enqueueSnackbar(`Error in saving record: ${error}`, {
        variant: "error",
      });
      setSaving(false);
      setShowForceSave(false);
      return;
    }

    // save grade records
    try {
      // creating student record info is working
      const transformedGradeRecords = gradeRecordsReady.map((record) => {
        const { total, courseno, ...rest } = record;
        return {
          ...rest,
          course_number: courseno,
          running_total: total,
          student_number: newStudNo,
        };
      });
      // console.log(transformedGradeRecords);
      await recordHandler.updateGradeRecords({
        studno: newStudNo,
        lst: transformedGradeRecords,
      });

      // ready the data
    } catch (error) {
      console.warn(error);
      enqueueSnackbar(`Error in saving record: ${error}`, {
        variant: "error",
      });
      return;
    }

    // // save comments (if any)
    if (comment.trim() !== "") {
      try {
        await commentHandler.save({
          email,
          newStudNo,
          comment: comment.trim(),
        });
      } catch (error) {}
    }

    enqueueSnackbar(`Student successfully saved.`, {
      variant: "success",
    });
    setSaving(false);
    setShowForceSave(false);
    goBack();
  }
  async function getStudentInfo() {
    const handler = new StudentHandler();
    try {
      const student = await handler.getInfo({ studno });

      const { studNo: old_studNo } = student;
      setStudentRecord({
        ...student,
        old_studNo,
      });
      setLoaded(true);
    } catch (error) {
      console.warn(error);
      enqueueSnackbar("Student not found", { variant: "error" });
      goBack();
    }
  }

  /**
   * @param {Object} kwargs
   * @param {string} kwargs.title
   * @param {string[]} kwargs.messages
   */
  function renderErrors({ title, messages }) {
    const listItems =
      messages.length !== 0
        ? messages.map((message, idx) => <li key={idx}>{message}</li>)
        : null;
    return listItems && listItems.length > 0 ? (
      <Alert severity="error">
        <AlertTitle>{title}</AlertTitle>
        <ul>{listItems}</ul>
      </Alert>
    ) : null;
  }

  function handleStudentInfoChange({ name, value }) {
    setStudentRecord({ ...studentRecord, [name]: value });
  }

  const { id: studno } = params;

  useEffect(() => {
    // console.log(
    //   `${studno.toString().slice(0, 4)}-${studno.toString().slice(4)}`
    // );
    fetchCourses();
    getStudentInfo();
  }, []);
  return (
    <>
      <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
        {/* <Typography variant="h1">
          Edit student record page w/ the ff. url parameter: {id}
        </Typography> */}
        {!loaded && Object.keys(studentRecord).length === 0 ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {renderErrors({
              title: "Error in student information",
              messages: studentInfoErrors,
            })}
            <StudentRecordForm
              handleCancel={goBack}
              loading={saving}
              firstName={studentRecord.fname}
              middleName={studentRecord.mname}
              lastName={studentRecord.lname}
              suffix={studentRecord.suffix}
              studNo={studentRecord.studNo}
              degree={studentRecord.degree}
              recommended={studentRecord.recommended}
              handleInputChange={handleStudentInfoChange}
              handleComment={handleCommentChange}
              comment={comment}
              terms={terms}
              term={term}
              setTerm={setTerm}
              extraFeaturesEnabled={false}
              table={
                <>
                  {renderErrors({
                    title: "Error in grades",
                    messages: studentRecordErrors,
                  })}
                  <GradeRecordTable
                    data={convertedGrades}
                    handleUpdate={handleGradeRecordChange}
                  />
                </>
              }
              footer={
                <StudentFormFooter
                  popStack={goBack}
                  onSave={onSave}
                  loading={saving}
                  cb={() => setShowForceSave(true)}
                />
              }
            />
          </>
        )}
      </Container>
      <ForceSaveDialog
        open={showForceSave}
        handleCancel={() => setShowForceSave(false)}
        onSuccess={forceSave}
      />
    </>
  );
}

export default EditStudentRecord;
