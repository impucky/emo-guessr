import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="relative flex justify-center items-center p-2 shadow-lg bg-crust">
      <Link href="/" className="p-2 text-3xl text-center font-black">
        EMOGUESSR
      </Link>
      <div className="absolute right-2 flex justify-end items-center">
        <ThemeToggle />
      </div>
    </header>
  );
}
