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
import Cookies from "universal-cookie";
import { useCookies } from "react-cookie";

function PrivateRoute({ children }) {
  // const cookie = new Cookies();
  const [cookies] = useCookies();

  const [userName, setUserName] = React.useState(null);
  const [isSuperUser, setIsSuperUser] = React.useState(null);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenOptionsMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseOptionsMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    const userName = `${cookies.fname} ${cookies.midname} ${cookies.lname} ${cookies.suffix}`;

    setUserName(userName);
    setIsSuperUser(cookies.superuser);
    // setUserName(
    //   cookie.get('fname').concat(
    //     ' ',
    //     cookie.get('midname'),
    //     ' ',
    //     cookie.get('lname'),
    //     ' ',
    //     cookie.get('suffix')
    //   )
    // )
    // setIsSuperUser(
    //   cookie.get('superuser')
    // )
  }, []);

  function Dropdown() {
    if (isSuperUser == "true") {
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
              {userName}
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
