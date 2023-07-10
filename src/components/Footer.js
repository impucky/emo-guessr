import Link from "next/link";
import { GitHub } from "iconoir-react";
export default function Footer() {
  return (
    <footer className="p-2 flex justify-center gap-8 text-sm shadow-lg bg-surface0 dark:bg-crust">
      <span className="flex-1 text-right">
        <i>It&apos;s not a phase, mom!</i>
      </span>
      <Link
        className="underline text-blue hover:text-sky self-center"
        href="https://github.com/impucky/emo-guessr/"
        target="_blank"
      >
        <GitHub height={24} width={24} />
      </Link>
      <div className="flex-1">
        Heavily inspired by{" "}
        <Link className="underline text-blue hover:text-sky" href="https://emovicon.app/">
          Emovicon
        </Link>
      </div>
    </footer>
  );
}
