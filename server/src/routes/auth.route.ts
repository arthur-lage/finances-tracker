import { FastifyInstance } from "fastify";

import { authController } from "../controllers/auth.controller";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      preHandler: [fastify.authenticate],
    },
    authController.auth
  );

  fastify.post("/", authController.register);

  fastify.post("/login", authController.login);
}
