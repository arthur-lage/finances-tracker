import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useAuth } from "../hooks/useAuth";

type LogoutDialogType = {
  isOpen: boolean;
  onClose: () => void;
};

export function LogoutDialog({ isOpen, onClose }: LogoutDialogType) {
  const { logout } = useAuth();

  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent maxWidth={[300, 450, 650, 850]}>
          <AlertDialogHeader className="text-lg font-bold font-jost">
            Log out
          </AlertDialogHeader>

          <AlertDialogBody className="text-lg font-jost">
            Are you sure? You will have to login again if you confirm this
            action.
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
              onClick={logout}
            >
              Logout
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
