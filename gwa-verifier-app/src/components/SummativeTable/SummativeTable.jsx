/*
  Component: Summative Table Page 
  Description:
    Responsible for fetching computation of gwa per semester
    Displays Summative Table
*/

import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { BACKEND_URI } from "../../constants.js";

  /*
    Function name: handleClose
    Description:
      Changing of student status
    Parameter:
      term = Current semester
      student_number = Student number
      all_courses = All courses (used in gwa computation for cumulative total)
      sem_courses = Semestral courses (used in gwa computation for current semester)
  */
function SummativeTable({ term, student_number, all_courses, sem_courses }) {
  let navigate = useNavigate();
  const [enrollTakenTowardGPA, setEnrollTakenTowardGPA] = useState([]);
  const [enrollPassedTowardGPA, setEnrollPassedTowardGPA] = useState([]);

  const [totalTakenTowardGPA, setTotalTakenTowardGPA] = useState([]);
  const [totalPassedTowardGPA, setTotalPassedTowardGPA] = useState([]);

  const [enrollNonPass, setEnrollNonPass] = useState([]);
  const [totalNonPass, setTotalNonPass] = useState([]);

  const [enrollGPA, setEnrollGPA] = useState([]);
  const [totalGPA, setTotalGPA] = useState([]);
  const [hasError, setHasError] = useState(false);
  /*
    Function name: fetchGWA
    Description:
      Fetches GWA depending on type
    Parameter:
      currentTerm = Current semester/All semesters
      studno = Student number
      type = 2 types: cumulative total/ semestral total
      courses = All courses/ semestral courses
  */
  const fetchGwa = async (currentTerm, studno, type, courses) => {
    let gwa = {};
    if (currentTerm == "All") {
      gwa = {
        term: "all",
        student_number: studno,
      };
    } else {
      gwa = {
        term: currentTerm,
        student_number: studno,
      };
    }
    try {
      const res = await fetch(`${BACKEND_URI}/record-details-api/gwa.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gwa),
      });

      const body = await res.text();
      const parsed = JSON.parse(body);

      let non_pass = 0;
      courses.forEach((course) => {
        if (isNaN(parseFloat(course.grade))) {
          non_pass += parseInt(course.units);
        } else if (isNaN(parseInt(course.grade))) {
          non_pass += parseInt(course.units);
        }
      });

      if (type == "fromEnroll") {
        setEnrollGPA(parsed.gwa);
        setEnrollTakenTowardGPA(parsed.total_units);
        setEnrollPassedTowardGPA(parsed.total_enrolled);
        setEnrollNonPass(non_pass);
      } else {
        setTotalGPA(parsed.gwa);
        setTotalTakenTowardGPA(parsed.total_units);
        setTotalPassedTowardGPA(parsed.total_enrolled);
        setTotalNonPass(non_pass);
      }
    } catch (error) {
      console.warn(error);
      setHasError(true);
    }
  };

  if (hasError)
    return (
      <Box>
        <p>Can't fetch GWA as of the moment</p>
      </Box>
    );

  if (term == null) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <CircularProgress sx={{ margin: "auto" }} />
      </Box>
    );
  } else {
    fetchGwa(term, student_number, "fromEnroll", sem_courses).catch(<Navigate to="/records" />);
    fetchGwa("All", student_number, "cumTotal", all_courses).catch(<Navigate to="/records" />);
    return (
      // Table 2 (Summative Table)
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
            {/* Row 0 Units Toward GPA */}
            <TableRow key={0}>
              <TableCell component="th" scope="row">
                Units Toward GPA
              </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
            {/* Row 1 Taken */}
            <TableRow key={1}>
              <TableCell component="th" scope="row">
                Taken
              </TableCell>
              <TableCell> {enrollTakenTowardGPA}</TableCell>
              <TableCell> {totalTakenTowardGPA}</TableCell>
            </TableRow>
            {/* Row 2 Passed */}
            <TableRow key={2}>
              <TableCell component="th" scope="row">
                Passed
              </TableCell>
              <TableCell> {enrollTakenTowardGPA - enrollNonPass}</TableCell>
              <TableCell> {totalTakenTowardGPA - totalNonPass}</TableCell>
            </TableRow>
            <TableRow key={12}>
              <TableCell component="th" scope="row">
                <Typography sx={{ color: "transparent" }}>
                  {" "}
                  blank space{" "}
                </Typography>
              </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
            {/* Row 6 GPA Calculations */}
            <TableRow key={6}>
              <TableCell component="th" scope="row">
                GPA Calculation
              </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
            {/* Row 7 Total Grade Points */}
            <TableRow key={7}>
              <TableCell component="th" scope="row">
                Total Grade Points
              </TableCell>
              <TableCell> {enrollTakenTowardGPA} </TableCell>
              <TableCell> {totalTakenTowardGPA} </TableCell>
            </TableRow>
            {/* Row 8 / Units Taken Toward GPA*/}
            <TableRow key={8}>
              <TableCell component="th" scope="row">
                / Units Taken Toward GPA
              </TableCell>
              <TableCell> {enrollPassedTowardGPA}</TableCell>
              <TableCell> {totalPassedTowardGPA}</TableCell>
            </TableRow>
            {/* Row 9 = GPA*/}
            <TableRow key={9}>
              <TableCell component="th" scope="row">
                = GPA
              </TableCell>
              <TableCell> {enrollGPA} </TableCell>
              <TableCell> {totalGPA} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    );
  }
}

export default SummativeTable;
