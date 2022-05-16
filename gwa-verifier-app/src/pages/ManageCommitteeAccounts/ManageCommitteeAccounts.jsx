import React, { useEffect } from "react";
import { 
  Box,
  Typography, 
  Toolbar,
  Modal,
  TextField,
  FormControl,
  IconButton,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
 } from "@mui/material";
import { Add, Edit, Delete} from "@mui/icons-material";
import "./ManageCommitteeAccounts.css";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/private-theming";
import validator from 'validator';
import AddCommitteeForm from "Components/AddCommitteeForm";
import EditCommitteeForm from "Components/EditCommitteeForm";
import DeleteCommitteeForm from "Components/DeleteCommitteeForm";
import { BACKEND_URI } from "../../constants.js";

//Changes made in committee-api.php to bypass verification for testing
//CASE 1-3 commented out
//added $verified = true

//used gwa_verifier_c1l_db, committee table for testing

//Known Issues
//Can edit anything but email 
//Doesn't detect if user already exist when adding committee account
//If password is left blank null value will be taken and encrypted and password will be changed with encrypted null

function ManageCommitteeAccounts() {
	const [openAdd, setOpenAdd] = React.useState(false);
		
	function EditCell(props) {
		const [openEdit, setOpenEdit] = React.useState(false);
		return <>
		<EditCommitteeForm open={openEdit} handleClose={() => setOpenEdit(false)} email={props.email} firstname={props.firstname} lastname={props.lastname} middlename={props.middlename} suffix={props.suffix}/>
		<TableCell><IconButton onClick={() => setOpenEdit(true)}><Edit /></IconButton></TableCell>
		</>
	}
	function DeleteCell(props) {
		const [openDelete, setOpenDelete] = React.useState(false);
		return <>
		<DeleteCommitteeForm open={openDelete} handleClose={() => setOpenDelete(false)} email={props.email}/>
		<TableCell><IconButton onClick={() => setOpenDelete(true)}><Delete color="primary"/></IconButton></TableCell>
		</>
	}

	function createData(email, firstname, lastname, middlename, suffix) {
		return {email, firstname, lastname, middlename, suffix};
	}
	
	const [rows, setRow] = React.useState([])	
	const dataRows = []

	useEffect(() => {
		fetch(
			`${BACKEND_URI}/committee-api/committee-api.php`,
			{
				method: "GET",
			})
			.then(response => response.json())
			.then(data => {
				data.map(item => {
					dataRows.push(createData(item.email, item.firstname, item.lastname, item.middlename, item.suffix))
					
				});
				setRow(dataRows)
			})
		 
	}, [])
	
	return (
    <div>
	<AddCommitteeForm open={openAdd} handleClose={() => setOpenAdd(false)}/>
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
				<ThemeProvider>
					<Button onClick={() => setOpenAdd(true)} variant="contained" color="secondary" endIcon={<Add />}> Add Committee Account</Button>
				</ThemeProvider>
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
									<TableCell>{row.firstname.concat(" ", row.middlename, " ", row.lastname, " ", row.suffix)}</TableCell>
									<EditCell email={row.email} firstname={row.firstname} middlename={row.middlename} lastname={row.lastname} suffix={row.suffix}/>
									<DeleteCell email={row.email} />
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			</Box>
		</Box>
    </div>
  );
}

export default ManageCommitteeAccounts;