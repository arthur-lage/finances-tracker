import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { useBalance } from "../../hooks/useBalance";
import { useTransactions } from "../../hooks/useTransactions";
import { transactionService } from "../../services/transactionService";
import { useRef } from "react";

type DeleteAllTransactionsDialogType = {
  isOpen: boolean;
  onClose: () => void;
};

export function DeleteAllTransactionsDialog({
  isOpen,
  onClose,
}: DeleteAllTransactionsDialogType) {
  const { setTransactions } = useTransactions();
  const { updateBalance } = useBalance();

  const cancelRef = useRef(null);

  async function handleDeleteAll() {
    try {
      await transactionService.deleteAllTransactions();
      await updateBalance();
      setTransactions([]);
      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader className="text-lg font-bold font-jost">
            Delete All Transactions
          </AlertDialogHeader>

          <AlertDialogBody className="text-lg font-jost">
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter className="flex items-center gap-5">
            <button
              className="text-white text-lg border-2 hover:border-red-400 border-red-800 bg-red-700 font-semibold font-jost rounded-md transition-all duration-150 hover:brightness-110 px-4 py-1"
              ref={cancelRef}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="text-white text-lg border-2 hover:border-indigo-400 border-indigo-800 bg-indigo-700 font-semibold font-jost rounded-md transition-all duration-150 hover:brightness-110 px-4 py-1"
              onClick={handleDeleteAll}
            >
              Confirm
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
