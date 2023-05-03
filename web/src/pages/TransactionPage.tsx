import { useParams } from "react-router-dom";
import { ITransaction } from "../interfaces/ITransaction";
import { useEffect, useState } from "react";
import { transactionService } from "../services/transactionService";
import { formatDate } from "../utils/formatDate";
import { Header } from "../components/Header";

export function TransactionPage() {
  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const { transactionId } = useParams();

  useEffect(() => {
    async function fetchTransaction() {
      try {
        const { transaction } = await transactionService.getTransactionById({
          id: String(transactionId),
        });
        setTransaction(transaction);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTransaction();
  }, []);

  return (
    <div className="bg-app min-h-screen">
      <Header />

      {transaction ? (
        <div className="flex flex-col items-center text-white font-jost">
          <p>{transaction.name}</p>
          <p>{transaction.type}</p>
          <p>{transaction.value}</p>
          <p>{formatDate(transaction.date, "D/MM/YYYY")}</p>
          <p>Added at: {formatDate(transaction.createdAt, "D/MM/YYYY")}</p>

          <button>Edit</button>
          <button>Delete</button>
        </div>
      ) : (
        <div>
          <h2>Could not find transaction...</h2>
        </div>
      )}
    </div>
  );
}
