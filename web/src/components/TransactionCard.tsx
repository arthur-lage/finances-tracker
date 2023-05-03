import { Link } from "react-router-dom";
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
  const { transactions, setTransactions } = useTransactions();
  const { updateBalance } = useBalance();

  async function handleDelete() {
    try {
      await transactionService.deleteTransactionById({
        id: transaction.id,
      });

      const newTransactions = transactions.filter(
        (currentTransaction) => currentTransaction.id != transaction.id
      );

      setTransactions(newTransactions);

      await updateBalance();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Link
      to={`/transactions/${transaction.id}`}
      className={`flex flex-col text-black px-4 py-3 rounded-md ${
        transaction.type === "INCOME" ? "bg-green-200" : "bg-red-200"
      }`}
    >
      <div className="flex flex-col gap-1 font-jost">
        <strong className="font-bold">
          {transaction.type === "INCOME" ? "+" : "-"}
          {BrazilianReal.format(transaction.value)}
        </strong>
        <p className="font-medium">{transaction.name}</p>
      </div>

      <div className="w-full h-[1px] bg-zinc-900 my-4"></div>

      <div className="flex flex-col gap-1 font-semibold font-jost">
        <p>{formatDate(transaction.date, "D/MM/YYYY")}</p>
        <p>Added at {formatDate(transaction.createdAt, "D/MM/YYYY")}</p>
      </div>

      <button className="font-bold font-jost mt-5 bg-action-primary text-white py-2 rounded-md">
        Details
      </button>
    </Link>
  );
}
