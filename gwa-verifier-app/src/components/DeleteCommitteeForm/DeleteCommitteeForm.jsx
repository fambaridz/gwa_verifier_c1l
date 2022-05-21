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

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	height: 200,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 3,
}

function DeleteCommitteeForm(props) {

		async function handleSubmit(event) {
		  event.preventDefault();
		  const credentials = {email: props.email}
		  fetch(
			  "http://localhost/gwa-verifier-backend/committee-api.php",
			  {
				  method: "DELETE",
				  body: JSON.stringify(credentials)
			  })
			  .then(data => {
				  console.log(data)
				  window.location.reload()
			  })
		  
		}
	return (
		<Modal
			open={props.open}
			id={props.email}
			onClose={props.handleClose}>
			<Box sx={style}>
			<Typography variant="h5" className="modalTypography">Delete Committee Account</Typography>
			<form onSubmit={handleSubmit}>
			  <TextField fullWidth={true} sx={{my:1}} label="Email to be deleted" variant="outlined" defaultValue={props.email} disabled={true}/>
			  <Button className="modalButton" color="success" variant="contained" onClick={props.handleClose}>Cancel</Button>
			  <Button type="submit" className="deleteConfirm" color="success" variant="contained">Confirm</Button>
			 </form>
			</Box>
			</Modal>
	  )
	}
	
export default DeleteCommitteeForm;
