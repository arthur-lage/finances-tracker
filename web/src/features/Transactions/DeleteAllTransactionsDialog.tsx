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
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete All Transactions
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <button ref={cancelRef} onClick={onClose}>
              Cancel
            </button>
            <button onClick={handleDeleteAll}>Confirm</button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
