import React from "react";
import { Navigate } from "react-router-dom";
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
import logo from "Assets/logo.png";
import appLogo from "Assets/appLogo.png";
import "./LogIn.css";
import { BACKEND_URI } from "../../constants.js";
import { useAuth } from "../../context/AuthContext.jsx";

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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      Email: values.email,
      Password: values.password,
    };
    console.log(credentials);
    fetch(`${BACKEND_URI}/login-api/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body.success);
        if (!body.success) {
          //show failed login alert
          setValues({
            ...values,
            isAlert: true,
            alertSeverity: "error",
            alertMessage: "Failed to log in. Please check your email/password",
          });
        } else {
          const {
            firstname: firstName,
            middlename: middleName,
            lastname: lastName,
            suffix,
            superuser: superUser,
          } = body;

          updateUser({
            email: values.email,
            firstName,
            middleName,
            lastName,
            suffix,
            superUser,
          });

          //show successful login alert
          setValues({
            ...values,
            isAlert: true,
            alertSeverity: "success",
            alertMessage: "You are now logged in!",
          });
          setTimeout(() => {
            setIsLoggedIn(true);
          }, 1000);
        }
      });
  };

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
  if (isLoggedIn) {
    return (
      <>
        <Navigate to="/records" />
      </>
    );
  }
  return (
    <div className="login-container">
      <div className="login-left">
        <img src={appLogo} className="app-logo" />
        {/* <div className="login-left-caption">
          <Typography variant="" className="login-welcome">WELCOME TO</Typography><br />
          <Typography variant="" className="login-appname">GWA Verifier</Typography>
        </div> */}
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
