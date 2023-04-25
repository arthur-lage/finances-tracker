import { useBalance } from "../hooks/useBalance";
import { useTransactions } from "../hooks/useTransactions";
import { ITransaction } from "../interfaces/ITransaction";
import { transactionService } from "../services/transactionService";
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
    <div
      className={`${
        transaction.type === "INCOME" ? "bg-green-300" : "bg-red-300"
      }`}
    >
      <strong>
        {transaction.type === "INCOME" ? "+" : "-"}
        {transaction.value}
      </strong>
      <p>{transaction.name}</p>
      <p>{formatDate(transaction.date, "D/MM/YYYY")}</p>
      <p>Added at {formatDate(transaction.createdAt, "D/MM/YYYY")}</p>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
