import { prisma } from "../lib/prisma";
import { transactionMapper } from "../mappers/transaction.mapper";

export interface ITransactionResponse {
  id: string;
  type: "INCOME" | "EXPENSE";
  name: string;
  date: Date;
  value: number;
  createdAt: Date;
}

interface ITransactionGetAll {
  userId: string;
}

interface ITransactionGetById {
  userId: string;
  transactionId: string;
}

interface ITransactionCreate {
  userId: string;
  type: "INCOME" | "EXPENSE";
  name: string;
  value: number;
  date: Date;
}

interface ITransactionUpdate {
  userId: string;
  transactionId: string;
  type?: "INCOME" | "EXPENSE";
  name?: string;
  value?: number;
  date?: Date;
}

interface ITransactionDeleteAll {
  userId: string;
}

interface ITransactionDeleteById {
  userId: string;
  transactionId: string;
}

export const transactionService = {
  async getAllTransactions({
    userId,
  }: ITransactionGetAll): Promise<ITransactionResponse[]> {
    const userExists = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new Error("Could not find user");
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
    });

    return transactions.map((transaction) =>
      transactionMapper.toDTO(transaction)
    );
  },

  async getTransactionById({
    userId,
    transactionId,
  }: ITransactionGetById): Promise<ITransactionResponse> {
    const userExists = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new Error("Could not find user");
    }

    const transaction = await prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });

    if (!transaction) {
      throw new Error("Could not find transaction");
    }

    return transactionMapper.toDTO(transaction);
  },

  async createTransaction({
    userId,
    type,
    name,
    value,
    date,
  }: ITransactionCreate): Promise<ITransactionResponse> {
    const userExists = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new Error("Could not find user");
    }

    const transaction = await prisma.transaction.create({
      data: {
        type,
        name,
        value,
        date,
        userId,
      },
    });

    return transactionMapper.toDTO(transaction);
  },

  async updateTransaction({
    userId,
    transactionId,
    type,
    name,
    value,
    date,
  }: ITransactionUpdate): Promise<ITransactionResponse> {
    const userExists = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new Error("Could not find user");
    }

    const transaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        type: type || undefined,
        name: name || undefined,
        value: value || undefined,
        date: date || undefined,
      },
    });

    return transactionMapper.toDTO(transaction);
  },

  async deleteAllTransactions({
    userId,
  }: ITransactionDeleteAll): Promise<void> {
    const userExists = await prisma.user.findFirst({ where: { id: userId } });

    if (!userExists) {
      throw new Error("Could not find user");
    }

    await prisma.transaction.deleteMany({
      where: {
        userId,
      },
    });
  },

  async deleteTransactionById({
    userId,
    transactionId,
  }: ITransactionDeleteById): Promise<void> {
    const userExists = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new Error("Could not find user");
    }

    await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
  },
};
