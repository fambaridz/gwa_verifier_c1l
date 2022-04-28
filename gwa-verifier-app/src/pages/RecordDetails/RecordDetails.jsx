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
import { Link } from "react-router-dom";
import "./RecordDetails.css";

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

const columns2 = [
  { field: 'title', headerName: '', width: 680 },
  { field: 'fromEnroll', headerName: 'From Enrollment', width: 220 },
  { field: 'total', headerName: 'Cumulative Total', width: 110 },
];

const rows2 = [
  { id: 1, title: 'Lorem', fromEnroll: '1.25', total: '3.75'},
  { id: 2, title: 'Lorem', fromEnroll: '1.25', total: '3.75'},
  { id: 3, title: 'Lorem', fromEnroll: '1.25', total: '3.75'},
  { id: 4, title: 'Lorem', fromEnroll: '1.25', total: '3.75'},
  { id: 5, title: 'Lorem', fromEnroll: '1.25', total: '3.75'},
  { id: 6, title: 'Lorem', fromEnroll: '1.25', total: '3.75'},
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
      <Box sx={{ mt: 2.5, ml: 3, fontSize: 14 }}>
        <Link to="/records" className="back-link">
          &lt; Back to Student Records
        </Link>
      </Box>
      <Box sx={{ m: 3.5, flexGrow: 1 }}>
        <Toolbar>
          <div>
            <Typography variant="h5" style={{ fontWeight: 1000}} component="div" sx={{ flex: 1 }}>
              Jeff Emerson Lar
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 1000 }} component="div" sx={{ flex: 1 }}>
              BS Computer Science
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 1000 }} component="div" sx={{ flex: 1 }}>
              2019-03845
            </Typography>
          </div>
          <div style = {{ position: 'absolute', right: 0 }} sx={{marginRight:10}}>
            <Button variant="contained" style={{ backgroundColor:'#C7C7C7'}} endIcon={<Add />}>Mark as Verified</Button>
            <Button variant="contained" style={{ backgroundColor:'#C7C7C7'}} >Verified</Button>
          </div>
        </Toolbar>
        <Box>
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
            <MenuItem onClick={handleCloseOptionsMenu}>Semester 1 2020-2021</MenuItem>
            <MenuItem onClick={handleCloseOptionsMenu}>Semester 2 2020-2021</MenuItem>
            <MenuItem onClick={handleCloseOptionsMenu}>Semester 1 2019-2020</MenuItem>
            <MenuItem onClick={handleCloseOptionsMenu}>Semester 2 2019-2020</MenuItem>
          </Menu>
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
        <Box sx={{ ml: 3, mr: 3, mt: 2, flexGrow: 1 }}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows2}
              columns={columns2}
            />
          </div>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <div style={{ width: '100%'}}>
            <Typography component="div" sx={{ flex: 1 }}>
              Colsec Committee
            </Typography>
            <Typography component="div" sx={{ flex: 1 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab eveniet iste aliquam voluptate, distinctio doloribus quos exercitationem vitae est quasi dolorem, repellat, corporis molestias vero animi. Voluptatibus, aliquid illo?
            </Typography>
          </div>
          <div style={{ background: '#AFAFAF',  width: '100%'}}>
            <Typography component="div" sx={{ flex: 1 }}>
              Next Committee
            </Typography>
            <Typography component="div" sx={{ flex: 1 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab eveniet iste aliquam voluptate, distinctio doloribus quos exercitationem vitae est quasi dolorem, repellat, corporis molestias vero animi. Voluptatibus, aliquid illo?
            </Typography>
          </div>
        </Toolbar>
      </Box>
      <Box>
        <div style = {{ position: 'absolute', right: 0 }} sx={{marginRight:10}}>
            <Button variant="contained" style={{ backgroundColor:'#C7C7C7'}} >Edit</Button>
            <Button variant="contained" style={{ backgroundColor:'#C7C7C7'}} >Delete</Button>
        </div>
      </Box>
      
    </div>
    
  );
}

export default RecordList;
