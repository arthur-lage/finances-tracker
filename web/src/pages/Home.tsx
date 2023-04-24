import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { Header } from "../components/Header";
import { TransactionsList } from "../features/Transactions/TransactionsList";
import { ITransaction } from "../interfaces/ITransaction";
import { useState, useEffect } from "react";
import { transactionService } from "../services/transactionService";
import { balanceService } from "../services/balanceService";

export function Home() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [balance, setBalance] = useState<null | number>(null);

  const { isAuth, currentUser } = useAuth();
  const loggedIn = isAuth();

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const { transactions } = await transactionService.getAllTransactions();
        setTransactions(transactions);
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchBalance() {
      try {
        const { balance } = await balanceService.getBalance();
        setBalance(balance);
      } catch (err) {
        console.error(err);
      }
    }

    if (!loggedIn) {
      return;
    }
    fetchTransactions();
    fetchBalance();
  }, []);

  return (
    <>
      {!loggedIn ? (
        <Navigate to="/login" />
      ) : (
        <div>
          <Header />

          <section>
            <h1>Hello, {currentUser?.name}</h1>
            <h2>Balance: {balance}</h2>
          </section>

          <section>
            <h2>Your transactions (this month)</h2>

            <TransactionsList transactions={transactions} />
          </section>
        </div>
      )}
    </>
  );
}
