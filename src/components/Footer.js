import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-2 flex justify-center gap-8 text-sm">
      <span>
        <i>It's not a phase, mom!</i>
      </span>
      <Link className="underline" href="https://github.com/impucky/emo-guessr/" target="_blank">
        Github
      </Link>
      <div>
        Heavily inspired by{" "}
        <Link className="underline" href="https://emovicon.app/">
          Emovicon
        </Link>
      </div>
    </footer>
  );
}
