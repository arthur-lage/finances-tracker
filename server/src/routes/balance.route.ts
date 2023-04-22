import { FastifyInstance } from "fastify";
import { balanceController } from "../controllers/balance.controller";

export async function balanceRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      preHandler: [fastify.authenticate],
    },
    balanceController.getBalance
  );
}
