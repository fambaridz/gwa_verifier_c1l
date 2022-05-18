import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Add, Search, Delete } from "@mui/icons-material";
import CommitteeComments from "Components/CommitteeComments";
import RecordDetailTable from "Components/RecordDetailTable";
import DeleteRecordDialog from "Components/DeleteRecordDialog";
import StudentStatus from "Components/StudentStatus";
import { useDialog } from "../../hooks";
import { BACKEND_URI } from "../../constants.js";

// Sample Data
function createData(zero, one, two) {
  return { zero, one, two };
}

const rows2 = [
  createData("Units Toward GPA:", " ", " "),
  createData("Taken", 15.0, 36.0),
  createData("Passed", 15.0, 36.0),
  createData("Units Not for GPA", 3.0, 19.0),
  createData("GPA Calculations", 3.0, 19.0),
  createData("Total Grade Points", 15.0, 41.25),
  createData("/ Units Taken Toward GPA", 15.0, 36.0),
  createData("= GPA", 1.0, 1.146),
];

function RecordList() {
  let navigate = useNavigate();
  const studno = useParams().id;
  let textStatus = "SATISFIED";
  const prevStatus = "UNSATISFIED";
  // const prevStatus = useParams().status;
  const [anchorElUser, setAnchorElUser, semester, setSemester] = React.useState(null);
  const [comments, setComments] = React.useState(null);
  const [courses, setCourses] = React.useState(null);
  const [details, setDetails] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const { open: deleteDialogStatus, toggle: toggleDeleteDialog } = useDialog();

  const [terms, setTerms] = useState([]);
  const [currentTerm, setCurrenTerm] = useState("");

  const [values, setValues] = React.useState({
    alertMessage: '',
    alertSeverity: '',
    isAlert: false,
  });

  function redirectToEditStudentRecords() {
    navigate("/records/" + studno + "/edit");
  }

  const handleOpenOptionsMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseOptionsMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (event) => {
    setSemester(event.target.value);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    let newStatus = details.status;
    let prevStatus = details.status;

    if (e.target.id == 1) {
      newStatus = "SATISFIED";
    } else if (e.target.id == 2) {
      newStatus = "UNSATISFIED";
    } else if (e.target.id == 3) {
      newStatus = "UNVERIFIED";
    } else if (e.target.id == 4) {
      newStatus = "DEFICIENT";
    }
    const statusChange = {
      action: "status-change",
      student_number: details.student_number,
      prevStatus: details.status,
      newStatus: newStatus,
    };

    console.log(statusChange);

    fetch(`${BACKEND_URI}/record-details-api/details.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statusChange),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
        if (body == "Invalid status") {
          setValues({
            ...values,
            isAlert: true,
            alertSeverity: "error",
            alertMessage: "Failed to change status",
          });
          setTimeout(() => {}, 1000);
        } else if (e.target.id == 1) {
          setValues({
            ...values,
            isAlert: true,
            alertSeverity: "success",
            alertMessage: "Status Changed to SATISFIED",
          });
          setTimeout(() => {}, 1000);
          setTimeout(window.location.reload(), 5000);
        } else if (e.target.id == 2) {
          setValues({
            ...values,
            isAlert: true,
            alertSeverity: "success",
            alertMessage: "Status Changed to UNSATISFIED",
          });
          setTimeout(() => {}, 1000);
          setTimeout(window.location.reload(), 5000);
        } else if (e.target.id == 3) {
          setValues({
            ...values,
            isAlert: true,
            alertSeverity: "success",
            alertMessage: "Status Changed to UNVERIFIED",
          });
          setTimeout(() => {}, 1000);
          setTimeout(window.location.reload(), 5000);
        } else if (e.target.id == 4) {
          setValues({
            ...values,
            isAlert: true,
            alertSeverity: "success",
            alertMessage: "Status Changed to DEFICIENT",
          });
          setTimeout(() => {}, 1000);
          setTimeout(window.location.reload(), 5000);
        }
      });
    setAnchorEl(null);
  };

  const handleDeleteRecord = () => {
    const record = {
      action: "delete-record",
      student_number: studno,
    };

    const deleteRecord = async () => {
      const res = await fetch(`${BACKEND_URI}/record-details-api/details.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      const body = await res.text();
      if (res.ok) {
        setIsDeleted(true);
        toggleDeleteDialog();
      }
    };

    deleteRecord().catch(console.error);
  };

  useEffect(() => {
    const student = {
      action: "get-comments",
      student_number: studno,
    };

    const fetchComments = async () => {
      const res = await fetch(`${BACKEND_URI}/record-details-api/details.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      const body = await res.text();
      setComments(JSON.parse(body));
    };

    const course = {
      action: "get-courses",
      //manual stud no for testing
      student_number: studno,
    };

    const fetchCourses = async () => {
      const res = await fetch(`${BACKEND_URI}/record-details-api/details.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      const body = await res.text();
      const parsed = JSON.parse(body);

      // loop through all courses, get terms
      const _terms = ["All"];
      parsed.forEach((course) => {
        const { term } = course;
        if (!term) return;
        if (!_terms.includes(term)) _terms.push(term);
      });

      setTerms(_terms);
      setCurrenTerm(_terms[0]);

      setCourses(parsed);
    };

    const stud_details = {
      action: "get-student",
      student_number: studno,
    };

    const fetchDetails = async () => {
      const res = await fetch(`${BACKEND_URI}/record-details-api/details.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stud_details),
      });

      const body = await res.text();
      const stud = JSON.parse(body)[0];
      setDetails(stud);
      setName(
        [stud.firstname, stud.middlename, stud.lastname, stud.suffix].join(" ")
      );
    };

    fetchComments().catch(console.error);
    fetchCourses().catch(console.error);
    fetchDetails().catch(console.error);
    console.log(details);
  }, []);

  // if student record was deleted
  if(isDeleted){
    return(
        <Navigate to="/records"/>
    )
  }

  // if details not yet fetched
  if(details==null){
    return(<></>)
  }

  return (
    <div>
      <Box sx={{ mt: 2.5, ml: 3, fontSize: 14 }}>
        <Link to="/records" className="back-link">
          &lt; Back to Student Records
        </Link>
      </Box>
      <Box sx={{ m: 3.5, flexGrow: 1 }}>
        {/* Toolbars for header */}
        <Toolbar>
          <Typography
            variant="h5"
            style={{ fontWeight: 1000 }}
            component="div"
            sx={{ flex: 1 }}
          >
            {name}
          </Typography>
          <Button
            variant="contained"
            sx={{ marginRight: 1 }}
            style={{ backgroundColor: "#C7C7C7" }}
            endIcon={<Add />}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Mark As
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose} id={1}>
              Satisfied
            </MenuItem>
            <MenuItem onClick={handleClose} id={2}>
              Unsatisfied
            </MenuItem>
            <MenuItem onClick={handleClose} id={3}>
              Unverified
            </MenuItem>
            <MenuItem onClick={handleClose} id={4}>
              Deficient
            </MenuItem>
          </Menu>
          <StudentStatus student={details} />
        </Toolbar>
        <Toolbar>
          <div>
            <Typography
              variant="h6"
              style={{ fontWeight: 1000 }}
              component="div"
              sx={{ flex: 1 }}
            >
              {details.degree_program}
            </Typography>
            <Typography
              variant="h6"
              style={{ fontWeight: 1000 }}
              component="div"
              sx={{ flex: 1 }}
            >
              {studno}
            </Typography>
          </div>
        </Toolbar>
        {values.isAlert ? (
          <Alert severity={values.alertSeverity}>{values.alertMessage}</Alert>
        ) : (
          <></>
        )}
        {/* Dropdown menu for semesters */}
        <Box sx={{ m: 3.5 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Semester</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={currentTerm}
              label="Semester"
              onChange={(e) => setCurrenTerm(e.target.value)}
            >
              {terms.map((term, idx) => (
                <MenuItem value={term} key={idx}>
                  {term}
                </MenuItem>
              ))}
              {/* <MenuItem value={10}>Semester 1 2020-2021</MenuItem>
              <MenuItem value={20}>Semester 2 2020-2021</MenuItem>
              <MenuItem value={30}>Semester 1 2019-2020</MenuItem>
              <MenuItem value={40}>Semester 2 2019-2020</MenuItem> */}
            </Select>
          </FormControl>
        </Box>
        {/* Table 1 */}
        <RecordDetailTable
          courses={
            courses && currentTerm !== "All"
              ? courses.filter((course) => course.term === currentTerm)
              : courses
          }
        />
        {/* Table 2 */}
        <Box sx={{ ml: 3, mr: 3, mt: 2, flexGrow: 1 }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>From Enrollment</TableCell>
                <TableCell>Cumulative Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows2.map((row) => (
                <TableRow
                  key={row.zero}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.zero}
                  </TableCell>
                  <TableCell>{row.one}</TableCell>
                  <TableCell>{row.two}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        {/* Comments */}
        <CommitteeComments comments={comments} />
        {/* Edit and Delete Buttons */}
        <Box
          sx={{
            m: 3.5,
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() => {
              redirectToEditStudentRecords();
            }}
            variant="contained"
            style={{ backgroundColor: "#C7C7C7" }}
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
          <Button
            onClick={toggleDeleteDialog}
            variant="contained"
            style={{ backgroundColor: "#C7C7C7" }}
          >
            Delete
          </Button>
        </Box>
        <DeleteRecordDialog
          open={deleteDialogStatus}
          name={name || ""}
          studno={studno}
          handleCancel={toggleDeleteDialog}
          handleDelete={handleDeleteRecord}
        />
      </Box>
    </div>
  );
}

export default RecordList;
