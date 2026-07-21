"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Light/dark switch. The app shipped with next-themes wired up but no control
 * to reach it, so dark was effectively permanent.
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The server cannot know the client's theme, so rendering the real icon
  // before hydration guarantees a mismatch. Hold a same-sized placeholder.
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="size-9" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="text-muted-foreground hover:text-foreground"
    >
      {isDark ? (
        <Sun className="size-[1.15rem]" />
      ) : (
        <Moon className="size-[1.15rem]" />
      )}
    </Button>
  );
}
