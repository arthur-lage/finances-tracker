import { useAuth } from "../hooks/useAuth";

import { Link } from "react-router-dom";

export function Header() {
  const { logout } = useAuth();

  return (
    <div className="bg-zinc-300 flex items-center justify-between px-4 py-1">
      <Link to="/">Finances Tracker</Link>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
