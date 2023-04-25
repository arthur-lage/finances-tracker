import { useContext } from "react";
import { BalanceContext } from "../contexts/BalanceContext";

export function useBalance() {
  const value = useContext(BalanceContext);
  return value;
}
