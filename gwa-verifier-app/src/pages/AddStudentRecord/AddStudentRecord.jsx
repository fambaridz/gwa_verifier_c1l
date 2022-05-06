import React, { useState } from "react";
import { Container, Box } from "@mui/material";

import { DropzoneArea } from "mui-file-dropzone";
import StudentRecordForm from "Components/StudentRecordForm";
import { Link, useNavigate } from "react-router-dom";

import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";
import "./AddStudentRecord.css";

import { extractFromFile } from "../../utils/extracters.js";
import { fromMapToArray } from "../../utils/transformers.js";
import GradeRecordTable from "Components/GradeRecordTable";
import CarouselButtons from "Components/CarouselButtons";
import AddStudentFormFooter from "Components/AddStudentFormFooter";
import EditTermDialog from "Components/EditTermDialog";
import { useDialog } from "../../hooks";

const BACKEND_URI = "http://localhost/gwa-verifier-backend";

const acceptedFiles = ["text/csv"];

function AddStudentRecord() {
  const navigate = useNavigate();

  // for notifications
  const { enqueueSnackbar } = useSnackbar();
  const { open: dialogOpen, toggle: toggleDialog } = useDialog();
  const [studentRecords, setStudentRecords] = useState({});
  const [gradeRecords, setGradeRecords] = useState({});
  const [page, setPage] = useState(0);

  const [saving, setSaving] = useState(false);

  const [term, setTerm] = useState("");
  const [terms, setTerms] = useState([]);
  const [srUidTermMap, setSrUidTermMap] = useState({});

  /*
  the index represents the page number
  0, 1, 2, ..., pageNum = length - 1 
  [ uid1, uid2, uid3]
   */
  // sruid stands for "Student Record UID"
  const [srUidPageMap, setSrUidPageMap] = useState([]);

  async function handleChange(files) {
    // get the content of all files
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
  }

  function handleStudentRecordsChange(e, studNo) {
    e.preventDefault();

    const copy = {
      ...studentRecords[studNo],
      [e.target.name]: e.target.value,
    };

    setStudentRecords({ ...studentRecords, [studNo]: { ...copy } });
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
    console.log(`Update terms is called`);
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

  async function saveAll() {
    setSaving(true);

    // create all student info
    let promises = Object.keys(studentRecords).map((key) => {
      const studentRecord = studentRecords[key];
      const { ...rest } = studentRecord;
      return fetch(BACKEND_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studNo: key,
          ...rest,
        }),
      });
    });
    let res = await Promise.all(promises);

    // now, for the grade records
    promises = Object.keys(gradeRecords).map((key) => {
      const gradeRecord = gradeRecords[key];

      return fetch(BACKEND_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gradeRecord),
      });
    });
    res = await Promise.all(promises);
    setSaving(false);
  }

  async function saveOne() {
    setSaving(true);

    // save the data w/ respect to the current page

    const uid = srUidPageMap[page];

    const studentRecord = studentRecords[uid];

    try {
      const res = await fetch(`${BACKEND_URI}/addStudent.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentRecord),
      });
      if (!res.ok) {
        const error = (data && data.message) || response.status;
        throw new Error(error);
      }

      // TODO: save grade records

      enqueueSnackbar("Student record saved", {
        variant: "success",
      });
    } catch (error) {
      console.warn(error);
      enqueueSnackbar("Error in saving record", {
        variant: "error",
      });
    }
    setSaving(false);
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

  function updateTerm(prevValue, currValue) {
    const newTerms = terms.map((term) =>
      term === prevValue ? currValue : term
    );
    console.log(newTerms);
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
        <StudentRecordForm
          firstName={getField("fname")}
          middleName={getField("mname")}
          lastName={getField("lname")}
          suffix={getField("suffix")}
          studentNo={getField("studNo")}
          degree={getField("degree")}
          recommended={getField("recommended")}
          term={term}
          setTerm={setTerm}
          terms={terms}
          loading={saving}
          handleAddRow={addRow}
          handleInputChange={(e) => {
            const uuid = srUidPageMap[page];
            handleStudentRecordsChange(e, uuid);
          }}
          handleEditTerm={toggleDialog}
          handleDeleteTerm={toggleDialog}
          table={
            <GradeRecordTable
              data={presentData()}
              handleUpdate={handleGradeRecordChange}
              handleDelete={deleteRow}
            />
          }
          footer={
            <AddStudentFormFooter
              popStack={popStack}
              saveOne={saveOne}
              saving={saving}
            />
          }
        />
      </>
    );
  }
  return (
    <>
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
    </>
  );
}

export default AddStudentRecord;
