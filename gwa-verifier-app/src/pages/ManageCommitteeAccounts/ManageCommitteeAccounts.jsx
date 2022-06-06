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
import AddCommitteeForm from "Components/AddCommitteeForm";
import EditCommitteeForm from "Components/EditCommitteeForm";
import DeleteCommitteeForm from "Components/DeleteCommitteeForm";

import { useAuth } from "../../context/AuthContext.jsx";
import { BACKEND_URI } from "../../constants.js";

/*
  Page: Manage Committe Accounts
  Description:
    The Manage Committe Accounts Page is only accessible to a superuser.
	This page displays all the accounts along with their email and name.
  Features:
    1. Adding a basic/committee account
    2. Editing information of an account
    3. Deleting an account
*/

function ManageCommitteeAccounts() {
  
  //state variables
  const { user } = useAuth();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [rows, setRow] = React.useState([]);
  const dataRows = [];
  const emailExisting = [];
  /*
    Function Name: EditCell
    Description:
      Makes a modal for a user and a table cell for the edit button designated to the modal of that user.
    Parameter/s: props
    Return Type: <></>
  */
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
          account_made_by={user.email}
        />
        <TableCell>
          <IconButton onClick={() => setOpenEdit(true)}>
            <Edit />
          </IconButton>
        </TableCell>
      </>
    );
  }
    /*
    Function Name: EditCell
    Description:
      Makes a table cell for the delete button designated to the email of the prop.
    Parameter/s: props
    Return Type: <></>
  */
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
          <IconButton
            onClick={() => setOpenDelete(true)}
            disabled={props.account_made_by === null}
          >
            <Delete
              color={props.account_made_by === null ? "gray" : "primary"}
            />
          </IconButton>
        </TableCell>
      </>
    );
  }
   /*
    Function Name: createData
    Description:
      Creates the data for the accounts to be used in the table.
    Parameter/s: 
		email: email of the account
		firstname: first name of the account
		lastname: last name of the account	
		middlename: middle name of the account
		suffix: suffix of the account
		account_made_by: user who made the account
    Return Type: String
  */
  function createData(
    email,
    firstname,
    lastname,
    middlename,
    suffix,
    account_made_by
  ) {
    return { email, firstname, lastname, middlename, suffix, account_made_by };
  }
 
 
	
  useEffect(() => {
	 //calls API to get the information of existing accounts from the database
    fetch(`${BACKEND_URI}/committee-api/committee-api.php`, {
      method: "GET",
    })
      .then((response) => {
        console.warn(response);
        if (response.ok) return response.json();
      })
      .then((data) => {
        data.map((item) => {
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
        setRow(dataRows);
        console.log(dataRows);
        data.map((item) => {
          emailExisting.push(item.email);
        });
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div>
	    {/* Form for the add committee modal */}
      <AddCommitteeForm
        open={openAdd}
        data={emailExisting}
        account_made_by={user.email}
        handleClose={() => setOpenAdd(false)}
      />
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
                      {row.account_made_by === null ? (
                        <TableCell> </TableCell>
                      ) : (
                        <DeleteCell email={row.email} />
                      )}
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
