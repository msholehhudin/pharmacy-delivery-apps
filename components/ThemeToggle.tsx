import { useTheme } from "next-themes";
import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };
  return (
    <Button variant={"ghost"} onClick={toggleTheme} className="cursor-pointer">
      <Sun className="w-[1.2rem] h-[1.2rem] rotate-0 transition-all scale-100 dark:scale-0" />
      <Moon className="w-[1.2rem] h-[1.2rem] absolute  transition-all dark:scale-100 scale-0 " />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
