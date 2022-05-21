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
  DialogTitle
} from "@mui/material";

import { BACKEND_URI } from "../../constants.js";
import Cookies from "universal-cookie";
import validator from "validator";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	height: 500,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 3,
}

function EditCommitteeForm(props) {
	const [editvalues, setEditValues] = React.useState({
		email: props.email,
		session_email: props.account_made_by,
		lastname: props.lastname,
		firstname: props.firstname,
		middlename:props.middlename,
		suffix:props.suffix,
		password: props.password,
		confirmpass: props.password
	});
	const [isEmailValid,setisEmailValid] = React.useState(false);
	const [isPassValid,setisPassValid] = React.useState(true);
	const [isPassMatch,setisPassMatch] = React.useState(true);
	const [dirtyEmail, setDirtyEmail] = React.useState(false);
	const handleFocus = (event) => event.target.select();
	const handleEditChange = (prop) => (event) => {
		setEditValues({ ...editvalues, [prop]: event.target.value });

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
	if(prop == "confirmpass"){
		setisPassMatch(true);
	}
    
	};
	
	 async function handleEditSubmit(event){
		event.preventDefault();
		const editAccountInfo = {
				email: editvalues.email,
				session_email: editvalues.session_email,
				lastname: editvalues.lastname,
				firstname: editvalues.firstname,
				middlename: editvalues.middlename,
				suffix: editvalues.suffix,
				password: editvalues.password
		}
		console.log(JSON.stringify(editAccountInfo));
		if (editvalues.confirmpass === editvalues.password) {
		fetch(
			`${BACKEND_URI}/committee-api/committee-api.php`,
			  {
				  method: "PUT",
				  headers: { 'Content-Type': 'application/json' },
				  body: JSON.stringify(editAccountInfo)
			  })
			  .then(data => {
					console.log(data)
					setOpenSuccessDialog(true);
			  })
		}else{
			setisPassMatch(false);
		}
	}
	  
  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
	const handleCloseSuccessDialog = () =>{
		setTimeout(window.location.reload(), 5000);
	}
	
	return (
		<Modal
			open={props.open}
			id={props.email}
			onClose={(e) => {
				props.handleClose(e);
				setisPassValid(true);
				setisPassMatch(true);
			}}
			>
			<Box sx={style}>
				<Typography variant="h5" className="modalTypography">Edit Committee Account</Typography>
				<form onSubmit={handleEditSubmit}>
				<TextField fullWidth={true} sx={{my:1}} error={dirtyEmail && isEmailValid === false} onBlur={() => setDirtyEmail(true)} onChange={handleEditChange('email')} label="Username"  variant="outlined" defaultValue={props.email} disabled={true} />
				<Stack direction="row"sx={{my:1}} spacing={2}>
					<TextField 
					label="First Name" 
					onChange={handleEditChange('firstname')} 
					variant="outlined" 
					defaultValue={props.firstname} />
					<TextField 
					label="Middle Name" 
					onChange={handleEditChange('middlename')} 
					variant="outlined" 
					defaultValue={props.middlename} />	
					</Stack>
				<Stack direction="row" sx={{my:1}}spacing={2}>
					<FormControl sx={{width:'75%'}}>
						<TextField 
						label="Last Name" 
						onChange={handleEditChange('lastname')} 
						variant="outlined" 
						defaultValue={props.lastname} />	
					</FormControl>
					<FormControl sx={{width:'25%'}}>
						<TextField  
						label="Suffix"  
						onChange={handleEditChange('suffix')} 
						variant="outlined" 
						defaultValue={props.suffix} />
					</FormControl>
				</Stack>
				<TextField
				label="Password"
				fullWidth={true} 
				sx={{my:1}} 
				error={isPassValid === false} 
				helperText={ isPassValid === false ? "Password must have 6 or more characters." : ""} 
				onChange={handleEditChange('password')} 
				variant="outlined" 
				type="password"
				defaultValue={props.password}
				onFocus={handleFocus}
				required={true}/>
				<TextField 
				label="Confirm Password" 
				fullWidth={true} 
				sx={{my:1}}  
				error={isPassMatch === false} 
				helperText={ isPassMatch === false ? "Passwords not match." : ""}
				onChange={handleEditChange('confirmpass')}
				variant="outlined" 
				type="password" 
				defaultValue={props.password}
				onFocus={handleFocus}
				required={true}/>	
				<Button sx={{my:1.5}}  type="submit" className="modalButton" variant="contained">Submit</Button>
			</form>
			<Dialog
			  open={openSuccessDialog}
			  onClose={handleCloseSuccessDialog}>
			  <DialogTitle>
				  {"Successfully Edited User!"}
				</DialogTitle>
				<DialogActions>
				  <Button onClick={handleCloseSuccessDialog} autoFocus>
					OK
				  </Button>
				</DialogActions>
			</Dialog>
			</Box>	
		</Modal>
	  )
	}
	
export default EditCommitteeForm;
