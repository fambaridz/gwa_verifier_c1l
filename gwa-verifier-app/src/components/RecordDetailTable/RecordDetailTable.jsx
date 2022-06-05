/*
  Component: Record details table
  Description:
    Displays courses + grades per semester
*/

import React from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

  /*
    Function name: RecordDetailTable
    Description:
      Responsible for display of courses + grades table
    Parameter:
      courses = Holds all courses per semester/all semester
  */
function RecordDetailTable({ courses }) {
  if (courses == null) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <CircularProgress sx={{ margin: "auto" }} />
      </Box>
    );
  } else {
    return (
      // Courses Table
      <Box sx={{ ml: 3, mr: 3, mt: 2, flexGrow: 1 }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>No of Units</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Enrolled</TableCell>
              <TableCell>Running Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.course_number}
                </TableCell>
                <TableCell>{row.units}</TableCell>
                <TableCell>{row.grade}</TableCell>
                <TableCell>{row.enrolled}</TableCell>
                <TableCell>{row.running_total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  }
}

export default RecordDetailTable;
