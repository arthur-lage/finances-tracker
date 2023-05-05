import { useParams } from "react-router-dom";
import { ITransaction } from "../interfaces/ITransaction";
import { useEffect, useState } from "react";
import { transactionService } from "../services/transactionService";
import { formatDate } from "../utils/formatDate";
import { Header } from "../components/Header";

import { BrazilianReal } from "../utils/formatCurrency";
import { useDisclosure } from "@chakra-ui/react";
import { DeleteByIdDialog } from "../features/Transactions/DeleteByIdDialog";

export function TransactionPage() {
  const deleteByIdDialogClosure = useDisclosure();

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
        <div className="flex flex-col justify-center text-white font-jost p-8">
          <h1 className="mb-6 font-semibold text-xl">
            Transaction Information
          </h1>

          <div className="flex font-jost flex-col text-white gap-2 mb-8 h-full">
            <h2>
              Name: <span className="font-medium">{transaction.name}</span>
            </h2>
            <p>
              Type: <span className="font-medium">{transaction.type}</span>
            </p>
            <p>
              Value:{" "}
              <span className="font-medium">
                {BrazilianReal.format(transaction.value)}
              </span>
            </p>
            <p>
              Transaction made on:{" "}
              <span className="font-medium">
                {formatDate(transaction.date, "D/MM/YYYY")}
              </span>
            </p>
            <p>
              Added on:{" "}
              <span className="font-medium">
                {formatDate(transaction.createdAt, "D/MM/YYYY")}
              </span>
            </p>
          </div>

          <DeleteByIdDialog
            transactionId={String(transactionId)}
            isOpen={deleteByIdDialogClosure.isOpen}
            onClose={deleteByIdDialogClosure.onClose}
          />

          <div className="flex flex-col gap-4 w-full items-center">
            <button className="w-full shadow-md rounded-md py-2 text-white bg-action-primary font-jost font-semibold">
              Edit
            </button>
            <button
              onClick={deleteByIdDialogClosure.onOpen}
              className="w-full shadow-md rounded-md py-2 text-white bg-red-600 font-jost font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Could not find transaction...</h2>
        </div>
      )}
    </div>
  );
}
