import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex justify-between p-4">
      <div className="w-1/3"></div>
      <h1 className="p-4 w-1/3 text-2xl text-center font-black">EMOGUESSR</h1>
      <ThemeToggle />
    </header>
  );
}
