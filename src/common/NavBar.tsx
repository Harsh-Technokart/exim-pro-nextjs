"use client";
import React from "react";
import { IconButton } from "@mui/joy";
import { DarkMode, LightMode } from "@mui/icons-material";
import { ThemeContext } from "@/context/ThemeContext";
import Box from "@mui/joy/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { SideBar } from "@/common/SideBar";

export const NavBar = () => {
  const { mode, handleTheme } = React.useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
        backgroundColor: "#000957",
        borderBottom: "1px solid",
        borderColor: mode === "dark" ? "#000" : "#fff",
        height: "60px",
      }}
    >
      {/* Grouping Sidebar, Logo, and Text */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Sidebar Trigger */}
        <SideBar />

        {/* Logo */}
        <Image
          src="/orbglo-logo.png"
          alt="logo"
          width="50"
          height="50"
          style={{ borderRadius: "50%" }}
        />

        {/* App Title */}
        <Typography
          variant="h4"
          sx={{
            color: "#ffffff",
            fontSize: "small",
          }}
        >
          EXIM-PRO
        </Typography>
      </Box>

      {/* Theme Toggle */}
      <IconButton
        onClick={handleTheme}
        sx={{
          color: "white",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: "transparent",
            color: "white",
            borderRadius: "50%",
          },
        }}
      >
        {mode === "dark" ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Box>
  );
};
