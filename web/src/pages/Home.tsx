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
import { CurrencyDollar } from "@phosphor-icons/react";

export function Home() {
  const { isAuth, currentUser } = useAuth();
  const { transactions, setTransactions } = useTransactions();
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

          <section className="px-6 w-full font-jost mt-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl">
                Hello,{" "}
                <span className="font-semibold">{currentUser?.name}</span>
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
              className="w-full justify-center flex items-center gap-2 py-2 px-4 bg-violet-500 hover:brightness-125 transition-all duration-150 ease-out text-white font-jost font-semibold text-lg rounded-md"
            >
              <CurrencyDollar weight="bold" size={22} />
              <span>New Transaction</span>
            </button>
          </section>

          <CreateTransactionModal
            onClose={createTransactionModalDisclosure.onClose}
            isOpen={createTransactionModalDisclosure.isOpen}
          />

          <div className="w-full my-6 px-6">
            <div className="w-full h-[1px] bg-gray-600"></div>
          </div>

          {transactions.length > 0 ? (
            <section className="px-6 mt-5 pb-10">
              <TransactionsList />
            </section>
          ) : (
            <div className="px-6 mt-5">
              <h2 className="font-jost font-bold text-lg text-center px-4">
                You haven't added any transactions yet
              </h2>
            </div>
          )}
        </div>
      )}
    </>
  );
}
