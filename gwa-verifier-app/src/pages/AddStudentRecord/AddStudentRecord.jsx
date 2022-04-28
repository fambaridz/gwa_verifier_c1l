import React, { useEffect, useState, PropTypes } from "react";
import {
  Container,
  IconButton,
  Stack,
  Box,
  Typography,
  Toolbar,
  Menu,
  MenuItem,
  AppBar,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ArrowDropDown } from "@mui/icons-material";
import { DropzoneArea } from "mui-file-dropzone";
import StudentRecordForm from "Components/StudentRecordForm";
import { Link, useNavigate } from "react-router-dom";
import "./AddStudentRecord.css";
// edit this to create the add student record/s page

/*
type annotation for StudentRecord model
I commented this out since this feature is only available on Tyescript
interface StudentRecord {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  studentNo: string;
  degree: string;
  
  gradeRecords: {
    [key: string]: GradeRecord; <-- "key" here is the "term" while the value is the GradeRecord
  }
}

interface GradeRecord {
  courseNo: string;
  grade: number;
  units: number;
  weight: number;
  cumulative: number;
}

 */

const acceptedFiles = ["text/csv"];

function AddStudentRecord() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [studentRecords, setStudentRecords] = useState(new Array(5).fill(5));
  const [page, setPage] = useState(0);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenOptionsMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseOptionsMenu = () => {
    setAnchorElUser(null);
  };

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
    if (files && files.length > 0)
      setStudentRecords(new Array(files.length).fill(0));
  }, [files]);

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
            <IconButton disabled={page === 0} onClick={prevPage}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <Typography>
              {page + 1} out of {studentRecords.length}
            </Typography>
            <IconButton
              disabled={page === studentRecords.length - 1}
              onClick={nextPage}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Stack>
        </Box>
        <StudentRecordForm handleCancel={popStack} />
      </>
    );
  }
  return (
    <div>
      <Box sx={{ mt: 2.5, ml: 3, fontSize: 14 }}>
        <Link to="/records" className="back-link">
          &lt; Back to Student Records
        </Link>
      </Box>
      <Container sx={{ paddingTop: 3, paddingBottom: 5 }}>
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
    </div>
  );
}

export default AddStudentRecord;
