import { ITransaction } from "../interfaces/ITransaction";
import { api } from "../lib/api";

interface ITransactionGetById {
  id: string;
}

interface ITransactionUpdate {
  name: string;
  type: "INCOME" | "EXPENSE";
  value: number;
  date: Date;
}

interface ITransactionCreate {
  name: string;
  type: "INCOME" | "EXPENSE";
  value: number;
  date: Date;
}

interface ITransactionDeleteById {
  id: string;
}

export const transactionService = {
  async getAllTransactions(): Promise<{ transactions: ITransaction[] }> {
    try {
      const res = await api.get("/transactions");

      return {
        transactions: res.data.transactions,
      };
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  },

  async getTransactionById({
    id,
  }: ITransactionGetById): Promise<{ transaction: ITransaction }> {
    try {
      const res = await api.get("/transactions/" + id);

      return {
        transaction: res.data.transaction,
      };
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  },

  async create({
    name,
    type,
    value,
    date,
  }: ITransactionCreate): Promise<{ transaction: ITransaction }> {
    try {
      const res = await api.post("/transactions", {
        name,
        type,
        value,
        date,
      });

      return {
        transaction: res.data.transaction,
      };
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  },

  async update(
    transactionId: string,
    transactionData: ITransactionUpdate
  ): Promise<void> {
    try {
      await api.patch("/transactions/" + transactionId, transactionData);
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  },

  async deleteAllTransactions(): Promise<void> {
    try {
      await api.delete("/transactions");
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  },

  async deleteTransactionById({ id }: ITransactionDeleteById): Promise<void> {
    try {
      await api.delete("/transactions/" + id);
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  },
};
