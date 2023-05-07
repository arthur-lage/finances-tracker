import { Link, useNavigate } from "react-router-dom";
import { useBalance } from "../hooks/useBalance";
import { useTransactions } from "../hooks/useTransactions";
import { ITransaction } from "../interfaces/ITransaction";
import { transactionService } from "../services/transactionService";
import { BrazilianReal } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

type TransactionCardType = {
  transaction: ITransaction;
};

export function TransactionCard({ transaction }: TransactionCardType) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col text-white px-4 py-3 rounded-md ${
        transaction.type === "INCOME" ? "bg-emerald-600" : "bg-rose-600"
      }`}
    >
      <div className="flex flex-col gap-1 font-jost">
        <strong className="font-medium">
          {transaction.type === "INCOME" ? "+" : "-"}
          {BrazilianReal.format(transaction.value)}
        </strong>
        <p className="font-medium">{transaction.name}</p>
      </div>

      <div className="w-full h-[1px] bg-white my-4"></div>

      <div className="flex flex-col gap-1 font-semimedium font-jost">
        <p>{formatDate(transaction.date, "DD/MM/YYYY")}</p>
        <p>Added at {formatDate(transaction.createdAt, "DD/MM/YYYY")}</p>
      </div>

      <button
        onClick={() => navigate(`/transactions/${transaction.id}`)}
        className="font-medium font-jost mt-5 bg-white text-black py-2 rounded-md"
      >
        Details
      </button>
    </div>
  );
}
