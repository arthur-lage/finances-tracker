import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./global.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { TransactionsProvider } from "./contexts/TransactionsContext.tsx";
import { BalanceProvider } from "./contexts/BalanceContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TransactionsProvider>
          <BalanceProvider>
            <App />
          </BalanceProvider>
        </TransactionsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
