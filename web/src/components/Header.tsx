import { useAuth } from "../hooks/useAuth";

import { Link } from "react-router-dom";

export function Header() {
  const { logout } = useAuth();

  return (
    <div className="bg-slate-800 flex items-center justify-between px-10 py-3">
      <Link className="py-3 text-xl text-white font-bold font-nunito" to="/">
        Finances Tracker
      </Link>

      <button
        className="text-xl font-semibold font-nunito text-white bg-red-500 transition-all duration-150 ease-out hover:brightness-110 px-5 py-1 rounded-md shadow-md"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
