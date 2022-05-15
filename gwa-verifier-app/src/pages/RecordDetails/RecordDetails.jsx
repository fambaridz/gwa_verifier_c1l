import React, { useEffect} from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Add, Search, Delete } from "@mui/icons-material";
import CommitteeComments from "Components/CommitteeComments";
import DeleteRecordDialog from "Components/DeleteRecordDialog";
import { useDialog } from "../../hooks";

// Sample Data
const columns = [
  { field: 'id', field: 'course', headerName: 'Course', width: 360 },
  { field: 'numUnits', headerName: 'No of units', width: 320 },
  { field: 'grade', headerName: 'Grade', width: 110 },
  { field: 'grade2', headerName: '', width: 110 },
  { field: 'grade3', headerName: '', width: 110},
];

const rows = [
  { id: 1, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
  { id: 2, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
  { id: 3, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
  { id: 4, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
  { id: 5, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
  { id: 6, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
  { id: 7, course: 'CMSC 12', numUnits: '3', grade: '1.25', grade2: '3.75', grade3: '3.75' },
];

function createData(zero, one ,two) {
  return { zero, one, two };
}

const rows2 = [
  createData("Units Toward GPA:", " ", " "),
  createData("Taken", 15.0, 36.0),
  createData("Passed", 15.0, 36.0),
  createData("Units Not for GPA", 3.0, 19.0),
  createData("GPA Calculations", 3.0, 19.0),
  createData("Total Grade Points", 15.0, 41.250),
  createData("/ Units Taken Toward GPA", 15.0, 36.0),
  createData("= GPA", 1.0, 1.146),
];

function RecordList() {
  const studno = useParams().id
  const [anchorElUser, setAnchorElUser, semester, setSemester] = React.useState(null);
  const [comments, setComments] = React.useState(null);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const { open: deleteDialogStatus, toggle: toggleDeleteDialog } = useDialog();
  
  const handleOpenOptionsMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseOptionsMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (event) => {
    setSemester(event.target.value);
  };
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteRecord = () => {
    const record = {
      action: "delete-record",
      student_number: studno
    };

    const deleteRecord= async () => {
      const res = await fetch(
        "http://localhost/backend/details.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record)
        });

      const body = await res.text()
      if(res.ok){
        setIsDeleted(true);
        toggleDeleteDialog();
      }
    }

    deleteRecord().catch(console.error)

  };

  useEffect(() => {
    const student = {
      action: "get-comments",
      student_number: studno
    }
    
    const fetchComments= async () => {
      const res = await fetch(
        "http://localhost/backend/details.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student)
        });

      const body = await res.text()
      setComments(JSON.parse(body))

    }

    fetchComments().catch(console.error)
  }, [])

  if(isDeleted){
    return(
        <Navigate to="/records"/>
    )
  }

  return (
    <div>
      <Box sx={{ m: 3.5, flexGrow: 1 }}>
        {/* Toolbars for header */}
        <Toolbar>
          <Typography variant="h5" style={{ fontWeight: 1000}} component="div" sx={{ flex: 1 }}>
            Jeff Emerson Lar
          </Typography>
          <Button
            variant="contained" 
            sx={{marginRight:1}} 
            style={{ backgroundColor:'#C7C7C7'}} 
            endIcon={<Add />}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Mark As
          </Button>
          <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Satisfied</MenuItem>
                <MenuItem onClick={handleClose}>Unsatisfied</MenuItem>
                <MenuItem onClick={handleClose}>Unverified</MenuItem>
                <MenuItem onClick={handleClose}>Deficient</MenuItem>
          </Menu>
        <Button variant="contained" style={{ backgroundColor:'#C7C7C7'}} >Satisfied</Button>
        </Toolbar>
        <Toolbar>
          <div>
            <Typography variant="h6" style={{ fontWeight: 1000 }} component="div" sx={{ flex: 1 }}>
              BS Computer Science
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 1000 }} component="div" sx={{ flex: 1 }}>
              2019-03845
            </Typography>
          </div>
        </Toolbar>
        {/* Dropdown menu for semesters */}
        <Box sx={{ m: 3.5}}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Semester</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={semester}
              label="Semester"
              onChange={handleChange}
            >
              <MenuItem value={10}>Semester 1 2020-2021</MenuItem>
              <MenuItem value={20}>Semester 2 2020-2021</MenuItem>
              <MenuItem value={30}>Semester 1 2019-2020</MenuItem>
              <MenuItem value={40}>Semester 2 2019-2020</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Table 1 */}
        <Box sx={{ ml: 3, mr: 3, mt: 2, flexGrow: 1 }}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
            />
          </div>
        </Box>
        {/* Table 2 */}
        <Box sx={{ ml: 3, mr: 3, mt: 2, flexGrow: 1 }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>From Enrollment</TableCell>
                <TableCell>Cumulative Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows2.map((row) => (
                <TableRow
                  key={row.zero}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.zero}
                  </TableCell>
                  <TableCell>{row.one}</TableCell>
                  <TableCell>{row.two}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        {/* Comments */}
        <CommitteeComments comments={comments}/>
        {/* Edit and Delete Buttons */}
        <Box sx={{ m: 3.5, flexGrow: 1, display:"flex", justifyContent:"flex-end"}}>
          <Button variant="contained" style={{ backgroundColor:'#C7C7C7'}} sx={{marginRight:1}} >Edit</Button>
          <Button onClick={toggleDeleteDialog} variant="contained" style={{ backgroundColor:'#C7C7C7'}} >Delete</Button>
        </Box>
        <DeleteRecordDialog
        open={deleteDialogStatus}
        name={"<Name>"}
        studno={studno}
        handleCancel={toggleDeleteDialog}
        handleDelete={handleDeleteRecord}
        />
      </Box>
    
    </div>
    
  );
}

export default RecordList;