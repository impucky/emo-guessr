import Link from "next/link";
import { ClipboardCheck } from "iconoir-react";

const ProgressButton = () => {
  return (
    <Link
      className="flex gap-2 p-2 bg-yellow hover:brightness-125 transition rounded-xl shadow-md text-base text-lg"
      href="/progress"
    >
      View your progress
      <ClipboardCheck />
    </Link>
  );
};

export default ProgressButton;
