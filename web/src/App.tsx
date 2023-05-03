import { Routes, Route } from "react-router-dom";

import { Home, Register, Login, NotFound } from "./pages";
import { TransactionPage } from "./pages/TransactionPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/transactions/:transactionId"
        element={<TransactionPage />}
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
