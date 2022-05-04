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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        {/* Toolbars for header */}
        <Toolbar>
          <Typography variant="h5" style={{ fontWeight: 1000}} component="div" sx={{ flex: 1 }}>
            Jeff Emerson Lar
          </Typography>
          <Button
            variant="contained" 
            sx={{marginRight:1}} 
            style={{ backgroundColor:'#C7C7C7'}} 
            endIcon={<Add />}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
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
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Satisfied</MenuItem>
                <MenuItem onClick={handleClose}>Unsatisfied</MenuItem>
                <MenuItem onClick={handleClose}>Unverified</MenuItem>
                <MenuItem onClick={handleClose}>Deficient</MenuItem>
          </Menu>
        <Button variant="contained" style={{ backgroundColor:'#C7C7C7'}} >Satisfied</Button>
        </Toolbar>
        <Toolbar>
          <div>
            <Typography variant="h6" style={{ fontWeight: 1000 }} component="div" sx={{ flex: 1 }}>
              BS Computer Science
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 1000 }} component="div" sx={{ flex: 1 }}>
              2019-03845
            </Typography>
          </div>
        </Toolbar>
        {/* Dropdown menu for semesters */}
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
        {/* Table 1 */}
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
        {/* Table 2 */}
        <Box sx={{ ml: 3, mr: 3, mt: 2, flexGrow: 1 }}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows2}
              columns={columns2}
            />
          </div>
        </Box>
        {/* Comments */}
        <Box sx={{ m: 3.5, flexGrow: 1 }}>
          <div>
            <Typography style={{ fontWeight: 1000}} component="div" sx={{ flex: 1 }}>
              Colsec Committee
            </Typography>
            <Typography component="div" sx={{ flex: 1 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab eveniet iste aliquam voluptate, distinctio doloribus quos exercitationem vitae est quasi dolorem, repellat, corporis molestias vero animi. Voluptatibus, aliquid illo?
            </Typography>
          </div>
        </Box>
        <Box sx={{ m: 3.5, flexGrow: 1 }}>
          <div>
            <Typography style={{ fontWeight: 1000}} component="div" sx={{ flex: 1 }}>
              Colsec Committee
            </Typography>
            <Typography component="div" sx={{ flex: 1 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab eveniet iste aliquam voluptate, distinctio doloribus quos exercitationem vitae est quasi dolorem, repellat, corporis molestias vero animi. Voluptatibus, aliquid illo?
            </Typography>
          </div>
        </Box>
        {/* Edit and Delete Buttons */}
        <Box sx={{ m: 3.5, flexGrow: 1, display:"flex", justifyContent:"flex-end"}}>
          <Button variant="contained" style={{ backgroundColor:'#C7C7C7'}} sx={{marginRight:1}} >Edit</Button>
          <Button variant="contained" style={{ backgroundColor:'#C7C7C7'}} >Delete</Button>
        </Box>
      </Box>
      
    </div>
    
  );
}

export default RecordList;
