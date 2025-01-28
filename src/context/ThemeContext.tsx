"use client";

import React, { createContext } from "react";
import { useColorScheme as useJoyColorScheme } from "@mui/joy/styles";

export const ThemeContext = createContext<{
  mode: "dark" | "light" | "system";
  handleTheme: () => void;
}>({
  mode: "light",
  handleTheme: () => {},
});

export const ThemeContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { mode = "light", setMode: setJoyMode } = useJoyColorScheme();
  const [mounted, setMounted] = React.useState<boolean>(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  const handleTheme = () => {
    setJoyMode(mode === "light" ? "dark" : "light");
  };
  return (
    <ThemeContext.Provider value={{ mode, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
