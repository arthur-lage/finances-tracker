import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { Header } from "../components/Header";
import { TransactionsList } from "../features/Transactions/TransactionsList";
import { useEffect } from "react";
import { transactionService } from "../services/transactionService";
import { TransactionForm } from "../features/Transactions/TransactionForm";
import { useTransactions } from "../hooks/useTransactions";
import { useBalance } from "../hooks/useBalance";

export function Home() {
  const { isAuth, currentUser } = useAuth();
  const { setTransactions } = useTransactions();
  const { balance, updateBalance } = useBalance();

  const loggedIn = isAuth();

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await transactionService.getAllTransactions();
        setTransactions(res.transactions);
      } catch (err) {
        console.error(err);
      }
    }

    if (!loggedIn) {
      return;
    }

    fetchTransactions();
    updateBalance();
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

          <TransactionForm />

          <section>
            <h2>Your transactions (this month)</h2>

            <TransactionsList />
          </section>
        </div>
      )}
    </>
  );
}
