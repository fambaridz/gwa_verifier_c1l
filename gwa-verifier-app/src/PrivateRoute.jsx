import React from "react";
import { Link } from "react-router-dom";
import {
    AppBar,
    Box,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
  } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

function PrivateRoute({ children }){
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenOptionsMenu = (event) => {
        setAnchorElUser(event.currentTarget);
  };

  const handleCloseOptionsMenu = () => {
        setAnchorElUser(null)
  };

  return(
    <div>
      <Box sx={{flexGrow: 1}}>
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
                <MenuItem component={Link} to={'/manage-committee'}>Manage Accounts</MenuItem>  
                <MenuItem component={Link} to={'/login'}>Sign Out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </div>
  );
}

export default PrivateRoute;