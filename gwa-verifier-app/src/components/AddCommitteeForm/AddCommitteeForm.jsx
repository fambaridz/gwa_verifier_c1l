import React from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  FormControl,
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { BACKEND_URI } from "../../constants.js";
import validator from "validator";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 515,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

function AddCommitteeForm(props) {
  const [existingEmails, setexistingEmails] = React.useState(props.data);

  const [addvalues, setaddvalues] = React.useState({
    email: "",
    lastname: "",
    firstname: "",
    middlename: "",
    suffix: "",
    password: "",
    confirmpass: "",
  });
  const [isEmailValid, setisEmailValid] = React.useState(false);
  const [isPassValid, setisPassValid] = React.useState(false);
  const [isPassMatch, setisPassMatch] = React.useState(true);
  const [dirtyEmail, setDirtyEmail] = React.useState(false);
  const [dirtyPass, setDirtyPass] = React.useState(false);
  const passError = dirtyPass && isPassValid === false;

  const isAddFormValid = !(isEmailValid && isPassValid && isPassMatch);
  const handleAddChange = (prop) => (event) => {
    setaddvalues({ ...addvalues, [prop]: event.target.value });
    if (prop == "email") {
      if (validator.isEmail(event.target.value)) {
        setisEmailValid(true);
      } else {
        setisEmailValid(false);
      }
    }
    if (prop == "password") {
      if (
        validator.isStrongPassword(event.target.value, {
          minLength: 6,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
        })
      ) {
        setisPassValid(true);
      } else {
        setisPassValid(false);
      }
    }
    if (prop == "confirmpass") {
      setisPassMatch(true);
    }
  };

  async function handleAddSubmit(event) {
    event.preventDefault();
    const addAccountInfo = {
      email: addvalues.email,
      session_email: props.account_made_by,
      lastname: addvalues.lastname,
      firstname: addvalues.firstname,
      middlename: addvalues.middlename,
      suffix: addvalues.suffix,
      password: addvalues.password,
    };
    console.log(addAccountInfo);
    let uniqueEmail = true;
    if (addvalues.confirmpass === addvalues.password) {
      for (let i = 0; i < existingEmails.length; i++) {
        console.log(existingEmails[i]);
        if (addvalues.email === existingEmails[i]) {
          uniqueEmail = false;
          break;
        }
      }
      if (uniqueEmail) {
        fetch(`${BACKEND_URI}/committee-api/committee-api.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addAccountInfo),
        }).then((body) => {
          console.log(body);
          console.log(addAccountInfo);
          setOpenSuccessDialog(true);
        });
      } else {
        setOpenExistsDialog(true);
      }
    } else {
      setisPassMatch(false);
    }
  }

  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
  const [openExistsDialog, setOpenExistsDialog] = React.useState(false);
  const handleCloseSuccessDialog = () => {
    setTimeout(window.location.reload(), 5000);
  };

  const handleCloseExistsDialog = () => {
    setOpenExistsDialog(false);
  };

  return (
    <Modal
      open={props.open}
      onClose={(e) => {
        props.handleClose(e);
        setDirtyEmail(false);
        setDirtyPass(false);
        setisPassMatch(true);
      }}
    >
      <Box sx={style}>
        <Typography variant="h5" className="modalTypography">
          Add Committee Account
        </Typography>
        <form onSubmit={handleAddSubmit}>
          <TextField
            error={dirtyEmail && isEmailValid === false}
            onBlur={() => setDirtyEmail(true)}
            onChange={handleAddChange("email")}
            placeholder="username@email.com"
            helperText={
              dirtyEmail && isEmailValid === false
                ? "Username must be in email format"
                : ""
            }
            fullWidth={true}
            sx={{ my: 1 }}
            label="Username"
            variant="outlined"
            required={true}
          />
          <Stack direction="row" sx={{ my: 1 }} spacing={2}>
            <TextField
              onChange={handleAddChange("firstname")}
              label="First Name"
              variant="outlined"
              required={true}
            />
            <TextField
              onChange={handleAddChange("middlename")}
              label="Middle Name"
              variant="outlined"
            />
          </Stack>
          <Stack direction="row" sx={{ my: 1 }} spacing={2}>
            <FormControl sx={{ width: "75%" }}>
              <TextField
                onChange={handleAddChange("lastname")}
                label="Last Name"
                variant="outlined"
                required={true}
              />
            </FormControl>
            <FormControl sx={{ width: "25%" }}>
              <TextField
                onChange={handleAddChange("suffix")}
                label="Suffix"
                variant="outlined"
              />
            </FormControl>
          </Stack>
          <TextField
            fullWidth={true}
            error={passError}
            onBlur={() => setDirtyPass(true)}
            helperText={
              passError ? "Password must have 6 or more characters." : ""
            }
            onChange={handleAddChange("password")}
            sx={{ my: 1 }}
            label="Password"
            variant="outlined"
            type="password"
            required={true}
          />
          <TextField
            fullWidth={true}
            error={isPassMatch === false}
            onChange={handleAddChange("confirmpass")}
            sx={{ my: 1 }}
            label="Confirm Password"
            variant="outlined"
            helperText={isPassMatch === false ? "Passwords not match." : ""}
            type="password"
            required={true}
          />
          <Button
            sx={{ my: 1.5 }}
            type="submit"
            color="success"
            className="modalButton"
            variant="contained"
            disabled={isAddFormValid}
          >
            Submit
          </Button>
        </form>
        <Dialog open={openSuccessDialog} onClose={handleCloseSuccessDialog}>
          <DialogTitle>{"Successfully added user!"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseSuccessDialog} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openExistsDialog} onClose={handleCloseExistsDialog}>
          <DialogTitle>{"Email already exists!"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseExistsDialog} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Modal>
  );
}

export default AddCommitteeForm;
