import { TransactionCard } from "../../components/TransactionCard";
import { useTransactions } from "../../hooks/useTransactions";
import { DeleteAllTransactionsDialog } from "./DeleteAllTransactionsDialog";
import { useDisclosure } from "@chakra-ui/react";

export function TransactionsList() {
  const { transactions } = useTransactions();

  const deleteAllTransactionsDialogDisclosure = useDisclosure();

  return (
    <div>
      <button onClick={deleteAllTransactionsDialogDisclosure.onOpen}>
        Clear transactions
      </button>

      <DeleteAllTransactionsDialog
        isOpen={deleteAllTransactionsDialogDisclosure.isOpen}
        onClose={deleteAllTransactionsDialogDisclosure.onClose}
      />

      <section className="transactions-list-scrollbar pr-4 overflow-y-scroll max-h-[25rem] flex flex-col gap-4">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </section>
    </div>
  );
}
