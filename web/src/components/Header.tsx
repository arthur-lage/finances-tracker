import { useDisclosure } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { LogoutDialog } from "../features/LogoutDialog";

export function Header() {
  const logoutDialogDisclosure = useDisclosure();

  return (
    <div className="bg-header flex items-center justify-between px-6 py-3">
      <Link className="py-3 text-xl text-white font-bold font-jost" to="/">
        Finances Tracker
      </Link>

      <LogoutDialog
        isOpen={logoutDialogDisclosure.isOpen}
        onClose={logoutDialogDisclosure.onClose}
      />

      <button
        className="text-lg font-semibold font-jost text-white bg-red-600 transition-all duration-150 ease-out hover:brightness-110 px-4 py-1 rounded-md shadow-md"
        onClick={logoutDialogDisclosure.onOpen}
      >
        Logout
      </button>
    </div>
  );
}
