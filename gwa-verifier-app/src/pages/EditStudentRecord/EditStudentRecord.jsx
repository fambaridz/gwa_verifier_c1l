import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import StudentRecordForm from "Components/StudentRecordForm/";
import { BACKEND_URI } from "../../constants.js";

// edit this to create the edit student record page
function EditStudentRecord() {
  const params = useParams();
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [studentRecord, setStudentRecord] = useState({});

  const [gradeRecords, setGradeRecords] = useState({});

  async function handleSave() {
    setSaving(true);

    let res = await fetch(BACKEND_URI, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentRecord),
    });

    const promises = Object.keys(gradeRecords).map((key) => {
      const record = gradeRecords[key];
      return fetch(BACKEND_URI, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
    });

    res = await Promise.all(promises);
    console.log(res);
    setTimeout(() => setSaving(false), 3000);
  }

  function redirectToStudentRecords() {
    navigate("/records");
    console.log("navigate");
  }

  const { id: studno } = params;

  useEffect(() => {
    async function getStudentInfo() {
      try {
        const res = await fetch(`${BACKEND_URI}/details.php`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            action: "get-student",
            student_number: studno,
          }),
        });
        const body = await res.text();
        const student = JSON.parse(body)[0];
        setStudentRecord(student);
      } catch (error) {
        console.warn(error);
      }
    }
    getStudentInfo();
  }, []);
  return (
    <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
      {/* <Typography variant="h1">
          Edit student record page w/ the ff. url parameter: {id}
        </Typography> */}
      <StudentRecordForm
        handleCancel={redirectToStudentRecords}
        loading={saving}
        handleSave={handleSave}
        name={""}
        recommended=""
        firstName=""
        middleName=""
        lastName=""
        suffix=""
        degree=""
        studentNo={studno}
        handleInputChange={() => {}}
        handleEditTerm={() => {}}
        handleDeleteTerm={() => {}}
        terms={[]}
      />
    </Container>
  );
}

export default EditStudentRecord;
