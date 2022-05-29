import React from "react";
import PropTypes from "prop-types";
import { Stack, Button } from "@mui/material";
import SplitButton from "../SplitButton";

function AddStudentFormFooter({
  popStack,
  saveOne,
  saving,
  saveAll = () => console.log("Save all records"),
}) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignSelf: "end" }}>
      <Button
        variant="outlined"
        color="default"
        size="large"
        onClick={popStack}
      >
        Cancel
      </Button>

      <SplitButton
        label="Save one"
        onClick={saveOne}
        loading={saving}
        loadingText="Saving..."
        menuItems={[
          {
            value: "Save all",
            cb: saveAll,
          },
        ]}
      />
    </Stack>
  );
}

AddStudentFormFooter.propTypes = {
  popStack: PropTypes.func.isRequired,
  saveOne: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  saveAll: PropTypes.func,
};

export default AddStudentFormFooter;
