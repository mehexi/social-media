"use client";
import setGlobalTheme from "@/lib/theme-color";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  themeColor: "Zinc", // Default value
  setThemeColor: () => {}, // Placeholder for setThemeColor function
});

const ThemeDataProvider = ({ children }) => {
  const getSavedThemeColor = () => {
    try {
      return localStorage.getItem("themeColor") || "Zinc"; // Default to Zinc
    } catch {
      return "Zinc";
    }
  };

  const [themeColor, setThemeColor] = useState(getSavedThemeColor());
  const [isMounted, setIsMounted] = useState(false);

  // Access theme mode (light/dark) using next-themes
  const { theme } = useTheme();

  useEffect(() => {
    if (!isMounted) setIsMounted(true);

    // Save theme color to localStorage
    localStorage.setItem("themeColor", themeColor);

    // Apply the global theme
    if (theme) {
      setGlobalTheme(themeColor, theme);
    }
  }, [themeColor, theme, isMounted]);

  // Prevent rendering until fully mounted
  if (!isMounted) return null;

  return (
    <NextThemesProvider>
      <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  );
};

// Hook to use the theme context
export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default ThemeDataProvider;
