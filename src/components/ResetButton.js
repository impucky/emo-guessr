import { useState } from "react";
import { Trash } from "iconoir-react";

import ResetDialog from "./ResetDialog";

const ResetButton = ({ text, outline, icon }) => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={`font-semibold inline-flex gap-2 w-fit text-red hover:brightness-125 rounded-xl ${
          outline && "p-2 outline outline-2 outline-red"
        }`}
        onClick={() => setIsOpen(true)}
      >
        {text}
        {icon && <Trash />}
      </button>
      <ResetDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
export default ResetButton;
