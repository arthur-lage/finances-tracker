import { ReactNode, createContext, useState } from "react";
import { ITransaction } from "../interfaces/ITransaction";
import { transactionService } from "../services/transactionService";

type TransactionsContextType = {
  transactions: ITransaction[];
  setTransactions: (transactions: ITransaction[]) => void;
  updateTransactions: () => Promise<void>;
};

export const TransactionsContext = createContext({} as TransactionsContextType);

type TransactionsProviderType = {
  children: ReactNode;
};

export function TransactionsProvider({ children }: TransactionsProviderType) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  async function updateTransactions() {
    try {
      const { transactions } = await transactionService.getAllTransactions();

      setTransactions(transactions);
    } catch (err) {
      console.error(err);
    }
  }

  const value = { transactions, setTransactions, updateTransactions };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}
