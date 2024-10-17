"use client";

import React, { createContext, useState } from "react";
import { AppContextType } from "@shared/interface";

export const AppContext = createContext<AppContextType | undefined>(undefined);
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>("");
  const [modalData, setModalData] = useState<any>({})

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const contextValue: AppContextType = {
    scrollDirection,
    setScrollDirection,
    setModalData,
    modalData,
    filterType, setFilterType,
    toggleSideMenu,
    sideMenuOpen,
    setSideMenuOpen
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
