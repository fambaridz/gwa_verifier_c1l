import React, { useEffect } from "react";
import { 
  Box,
  Typography, 
  Toolbar,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput
  
 } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Add, Edit, Delete, WindowSharp } from "@mui/icons-material";
import "./ManageCommitteeAccounts.css";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/private-theming";
//TODO Clean up code ~Zenn


function ManageCommitteeAccounts() {
  const navigate = useNavigate();
  
  function createData(email, name) {
  return {email, name};
}
	const [rows, setRow] = React.useState([])	
	const dataRows = []

	useEffect(() => {
		fetch(
			"http://localhost/backend/committee-api.php",
			{
				method: "GET",
			})
			.then(response => response.json())
			.then(data => {
				data.map(item => {
					dataRows.push(createData(item.email, item.firstname.concat(" " + item.lastname)))
				});
				setRow(dataRows)
			})
	}, [])


function addUserForm() {
			  async function handleSubmit(event) {
				event.preventDefault();
				setOpenAdd(false);
				navigate("/manage-committee");				
				console.log("routing to manage-committee");
			  }
			return <form onSubmit={handleSubmit}>
			<TextField fullWidth={true} sx={{my:1}} label="Username" variant="outlined" required={true} />
			<TextField fullWidth={true} sx={{my:1}} label="Name" variant="outlined" required={true} />			
			<TextField fullWidth={true} sx={{my:1}} label="Password" variant="outlined" type="password" required={true} />
			<TextField fullWidth={true} sx={{my:1}} label="Confirm Password" variant="outlined" type="password"required={true} />
			
			<Button type="submit" className="modalButton" color="success" variant="contained">Submit</Button>
			</form>;
}

function editUserForm() {
			  async function handleSubmit(event) {
				event.preventDefault();
				setOpenEdit(false);
				navigate("/manage-committee");				
				console.log("routing to manage-committee");
			  }
			return <form onSubmit={handleSubmit}>
			<TextField fullWidth={true} sx={{my:1}} label="Username" variant="outlined" disabled={true} />
			<TextField fullWidth={true} sx={{my:1}} label="Name" variant="outlined" disabled={true} />			
			<TextField fullWidth={true} sx={{my:1}} label="Password" variant="outlined" type="password" disabled={true} />
			<TextField fullWidth={true} sx={{my:1}} label="Confirm Password" variant="outlined" type="password"disabled={true} />
			
			<Button type="submit" className="modalButton" color="success" variant="contained">Submit</Button>
			</form>;
}


	const style = {
	  position: 'absolute',
	  top: '50%',
	  left: '50%',
	  transform: 'translate(-50%, -50%)',
	  width: 400,
	  height: 400,
	  bgcolor: 'background.paper',
	  border: '2px solid #000',
	  boxShadow: 24,
	  p: 3,
	}


	const AddModal = (props) => {
		const [open, setOpen] = React.useState(false);
	  return (
		<Modal
			open={props.open}
			onClose={props.handleClose}>
			<Box sx={style}>
			<Typography variant="h5" className="modalTypography">Add Committee Account</Typography>
			{addUserForm()}
			
			
			 </Box>
			</Modal>
	  );
	}

	const AddButton = (props) => {
		return (
			<ThemeProvider>
				<Button onClick={props.onClickAdd} variant="contained" color="secondary" endIcon={<Add />}> Add Committee Account</Button>
			</ThemeProvider>
		)
	}

	const EditModal = (props) => {
		const [open, setOpen] = React.useState(false);
	  return (
		<Modal
			open={props.open}
			onClose={props.handleClose}>
			<Box sx={style}>
			<Typography variant="h5" className="modalTypography">Edit Committee Account</Typography>
			{editUserForm()}
			</Box>
			</Modal>
	  );
	}

	const EditButton = (props) => {
		return (
		<Button onClick={props.onClickEdit} variant="text" size="small" startIcon={<Edit color="primary"/>} ></Button>
		)
	}

	

	
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
 

  return (
    <div>
		<Box sx={{ mt: 2.5, ml: 3, fontSize: 14 }}>
        	<Link to="/records" className="back-link">
          		&lt; Back to Student Records
        	</Link>
      	</Box>
		<Box sx={{ mt: 0.5, ml: 3.5, mr: 3.5, mb: 3.5, flexGrow: 1 }}>
			<Toolbar>
				<Typography variant="h4" style={{ fontWeight: 1000 }} component="div" sx={{ flex: 1 }}>
					Manage Committee Accounts
				</Typography>
				<AddButton onClickAdd={() => setOpenAdd(true)}/>
				<AddModal open={openAdd} handleClose={() => setOpenAdd(false)}/>
			</Toolbar>
			<Box sx={{ ml: 3, mr: 3, flexGrow: 1 }}>
			<div>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 500 }}>
						<TableHead>
							<TableRow>
								<TableCell>Email</TableCell>
								<TableCell>Name</TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
								key={row.email}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.email}
									</TableCell>
									<TableCell>{row.name}</TableCell>
									<TableCell><EditButton onClickEdit={() => setOpenEdit(true)}/></TableCell>
									<TableCell><Delete/></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			</Box>
		</Box>
	  	<EditModal open={openEdit} handleClose={() => setOpenEdit(false)}/>
    </div>
  );
}

export default ManageCommitteeAccounts;