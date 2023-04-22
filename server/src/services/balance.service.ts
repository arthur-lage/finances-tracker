import { prisma } from "../lib/prisma";

interface IBalanceGet {
  id: string;
}

export const balanceService = {
  async getBalance({ id }: IBalanceGet) {
    const userExists = await prisma.user.findFirst({
      where: { id },
    });

    if (!userExists) {
      throw new Error("Could not find user");
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: id,
      },
    });

    if (transactions.length == 0) {
      return {
        balance: 0,
      };
    }

    let totalIncomes = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.type == "INCOME") {
        totalIncomes += transaction.value;
      }

      if (transaction.type == "EXPENSE") {
        totalExpenses += transaction.value;
      }
    });

    const balance = totalIncomes - totalExpenses;

    return {
      balance,
    };
  },
};
