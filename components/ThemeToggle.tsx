"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  
  if (!mounted) return null;
  
  if (theme === "system") {
    setTheme(resolvedTheme!);
  }
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 mx-4 md:mx-0 rounded-full cursor-pointer bg-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition ${
        theme === "dark" ? "bg-gray-200 dark:bg-gray-700" : ""
      }`}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-white" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
