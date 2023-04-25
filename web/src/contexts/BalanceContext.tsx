import { createContext, ReactNode, useState } from "react";
import { balanceService } from "../services/balanceService";

type BalanceContextType = {
  balance: null | number;
  setBalance: (state: number | null) => void;
  updateBalance: () => Promise<void>;
};

export const BalanceContext = createContext({} as BalanceContextType);

type BalanceProviderType = {
  children: ReactNode;
};

export function BalanceProvider({ children }: BalanceProviderType) {
  const [balance, setBalance] = useState<null | number>(null);

  async function updateBalance() {
    try {
      const { balance } = await balanceService.getBalance();
      setBalance(balance);
    } catch (err) {
      console.error(err);
    }
  }

  const value = { balance, setBalance, updateBalance };

  return (
    <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>
  );
}
