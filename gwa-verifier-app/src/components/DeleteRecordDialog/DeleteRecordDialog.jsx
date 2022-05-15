import React from "react";
import PropTypes from "prop-types";
import GenericDialog from "../GenericDialog";
import DialogContentText from "@mui/material/DialogContentText";
import { Button } from "@mui/material";

function DeleteRecordDialog({
  open,
  name,
  studno,
  handleCancel,
  handleDelete,
}) {
  return (
    <GenericDialog
      title="Delete Record?"
      open={open}
      handleClose={handleCancel}
      content={
        <DialogContentText>
          You are about to delete the record of <b>{name}</b> with student numer <b>{studno}</b>. The deletion is permanent and cannot be undone.
        </DialogContentText>
      }
      actions={
        <>
          <Button color="error" variant="outline" onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
        </>
      }
    />
  );
}

DeleteRecordDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  studno: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteRecordDialog;
