import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";

import { authRoutes } from "./routes/auth.route";
import { transactionRoutes } from "./routes/transaction.route";
import { balanceRoutes } from "./routes/balance.route";

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

export function build(opts = {}) {
  const app = Fastify(opts);

  app.register(cors, {
    origin: ["*"],
  });
  app.register(fastifyJwt, {
    secret: String(process.env.JWT_SECRET),
  });

  app.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        await req.jwtVerify();
      } catch (err: any) {
        return reply.status(401).send({
          message: err.message,
        });
      }
    }
  );

  app.register(authRoutes, {
    prefix: "/api/auth",
  });

  app.register(transactionRoutes, {
    prefix: "/api/transactions",
  });

  app.register(balanceRoutes, {
    prefix: "/api/balance",
  });

  return app;
}
