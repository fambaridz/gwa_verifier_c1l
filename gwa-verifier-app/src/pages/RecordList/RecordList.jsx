import * as React from "react";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Add, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DeleteRecordDialog from "Components/DeleteRecordDialog";
import { useDialog } from "../../hooks";
import { BACKEND_URI } from "../../constants.js";
import { useAuth } from "../../context/AuthContext.jsx";

/*
  Page: Student Records Page

  Description:
    The Student Records Page is the application's main page.
    This page displays a list of student records along with their basic information.

  Features:
    1. Sorting and/or filtering of student records according to Name, Student Number, Degree Program, GWA, Status, or Classification
    2. Adding students records
    3. Editing student records
    4. Deleting student records
    5. Hiding or displaying selected columns
*/
function RecordList() {
  // state variables
  const [studno, setStudNo] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [students, setStudents] = React.useState([]);
  
  const { open: deleteDialogStatus, toggle: toggleDeleteDialog } = useDialog();
  let navigate = useNavigate();
  var studentList = [];

  const {
    user: { email },
  } = useAuth();

  const refreshPage = () => {
    navigate(0);
  };

  const redirectToRecordDetails = (selectedId) => {
    navigate("/records/" + getStudentNumber(selectedId));
  };

  const openDeleteDialog = (selectedId) => {
    // Stores selected student name and number in state variables to be displayed in the delete dialog
    setStudNo(getStudentNumber(selectedId));
    setName(getStudentName(selectedId));
    toggleDeleteDialog();
  };

  // Sets the columns for the table
  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 370,
      flex: 1,
      renderCell: (params) => (
        // Renders the student's name as a button per cell
        // Adds onClick event to direct user to the page where they can view the student record
        <>
          <Button
            variant="text"
            color="black"
            onClick={() => redirectToRecordDetails(params.id)}
          >
            {params.value}
          </Button>
        </>
      ),
    },
    { field: "studno", headerName: "Student Number", minWidth: 130, flex: 1 },
    {
      field: "degreeProgram",
      headerName: "Degree Program",
      minWidth: 70,
      flex: 1,
    },
    { field: "gwa", headerName: "GWA", minWidth: 80, flex: 1 },
    { field: "status", headerName: "Status", minWidth: 120, flex: 1 },
    {
      field: "classification",
      headerName: "Classification",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      minWidth: 70,
      flex: 1,
      renderCell: (params) => (
        // Renders a delete button per row
        // Adds onClick event to open a dialog to confirm deletion from user
        <>
          <Button onClick={() => openDeleteDialog(params.id)}>
            <Delete />
          </Button>
        </>
      ),
    },
  ];

  const handleDeleteRecord = () => {
    // Creates a JSON object to be used as payload for API call
    const record = {
      target: studno,
      email: email,
    };

    // Calls API to delete student record in the database
    const deleteRecord = async () => {
      const res = await fetch(
        `${BACKEND_URI}/record-list-api/studentList.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        }
      );

      const body = await res.text();
      if (res.ok) {
        // Refreshes page if record is successfully deleted
        toggleDeleteDialog();
        refreshPage();
      }
    };

    deleteRecord().catch(console.error);
  };

  /*
    Function Name: CustomToolbar
    Description:
      Composes a custom toolbar for the table of student records containing buttons for Columns and Export
    Parameter/s: None
    Return Type: GridToolbarContainer
  */
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  /*
    Function Name: redirectToAddStudentRecords
    Description:
      Calls the navigate function to navigate to the Add Student Record Page
    Parameter/s: None
    Return Type: void
  */
  function redirectToAddStudentRecords() {
    navigate("/records/add");
  }

  /*
    Function Name: getStudentNumber
    Description:
      Gets the student number of an entry in the table of student records
    Parameter/s:
      selectedId: ID of the table entry/row selected
    Return Type: int
  */
  function getStudentNumber(selectedId) {
    return studentList.find((x) => x.id === selectedId).studno;
  }

  /*
    Function Name: getStudentName
    Description:
      Gets the student name of an entry in the table of student records
    Parameter/s:
      selectedId: ID of the table entry/row selected
    Return Type: String
  */
  function getStudentName(selectedId) {
    return studentList.find((x) => x.id === selectedId).name;
  }

  /*
    Function Name: createName
    Description:
      Creates full name from first name, middle name, last name, and suffix
    Parameter/s:
      item: JSON object containing student information
    Return Type: String
  */
  function createName(item) {
    let middlename =
      item.middlename == null || "" || "NULL" ? "" : " " + item.middlename;
    let suffix =
      item.suffix == null || "" || "NULL" ? "" : " " + item.suffix + ".";

    return item.lastname + ", " + item.firstname + middlename + suffix;
  }

  /*
    Function Name: classifyGWA
    Description:
      Determines classification of student (in terms of Latin Honors) based on their GWA
    Parameters:
      gwa: GWA of the student
      status: Status of the student record
    Return Type: String
  */
  function classifyGWA(gwa, status) {
    if (status == "SATISFACTORY") {
      if (gwa >= 1 && gwa <= 1.2) {
        return "SUMMA CUM LAUDE";
      } else if (gwa >= 1.21 && gwa <= 1.45) {
        return "MAGNA CUM LAUDE";
      } else if (gwa >= 1.45 && gwa <= 1.75) {
        return "CUM LAUDE";
      } else {
        return "-";
      }
    } else {
      return "-";
    }
  }

  React.useEffect(() => {
    // Calls API to get the list of students from the database
    const fetchStudents = async () => {
      const res = await fetch(
        `${BACKEND_URI}/record-list-api/studentList.php`,
        {
          method: "GET",
        }
      );

      const body = await res.json();
      // Stores the response as a JSON object in a state variable
      setStudents(body);
    };

    fetchStudents().catch(console.error);
  }, []);

  // Maps each element in the JSON object to the corresponding colum in the table
  // Pushes it to the studentList array
  students.map(function (item, index) {
    studentList.push({
      id: index,
      name: createName(item),
      studno: parseInt(item.student_number),
      degreeProgram: item.degree_program,
      gwa: parseFloat(item.gwa),
      status: item.status,
      classification: classifyGWA(item.gwa, item.status),
    });
  });

  return (
    <div>
      <DeleteRecordDialog
        open={deleteDialogStatus}
        // provide default values
        name={name || ""}
        studno={studno?.toString() || studno || ""}
        handleCancel={toggleDeleteDialog}
        handleDelete={handleDeleteRecord}
      />
      <Box sx={{ m: 3.5, flexGrow: 1 }}>
        <Toolbar>
          <Typography
            variant="h4"
            style={{ fontWeight: 1000 }}
            component="div"
            sx={{ flex: 1 }}
          >
            Student Records
          </Typography>
          <Button
            onClick={() => {
              redirectToAddStudentRecords();
            }}
            variant="contained"
            color="secondary"
            endIcon={<Add />}
          >
            Add Student Record
          </Button>
        </Toolbar>
        <Box sx={{ ml: 3, mr: 3, mt: 2, flexGrow: 1 }}>
          <div style={{ height: 600, width: "100%" }}>
            {/* Table Component */}
            <DataGrid
              rows={studentList}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default RecordList;
