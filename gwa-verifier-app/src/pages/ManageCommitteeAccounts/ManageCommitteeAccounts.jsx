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
  Paper,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import "./ManageCommitteeAccounts.css";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/private-theming";
import validator from "validator";
import AddCommitteeForm from "Components/AddCommitteeForm";
import EditCommitteeForm from "Components/EditCommitteeForm";
import DeleteCommitteeForm from "Components/DeleteCommitteeForm";
import Cookies from "universal-cookie";
import { BACKEND_URI } from "../../constants.js";

//used gwa_verifier_c1l_db, committee table for testing

//Known Issues
//Can edit anything but email ~api side problem (might be just dumb and wrong) ~Zenn

function ManageCommitteeAccounts() {
	const cookies = new Cookies();
  const [openAdd, setOpenAdd] = React.useState(false);

  function EditCell(props) {
    const [openEdit, setOpenEdit] = React.useState(false);
    return (
      <>
        <EditCommitteeForm
          open={openEdit}
          handleClose={() => setOpenEdit(false)}
          email={props.email}
          firstname={props.firstname}
          lastname={props.lastname}
          middlename={props.middlename}
          suffix={props.suffix}
		  password={props.password}
		  account_made_by={cookies.get('email')} 
        />
        <TableCell>
          <IconButton onClick={() => setOpenEdit(true)}>
            <Edit />
          </IconButton>
        </TableCell>
      </>
    );
  }
  function DeleteCell(props) {
    const [openDelete, setOpenDelete] = React.useState(false);
    return (
      <>
        <DeleteCommitteeForm
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          email={props.email}
        />
        <TableCell>
          <IconButton onClick={() => setOpenDelete(true)} disabled={props.account_made_by === null} >
            <Delete color={props.account_made_by === null ? "gray" : "primary"} />
          </IconButton>
        </TableCell>
      </>
    );
  }
  function createData(email, firstname, lastname, middlename, suffix, account_made_by) {
    return { email, firstname, lastname, middlename, suffix, account_made_by };
  }

  const [rows, setRow] = React.useState([]);
  const dataRows = [];
  const emailExisting = [];
	useEffect(() => {
		fetch(
			`${BACKEND_URI}/committee-api/committee-api.php`,
			{
				method: "GET",
			})
			.then((response) => {
        console.warn(response);
        if (response.ok) return response.json();
      })
			.then((data) => {
				data.map(item => {
					
								dataRows.push(
								
									createData(
									  item.email,
									  item.firstname,
									  item.lastname,
									  item.middlename,
									  item.suffix,
									  item.account_made_by
									  )
								
						);
					
				
				});
				setRow(dataRows)
				console.log(dataRows)
				data.map(item => {
					emailExisting.push(item.email)
				});
				
			})
		 .catch((err) => console.warn(err));
	}, [])
	
	return (
    <div>
      <AddCommitteeForm open={openAdd} data={emailExisting} account_made_by={cookies.get('email')} handleClose={() => setOpenAdd(false)} />
      <Box sx={{ mt: 2.5, ml: 3, fontSize: 14 }}>
        <Link to="/records" className="back-link">
          &lt; Back to Student Records
        </Link>
      </Box>
      <Box sx={{ mt: 0.5, ml: 3.5, mr: 3.5, mb: 3.5, flexGrow: 1 }}>
        <Toolbar>
          <Typography
            variant="h4"
            style={{ fontWeight: 1000 }}
            component="div"
            sx={{ flex: 1 }}
          >
            Manage Committee Accounts
          </Typography>
          {/* omitted ThemeProvider since it's unnecessary */}

          <Button
            onClick={() => setOpenAdd(true)}
            variant="contained"
            color="secondary"
            endIcon={<Add />}
          >
            {" "}
            Add Committee Account
          </Button>
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell>
                        {row.firstname.concat(
                          " ",
                          row.middlename,
                          " ",
                          row.lastname,
                          " ",
                          row.suffix
                        )}
                      </TableCell>
                      <EditCell
                        email={row.email}
                        firstname={row.firstname}
                        middlename={row.middlename}
                        lastname={row.lastname}
                        suffix={row.suffix}
                      />
					  {row.account_made_by === null ? <TableCell> </TableCell> :  <DeleteCell email={row.email}/>}
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
