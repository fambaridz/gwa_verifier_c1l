import React, { useState, useMemo } from "react";
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
import StudentFormFooter from "Components/StudentFormFooter";
import EditTermDialog from "Components/EditTermDialog";
import DeleteTermDialog from "Components/DeleteTermDialog";
import ForceSaveDialog from "Components/ForceSaveDialog";
import ParsingModal from "Components/ParsingModal";
import { useDialog } from "../../hooks";
import { StudentHandler, CommentHandler, RecordHandler } from "../../handlers";
import { Verifiers } from "../../utils/verifiers.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { Pages } from "./utils.js";

const acceptedFiles = ["text/csv"];

function AddStudentRecord() {
  const navigate = useNavigate();
  const {
    user: { email },
  } = useAuth();
  // for notifications
  const { enqueueSnackbar } = useSnackbar();
  const { open: dialogOpen, toggle: toggleDialog } = useDialog();
  const { open: deleteDialogStatus, toggle: toggleDeleteDialog } = useDialog();
  const [studentRecords, setStudentRecords] = useState({});
  const [gradeRecords, setGradeRecords] = useState({});
  const [currentPage, setPage] = useState(0);

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
  the index represents the currentPage number
  0, 1, 2, ..., pageNum = length - 1 
  [ uid1, uid2, uid3]
   */
  // sruid stands for "Student Record UID"
  const [pages, setPages] = useState(new Pages());

  const [showForceSave, setShowForceSave] = useState(false);

  async function handleChange(files) {
    if (!files.length) return;
    // get the content of all files
    setParsing(true);
    try {
      const [_studentRecords, _pages, _gradeRecords, _srUidTermMap] =
        await extractFromFile(files);

      const firstRecord = _pages[0];
      const terms = _srUidTermMap[firstRecord];
      const firstTerm = terms[0];

      setStudentRecords(_studentRecords);

      const newPages = new Pages();
      newPages.fromIter(_pages);
      setPages(newPages);
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
    const pageNode = pages.getAtIndex(currentPage);
    const uuid = pageNode.getData();
    const copy = {
      ...studentRecords[uuid],
      [name]: value,
    };

    setStudentRecords({ ...studentRecords, [uuid]: { ...copy } });
  }

  // REFACTOR: changed prop from Event e to a string
  function handleCommentChange(newComment) {
    const updateComment = [...comments];
    updateComment[currentPage] = newComment;
    setComment(updateComment);
  }

  function getField(name) {
    const node = pages.getAtIndex(currentPage);
    if (!node) return "";
    const uid = node.getData();
    if (!uid) return "";

    const studentRecord = studentRecords[uid];
    if (!studentRecord) return "";

    const res = studentRecord[name];
    if (!res) return "";
    return res;
  }
  function nextPage() {
    if (currentPage === studentRecords.length - 1) return;
    const newPage = currentPage + 1;
    updateTerms(newPage);
    setPage(newPage);
  }
  function prevPage() {
    if (currentPage === 0) return;
    const newPage = currentPage - 1;
    updateTerms(newPage);
    setPage(newPage);
  }
  /**
   *
   * @param {number} nextPage
   */
  function updateTerms(nextPage) {
    const node = pages.getAtIndex(nextPage);
    const srUid = node.getData();
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
    const node = pages.getAtIndex(currentPage);
    if (!node) return null;
    const uid = node.getData();

    const copyOfStudentRecords = { ...studentRecords };

    const copyOfPages = pages;
    delete copyOfStudentRecords[uid];

    copyOfPages.removeAtIndex(currentPage);

    const newLength = Object.keys(studentRecords).length - 1;
    const newPage = currentPage === 0 ? currentPage : currentPage - 1;

    const copyOfGradeRecords = Object.keys(gradeRecords)
      .filter((grUid) => gradeRecords[grUid].srUid !== uid)
      .reduce(
        (curr, key) =>
          Object.assign(curr, {
            [key]: gradeRecords[key],
          }),
        {}
      );

    setGradeRecords(copyOfGradeRecords);

    setStudentRecords(copyOfStudentRecords);
    setPage(newPage);

    setPages(copyOfPages);
    if (newLength === 0) {
      redirectToStudentRecords();
      return;
    }
    updateTerms(newPage);
    // pop the comment at index `currentPage`
    const updateComment = [...comments];
    updateComment.splice(currentPage, 1);

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
  const presentData = useMemo(() => {
    const node = pages.getAtIndex(currentPage);
    if (!node) return [];
    const srUid = node.getData();

    const records = fromMapToArray(gradeRecords, "uid").filter(
      (record) => record.term === term && record.srUid === srUid
    );
    return records;
  }, [currentPage, pages, gradeRecords, term]);

  async function safeSave() {
    // save the data w/ respect to the current currentPage
    const verifiers = new Verifiers();

    console.log("SAVING?");
    const node = pages.getAtIndex(currentPage);
    if (!node) return;
    const uid = node.getData();

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
      const gradeRecordsFiltered = Object.keys(gradeRecords)
        .filter((grUid) => gradeRecords[grUid].srUid === uid)
        .reduce((cur, key) => {
          return Object.assign(cur, { [key]: gradeRecords[key] });
        }, {});

      gradeRecordsReady = await verifiers.locallyVerifyGradeRecords({
        gradeRecords: gradeRecordsFiltered,
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
    let gwa = 0;
    let total_units_taken = 0;
    // verify if student records are valid by sending a request to the backend
    try {
      const response = await verifiers.verifyStudentRecords({
        studno,
        uid,
        degree,
        gradeRecordsReady,
        recommended,
      });
      gwa = response.gwa;
      total_units_taken = response.total_units_taken;
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

    handleSave({
      gradeRecordsReady,
      status: "UNCHECKED",
      gwa,
      total_units_taken,
    });
  }

  async function forceSave() {
    // save the data w/ respect to the current currentPage
    const verifiers = new Verifiers();
    const node = pages.getAtIndex(currentPage);
    if (!node) return;
    const uid = node.getData();

    const studentRecord = studentRecords[uid];
    let { studNo: studno, recommended } = studentRecord;
    // input validation for student info

    if (!verifiers.locallyVerifyStudent({ studno, recommended })) {
      enqueueSnackbar("Cannot save all students, some still have errors", {
        variant: "error",
      });
      return;
    }

    studno = studno.split("-").join("");

    let gradeRecordsReady = [];

    // verify student records / grade records locally
    try {
      const gradeRecordsFiltered = Object.keys(gradeRecords)
        .filter((grUid) => gradeRecords[grUid].srUid === uid)
        .reduce((cur, key) => {
          return Object.assign(cur, { [key]: gradeRecords[key] });
        }, {});
      gradeRecordsReady = await verifiers.locallyVerifyGradeRecords({
        gradeRecords: gradeRecordsFiltered,
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
    handleSave({ gradeRecordsReady });
  }
  /**
   *
   * @param {Object} param0
   * @param {Array<GradeRecord>} param0.gradeRecordsReady
   * @param {string} param0.status
   * @param {number} gwa
   * @param {number} total_units_taken
   * @param {number | string} recommended
   * @returns
   */
  async function handleSave({
    gradeRecordsReady,
    status = "INCOMPLETE",
    gwa = 0,
    total_units_taken = 0,
  }) {
    const studentHandler = new StudentHandler();
    const recordHandler = new RecordHandler();
    const commentHandler = new CommentHandler();

    const node = pages.getAtIndex(currentPage);
    if (!node) return;
    const uid = node.getData();

    const studentRecord = studentRecords[uid];
    let { studNo: studno } = studentRecord;
    studno = studno.split("-").join("");
    setSaving(true);

    try {
      // creating student record info is working
      await studentHandler.saveInfo({
        studentRecord,
        studno,
        email,
        status,
        gwa,
        cred_units: total_units_taken,
      });

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
      // creating student record info is working
      await recordHandler.saveGradeRecords({
        studno,
        email,
        lst: gradeRecordsReady,
      });

      // ready the data
    } catch (error) {
      console.warn(error);
      enqueueSnackbar(`Error in saving record: ${error}`, {
        variant: "error",
      });
      return;
    }

    // save comments (if any)
    if (comments[currentPage] && comments[currentPage].trim() !== "") {
      try {
        await commentHandler.save({
          email,
          studno,
          comment: comments[currentPage].trim(),
        });
      } catch (error) {}
    }

    enqueueSnackbar(`Student successfully saved.`, {
      variant: "success",
    });
    setSaving(false);
    setShowForceSave(false);
    popStack();
  }

  function addRow() {
    const node = pages.getAtIndex(currentPage);
    if (!node) return;
    const currSrUid = node.getData();
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

    const node = pages.getAtIndex(currentPage);
    if (!node) return;
    const rUid = node.getData();
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
    const node = pages.getAtIndex(currentPage);
    if (!node) return;
    const uid = node.getData();
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
            currPage={currentPage}
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
          handleEditTerm={toggleDialog}
          handleDeleteTerm={toggleDeleteDialog}
          handleComment={handleCommentChange}
          comment={comments[currentPage] || ""}
          table={
            <>
              {renderErrors({
                title: "Error in grades",
                messages: studentRecordErrors,
              })}
              <GradeRecordTable
                data={presentData}
                handleUpdate={handleGradeRecordChange}
                handleDelete={deleteRow}
              />
            </>
          }
          footer={
            <StudentFormFooter
              popStack={popStack}
              onSave={() => safeSave()}
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
        srUid={
          (pages.getAtIndex(currentPage) &&
            pages.getAtIndex(currentPage).getData()) ||
          ""
        }
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
