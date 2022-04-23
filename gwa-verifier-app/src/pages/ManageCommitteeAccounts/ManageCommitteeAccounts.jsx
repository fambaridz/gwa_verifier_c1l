import React from "react";
import { 
  AppBar,
  Box,
  Menu,
  MenuItem,
  Typography, 
  Toolbar,
  IconButton,
 } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ArrowDropDown, Add, Edit, Delete } from "@mui/icons-material";

// edit this to manage committee accounts page
function createData(email, name, password) {
  return {email, name, password};
}

const rows = [
  createData('crcastro2@up.edu.ph', 'Christine Marie Castro', 'Castro' ),
  createData('krcastillo@up.edu.ph', 'Kyno Castillo', "Castillo"),
  createData('jflar@up.edu.ph', 'Jeff Lar', 'Lar'),
  createData('kcmartin@up.edu.ph', 'Keith Florence Martin', "Martin"),
  createData('iisalazar@up.edu.ph', 'Ian Salazar', 'Salazar'),
  createData('zcreyes@up.edu.ph', 'Zenn Louie Reyes', 'Reyes')
];

function ManageCommitteeAccounts() {
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
              Verifier
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 800 }} component="div" >
              KYNO CASTILLO
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
          <Typography variant="h4" style={{ fontWeight: 1000 }} component="div" sx={{ flex: 1 }}>
            Manage Committee Accounts
          </Typography>
          <Button variant="contained" style={{ backgroundColor:'#C7C7C7' }} endIcon={<Add />}>Add Committee Account</Button>
        </Toolbar>
        <Box sx={{ ml: 3, mr: 3, flexGrow: 1 }}>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.email}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.password}</TableCell>
                      <TableCell><Edit /></TableCell>
                      <TableCell><Delete /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default ManageCommitteeAccounts;