import { ReactNode, createContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { authService } from "../services/authService";
import { api } from "../lib/api";

type AuthContextType = {
  currentUser: IUser | null;
  isAuth: () => boolean;
  logout: () => void;
  authenticateUser: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderType = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderType) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  function isAuth(): boolean {
    if (!currentUser) return false;

    return true;
  }

  async function authenticateUser() {
    try {
      const token = localStorage.getItem("finances-tracker::token");

      if (!token) {
        return;
      }

      api.defaults.headers.Authorization = `Bearer ${token}`;

      const { user } = await authService.authenticate();

      setCurrentUser(user);
    } catch (err) {
      console.error(err);
    }
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("finances-tracker::token");
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  const value = {
    currentUser,
    isAuth,
    authenticateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
