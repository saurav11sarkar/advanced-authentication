"use client";

import { AppContextProvider } from "@/context/AppContext";
import React from "react";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <AppContextProvider>{children}</AppContextProvider>;
};

export default AppProvider;
