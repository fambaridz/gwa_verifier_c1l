import React from "react";
import { Stack, Button } from "@mui/material";
import SplitButton from "../SplitButton";

function StudentFormFooter({ popStack, onSave, loading, cb }) {
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
        label="Verify & Save"
        onClick={onSave}
        loading={loading}
        loadingText="Saving..."
        menuItems={[
          {
            value: "Force Save",
            cb,
          },
        ]}
      />
    </Stack>
  );
}

export default StudentFormFooter;
