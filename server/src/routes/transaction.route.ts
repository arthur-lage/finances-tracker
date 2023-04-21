import { FastifyInstance } from "fastify";
import { transactionController } from "../controllers/transaction.controller";

export async function transactionRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      preHandler: [fastify.authenticate],
    },
    transactionController.getAllTransactions
  );

  fastify.get(
    "/:transactionId",
    {
      preHandler: [fastify.authenticate],
    },
    transactionController.getTransactionById
  );

  fastify.post(
    "/",
    {
      preHandler: [fastify.authenticate],
    },
    transactionController.createTransaction
  );

  fastify.patch(
    "/:transactionId",
    {
      preHandler: [fastify.authenticate],
    },
    transactionController.updateTransaction
  );

  fastify.delete(
    "/",
    {
      preHandler: [fastify.authenticate],
    },
    transactionController.deleteAllTransactions
  );

  fastify.delete(
    "/:transactionId",
    {
      preHandler: [fastify.authenticate],
    },
    transactionController.deleteTransactionById
  );
}
