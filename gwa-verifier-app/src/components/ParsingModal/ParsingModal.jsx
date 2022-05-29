import React from "react";
import PropTypes from "prop-types";
import GenericDialog from "../GenericDialog";
import {
  Typography,
  CircularProgress,
  Stack,
  DialogContentText,
} from "@mui/material";

function ParsingModal({ open }) {
  return (
    <GenericDialog
      open={open}
      title="Parsing files"
      handleClose={() => {}}
      content={
        <Stack spacing={2} alignItems="center">
          <CircularProgress color="success" />
          <DialogContentText>
            We are parsing your files. Feel free to get a coffee while you wait{" "}
          </DialogContentText>
        </Stack>
      }
      actions={null}
    />
  );
}

ParsingModal.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default ParsingModal;
