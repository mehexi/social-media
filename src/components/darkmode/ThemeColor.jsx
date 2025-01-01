"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useThemeContext } from "@/app/provider/ThemeDataProvider";
import ToggleDark from "./ToggleDark";

const availableThemeColors = [
  { name: "Zinc", light: "bg-zinc-900", dark: "bg-zinc-700" },
  { name: "Rose", light: "bg-rose-600", dark: "bg-rose-700" },
  { name: "Blue", light: "bg-blue-600", dark: "bg-blue-700" },
  { name: "Green", light: "bg-green-600", dark: "bg-green-500" },
  { name: "Orange", light: "bg-orange-500", dark: "bg-orange-700" },
];

export function ThemeColorToggle() {
  
  const { themeColor, setThemeColor } = useThemeContext();
  const { theme } = useTheme();

  return (
    <div className="flex space-x-4 w-full  items-center justify-center">
      {availableThemeColors.map(({ name, light, dark }) => (
        <div
          key={name}
          onClick={() => setThemeColor(name)}
          className={`cursor-pointer rounded-full w-4 h-4 border-2 ${
            themeColor === name ? "border-primary" : "border-transparent"
          } ${theme === "light" ? light : dark}`}
          title={name}
        />
      ))}
      <ToggleDark />
    </div>
  );
}
