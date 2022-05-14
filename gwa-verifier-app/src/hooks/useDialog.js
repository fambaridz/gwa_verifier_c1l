import { useState } from "react";

export default function () {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }
  return { open, toggle };
}