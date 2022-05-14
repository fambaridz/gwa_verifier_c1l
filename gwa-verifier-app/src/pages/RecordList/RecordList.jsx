import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

function RecordList() {
  let navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const [students, setStudents] = React.useState([]);
  var studentList = [];

  function redirectToAddStudentRecords() {
    navigate("/records/add");
  }

  const redirectToRecordDetails = (selectedId) => {
    navigate("/records/" + rows.find(x => x.id === selectedId).studno);
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
      renderCell: () => (
        <Button onClick={handleOpenDeleteDialog}>
          <Delete />
        </Button>
      ),
    },
  ];

  function createName(item) {
    let middlename = (item.middlename == null) ? "" : " " + item.middlename;
    let suffix = (item.suffix == null) ? "" : " " + item.suffix + ".";
    
    return item.lastname + ", " + item.firstname + middlename + suffix;
  }

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

  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ backgroundColor: "#ECD718" }}>
          {"Delete student record?"}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, mb: -1 }}>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleCloseDeleteDialog}>Delete</Button>
        </DialogActions>
      </Dialog>
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
