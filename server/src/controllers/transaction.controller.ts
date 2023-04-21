import { FastifyReply, FastifyRequest } from "fastify";
import { transactionService } from "../services/transaction.service";
import { z } from "zod";

export const transactionController = {
  async getAllTransactions(req: FastifyRequest, reply: FastifyReply) {
    try {
      // @ts-ignore
      const { id: userId } = await req.jwtVerify<{ id: string; iat: number }>();

      const transactions = await transactionService.getAllTransactions({
        userId,
      });

      return reply.status(200).send({ transactions });
    } catch (err: any) {
      return reply.status(400).send({ message: err.message });
    }
  },

  async getTransactionById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const getTransactionByIdParams = z.object({
        transactionId: z.string().uuid("Invalid transaction id"),
      });

      const result = getTransactionByIdParams.safeParse(req.params);

      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }

      // @ts-ignore
      const { id: userId } = await req.jwtVerify<{ id: string; iat: number }>();
      const { transactionId } = result.data;

      const transaction = await transactionService.getTransactionById({
        userId,
        transactionId,
      });

      return reply.status(200).send({ transaction });
    } catch (err: any) {
      return reply.status(400).send({ message: err.message });
    }
  },

  async createTransaction(req: FastifyRequest, reply: FastifyReply) {
    try {
      const createTransactionBody = z.object({
        name: z.string(),
        type: z.enum(["INCOME", "EXPENSE"]),
        value: z.number(),
        date: z.string(),
      });

      const result = createTransactionBody.safeParse(req.body);

      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }

      // @ts-ignore
      const { id: userId } = await req.jwtVerify<{ id: string; iat: number }>();
      const { name, type, value, date } = result.data;

      console.log(new Date(date).toUTCString());

      const transaction = await transactionService.createTransaction({
        userId,
        name,
        type,
        value,
        date: new Date(date),
      });

      return reply.status(200).send({ transaction });
    } catch (err: any) {
      return reply.status(400).send({ message: err.message });
    }
  },

  async updateTransaction(req: FastifyRequest, reply: FastifyReply) {
    try {
      const updateTransactionBody = z.object({
        name: z.string().optional(),
        type: z.enum(["INCOME", "EXPENSE"]).optional(),
        value: z.number().optional(),
        date: z.date().optional(),
      });

      const updateTransactionParams = z.object({
        transactionId: z.string().uuid(),
      });

      const resultBody = updateTransactionBody.safeParse(req.body);
      const resultParams = updateTransactionParams.safeParse(req.params);

      if (!resultParams.success) {
        throw new Error(resultParams.error.errors[0].message);
      }

      if (!resultBody.success) {
        throw new Error(resultBody.error.errors[0].message);
      }

      // @ts-ignore
      const { id: userId } = await req.jwtVerify<{ id: string; iat: number }>();
      const { transactionId } = resultParams.data;
      const { name, type, value, date } = resultBody.data;

      const transaction = await transactionService.updateTransaction({
        userId,
        transactionId,
        name,
        type,
        value,
        date,
      });

      return reply.status(200).send({ transaction });
    } catch (err: any) {
      return reply.status(400).send({ message: err.message });
    }
  },

  async deleteAllTransactions(req: FastifyRequest, reply: FastifyReply) {
    try {
      // @ts-ignore
      const { id: userId } = await req.jwtVerify<{ id: string; iat: number }>();

      await transactionService.deleteAllTransactions({
        userId,
      });

      return reply
        .status(200)
        .send({ message: "Transactions deleted successfully" });
    } catch (err: any) {
      return reply.status(400).send({ message: err.message });
    }
  },

  async deleteTransactionById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const deleteTransactionParams = z.object({
        transactionId: z.string().uuid("Invalid transaction id"),
      });

      const result = deleteTransactionParams.safeParse(req.params);

      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }

      // @ts-ignore
      const { id: userId } = await req.jwtVerify<{ id: string; iat: number }>();
      const { transactionId } = result.data;

      await transactionService.deleteTransactionById({
        userId,
        transactionId,
      });

      return reply
        .status(200)
        .send({ message: "Transaction deleted successfully" });
    } catch (err: any) {
      return reply.status(400).send({ message: err.message });
    }
  },
};
