import { TransactionCard } from "../../components/TransactionCard";
import { transactionService } from "../../services/transactionService";
import { useTransactions } from "../../hooks/useTransactions";
import { useBalance } from "../../hooks/useBalance";

export function TransactionsList() {
  const { transactions, setTransactions } = useTransactions();
  const { updateBalance } = useBalance();

  async function handleClearTransactions() {
    if (confirm("Are you sure you want to delete all your transactions?")) {
      try {
        await transactionService.deleteAllTransactions();
        await updateBalance();
        setTransactions([]);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div>
      <button onClick={handleClearTransactions}>Clear transactions</button>

      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}
