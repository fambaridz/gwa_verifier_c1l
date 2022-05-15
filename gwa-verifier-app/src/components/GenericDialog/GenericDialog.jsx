import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

function GenericDialog({
  open,
  handleClose,
  title = "Dialog title",
  content = <h1>I am content</h1>,
  actions = <h1>Footer actions</h1>,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {content}
        {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
      </DialogContent>
      <DialogActions>
        {actions}
        {/* <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button> */}
      </DialogActions>
    </Dialog>
  );
}

GenericDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.element,
  actions: PropTypes.element,
};

export default GenericDialog;