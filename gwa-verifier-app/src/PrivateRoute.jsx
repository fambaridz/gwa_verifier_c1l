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
import navbarLogo from "Assets/navbarLogo.png";
import "./PrivateRoute.css";
import { ArrowDropDown } from "@mui/icons-material";
import { useAuth } from "./context/AuthContext.jsx";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  const { firstName, middleName, lastName, suffix } = user;

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenOptionsMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseOptionsMenu = () => {
    setAnchorElUser(null);
  };

  function Dropdown() {
    if (user && user.superUser) {
      return (
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseOptionsMenu}
        >
          <MenuItem
            onClick={handleCloseOptionsMenu}
            component={Link}
            to={"/manage-committee"}
          >
            Manage Accounts
          </MenuItem>
          <MenuItem component={Link} to={"/"}>
            Sign Out
          </MenuItem>
        </Menu>
      );
    } else {
      return (
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseOptionsMenu}
        >
          <MenuItem component={Link} to={"/"}>
            Sign Out
          </MenuItem>
        </Menu>
      );
    }
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <img src={navbarLogo} className="navbar-logo" />
            </Box>
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Verifier
            </Typography> */}
            <Typography
              variant="h6"
              style={{ fontWeight: 800 }}
              component="div"
            >
              {`${firstName} ${middleName} ${lastName} ${suffix}`}
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
              <Dropdown />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </div>
  );
}

export default PrivateRoute;
