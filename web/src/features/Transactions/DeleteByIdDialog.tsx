import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { transactionService } from "../../services/transactionService";
import { useNavigate } from "react-router-dom";

type DeleteByIdDialogType = {
  transactionId: string;
  isOpen: boolean;
  onClose: () => void;
};

export function DeleteByIdDialog({
  transactionId,
  isOpen,
  onClose,
}: DeleteByIdDialogType) {
  const cancelRef = useRef(null);
  const navigate = useNavigate();

  async function handleDeleteById() {
    try {
      await transactionService.deleteTransactionById({
        id: transactionId,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
    return;
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent maxWidth={[300, 450, 650, 850]}>
          <AlertDialogHeader className="text-lg font-bold font-jost">
            Delete This Transaction
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
              onClick={handleDeleteById}
            >
              Confirm
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
