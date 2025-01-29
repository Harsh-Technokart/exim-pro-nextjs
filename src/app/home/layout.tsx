import { NavBar } from "@/common/NavBar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
