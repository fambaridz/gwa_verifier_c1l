import React from "react";
import PropTypes from "prop-types";
import GenericDialog from "../GenericDialog";
import DialogContentText from "@mui/material/DialogContentText";
import { Button } from "@mui/material";

function ForceSaveDialog({ open, handleCancel, onSuccess }) {
  return (
    <GenericDialog
      title="Force Save"
      open={open}
      handleClose={handleCancel}
      content={
        <DialogContentText>
          You are about to save this record without verifying if it's correct.
          This will mark the record in the database as "INCOMPLETE". Do you want
          to continue?
        </DialogContentText>
      }
      actions={
        <>
          <Button color="error" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={onSuccess}>Yes, continue</Button>
        </>
      }
    />
  );
}

ForceSaveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default ForceSaveDialog;
