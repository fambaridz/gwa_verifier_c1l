import React from "react";
import { 
  Typography,
  Button,
  TextField,
  FormControl, 
  OutlinedInput,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "Assets/logo.png";
import "./Login.css";


function LogIn() {
  
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

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

  const Password = ()=>{
    return(
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput
              placeholder="Enter your password"
              id="form-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
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
    )
  }
  return (
    <div className="login-container">
      <div className="login-left">
        <Typography variant="" className="login-welcome">WELCOME TO</Typography>
        <Typography variant="" className="login-appname">GWA Verifier</Typography>
      </div>
      <div className="login-right">
        <img src={logo} className="login-logo"/>
        <div className="login-right-section">
          <Typography variant="" className="login-right-text">LOGIN TO</Typography>
          <Typography variant="" className="login-right-text">YOUR ACCOUNT</Typography>
        </div>
        <form className="login-right-section">
          <Typography variant="h7" className="login-form-label">Email</Typography>
          <TextField 
            placeholder="Enter your email"
            id="form-email"
            type="email"
            variant="outlined"
            size="small"  
            sx={{m:1, width: "25ch"}}
          />
          <Typography variant="" className="login-form-label">Password</Typography>
          {Password()}
        </form>
        <Button variant="contained" size="large" sx={{marginBottom:5, width: 300}}> Log In</Button>
      </div>
    </div>
  );
}

export default LogIn;
