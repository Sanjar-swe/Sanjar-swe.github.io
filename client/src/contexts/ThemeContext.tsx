import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "speakband-theme";

/**
 * Resolve the opening theme.
 *
 * Order matters: an explicit choice the visitor made last time beats their OS
 * setting, and the OS setting beats our default. Reading `matchMedia` here —
 * rather than defaulting to light — means a visitor browsing at night does not
 * get a white flash before they can reach the toggle.
 */
function initialTheme(fallback: Theme, switchable: boolean): Theme {
  if (!switchable || typeof window === "undefined") return fallback;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Private browsing can throw on localStorage access; the OS preference
    // below is a perfectly good answer, so there is nothing to handle.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : fallback;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => initialTheme(defaultTheme, switchable));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;

    if (!switchable) return;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Not being able to remember the choice is not worth breaking render for.
    }
  }, [theme, switchable]);

  // Follow the OS while the visitor has not expressed a preference of their own.
  useEffect(() => {
    if (!switchable) return;

    let hasOwnChoice = false;
    try {
      hasOwnChoice = localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      hasOwnChoice = false;
    }
    if (hasOwnChoice) return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [switchable]);

  const toggleTheme = switchable
    ? () => setTheme((prev) => (prev === "light" ? "dark" : "light"))
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
