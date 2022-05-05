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

function RecordList() {
  let navigate = useNavigate();

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
      width: 290,
      renderCell: (params) => (
        <>
          <Button variant="text" color="black" onClick={() => redirectToRecordDetails(params.id)}>
            {params.value}
          </Button>
        </>
      ),
    },
    { field: "studno", headerName: "Student Number", width: 120 },
    { field: "degreeProgram", headerName: "Degree Program", width: 290 },
    { field: "gwa", headerName: "GWA", width: 80 },
    { field: "verified", headerName: "Verified", width: 90 },
    { field: "qualified", headerName: "Qualified", width: 90 },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      width: 70,
      renderCell: () => (
        <Button>
          <Delete />
        </Button>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      name: "Castro, Christine Marie",
      studno: 201900000,
      degreeProgram: "BS Computer Science",
      gwa: 1,
      verified: "Yes",
      qualified: "Yes",
    },
    {
      id: 2,
      name: "Castillo, Kyno",
      studno: 201900001,
      degreeProgram: "BS Computer Science",
      gwa: 1,
      verified: "No",
      qualified: "Yes",
    },
    {
      id: 3,
      name: "Lar, Jeff",
      studno: 201900002,
      degreeProgram: "BS Computer Science",
      gwa: 1,
      verified: "Yes",
      qualified: "Yes",
    },
    {
      id: 4,
      name: "Martin, Keith Florence",
      studno: 201900003,
      degreeProgram: "BS Computer Science",
      gwa: 1,
      verified: "No",
      qualified: "Yes",
    },
    {
      id: 5,
      name: "Salazar, Ian",
      studno: 201900004,
      degreeProgram: "BS Computer Science",
      gwa: 1,
      verified: "Yes",
      qualified: "Yes",
    },
    {
      id: 6,
      name: "Reyes, Zenn Louie",
      studno: 201900005,
      degreeProgram: "BS Computer Science",
      gwa: 1,
      verified: "No",
      qualified: "Yes",
    },
    {
      id: 7,
      name: "Makiling, Maria",
      studno: 201900006,
      degreeProgram: "BS Mathematics & Science Teaching",
      gwa: 1,
      verified: "No",
      qualified: "Yes",
    },
  ];

  return (
    <div>
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
        {/* <Box sx={{ ml: 3, mr: 3, flexGrow: 1 }}>
          <TextField
            fullWidth
            id="search-bar"
            label="Search by name..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Box> */}
        <Box sx={{ ml: 3, mr: 3, mt: 2, flexGrow: 1 }}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
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
