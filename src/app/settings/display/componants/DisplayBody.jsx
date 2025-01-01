"use client";
import { useThemeContext } from "@/app/provider/ThemeDataProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Circle } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const DisplayBody = () => {
  const { themeColor, setThemeColor } = useThemeContext();
  const { theme, setTheme } = useTheme();

  const availableThemeColors = [
    { name: "Zinc", light: "bg-zinc-900", dark: "bg-zinc-700" },
    { name: "Rose", light: "bg-rose-600", dark: "bg-rose-700" },
    { name: "Blue", light: "bg-blue-600", dark: "bg-blue-700" },
    { name: "Green", light: "bg-green-600", dark: "bg-green-500" },
    { name: "Orange", light: "bg-orange-500", dark: "bg-orange-700" },
  ];

  return (
    <div>
      <Card className="bg-transparent border-none">
        <CardHeader className="py-3">
          <CardTitle className="text-lg">Color</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-around max-sm:gap-3">
          {availableThemeColors.map(({ name, light, dark }) => (
            <div
              key={name}
              onClick={() => setThemeColor(name)}
              className={`cursor-pointer rounded-full w-20 aspect-square  border-2 flex items-center justify-center ${
                theme === "light" ? light : dark
              }`}
              title={name}
            >
              {themeColor === name && <Check />}
            </div>
          ))}
        </CardContent>
      </Card>
      <Separator />
      <Card className="bg-transparent border-none">
        <CardHeader className="py-3">
          <CardTitle className="text-lg">Background</CardTitle>
        </CardHeader>
        <CardContent className="py-3 flex gap-3 border-none">
          <Button
            onClick={() => setTheme("light")}
            className="w-full bg-[#ffff] text-[#09090A] border hover:bg-gray-200"
          >
            {theme === "light" ? <Check /> : <Circle />}
            <span className="mx-auto"> light</span>
          </Button>
          <Button
            onClick={() => setTheme("dark")}
            className="w-full bg-[#09090A] text-[#ffffff] hover:bg-gray-800  dark:border border-primary"
          >
            {theme === "dark" ? <Check /> : <Circle />}
            <span className="mx-auto">Dark</span>
          </Button>
        </CardContent>
      </Card>
      <Separator />
    </div>
  );
};

export default DisplayBody;
