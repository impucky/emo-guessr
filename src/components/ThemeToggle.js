"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    if (theme === "dark") setTheme("light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-1/3 flex justify-end items-center">
      <button
        className="bg-surface1 hover:bg-surface2 p-2 rounded-lg shadow-md"
        onClick={toggleTheme}
      >
        {theme === "dark" ? "🌙" : "☀️"}
        {theme}
      </button>
    </div>
  );
}
