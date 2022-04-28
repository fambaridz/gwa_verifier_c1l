import React from "react";
import { 
  Box,
  Typography, 
  Toolbar,
  Modal,
  TextField
 } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Add, Edit, Delete } from "@mui/icons-material";
import "./ManageCommitteeAccounts.css";

// edit this to manage committee accounts page
function createData(email, name, password) {
  return {email, name, password};
}

const rows = [
  createData('crcastro2@up.edu.ph', 'Christine Marie Castro', 'Castro' ),
  createData('krcastillo@up.edu.ph', 'Kyno Castillo', "Castillo"),
  createData('jflar@up.edu.ph', 'Jeff Lar', 'Lar'),
  createData('kcmartin@up.edu.ph', 'Keith Florence Martin', "Martin"),
  createData('iisalazar@up.edu.ph', 'Ian Salazar', 'Salazar'),
  createData('zcreyes@up.edu.ph', 'Zenn Louie Reyes', 'Reyes')
];


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
		<form>
		<TextField fullWidth={true} sx={{my:1}} label="Username" variant="outlined" required={true} />
		<TextField fullWidth={true} sx={{my:1}} label="Name" variant="outlined" required={true} />
		<TextField fullWidth={true} sx={{my:1}} label="Password" variant="outlined" required={true}/>
		<TextField fullWidth={true} sx={{my:1}} label="Confirm Password" variant="outlined" required={true} />
		</form>
		<Button href="#" className="modalButton" variant="contained">Submit</Button>
		 </Box>
		</Modal>
  );
}

const AddButton = (props) => {
	return (
	<Button onClick={props.onClickAdd} variant="contained" style={{ backgroundColor:'#C7C7C7' }} endIcon={<Add />}> Add Committee Account</Button>
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
		<form>
		<TextField fullWidth={true} sx={{my:1}} label="Username" variant="outlined" />
		<TextField fullWidth={true} sx={{my:1}} label="Name" variant="outlined" />
		<TextField fullWidth={true} sx={{my:1}} label="Password" variant="outlined" />
		<TextField fullWidth={true} sx={{my:1}} label="Confirm Password" variant="outlined" />
		</form>
		<Button href="#" className="modalButton" variant="contained" sx={{right: 0}}>Submit</Button>
		 </Box>
		</Modal>
  );
}

const EditButton = (props) => {
	return (
	<Button onClick={props.onClickEdit} variant="text" size="small" startIcon={<Edit color="primary"/>} ></Button>
	)
}


function ManageCommitteeAccounts() {
	
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  return (
    <div>
      <Box sx={{ m: 3.5, flexGrow: 1 }}>
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
                    <TableCell>Password</TableCell>
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
                      <TableCell>{row.password}</TableCell>
                      <TableCell><EditButton onClickEdit={() => setOpenEdit(true)}/></TableCell>
                      <TableCell><Delete /></TableCell>
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