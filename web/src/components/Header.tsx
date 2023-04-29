import { useAuth } from "../hooks/useAuth";

import { Link } from "react-router-dom";

export function Header() {
  const { logout } = useAuth();

  return (
    <div className="bg-header flex items-center justify-between px-6 py-3">
      <Link className="py-3 text-xl text-white font-bold font-jost" to="/">
        Finances Tracker
      </Link>

      <button
        className="text-lg font-semibold font-jost text-white bg-red-600 transition-all duration-150 ease-out hover:brightness-110 px-4 py-1 rounded-md shadow-md"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
