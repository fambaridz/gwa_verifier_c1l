import React from "react";
import { 
  Box,
  Typography, 
  Modal,
  TextField,
  FormControl,
  Stack,
  Button
 } from "@mui/material";

import { ThemeProvider } from "@mui/private-theming";
import validator from 'validator';

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
	
	const [openSuccess, setOpenSuccess] = React.useState(false);
	const [isEmailValid,setisEmailValid] = React.useState(false);
	const [isPassValid,setisPassValid] = React.useState(true);
	const [isPassMatch,setisPassMatch] = React.useState(true);
	const [isPassMatch2,setisPassMatch2] = React.useState(true);
	const [dirtyEmail, setDirtyEmail] = React.useState(false);
	const [editvalues, setEditValues] = React.useState({
		email: props.email,
		lastname: props.lastname,
		firstname: props.firstname,
		middlename:props.middlename,
		suffix:props.suffix,
		password: null,
		confirmpass: null
	});
	const handleEditChange = (prop) => (event) => {
		setEditValues({ ...editvalues, [prop]: event.target.value });


		if(prop=="email"){
			if(validator.isEmail(event.target.value)){
				setisEmailValid(true);
			}else{
				setisEmailValid(false);
			}
			}
			if(prop=="password"){
				if(validator.isStrongPassword(event.target.value, {minLength: 6, minLowercase:0, minUppercase:0, minNumbers:0,minSymbols:0})){
					setisPassValid(true);
				}else{
					setisPassValid(false);
				}
			}
			if(prop=="confirmpass"){
				setisPassMatch(true);
			}
	};
	
	 async function handleEditSubmit(event){
		event.preventDefault();
		const editAccountInfo = {
				email: editvalues.email,
				session_email: null,
				lastname: editvalues.lastname,
				firstname: editvalues.firstname,
				middlename: editvalues.middlename,
				suffix: editvalues.suffix,
				password: editvalues.password
		}
		console.log(JSON.stringify(editAccountInfo));
		fetch(
			  "http://localhost/gwa-verifier-backend/committee-api.php",
			  {
				  method: "PUT",
				  headers: { 'Content-Type': 'application/json' },
				  body: JSON.stringify(editAccountInfo)
			  })
			  .then(data => {
					console.log(data)
					setOpenSuccess(true);
					setTimeout(window.location.reload(), 5000);
			  })
			  
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
					<TextField label="First Name" onChange={handleEditChange('firstname')} variant="outlined" defaultValue={props.firstname} />
					<TextField label="Middle Name" onChange={handleEditChange('middlename')} variant="outlined" defaultValue={props.middlename} />	
					</Stack>
				<Stack direction="row" sx={{my:1}}spacing={2}>
					<FormControl sx={{width:'75%'}}>
						<TextField label="Last Name" onChange={handleEditChange('lastname')} variant="outlined" defaultValue={props.lastname} />	
					</FormControl>
					<FormControl sx={{width:'25%'}}>
						<TextField  label="Suffix"  onChange={handleEditChange('suffix')} variant="outlined" defaultValue={props.suffix} />
					</FormControl>
				</Stack>
				<TextField fullWidth={true} sx={{my:1}} error={isPassValid === false} helperText={ isPassValid === false ? "Password must have 6 or more characters." : ""} onChange={handleEditChange('password')} label="Password" variant="outlined" type="password"/>
				<TextField fullWidth={true} sx={{my:1}}  error={isPassMatch === false} helperText={ isPassMatch2 === false ? "Passwords not match." : ""}onChange={handleEditChange('confirmpass')}label="Confirm Password" variant="outlined" type="password" />	
				<Button sx={{my:1.5}}  type="submit" className="modalButton" variant="contained">Submit</Button>
			</form>
			<Modal
					open={openSuccess}
					>
						<Box sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: 350,
							height: 85,
							bgcolor: 'background.paper',
							border: '2px solid #000',
							boxShadow: 24,
							p: 3
						}}>
							<Typography variant="h5" className="modalTypography">User Edited Successfully!</Typography>
						</Box>
					</Modal>
			</Box>	
		</Modal>
	  )
	}
	
export default EditCommitteeForm;
