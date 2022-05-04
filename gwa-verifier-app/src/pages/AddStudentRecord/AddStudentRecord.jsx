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
import Snackbar from "@mui/material/Snackbar";
import Alert from "Components/Alert";
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
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("Alert");

  /*
  the index represents the page number
  0, 1, 2, ..., pageNum = length - 1 
  [ uid1, uid2, uid3]
   */
  const [uidPageMap, setUidPageMap] = useState([]);

  function handleChange(files) {
    let studNoPlaceholder = 201904060;
    studNoPlaceholder += Math.floor(Math.random() * 1000);
    const studRecords = {};
    const gradeRecords = {};
    const uidPageMap = [];
    let counter = 0;
    while (counter < files.length) {
      const key = uuidv4();
      Object.assign(studRecords, {
        [key]: {
          studno: studNoPlaceholder,
          lname: "Salazar",
          fname: "Ian",
          mname: "Ilapan",
          suffix: "JR",
          degree: "BSCS",
        },
      });
      uidPageMap.push(key);
      // placeholder data: create 10 grade records
      Object.assign(gradeRecords, {
        [key]: [...Array(10)].map(() => ({
          studno: studNoPlaceholder,
          courseno: "CMSC 127",
          grade: 10,
          units: 3,
          enrolled: 30,
          runningTotal: 30,
          term: "1S2021-2022",
        })),
      });
      studNoPlaceholder++;
      counter++;
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
    const uid = uidPageMap[page];
    const copyOfStudentRecords = { ...studentRecords };
    const copyOfUidPageMap = [...uidPageMap];
    delete copyOfStudentRecords[uid];
    copyOfUidPageMap.splice(page, 1);

    const newLength = Object.keys(studentRecords).length - 1;
    const newPage = page === 0 ? page : page - 1;

    setStudentRecords(copyOfStudentRecords);
    setPage(newPage);
    setUidPageMap(copyOfUidPageMap);
    if (newLength === 0) redirectToStudentRecords();
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

    const uid = uidPageMap[page];

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
      setSeverity("success");
      setMessage("Student record created");
    } catch (error) {
      console.warn(error);
      setSeverity("error");
      setMessage("Error in saving student record.");
    }
    setOpen(true);
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
                onClick={saveOne}
                loading={saving}
                loadingText="Saving..."
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
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AddStudentRecord;
