"use client";
import * as React from "react";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { Poppins, Source_Code_Pro } from "next/font/google";
import NextAppDirEmotionCacheProvider from "./Emotion";

const inter = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
});

const primary = {
  50: "#F0F8FF",
  100: "#CCE0FF",
  200: "#99C2FF",
  300: "#66A3FF",
  400: "#3385FF",
  500: "#0066FF", // Base blue
  600: "#0052CC",
  700: "#003D99",
  800: "#002966",
  900: "#001433",
};

const theme = extendTheme({
  fontFamily: {
    body: inter.style.fontFamily,
    display: inter.style.fontFamily,
    code: sourceCodePro.style.fontFamily,
  },
  colorSchemes: {
    light: {
      palette: { primary },
    },
    dark: {
      palette: { primary },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "joy" }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
