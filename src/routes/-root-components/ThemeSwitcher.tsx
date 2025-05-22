import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonStar, Sun } from "lucide-react";

import { useDebugValue, useEffect, useState } from "react";

type ThemeSystem = "system";
type Theme = ThemeSystem | "dark" | "light";
type ThemeReals = Exclude<Theme, ThemeSystem>;
const THEME_KEY = "THEME";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(fetchThemeValue);
  /**
   * DO NOT USE useCallback WITH THIS FUNCTION
   * useCallback will cache the result of this function between re-renders
   */
  function getRealValue(): ThemeReals {
    const $ = theme ?? "system";
    if ($ == "system") return getSystemRealValue();
    else return $;
  }
  const [real, setReal] = useState<ThemeReals>(getRealValue);
  /**
   * DO NOT USE useCallback WITH THIS FUNCTION
   * useCallback will cache the result of this function between re-renders
   */
  function colorSchemeChangeListener() {
    theme == "system" && setReal(getRealValue());
  }
  useDebugValue(`theme: ${theme} | real: ${real}`);

  useEffect(() => {
    setReal(getRealValue());
    document.body.className = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    matchMedia.addEventListener("change", colorSchemeChangeListener);

    return () => {
      matchMedia.removeEventListener("change", colorSchemeChangeListener);
    };
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{getIconDarkLight(real)}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {getIconDarkLight(getSystemRealValue())}
          System
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <MoonStar />
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getSystemRealValue(): ThemeReals {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getIconDarkLight(v: ThemeReals) {
  switch (v) {
    case "dark":
      return <MoonStar />;
    case "light":
      return <Sun />;
  }
}

function validTheme(v: string | null): Theme {
  return v && ["system", "dark", "light"].includes(v) ? (v as Theme) : "system";
}

function fetchThemeValue(): Theme {
  return validTheme(localStorage.getItem(THEME_KEY));
}
