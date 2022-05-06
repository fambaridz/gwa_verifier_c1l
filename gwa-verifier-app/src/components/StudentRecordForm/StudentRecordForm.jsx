import React from "react";
import PropTypes from "prop-types";
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
import SaveIcon from "@mui/icons-material/Save";

function StudentRecordForm({
  firstName,
  middleName,
  lastName,
  suffix,
  degree,
  studentNo,
  recommended,
  loading = false,
  handleInputChange = () => {},
  footer = null,
  handleCancel = () => {},
  handleSave = () => {},
  setTerm = () => {},
  term,
  terms,
  table = <p>Table goes here</p>,
}) {
  function handleChange(event) {
    setTerm(event.target.value);
  }

  function renderTextField(props) {
    return (
      <TextField
        sx={{
          width: "100%",
          maxWidth: 600,
        }}
        onChange={handleInputChange}
        {...props}
      />
    );
  }

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h4">Student Information</Typography>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs={2}>
            <Typography variant="body1">First Name</Typography>
          </Grid>
          <Grid item xs={10}>
            {renderTextField({
              name: "fname",
              placeholder: "Jane",
              inputProps: {
                "aria-label": "first-name",
              },

              value: firstName,
            })}
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body1">Middle Name</Typography>
          </Grid>
          <Grid item xs={10}>
            {renderTextField({
              name: "mname",
              variant: "outlined",
              placeholder: "Donald",
              inputProps: {
                "aria-label": "middle-name",
              },

              value: middleName,
            })}
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body1">Last Name</Typography>
          </Grid>
          <Grid item xs={10}>
            {renderTextField({
              name: "lname",
              placeholder: "Doe",
              inputProps: {
                "aria-label": "last-name",
              },

              value: lastName,
            })}
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body1">Suffix</Typography>
          </Grid>
          <Grid item xs={10}>
            {renderTextField({
              name: "suffix",
              placeholder: "Sr.",
              inputProps: {
                "aria-label": "suffix",
              },
              value: suffix,
            })}
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body1">Degree</Typography>
          </Grid>
          <Grid item xs={10}>
            {renderTextField({
              name: "degree",
              placeholder: "BACA",
              inputProps: {
                "aria-label": "degree",
              },
              value: degree,
            })}
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body1">Student Number</Typography>
          </Grid>
          <Grid item xs={10}>
            {renderTextField({
              name: "studNo",
              placeholder: "2019-12345",
              inputProps: {
                "aria-label": "student-no",
              },
              value: studentNo,
            })}
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1">Recommended No. of Units</Typography>
          </Grid>
          <Grid item xs={10}>
            {renderTextField({
              name: "recommended",
              placeholder: "144",
              inputProps: {
                "aria-label": "recommended-units",
              },
              value: recommended,
            })}
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
          {table}
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
        {footer || (
          <Stack direction="row" spacing={2} sx={{ alignSelf: "end" }}>
            <Button
              variant="outlined"
              color="default"
              size="large"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              color="success"
              size="large"
              onClick={handleSave}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
            >
              Save
            </LoadingButton>
          </Stack>
        )}
      </Stack>
    </>
  );
}
StudentRecordForm.propTypes = {
  recommended: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  middleName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  studentNo: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  footer: PropTypes.element,
  handleCancel: PropTypes.func,
  handleSave: PropTypes.func,
  setTerm: PropTypes.func,
  term: PropTypes.string,
  terms: PropTypes.arrayOf(PropTypes.string),
  table: PropTypes.element,
};
export default StudentRecordForm;
