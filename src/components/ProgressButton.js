import Link from "next/link";
import { ClipboardCheck } from "iconoir-react";

const ProgressButton = () => {
  return (
    <Link
      className="flex gap-2 m-4 p-2 bg-yellow hover:brightness-125 rounded-xl shadow-md"
      href="/progress"
    >
      View your progress
      <ClipboardCheck />
    </Link>
  );
};

export default ProgressButton;
