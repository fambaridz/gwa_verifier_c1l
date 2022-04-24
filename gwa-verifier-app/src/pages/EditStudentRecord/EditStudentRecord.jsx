import React from "react";
import { Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import StudentRecordForm from "Components/StudentRecordForm/";
// edit this to create the edit student record page
function EditStudentRecord() {
  const params = useParams();

  // TODO: change this to the primary key
  const { id } = params;
  return (
    <Container sx={{ paddingBottom: 5 }}>
      <Typography variant="h1">
        Edit student record page w/ the ff. url parameter: {id}
      </Typography>
      <StudentRecordForm />
    </Container>
  );
}

export default EditStudentRecord;
