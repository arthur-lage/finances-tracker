import { ITransaction } from "../../interfaces/ITransaction";

import { TransactionCard } from "../../components/TransactionCard";
import { transactionService } from "../../services/transactionService";

type TransactionsListType = {
  transactions: ITransaction[];
};

export function TransactionsList({ transactions }: TransactionsListType) {
  async function handleClearTransactions() {
    if (confirm("Are you sure you want to delete all your transactions?")) {
      try {
        await transactionService.deleteAllTransactions();
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
