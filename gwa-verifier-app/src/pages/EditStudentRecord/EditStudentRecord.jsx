import React from "react";
import { Typography, Container, Box, IconButton, Toolbar, Menu, MenuItem, AppBar } from "@mui/material";
import { useParams } from "react-router-dom";
import { ArrowDropDown } from "@mui/icons-material";
import StudentRecordForm from "Components/StudentRecordForm/";
// edit this to create the edit student record page
function EditStudentRecord() {
  const params = useParams();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenOptionsMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseOptionsMenu = () => {
    setAnchorElUser(null);
  };

  // TODO: change this to the primary key
  const { id } = params;
  return (
    <div>
      <Box>
        <AppBar position="static" style={{ background: '#AFAFAF' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Verifier
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 800 }} component="div" >
              IAN SALAZAR
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
      <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
        {/* <Typography variant="h1">
          Edit student record page w/ the ff. url parameter: {id}
        </Typography> */}
        <StudentRecordForm />
      </Container>
    </div>
  );
}

export default EditStudentRecord;
