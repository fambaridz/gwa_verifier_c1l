import * as React from "react";
import {
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import DeleteRecordDialog from "Components/DeleteRecordDialog";
import { useDialog } from "../../hooks";

function RecordList() {
  let navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  }

  const { open: deleteDialogStatus, toggle: toggleDeleteDialog } = useDialog();
  const [studno, setStudNo] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [students, setStudents] = React.useState([]);
  var studentList = [];

  function redirectToAddStudentRecords() {
    navigate("/records/add");
  }

  function getStudentNumber(selectedId) {
    return studentList.find(x => x.id === selectedId).studno;
  }

  function getStudentName(selectedId) {
    return studentList.find(x => x.id === selectedId).name;
  }

  function createName(item) {
    let middlename = (item.middlename == null) ? "" : " " + item.middlename;
    let suffix = (item.suffix == null) ? "" : " " + item.suffix + ".";
    
    return item.lastname + ", " + item.firstname + middlename + suffix;
  }

  const redirectToRecordDetails = (selectedId) => {
    navigate("/records/" + getStudentNumber(selectedId));
  };

  const openDeleteDialog = (selectedId) => {
    setStudNo(getStudentNumber(selectedId));
    setName(getStudentName(selectedId));
    toggleDeleteDialog();
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 310,
      renderCell: (params) => (
        <>
          <Button variant="text" color="black" onClick={() => redirectToRecordDetails(params.id)}>
            {params.value}
          </Button>
        </>
      ),
    },
    { field: "studno", headerName: "Student Number", width: 120 },
    { field: "degreeProgram", headerName: "Degree Program", width: 310 },
    { field: "gwa", headerName: "GWA", width: 80 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      width: 70,
      renderCell: (params) => (
        <>
          <Button onClick={() => openDeleteDialog(params.id)}>
            <Delete />
          </Button>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch(
        "http://localhost/backend/studentList.php",
        {
          method: "GET",
        }
      )

      const body = await res.json()
      setStudents(body)
    }

    fetchStudents().catch(console.error)
  }, [])

  students.map(function(item, index) {
    studentList.push({
      "id": index,
      "name": createName(item),
      "studno": parseInt(item.student_number),
      "degreeProgram": item.degree_program,
      "gwa": parseFloat(item.gwa),
      "status": item.status
    })
  })

  const handleDeleteRecord = () => {
    const record = {target: studno};

    const deleteRecord = async () => {
      const res = await fetch(
        "http://localhost/backend/studentList.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record)
        });

        const body = await res.text();
        if(res.ok) {
          toggleDeleteDialog();
          refreshPage();
        }
    }

    deleteRecord().catch(console.error);
  };

  return (
    <div>
      <DeleteRecordDialog
        open={deleteDialogStatus}
        name={name}
        studno={studno}
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
          <ThemeProvider>
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
          </ThemeProvider>
        </Toolbar>
        <Box sx={{ ml: 3, mr: 3, mt: 2, flexGrow: 1 }}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={studentList}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
            />
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default RecordList;
