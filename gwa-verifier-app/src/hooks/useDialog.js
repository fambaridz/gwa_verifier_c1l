import { useState } from "react";

/**
 *
 * A custom hook that developers of this app can use when using a dialog
 */
export default function () {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }
  return { open, toggle };
}
