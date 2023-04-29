import "./global.css";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { BalanceProvider } from "./contexts/BalanceContext.tsx";
import { TransactionsProvider } from "./contexts/TransactionsContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <TransactionsProvider>
          <BalanceProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BalanceProvider>
        </TransactionsProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
