"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { HalfMoon, SunLight } from "iconoir-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    if (theme === "dark") setTheme("light");
    if (theme === "system" || theme === "undefined") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <button className="hover:text-yellow transition" onClick={toggleTheme}>
      {theme === "dark" ? (
        <HalfMoon height={28} width={28} strokeWidth={2} />
      ) : (
        <SunLight height={28} width={28} strokeWidth={2} />
      )}
    </button>
  );
}
