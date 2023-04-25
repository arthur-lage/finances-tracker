import { ReactNode, createContext, useState } from "react";
import { ITransaction } from "../interfaces/ITransaction";

type TransactionsContextType = {
  transactions: ITransaction[];
  setTransactions: (transactions: ITransaction[]) => void;
};

export const TransactionsContext = createContext({} as TransactionsContextType);

type TransactionsProviderType = {
  children: ReactNode;
};

export function TransactionsProvider({ children }: TransactionsProviderType) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const value = { transactions, setTransactions };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}
