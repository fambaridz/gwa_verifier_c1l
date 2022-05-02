import React, { useEffect, useState } from "react";
import { Container, IconButton, Stack, Box, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { DropzoneArea } from "mui-file-dropzone";
import StudentRecordForm from "Components/StudentRecordForm";
import { useNavigate } from "react-router-dom";

const BACKEND_URI = "https://eoqmx7kqcyj1866.m.pipedream.net";
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
  studno: string | number;
  courseNo: string;
  grade: number;
  units: number;
  weight: number;
  cumulative: number;
  term: string;
}

 */

const acceptedFiles = ["text/csv"];

function AddStudentRecord() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const [studentRecords, setStudentRecords] = useState({});
  const [gradeRecords, setGradeRecords] = useState({});
  const [page, setPage] = useState(0);
  const [saving, setSaving] = useState(false);

  function handleChange(files) {
    setFiles(files);
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

  useEffect(() => {
    console.log(files);
    if (files && files.length > 0) {
      let studNoPlaceholder = 201904060;
      const studRecords = {};
      const gradeRecords = {};
      let counter = 0,
        id = 0;
      while (counter < files.length) {
        Object.assign(studRecords, {
          [`${studNoPlaceholder}_${counter}`]: {
            lname: "Salazar",
            fname: "Ian",
            mname: "Ilapan",
            suffix: "JR",
            degree: "BSCS",
          },
        });
        // placeholder data: create 10 grade records
        while (id < 10) {
          const key = `${studNoPlaceholder}_${id}`;
          Object.assign(gradeRecords, {
            [key]: {
              studNo: studNoPlaceholder,
              courseNo: "CMSC 127",
              grade: 10,
              units: 3,
              enrolled: 30,
              runningTotal: 30,
              term: "1S2021-2022",
            },
          });
          id++;
        }
        studNoPlaceholder++;
        counter++;
        id = 0;
      }

      setStudentRecords(studRecords);
      setGradeRecords(gradeRecords);
    }
  }, [files]);

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

    console.log(res);
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
          handleCancel={popStack}
          handleSave={handleSave}
          loading={saving}
        />
      </>
    );
  }
  return (
    <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
      {/* {renderStudentRecordForms()} */}
      {files.length === 0 ? (
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
