import React, { useState } from "react";
import { Container, Box } from "@mui/material";

import { DropzoneArea } from "mui-file-dropzone";
import StudentRecordForm from "Components/StudentRecordForm";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";
import "./AddStudentRecord.css";

import { extractFromFile } from "../../utils/extracters.js";
import { fromMapToArray } from "../../utils/transformers.js";
import * as validators from "../../utils/validators.js";
import GradeRecordTable from "Components/GradeRecordTable";
import CarouselButtons from "Components/CarouselButtons";
import AddStudentFormFooter from "Components/AddStudentFormFooter";
import StudentFormFooter from "Components/StudentFormFooter";
import EditTermDialog from "Components/EditTermDialog";
import DeleteTermDialog from "Components/DeleteTermDialog";
import ForceSaveDialog from "Components/ForceSaveDialog";
import ParsingModal from "Components/ParsingModal";
import { useDialog } from "../../hooks";
import { BACKEND_URI } from "../../constants.js";
import { Verifiers } from "./helpers.js";
import Cookies from "universal-cookie";

// const BACKEND_URI = "http://localhost/gwa-verifier-backend";

const acceptedFiles = ["text/csv"];

function AddStudentRecord() {
  const navigate = useNavigate();

  // for notifications
  const { enqueueSnackbar } = useSnackbar();
  const { open: dialogOpen, toggle: toggleDialog } = useDialog();
  const { open: deleteDialogStatus, toggle: toggleDeleteDialog } = useDialog();
  const [studentRecords, setStudentRecords] = useState({});
  const [gradeRecords, setGradeRecords] = useState({});
  const [page, setPage] = useState(0);

  const [saving, setSaving] = useState(false);

  const [term, setTerm] = useState("");
  const [terms, setTerms] = useState([]);
  const [srUidTermMap, setSrUidTermMap] = useState({});
  const [parsing, setParsing] = useState(false);
  const [comments, setComment] = useState([]);

  /**
   * {
   *    [uid]: messages[]
   * }
   */
  const [studentInfoErrors, setStudentInfoErrors] = useState({});
  const [studentRecordErrors, setStudentRecordErrors] = useState({});

  /*
  the index represents the page number
  0, 1, 2, ..., pageNum = length - 1 
  [ uid1, uid2, uid3]
   */
  // sruid stands for "Student Record UID"
  const [srUidPageMap, setSrUidPageMap] = useState([]);

  const [showForceSave, setShowForceSave] = useState(false);

  //  get user's email from cookies
  const cookie = new Cookies();
  const email = cookie.get("email");

  async function handleChange(files) {
    if (!files.length) return;
    // get the content of all files
    setParsing(true);
    try {
      const [_studentRecords, _srUidPageMap, _gradeRecords, _srUidTermMap] =
        await extractFromFile(files);

      const firstRecord = _srUidPageMap[0];
      const terms = _srUidTermMap[firstRecord];
      const firstTerm = terms[0];

      setStudentRecords(_studentRecords);
      setSrUidPageMap(_srUidPageMap);
      setGradeRecords(_gradeRecords);
      setTerms(terms);
      setTerm(firstTerm);
      setSrUidTermMap(_srUidTermMap);
    } catch (error) {
      console.log(error);
    }
    setParsing(false);
  }

  function handleStudentRecordsChange({ name, value }) {
    const uuid = srUidPageMap[page];
    const copy = {
      ...studentRecords[uuid],
      [name]: value,
    };

    setStudentRecords({ ...studentRecords, [uuid]: { ...copy } });
  }

  // REFACTOR: changed prop from Event e to a string
  function handleCommentChange(newComment, index) {
    const updateComment = [...comments];
    updateComment[index] = newComment;
    setComment(updateComment);
  }

  function getField(name) {
    const uid = srUidPageMap[page];
    if (!uid) return "";

    const studentRecord = studentRecords[uid];
    if (!studentRecord) return "";

    const res = studentRecord[name];
    if (!res) return "";
    return res;
  }
  function nextPage() {
    if (page === studentRecords.length - 1) return;
    const newPage = page + 1;
    updateTerms(newPage);
    setPage(newPage);
  }
  function prevPage() {
    if (page === 0) return;
    const newPage = page - 1;
    updateTerms(newPage);
    setPage(newPage);
  }
  /**
   *
   * @param {number} nextPage
   */
  function updateTerms(nextPage) {
    const srUid = srUidPageMap[nextPage];
    const _terms = srUidTermMap[srUid];
    const [firstTerm] = _terms;

    setTerms(_terms);
    setTerm(firstTerm);
  }

  function redirectToStudentRecords() {
    navigate("/records");
  }

  function popStack() {
    // TODO: extract this logic to a separate function and just import it
    const uid = srUidPageMap[page];
    const copyOfStudentRecords = { ...studentRecords };
    const copyOfUidPageMap = [...srUidPageMap];
    delete copyOfStudentRecords[uid];
    copyOfUidPageMap.splice(page, 1);

    const newLength = Object.keys(studentRecords).length - 1;
    const newPage = page === 0 ? page : page - 1;

    setStudentRecords(copyOfStudentRecords);
    setPage(newPage);
    setSrUidPageMap(copyOfUidPageMap);
    if (newLength === 0) {
      redirectToStudentRecords();
      return;
    }
    updateTerms(newPage);
    // move the comments from the page
    const updateComment = [...comments];
    updateComment[page] = updateComment[page + 1];
    setComment(updateComment);
  }
  function handleGradeRecordChange({ uid, columnId, value }) {
    const record = gradeRecords[uid];

    if (!record) return;
    Object.assign(record, {
      [columnId]: value,
    });
    setGradeRecords({ ...gradeRecords, [uid]: record });
  }
  function presentData() {
    // const records = gradeRecords.filter(record => record.term === term);

    // get studentUid
    const srUid = srUidPageMap[page];

    const records = fromMapToArray(gradeRecords, "uid").filter(
      (record) => record.term === term && record.srUid === srUid
    );
    return records;
  }

  async function saveOne() {
    // save the data w/ respect to the current page
    const verifiers = new Verifiers();
    console.log("SAVING?");
    const uid = srUidPageMap[page];

    const studentRecord = studentRecords[uid];
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
        uid,
        gradeRecords,
      });
    } catch (error) {
      console.warn(error);
      setSaving(false);
      enqueueSnackbar(
        "Cannot save all student records, some still have errors",
        {
          variant: "error",
        }
      );
      return;
    }

    // verify if student records are valid by sending a request to the backend
    try {
      await verifiers.verifyStudentRecords({
        studno,
        uid,
        degree,
        gradeRecordsReady,
        recommended,
      });
    } catch (error) {
      console.warn(error);
      if (error && error.length) {
        const [studentInfoErrors, studentRecordErrors] = error;
        setStudentInfoErrors({ [uid]: studentInfoErrors });
        setStudentRecordErrors({ [uid]: studentRecordErrors });
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
      const payload = {
        ...studentRecord,
        studno,
        status: "UNCHECKED",
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

      // ready the data
    } catch (error) {
      console.warn(error);
      enqueueSnackbar(`Error in saving record: ${error}`, {
        variant: "error",
      });
      return;
    }

    // save grade records
    try {
      const payload = {
        studno,
        lst: gradeRecordsReady,
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
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
    enqueueSnackbar(`Student successfully saved.`, {
      variant: "success",
    });

    // Ian moved this code down since the grade records should be verified first before saving the comment
    // addComment POST request
    if (comments[page] && comments[page].trim() !== "") {
      try {
        const payload = {
          email,
          studno,
          comment: comments[page].trim(),
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
      } catch (error) {}
    }

    setSaving(false);
  }

  async function forceSave() {
    // save the data w/ respect to the current page

    const uid = srUidPageMap[page];

    const studentRecord = studentRecords[uid];
    let { studNo: studno, recommended } = studentRecord;
    // input validation for student info

    if (!locallyVerifyStudent({ studno, recommended })) {
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
        uid,
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
      const payload = {
        ...studentRecord,
        studno,
        status: "INCOMPLETE",
        rec_units: 0,
        cred_units: 0,
        gwa: 0,
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
        const error = res.status;
        throw new Error(msg);
      }

      // ready the data
    } catch (error) {
      console.warn(error);
      enqueueSnackbar(`Error in saving record: ${error}`, {
        variant: "error",
      });
      setSaving(false);
      return;
    }

    // save grade records
    try {
      const payload = {
        studno,
        lst: gradeRecordsReady,
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
    } catch (error) {
      console.log(error);
      setSaving(false);
    }

    // save comments (if any)
    if (comments[page] && comments[page].trim() !== "") {
      try {
        const payload = {
          email,
          studno,
          comment: comments[page].trim(),
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
      } catch (error) {}
    }

    enqueueSnackbar(`Student successfully saved.`, {
      variant: "success",
    });
    setSaving(false);
    setShowForceSave(false);
  }

  function addRow() {
    const currSrUid = srUidPageMap[page];
    const newRecord = {
      term,
      courseno: "",
      grade: "",
      units: "",
      enrolled: "",
      running_total: "",
      srUid: currSrUid,
    };
    const grUid = uuidv4();
    setGradeRecords({
      ...gradeRecords,
      [grUid]: newRecord,
    });
  }

  function deleteRow(uid) {
    const gradeRecordCopy = { ...gradeRecords };
    if (!gradeRecordCopy[uid]) return;
    delete gradeRecordCopy[uid];
    setGradeRecords(gradeRecordCopy);
  }
  // TODO: refactor this; extract logic to separate function
  function updateTerm(prevValue, currValue) {
    const newTerms = terms.map((term) =>
      term === prevValue ? currValue : term
    );
    const srUid = srUidPageMap[page];
    const srUidTermMapCopy = { ...srUidTermMap };
    Object.assign(srUidTermMapCopy, {
      [srUid]: newTerms,
    });

    console.table(srUidTermMapCopy);

    const gradeRecordsCopy = {};
    Object.keys(gradeRecords).forEach((grUid) => {
      const record = { ...gradeRecords[grUid] };
      let { term, srUid: recordSrUid } = record;
      if (recordSrUid === srUid && term === prevValue) term = currValue;
      Object.assign(record, { term });
      Object.assign(gradeRecordsCopy, {
        [grUid]: record,
      });
    });

    // since the only editable term is the selected term, we will update the current term accordingly
    setTerm(currValue);
    setTerms(newTerms);
    setSrUidTermMap(srUidTermMapCopy);
    setGradeRecords(gradeRecordsCopy);
    toggleDialog();
  }
  // TODO: refactor this; extract logic to separate function
  function deleteTerm(srUid, term) {
    let termsCopy = srUidTermMap[srUid];
    if (!termsCopy) return;
    // filter the terms
    termsCopy = termsCopy.filter((t) => t !== term);

    // filter grade records with the term and the srUid
    const gradeRecordsCopy = {};
    Object.keys(gradeRecords).forEach((grUid) => {
      const record = gradeRecords[grUid];
      // const { srUid: recordSrUid, term: t } = record;
      if (record.srUid === srUid && record.term === term) return;
      Object.assign(gradeRecordsCopy, {
        [grUid]: record,
      });
    });

    // update
    const srUidTermMapCopy = { ...srUidTermMap };
    Object.assign(srUidTermMapCopy, {
      [srUid]: termsCopy,
    });
    const [newTerm = ""] = termsCopy;
    setTerm(newTerm);
    setTerms(termsCopy);
    setSrUidTermMap(srUidTermMapCopy);
    setGradeRecords(gradeRecordsCopy);
    toggleDeleteDialog();
  }

  function renderErrors({ title, messages }) {
    const uid = srUidPageMap[page];
    const keys = Object.keys(messages);
    const listItems =
      keys.length !== 0 && keys.includes(uid)
        ? messages[uid].map((message, idx) => <li key={idx}>{message}</li>)
        : null;
    return listItems && listItems.length > 0 ? (
      <Alert severity="error">
        <AlertTitle>{title}</AlertTitle>
        <ul>{listItems}</ul>
      </Alert>
    ) : null;
  }

  function renderStudentRecordForms() {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            marginBottom: 4,
          }}
        >
          <CarouselButtons
            currPage={page}
            maxPage={Object.keys(studentRecords).length}
            saving={saving}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </Box>
        {renderErrors({
          title: "Error in student information",
          messages: studentInfoErrors,
        })}
        <StudentRecordForm
          firstName={getField("fname")}
          middleName={getField("mname")}
          lastName={getField("lname")}
          suffix={getField("suffix")}
          studNo={getField("studNo")}
          degree={getField("degree")}
          recommended={getField("recommended")}
          term={term}
          setTerm={setTerm}
          terms={terms}
          loading={saving}
          handleAddRow={addRow}
          handleInputChange={handleStudentRecordsChange}
          // handleInputChange={(e) => {
          //   const uuid = srUidPageMap[page];
          //   handleStudentRecordsChange(e, uuid);
          // }}
          handleEditTerm={toggleDialog}
          handleDeleteTerm={toggleDeleteDialog}
          handleComment={handleCommentChange}
          comment={comments[page] || ""}
          index={page}
          table={
            <>
              {renderErrors({
                title: "Error in grades",
                messages: studentRecordErrors,
              })}
              <GradeRecordTable
                data={presentData()}
                handleUpdate={handleGradeRecordChange}
                handleDelete={deleteRow}
              />
            </>
          }
          footer={
            // <AddStudentFormFooter
            //   popStack={popStack}
            //   saveOne={saveOne}
            //   saving={saving}
            //   saveAll={saveAll}
            // />
            <StudentFormFooter
              popStack={popStack}
              onSave={() => saveOne()}
              loading={saving}
              cb={() => setShowForceSave(true)}
            />
          }
        />
      </>
    );
  }

  return (
    <>
      <ParsingModal open={parsing} />
      <Box sx={{ mt: 2.5, ml: 3, fontSize: 14 }}>
        <Link to="/records" className="back-link">
          &lt; Back to Student Records
        </Link>
      </Box>
      <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
        {Object.keys(studentRecords).length === 0 ? (
          <DropzoneArea
            filesLimit={10}
            acceptedFiles={acceptedFiles}
            onChange={handleChange}
            showAlerts={false}
          />
        ) : (
          renderStudentRecordForms()
        )}
      </Container>
      <EditTermDialog
        initialValue={term}
        open={dialogOpen}
        handleCancel={toggleDialog}
        handleSave={updateTerm}
      />
      <DeleteTermDialog
        open={deleteDialogStatus}
        term={term}
        srUid={srUidPageMap[page] || ""}
        name={`${getField("lname")} ${getField("fname")}`}
        handleCancel={toggleDeleteDialog}
        handleDelete={deleteTerm}
      />
      <ForceSaveDialog
        open={showForceSave}
        handleCancel={() => setShowForceSave(false)}
        onSuccess={forceSave}
      />
    </>
  );
}

export default AddStudentRecord;
