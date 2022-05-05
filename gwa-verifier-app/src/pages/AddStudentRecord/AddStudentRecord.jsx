import React, { useState } from "react";
import { Container, Box } from "@mui/material";

import { DropzoneArea } from "mui-file-dropzone";
import StudentRecordForm from "Components/StudentRecordForm";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Snackbar from "@mui/material/Snackbar";
import { useSnackbar } from "notistack";

import Alert from "Components/Alert";
import { csvExtracter } from "../../utils/extracters.js";
import { fileReader } from "../../utils/parsers.js";
import { fromMapToArray } from "../../utils/transformers.js";
import GradeRecordTable from "Components/GradeRecordTable";
import CarouselButtons from "Components/CarouselButtons";
import AddStudentFormFooter from "Components/AddStudentFormFooter/AddStudentFormFooter.jsx";
const BACKEND_URI = "http://localhost/gwa-verifier-backend";

const acceptedFiles = ["text/csv"];

function AddStudentRecord() {
  const navigate = useNavigate();

  // for notifications
  const { enqueueSnackbar } = useSnackbar();

  const [studentRecords, setStudentRecords] = useState({});
  const [gradeRecords, setGradeRecords] = useState({});
  const [page, setPage] = useState(0);

  const [saving, setSaving] = useState(false);

  const [term, setTerm] = useState("");
  const [terms, setTerms] = useState([]);

  /*
  the index represents the page number
  0, 1, 2, ..., pageNum = length - 1 
  [ uid1, uid2, uid3]
   */
  // sruid stands for "Student Record UID"
  const [srUidPageMap, setSrUidPageMap] = useState([]);

  async function handleChange(files) {
    const _studentRecords = {};
    const _sruidPageMap = [];
    const _gradeRecords = {};
    // get the content of all files

    for (const file of files) {
      try {
        const text = await fileReader(file);

        const { grades, terms, ...studentInfo } = await csvExtracter(text);
        const sruid = uuidv4();
        Object.assign(_studentRecords, {
          [sruid]: {
            ...studentInfo,
          },
        });
        _sruidPageMap.push(sruid);

        grades.forEach((grade) => {
          let gruid = uuidv4();
          // continue getting a new gruid until gruid is unique, this is to catch the near 0.1% chance of collision
          while (_gradeRecords[gruid]) {
            gruid = uuidv4();
          }

          Object.assign(_gradeRecords, {
            [gruid]: grade,
          });
        });
        setTerms(terms);
        setTerm(terms[0]);
      } catch (error) {
        console.warn(error);
      }
    }

    setStudentRecords(_studentRecords);
    setSrUidPageMap(_sruidPageMap);
    setGradeRecords(_gradeRecords);
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
    setPage(page + 1);
  }
  function prevPage() {
    if (page === 0) return;
    setPage(page - 1);
  }

  function redirectToStudentRecords() {
    navigate("/records");
  }

  function popStack() {
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
    if (newLength === 0) redirectToStudentRecords();
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
    const records = fromMapToArray(gradeRecords, "uid").filter(
      (record) => record.term === term
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
          handleInputChange={(e) => {
            const uuid = srUidPageMap[page];
            handleStudentRecordsChange(e, uuid);
          }}
          term={term}
          setTerm={setTerm}
          terms={terms}
          table={
            <GradeRecordTable
              data={presentData()}
              handleUpdate={handleGradeRecordChange}
            />
          }
          footer={
            <AddStudentFormFooter
              popStack={popStack}
              saveOne={saveOne}
              saving={saving}
            />
          }
          loading={saving}
        />
      </>
    );
  }
  return (
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
  );
}

export default AddStudentRecord;
