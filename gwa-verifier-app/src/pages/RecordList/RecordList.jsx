import * as React from "react";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Add, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DeleteRecordDialog from "Components/DeleteRecordDialog";
import { useDialog } from "../../hooks";
import { BACKEND_URI } from "../../constants.js";

function RecordList() {
  let navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };

  const { open: deleteDialogStatus, toggle: toggleDeleteDialog } = useDialog();
  const [studno, setStudNo] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [students, setStudents] = React.useState([]);
  var studentList = [];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    )
  }

  function redirectToAddStudentRecords() {
    navigate("/records/add");
  }

  function getStudentNumber(selectedId) {
    return studentList.find((x) => x.id === selectedId).studno;
  }

  function getStudentName(selectedId) {
    return studentList.find((x) => x.id === selectedId).name;
  }

  function createName(item) {
    let middlename =
      item.middlename == null || "" || "NULL" ? "" : " " + item.middlename;
    let suffix =
      item.suffix == null || "" || "NULL" ? "" : " " + item.suffix + ".";

    return item.lastname + ", " + item.firstname + middlename + suffix;
  }

  function classifyGWA(gwa, status) {
    if(status == "SATISFACTORY") {
      if(gwa >= 1 && gwa <= 1.2) {
        return "SUMMA CUM LAUDE";
      }else if(gwa >= 1.21 && gwa <= 1.45) {
        return "MAGNA CUM LAUDE";
      }else if(gwa >= 1.45 && gwa <= 1.75) {
        return "CUM LAUDE";
      }else{
        return "-";
      }
    }else{
      return "-";
    }
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
      minWidth: 370,
      flex: 1,
      renderCell: (params) => (
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
    { field: "degreeProgram", headerName: "Degree Program", minWidth: 70, flex: 1 },
    { field: "gwa", headerName: "GWA", minWidth: 80, flex: 1 },
    { field: "status", headerName: "Status", minWidth: 120, flex: 1 },
    { field: "classification", headerName: "Classification", minWidth: 120, flex: 1},
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      minWidth: 70,
      flex: 1,
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
      const res = await fetch(`${BACKEND_URI}/record-list-api/studentList.php`, {
        method: "GET",
      });

      const body = await res.json();
      setStudents(body);
    };

    fetchStudents().catch(console.error);
  }, []);

  students.map(function (item, index) {
    studentList.push({
      id: index,
      name: createName(item),
      studno: parseInt(item.student_number),
      degreeProgram: item.degree_program,
      gwa: parseFloat(item.gwa),
      status: item.status,
      classification: classifyGWA(item.gwa, item.status)
    });
  });

  const handleDeleteRecord = () => {
    const record = { target: studno };

    const deleteRecord = async () => {
      const res = await fetch(`${BACKEND_URI}/record-list-api/studentList.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      const body = await res.text();
      if (res.ok) {
        toggleDeleteDialog();
        refreshPage();
      }
    };

    deleteRecord().catch(console.error);
  };

  return (
    <div>
      <DeleteRecordDialog
        open={deleteDialogStatus}
        // provide default values
        name={name || ""}
        studno={studno || ""}
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
          {/* omitted ThemeProvider since it's not necessary to include it here; it's already included in App.jsx */}

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
