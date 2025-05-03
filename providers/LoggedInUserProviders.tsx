"use client";
import UserProvider from "@/context/UserContext";
import React, { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "./theme-providers";

const LoggedInUserProviders = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null; // or a loader if needed
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <UserProvider>{children}</UserProvider>;
    </ThemeProvider>
  );
};

export default LoggedInUserProviders;
