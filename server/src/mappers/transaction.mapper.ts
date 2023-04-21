import { Transaction } from "@prisma/client";
import { ITransactionResponse } from "../services/transaction.service";

export const transactionMapper = {
  toDTO(transaction: Transaction): ITransactionResponse {
    return {
      id: transaction.id,
      type: transaction.type,
      name: transaction.name,
      date: transaction.date,
      value: transaction.value,
      createdAt: transaction.createdAt,
    };
  },
};
