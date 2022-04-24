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
  { field: 'id', field: 'course', headerName: 'Course', width: 360 },
  { field: 'numUnits', headerName: 'No of units', width: 320 },
  { field: 'grade', headerName: 'Grade', width: 110 },
  { field: 'grade2', headerName: '', width: 110 },
  { field: 'grade3', headerName: '', width: 110},
];

const rows = [
  { id: 1, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
  { id: 2, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
  { id: 3, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
  { id: 4, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
  { id: 5, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
  { id: 6, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
  { id: 7, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
];

function RecordList() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenOptionsMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseOptionsMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: '#AFAFAF' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Student Record Detail
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 800 }} component="div" >
              JEFF EMERSON LAR
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenOptionsMenu}
                color="inherit"
              >
                <ArrowDropDown />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseOptionsMenu}
              >
                <MenuItem onClick={handleCloseOptionsMenu}>Manage Accounts</MenuItem>
                <MenuItem onClick={handleCloseOptionsMenu}>Sign Out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ m: 3.5, flexGrow: 1 }}>
        <Toolbar>
          <div>
            <Typography variant="h6" style={{ fontWeight: 1000}} component="div" sx={{ flex: 1 }}>
              Jeff Emerson hah
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 1000 }} component="div" sx={{ flex: 1 }}>
              BS Computer Science
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 1000 }} component="div" sx={{ flex: 1 }}>
              2019-03845
            </Typography>
          </div>
          <Button variant="contained" style={{ backgroundColor:'#C7C7C7'}} endIcon={<Add />}>Mark as Verified</Button>
          <Button variant="contained" style={{ backgroundColor:'#C7C7C7'}} endIcon={<Add />}>Verified</Button>
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
