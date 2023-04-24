import { api } from "../lib/api";

export const balanceService = {
  async getBalance(): Promise<{ balance: number }> {
    const res = await api.get("/balance");

    return { balance: res.data.balance };
  },
};
