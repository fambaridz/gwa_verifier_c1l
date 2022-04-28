import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { ArrowDropDown, Add, Search, Delete } from "@mui/icons-material";

const columns = [
  { field: 'id', field: 'name', headerName: 'Name', width: 290 },
  { field: 'degreeProgram', headerName: 'Degree Program', width: 360 },
  { field: 'gwa', headerName: 'GWA', width: 80 },
  { field: 'verified', headerName: 'Verified', width: 110 },
  { field: 'qualified', headerName: 'Qualified', width: 110},
  {
    field: 'action',
    type:'actions',
    headerName: 'Action',
    width: 70,
    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          className="textPrimary"
        />
      ];
    }

  }
];

const rows = [
  { id: 1, name: 'Christine Marie Castro', degreeProgram: 'BS Computer Science', gwa: 1, verified: 'Yes', qualified: 'Yes' },
  { id: 2, name: 'Kyno Castillo', degreeProgram: 'BS Computer Science', gwa: 1, verified: 'No', qualified: 'Yes' },
  { id: 3, name: 'Jeff Lar', degreeProgram: 'BS Computer Science', gwa: 1, verified: 'Yes', qualified: 'Yes' },
  { id: 4, name: 'Keith Florence Martin', degreeProgram: 'BS Computer Science', gwa: 1, verified: 'No', qualified: 'Yes' },
  { id: 5, name: 'Ian Salazar', degreeProgram: 'BS Computer Science', gwa: 1, verified: 'Yes', qualified: 'Yes' },
  { id: 6, name: 'Zenn Louie Reyes', degreeProgram: 'BS Computer Science', gwa: 1, verified: 'No', qualified: 'Yes' },
  { id: 7, name: 'Maria Makiling', degreeProgram: 'BS Agribusiness Management and Entrepreneurship', gwa: 1, verified: 'No', qualified: 'Yes' },
];

function RecordList() {
  return (
    <div>
      <Box sx={{ m: 3.5, flexGrow: 1 }}>
        <Toolbar>
          <Typography variant="h4" style={{ fontWeight: 1000 }} component="div" sx={{ flex: 1 }}>
            Student Records
          </Typography>
          <Button variant="contained" style={{ backgroundColor:'#C7C7C7' }} endIcon={<Add />}>Add Student Record</Button>
        </Toolbar>
        <Box sx={{ ml: 3, mr: 3, flexGrow: 1 }}>
          <TextField fullWidth id="search-bar" label="Search by name..." 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="standard" 
          />
        </Box>
          <Box sx={{ ml: 3, mr: 3, mt: 2, flexGrow: 1 }}>
            <div style={{ height: 400, width: '100%' }}>
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
