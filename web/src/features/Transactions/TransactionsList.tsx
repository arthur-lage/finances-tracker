import { Trash } from "@phosphor-icons/react";
import { TransactionCard } from "../../components/TransactionCard";
import { useTransactions } from "../../hooks/useTransactions";
import { DeleteAllTransactionsDialog } from "./DeleteAllTransactionsDialog";
import { useDisclosure } from "@chakra-ui/react";

export function TransactionsList() {
  const { transactions } = useTransactions();

  const deleteAllTransactionsDialogDisclosure = useDisclosure();

  return (
    <div>
      <div className="flex flex-col mb-8">
        <h2 className="mb-4 text-center font-bold text-lg font-jost">
          Your transactions (this month)
        </h2>

        <button
          className="w-full justify-center flex items-center gap-2 text-white hover:brightness-110 bg-red-600 font-semibold font-jost text-lg px-4 py-2 rounded-md shadow-md"
          onClick={deleteAllTransactionsDialogDisclosure.onOpen}
        >
          <Trash weight="fill" />
          <span>Clear transactions</span>
        </button>
      </div>

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
