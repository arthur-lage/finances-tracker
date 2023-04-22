import { FastifyReply, FastifyRequest } from "fastify";

import { balanceService } from "../services/balance.service";

export const balanceController = {
  async getBalance(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = await req.jwtVerify<{ id: string; iat: number }>();

      const { balance } = await balanceService.getBalance({
        id,
      });

      return reply.status(200).send({
        balance,
      });
    } catch (err: any) {
      return reply.status(400).send({
        message: err.message,
      });
    }
  },
};
