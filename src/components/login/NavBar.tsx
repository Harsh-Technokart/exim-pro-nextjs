"use client";
import React from "react";
import { IconButton } from "@mui/joy";
import { DarkMode, LightMode } from "@mui/icons-material";
import { ThemeContext } from "@/context/ThemeContext";

export const NavBar = () => {
  const { mode, handleTheme } = React.useContext(ThemeContext);

  return (
    <IconButton
      onClick={handleTheme}
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        borderRadius: "50%",
        "&:hover": {
          backgroundColor: "transparent",
          borderRadius: "50%",
        },
      }}
    >
      {mode === "dark" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};
