import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { Header } from "../components/Header";

export function Home() {
  const { isAuth, currentUser } = useAuth();

  return (
    <>
      {!isAuth() ? (
        <Navigate to="/login" />
      ) : (
        <div>
          <Header />

          <h1>Hello, {currentUser?.name}</h1>
        </div>
      )}
    </>
  );
}
