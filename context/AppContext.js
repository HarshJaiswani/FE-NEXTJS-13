"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
// Next Components
import { useRouter } from "next/navigation";

export const AppContext = createContext(null);

export default function AppState(props) {
  const router = useRouter();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true);
  const [showCoinModal, setShowCoinModal] = useState(false);

  const toggleExploreCoins = () => {
    setShowCoinModal((prev) => !prev);
  };

  useEffect(() => {
    if (localStorage.getItem("admin-harsh")) {
      setIsAdminLoggedIn(true);
    } else {
      setIsAdminLoggedIn(false);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("admin-harsh");
    setIsAdminLoggedIn(false);
    router.push("/");
  };

  return (
    <AppContext.Provider
      value={{
        toggleExploreCoins,
        showCoinModal,
        msg: "Namaste Dunia!",
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        logOut,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be inside AppState");
  }
  return context;
};
