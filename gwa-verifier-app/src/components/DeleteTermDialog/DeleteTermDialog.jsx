import React from "react";
import PropTypes from "prop-types";
import GenericDialog from "../GenericDialog";
import DialogContentText from "@mui/material/DialogContentText";
import { Button } from "@mui/material";

function DeleteTermDialog({
  open,
  term,
  srUid,
  name,
  handleCancel,
  handleDelete,
}) {
  return (
    <GenericDialog
      title="Delete Term?"
      open={open}
      handleClose={handleCancel}
      content={
        <DialogContentText>
          You are about to delete the term <b>{term}</b>. All grades within this
          term and in connection with <b>{name}</b> will be deleted as well and
          cannot be recovered.
        </DialogContentText>
      }
      actions={
        <>
          <Button color="error" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={() => handleDelete(srUid, term)}>
            Yes, delete them
          </Button>
        </>
      }
    />
  );
}

DeleteTermDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  term: PropTypes.string.isRequired,
  srUid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteTermDialog;
