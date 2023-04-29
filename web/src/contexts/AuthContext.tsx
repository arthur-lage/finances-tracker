import { ReactNode, createContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { authService } from "../services/authService";
import { api } from "../lib/api";
import { useBalance } from "../hooks/useBalance";
import { useTransactions } from "../hooks/useTransactions";

type AuthContextType = {
  currentUser: IUser | null;
  isAuthenticatingUser: boolean;
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
  const [isAuthenticatingUser, setIsAuthenticatingUser] = useState(false);
  const { setBalance } = useBalance();
  const { setTransactions } = useTransactions();

  function isAuth(): boolean {
    if (!currentUser) return false;

    return true;
  }

  async function authenticateUser() {
    try {
      setIsAuthenticatingUser(true);
      const token = localStorage.getItem("finances-tracker::token");

      if (!token) {
        return;
      }

      api.defaults.headers.Authorization = `Bearer ${token}`;

      const { user } = await authService.authenticate();

      setCurrentUser(user);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuthenticatingUser(false);
    }
  }

  function logout() {
    setCurrentUser(null);
    setBalance(0);
    setTransactions([]);
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
    isAuthenticatingUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
