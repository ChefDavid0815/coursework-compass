"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  return (
    <Button
      intent="quiet"
      size="icon"
      className="theme-toggle"
      aria-label="Toggle color theme"
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <span className="theme-toggle__icons" aria-hidden="true">
        <Sun className="theme-toggle__sun" />
        <Moon className="theme-toggle__moon" />
      </span>
    </Button>
  );
}
