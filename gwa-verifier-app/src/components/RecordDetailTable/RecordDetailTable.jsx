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
                {/* To Follow Computation for next rows */}
                <TableCell>1.25</TableCell>
                <TableCell>1.25</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  }
}

export default RecordDetailTable;
