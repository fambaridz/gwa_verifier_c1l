import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import { ErrorTooltip } from "../Tooltips";
import { defaultRegex, gradeRegex } from "../../utils/validators.js";

const ERROR_MESSAGES = {
  REQUIRED: "This field is required",
  GRADE:
    "P, S, INC, DRP, or a numeric grade with 4 significant digits is only allowed",
  DEFAULT: "Numbers up to 4 significant digits only",
};

function checkIfError({ name, value }) {
  if (name !== "grade") return !defaultRegex.test(value);
  return !gradeRegex.test(value);
}

let counter = 0;
function EditableCell({
  value: initialValue,
  handleUpdate,
  column: { id: columnId },
  uid,
}) {
  // console.log(`Render count: ${++counter}`);
  const [value, setValue] = useState(initialValue);

  const [helperText, setHelperText] = useState("");

  const validate = (columnId, value) => {
    if (value === "") {
      setHelperText(ERROR_MESSAGES.REQUIRED);
      return;
    }

    if (columnId === "courseno") return;

    if (columnId !== "grade" && !defaultRegex.test(value)) {
      setHelperText(ERROR_MESSAGES.DEFAULT);
      return;
    }

    if (!gradeRegex.test(value)) {
      setHelperText(ERROR_MESSAGES.GRADE);
      return;
    }
    setHelperText("");
  };
  const onChange = (e) => {
    const { value } = e.target;
    setValue(e.target.value);

    validate(columnId, value);
  };
  // columnId is  the name of the column
  const onBlur = () => handleUpdate({ uid, columnId, value });
  useEffect(() => {
    setValue(initialValue);
    validate(columnId, initialValue);
  }, [initialValue]);

  //   return <input value={value} onChange={onChange} onBlur={onBlur} />;
  return (
    <ErrorTooltip title={helperText} arrow>
      <TextField
        variant="standard"
        error={
          columnId !== "courseno" && checkIfError({ name: columnId, value })
        }
        value={value}
        onChange={onChange}
        inputProps={{ onBlur }}
      />
    </ErrorTooltip>
  );
}

export default EditableCell;