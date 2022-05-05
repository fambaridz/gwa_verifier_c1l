import React, { useState, useEffect } from "react";
import Input from "@mui/material/Input";

function EditableCell({
  value: initialValue,
  handleUpdate,
  column: { id: columnId },
  uid,
}) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);

  const onBlur = () => handleUpdate({ uid, columnId, value });

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  //   return <input value={value} onChange={onChange} onBlur={onBlur} />;
  return <Input value={value} onChange={onChange} inputProps={{ onBlur }} />;
}

export default EditableCell;
