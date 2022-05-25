import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DialogContentText from "@mui/material/DialogContentText";
import { TextField, Button } from "@mui/material";
import GenericDialog from "../GenericDialog";
import { termRegex } from "../../utils/validators.js";

function EditTermDialog({ initialValue, open, handleCancel, handleSave }) {
  const [value, setValue] = useState("");

  useEffect(() => setValue(initialValue), [initialValue]);

  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <GenericDialog
      title="Edit term"
      open={open}
      handleClose={handleCancel}
      content={
        <>
          <DialogContentText>
            Kindly input in the new term. Previous value: {initialValue}
          </DialogContentText>
          <TextField
            value={value}
            onChange={handleChange}
            error={!termRegex.test(value)}
            helperText="Input must follow the format: '(sem)/AY/AY'. E.g. 'I/19/20', 'II/19/20', or 'M/19/20'"
          />
        </>
      }
      actions={
        <>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            onClick={() => handleSave(initialValue, value)}
            disabled={!termRegex.test(value)}
          >
            Save
          </Button>
        </>
      }
    />
  );
}

EditTermDialog.propTypes = {
  initialValue: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default EditTermDialog;
