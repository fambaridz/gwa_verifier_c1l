import React from "react";
import {
  Typography,
  Container,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  AppBar,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowDropDown } from "@mui/icons-material";
import StudentRecordForm from "Components/StudentRecordForm/";
// edit this to create the edit student record page
function EditStudentRecord() {
  const params = useParams();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenOptionsMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseOptionsMenu = () => {
    setAnchorElUser(null);
  };

  function redirectToStudentRecords() {
    navigate("/records");
    console.log("navigate");
  }

  // TODO: change this to the primary key
  const { id } = params;
  return (
    <div>
      <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
        {/* <Typography variant="h1">
          Edit student record page w/ the ff. url parameter: {id}
        </Typography> */}
        <StudentRecordForm handleCancel={redirectToStudentRecords} />
      </Container>
    </div>
  );
}

export default EditStudentRecord;
