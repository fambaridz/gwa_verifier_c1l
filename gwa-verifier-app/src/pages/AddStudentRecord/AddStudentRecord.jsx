import React, { useState } from "react";
import {
  Container,
  IconButton,
  Stack,
  Box,
  Typography,
  Button,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { DropzoneArea } from "mui-file-dropzone";
import StudentRecordForm from "Components/StudentRecordForm";
import { useNavigate } from "react-router-dom";
import SplitButton from "Components/SplitButton";
import { v4 as uuidv4 } from "uuid";

const BACKEND_URI = "http://localhost/gwa-verifier-backend";
/*
type annotation for StudentRecord model
I commented this out since this feature is only available on Tyescript
interface StudentRecord {
  studno: string; <-- primary key
  fname: string;
  mname: string;
  lname: string;
  suffix: string;
  degree: string;
}

interface GradeRecord {
  id: number; <-- primary key
  courseNo: string;
  grade: number;
  units: number;
  weight: number;
  cumulative: number;
  term: string;
}

interface GradeRecordMap {
  [studentNo: number]: GradeRecord[];
} 

 */

const acceptedFiles = ["text/csv"];

function AddStudentRecord() {
  const navigate = useNavigate();

  const [studentRecords, setStudentRecords] = useState({});
  const [gradeRecords, setGradeRecords] = useState({});
  const [page, setPage] = useState(0);

  const [saving, setSaving] = useState(false);
  const [uidPageMap, setUidPageMap] = useState({});

  function handleChange(files) {
    let studNoPlaceholder = 201904060;
    const studRecords = {};
    const gradeRecords = {};
    let _page = 0;
    const uidPageMap = {};
    let counter = 0;
    while (counter < files.length) {
      const key = uuidv4();
      Object.assign(studRecords, {
        [key]: {
          lname: "Salazar",
          fname: "Ian",
          mname: "Ilapan",
          suffix: "JR",
          degree: "BSCS",
        },
      });
      Object.assign(uidPageMap, {
        [_page]: key,
      });
      // placeholder data: create 10 grade records
      Object.assign(gradeRecords, {
        [key]: [...Array(10)].map(() => ({
          studNo: studNoPlaceholder,
          courseNo: "CMSC 127",
          grade: 10,
          units: 3,
          enrolled: 30,
          runningTotal: 30,
          term: "1S2021-2022",
        })),
      });
      studNoPlaceholder++;
      counter++;

      _page++;
    }

    setStudentRecords(studRecords);
    setGradeRecords(gradeRecords);
    setUidPageMap(uidPageMap);
  }

  function handleStudentRecordsChange(e, studNo) {
    e.preventDefault();
    // console.log(e.target);
    // console.log(typeof e.target.name);
    // console.log(typeof e.target.value);
    // const { name, value } = e.target;
    const copy = {
      ...studentRecords[studNo],
      [e.target.name]: e.target.value,
    };

    setStudentRecords({ ...studentRecords, [studNo]: { ...copy } });
  }
  function getField(name) {
    const uid = uidPageMap[page];
    if (!uid) return "";

    const studentRecord = studentRecords[uid];
    if (!studentRecord) return "";
    // console.log(page);
    // console.log(studNo);
    // console.dir(studentRecord);
    // console.log(studentRecord[name]);
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
    const newLength = studentRecords.length - 1;
    const newPage = page === 0 ? page : page - 1;

    setStudentRecords(new Array(newLength).fill(5));
    setPage(newPage);
    if (newLength === 0) redirectToStudentRecords();
  }

  async function handleSave() {
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
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton disabled={page === 0 && !saving} onClick={prevPage}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <Typography>
              {page + 1} out of {Object.keys(studentRecords).length}
            </Typography>
            <IconButton
              disabled={
                page === Object.keys(studentRecords).length - 1 && !saving
              }
              onClick={nextPage}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Stack>
        </Box>
        <StudentRecordForm
          firstName={getField("fname")}
          middleName={getField("mname")}
          lastName={getField("lname")}
          suffix={getField("suffix")}
          studentNo={getField("studNo")}
          handleInputChange={(e) => {
            const uuid = uidPageMap[page];
            handleStudentRecordsChange(e, uuid);
          }}
          footer={
            <Stack direction="row" spacing={2} sx={{ alignSelf: "end" }}>
              <Button
                variant="outlined"
                color="default"
                size="large"
                onClick={popStack}
              >
                Cancel
              </Button>

              <SplitButton
                label="Save one"
                onClick={() => {}}
                menuItems={[
                  {
                    value: "Save all",
                    cb: () => console.log("Calling  callback"),
                  },
                ]}
              />
            </Stack>
          }
          loading={saving}
        />
      </>
    );
  }
  return (
    <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
      {/* {renderStudentRecordForms()} */}
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
