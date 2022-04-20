import React from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

// edit this to create the edit student record page
function EditStudentRecord() {
  const params = useParams();

  // TODO: change this to the primary key
  const { id } = params;
  return (
    <div>
      <Typography variant="h1">
        Edit student record page w/ the ff. url parameter: {id}
      </Typography>
    </div>
  );
}

export default EditStudentRecord;
