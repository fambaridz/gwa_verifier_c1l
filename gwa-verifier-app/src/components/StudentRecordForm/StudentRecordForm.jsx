import React, { useState, useEffect } from "react";
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
  ButtonGroup,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import {
  studentNoRegex,
  recommendedUnitsRegex,
  termRegex,
} from "../../utils/validators.js";
import { ErrorTooltip } from "../Tooltips";

function StudentRecordForm({
  firstName,
  middleName,
  lastName,
  suffix,
  degree,
  studNo,
  recommended,
  loading = false,
  handleInputChange = () => {},
  footer = null,
  handleCancel = () => {},
  handleSave = () => {},
  handleAddRow = () => {},
  handleEditTerm = () => {},
  handleDeleteTerm = () => {},
  setTerm = () => {},
  term,
  terms,
  table = <p>Table goes here</p>,
  extraFeaturesEnabled = true,
  handleComment = () => {},
  error,
  comment,
  index, 
}) {
  function handleChange(event) {
    setTerm(event.target.value);
  }

  useEffect(() => {
    setInfo({
      fname: firstName,
      mname: middleName,
      lname: lastName,
      suffix,
      degree,
      studNo,
      recommended,
    });
  }, [firstName, middleName, lastName, suffix, degree, studNo, recommended]);

  const [info, setInfo] = useState({
    fname: "",
    mname: "",
    lname: "",
    suffix: "",
    degree: "",
    studNo: "",
    recommended: "",
  });

  function handleLocalChanges(e) {
    e.preventDefault();
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  }

  function renderTextField(props) {
    const { name, value } = props;
    let error = false,
      helperText = "";
    switch (name) {
      case "studNo":
        helperText = "Must follow the ff. format: YEAR-NUMBER e.g. 2019-12345";
        if (!studentNoRegex.test(value)) error = true;
        break;
      case "recommended":
        helperText = "Numbers only";
        if (!recommendedUnitsRegex.test(value)) error = true;
        break;
    }

    return (
      <TextField
        sx={{
          width: "100%",
          maxWidth: 600,
        }}
        onChange={handleLocalChanges}
        error={error}
        helperText={helperText}
        onBlur={() => handleInputChange({ name, value: info[name] })}
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

              value: info.fname,
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

              value: info.mname,
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

              value: info.lname,
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
              value: info.suffix,
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
              value: info.degree,
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
              value: info.studNo,
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
              value: info.recommended,
            })}
          </Grid>
        </Grid>
      </Stack>
      <Stack spacing={3} sx={{ marginTop: 5 }}>
        <Typography variant="h4">Grade Records</Typography>
        <Stack direction={"row"} spacing={4} alignItems="center">
          <ErrorTooltip
            title={
              !termRegex.test(term)
                ? "The selected term has an invalid format. Kindly edit it."
                : ""
            }
            placement="top"
            arrow
          >
            <FormControl
              sx={{ alignSelf: "start" }}
              error={!termRegex.test(term)}
            >
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
          </ErrorTooltip>
          {extraFeaturesEnabled && (
            <ButtonGroup
              variant="outlined"
              color="default"
              size="large"
              aria-label="outlined button group"
            >
              <Button onClick={handleEditTerm}>Edit Term</Button>
              <Button onClick={handleDeleteTerm}>Delete Term</Button>
            </ButtonGroup>
          )}
        </Stack>
        <Box>
          {table}
          {extraFeaturesEnabled && (
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              color="default"
              onClick={handleAddRow}
              fullWidth
            >
              Add new row
            </Button>
          )}
        </Box>
        <Typography variant="p">Comments / Justifications</Typography>
        <TextField
          multiline
          rows={3}
          error={error}
          helperText={error && "Comments are required when saving changes"}
          placeholder="Good job!"
          value={comment}
          onChange={(e) =>  handleComment(e,index)}
          onBlur={(e) =>  handleComment(e,index)}
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
  studNo: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  footer: PropTypes.element,
  handleCancel: PropTypes.func,
  handleSave: PropTypes.func,
  handleAddRow: PropTypes.func,
  setTerm: PropTypes.func,
  term: PropTypes.string,
  terms: PropTypes.arrayOf(PropTypes.string),
  table: PropTypes.element,
  handleEditTerm: PropTypes.func.isRequired,
  handleDeleteTerm: PropTypes.func.isRequired,
  extraFeaturesEnabled: PropTypes.bool,
};
export default StudentRecordForm;
