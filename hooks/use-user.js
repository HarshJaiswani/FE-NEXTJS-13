"use client";

import { useEffect } from "react";
// actions
import { exampleAction as fetchAppUser } from "@/services/user.actions";
// context
import { useAppContext } from "@/context/AppContext";

export const useUser = () => {
  const { user, setUser } = useAppContext();

  const checkUser = async () => {
    const { success, user: userData } = await fetchAppUser();
    if (!success || !userData) {
      setUser(null);
      return;
    }
    setUser(userData);
  };

  useEffect(() => {
    if (!user) {
      checkUser();
    }
  }, []);

  return { user: user ?? null, mutate: checkUser };
};
