import React, { useState, useMemo, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Stack,
  Box,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextareaAutosize,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import GradeRecordTable from "../GradeRecordTable";

function StudentRecordForm({
  firstName,
  middleName,
  lastName,
  suffix,
  degree,
  studentNo,
  gradeRecords,
}) {
  const [term, setTerm] = useState("");
  function handleChange(event) {
    setTerm(event.target.value);
  }
  const terms = useMemo(
    () => ["2019 2nd sem", "2020 1st sem", "2020 2nd sem", "2021 1st sem"],
    []
  );
  // set default value for term as the last entry
  useEffect(() => {
    setTerm(terms[terms.length - 1]);
  }, []);
  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h4">Student Information</Typography>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs={2}>
            <Typography variant="body1">First Name</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              placeholder="Jane"
              inputProps={{
                "aria-label": "first-name",
              }}
              sx={{
                width: "100%",
                maxWidth: 600,
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body1">Middle Name</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              placeholder="Jane Doe"
              inputProps={{
                "aria-label": "middle-name",
              }}
              sx={{
                width: "100%",
                maxWidth: 600,
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body1">Last Name</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              placeholder="Doe"
              inputProps={{
                "aria-label": "last-name",
              }}
              sx={{
                width: "100%",
                maxWidth: 600,
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body1">Suffix</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              placeholder="Sr."
              inputProps={{
                "aria-label": "suffix",
              }}
              sx={{
                width: "100%",
                maxWidth: 600,
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body1">Degree</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              placeholder="BACA"
              inputProps={{
                "aria-label": "degree",
              }}
              sx={{
                width: "100%",
                maxWidth: 600,
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body1">Student Number</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              placeholder="2019-12345"
              inputProps={{
                "aria-label": "student-no",
              }}
              sx={{
                width: "100%",
                maxWidth: 600,
              }}
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack spacing={3} sx={{ marginTop: 5 }}>
        <Typography variant="h4">Grade Records</Typography>

        <FormControl sx={{ alignSelf: "start" }}>
          <InputLabel id="term-label">Term</InputLabel>
          <Select
            labelId="term-label"
            id="term"
            value={term}
            label="Term"
            onChange={handleChange}
          >
            {terms.map((term, idx) => (
              <MenuItem value={term} key={idx}>
                {term}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <GradeRecordTable />
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            color="default"
            fullWidth
          >
            Add new row
          </Button>
        </Box>
        <Typography variant="p">Comments / Justifications</Typography>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={5}
          placeholder="Minimum 3 rows"
          color="default"
          sx={{
            border: "none",
          }}
          // style={{ width: '100%' }}
        />
        <Stack direction="row" spacing={2} sx={{ alignSelf: "end" }}>
          <Button variant="outlined" color="default" size="large">
            Cancel
          </Button>
          <Button variant="contained" color="success" size="large">
            Save Record
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default StudentRecordForm;
