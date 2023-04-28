import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { Header } from "../components/Header";
import { TransactionsList } from "../features/Transactions/TransactionsList";
import { useEffect } from "react";
import { transactionService } from "../services/transactionService";
import { useTransactions } from "../hooks/useTransactions";
import { useBalance } from "../hooks/useBalance";
import { useDisclosure } from "@chakra-ui/react";
import { CreateTransactionModal } from "../features/Transactions/CreateTransactionModal";
import { BrazilianReal } from "../utils/formatCurrency";

export function Home() {
  const { isAuth, currentUser } = useAuth();
  const { setTransactions } = useTransactions();
  const { balance, updateBalance } = useBalance();

  const createTransactionModalDisclosure = useDisclosure();

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
        <div className="bg-app min-h-screen text-white">
          <Header />

          <section className="px-10 font-nunito mt-8 flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-xl">
                Hello, <span className="font-bold">{currentUser?.name}</span>
              </h1>
              <h2 className="text-lg">
                Balance:{" "}
                <span className="font-bold">
                  {BrazilianReal.format(Number(balance))}
                </span>
              </h2>
            </div>

            <button
              onClick={createTransactionModalDisclosure.onOpen}
              className="py-2 px-4 bg-violet-500 hover:brightness-125 transition-all duration-150 ease-out text-white text-lg rounded-md"
            >
              New Transaction
            </button>
          </section>

          <CreateTransactionModal
            onClose={createTransactionModalDisclosure.onClose}
            isOpen={createTransactionModalDisclosure.isOpen}
          />

          <section className="px-10 mt-12 pb-10">
            <h2 className="mb-4 font-bold text-lg font-nunito">
              Your transactions (this month)
            </h2>

            <TransactionsList />
          </section>
        </div>
      )}
    </>
  );
}
