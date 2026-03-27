"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect runs only on the client, avoiding hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="inline-flex items-center justify-center rounded-full w-10 h-10 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white transition-all focus:outline-none focus:ring-2 focus:ring-accent"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle Theme"
      aria-label="Toggle Theme"
    >
      {theme === "dark" || theme === "system" ? (
        <Sun className="h-5 w-5 transition-all text-accent" />
      ) : (
        <Moon className="h-5 w-5 transition-all text-primary" />
      )}
    </button>
  );
}
