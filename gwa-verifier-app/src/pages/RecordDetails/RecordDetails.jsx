import React from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
// edit this to create record details page
function RecordDetails() {
  const params = useParams();
  // TODO: change this to the primary key
  const { id } = params;
  return (
    <div>
      <Typography variant="h1">
        Student Record Details page w/ the ff. params: {id}
      </Typography>
    </div>
  );
}

export default RecordDetails;
