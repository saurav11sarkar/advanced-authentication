"use client"
import { getUser } from "@/services/auth";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AppContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  // You can use this to auto-fetch user info or auth check
  useEffect(() => {
    const getUserLogin = async () => {
      const res = await getUser();
      setUser(res.data);
      setLoading(false);
    };
    getUserLogin();
  }, [loading]);

  const value: AppContextType = {
    loading,
    setLoading,
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook for accessing the context
export const useUser = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an AppContextProvider");
  }
  return context;
};
