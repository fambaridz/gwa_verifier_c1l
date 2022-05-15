import React, { useState } from "react";
import { Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import StudentRecordForm from "Components/StudentRecordForm/";

const BACKEND_URI = "https://eoqmx7kqcyj1866.m.pipedream.net";
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

  // TODO: change this to the primary key
  const { id } = params;
  return (
    <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
      {/* <Typography variant="h1">
          Edit student record page w/ the ff. url parameter: {id}
        </Typography> */}
      <StudentRecordForm
        handleCancel={redirectToStudentRecords}
        loading={saving}
        handleSave={handleSave}
      />
    </Container>
  );
}

export default EditStudentRecord;
