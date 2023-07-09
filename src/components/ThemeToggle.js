"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { HalfMoon, SunLight } from "iconoir-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setTheme(resolvedTheme);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    if (theme === "dark") setTheme("light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="bg-surface0 hover:bg-surface2 p-2 rounded-full shadow-md"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <HalfMoon height={28} width={28} strokeWidth={2} />
      ) : (
        <SunLight height={28} width={28} strokeWidth={2} />
      )}
    </button>
  );
}
