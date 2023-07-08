import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="relative flex justify-center items-center p-2">
      <h1 className="p-2 text-3xl text-center font-black">EMOGUESSR</h1>
      <div className="absolute right-2 flex justify-end items-center">
        <ThemeToggle />
      </div>
    </header>
  );
}
