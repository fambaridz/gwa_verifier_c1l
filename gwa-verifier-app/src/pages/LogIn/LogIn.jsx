import React from "react";
import {
  Typography,
  Button,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BACKEND_URI } from "../../constants.js";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import appLogo from "Assets/appLogo.png";
import logo from "Assets/logo.png";
import "./LogIn.css";

/*
  Page: Login Page

  Description:
    The login page is the gateway that allows access to the main 
    application through valid credentials.

  Login Credentials:
    - Email
    - Password
*/

function LogIn() {
  const { updateUser } = useAuth();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    alertMessage: "",
    alertSeverity: "",
    isAlert: false,
    showPassword: false,
  });
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  /*
    Function name: handleChange()
    Description:
      Handle changes the input values, password visibility status and alert status
  */
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  /*
    Function name: handleClickShowPassword
    Description:
      Toggles the visibility of password when the icon button is clicked
  */ 
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  /*
    Function name: handleMouseDownPassword()
    Description:
      Handle mouse down event for password input field
  */
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /*
    Function name: handleSubmit()
    Description:
      Sends a POST request to the LogIn API with the login credentials.
      The function is called when the login button is clicked.
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    // prepare payload for login
    const credentials = {
      Email: values.email,
      Password: values.password,
    };
    // send POST request to login API
    fetch(`${BACKEND_URI}/login-api/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((body) => {

        // failed to login
        if (!body.success) {
          //show failed login alert
          setValues({
            ...values,
            isAlert: true,
            alertSeverity: "error",
            alertMessage: "Failed to log in. Please check your email/password",
          });

        // successful login
        } else {
          const {
            firstname: firstName,
            middlename: middleName,
            lastname: lastName,
            suffix,
            superuser: superUser,
          } = body;

          // update user details
          updateUser({
            email: values.email,
            firstName,
            middleName,
            lastName,
            suffix,
            superUser,
          });

          // show successful login alert
          setValues({
            ...values,
            isAlert: true,
            alertSeverity: "success",
            alertMessage: "You are now logged in!",
          });

          // set successsful login to redirect to records page 
          // after 3s delay for time to alert status to user 
          setTimeout(() => {
            setIsLoggedIn(true);
          }, 1000);
        }
      });
  };
  
  // Renders the Password input field with toggle password visibility
  const Password = () => {
    return (
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <OutlinedInput
          required
          placeholder="Enter your password"
          id="form-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          size="small"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  };

  // Redirect to Student Records Page after successful login
  if (isLoggedIn) {
    return (
      <>
        <Navigate to="/records" />
      </>
    );
  }

  // Renders the Login Page
  return (
    <div className="login-container">
      <div className="login-left">
        <img src={appLogo} className="app-logo" />
      </div>
      <div className="login-right">
        <img src={logo} className="login-logo" />
        <div className="login-right-section">
          <Typography variant="" className="login-right-text">
            LOGIN TO
          </Typography>
          <Typography variant="" className="login-right-text">
            YOUR ACCOUNT
          </Typography>
        </div>
        <form
          id="login-form"
          className="login-right-section"
          onSubmit={handleSubmit}
        >
          <Typography variant="h7" className="login-form-label">
            Email
          </Typography>
          <TextField
            required
            placeholder="Enter your email"
            id="form-email"
            type="email"
            variant="outlined"
            size="small"
            value={values.email}
            onChange={handleChange("email")}
            sx={{ m: 1, width: "25ch" }}
          />
          <Typography variant="" className="login-form-label">
            Password
          </Typography>
          {Password()}
        </form>
        {values.isAlert ? (
          <Alert severity={values.alertSeverity}>{values.alertMessage}</Alert>
        ) : (
          <></>
        )}
        <Button
          type="submit"
          form="login-form"
          variant="contained"
          size="large"
          sx={{ marginBottom: 5, width: 300 }}
        >
          {" "}
          Log In
        </Button>
      </div>
    </div>
  );
}

export default LogIn;
