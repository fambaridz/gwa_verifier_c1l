import React from "react";
import { Typography, Container, Box, IconButton, Toolbar, Menu, MenuItem, AppBar } from "@mui/material";
import { useParams } from "react-router-dom";
import { ArrowDropDown } from "@mui/icons-material";
import StudentRecordForm from "Components/StudentRecordForm/";
// edit this to create the edit student record page
function EditStudentRecord() {
  const params = useParams();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenOptionsMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseOptionsMenu = () => {
    setAnchorElUser(null);
  };

  // TODO: change this to the primary key
  const { id } = params;
  return (
    <div>
      <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
        {/* <Typography variant="h1">
          Edit student record page w/ the ff. url parameter: {id}
        </Typography> */}
        <StudentRecordForm />
      </Container>
    </div>
  );
}

export default EditStudentRecord;
