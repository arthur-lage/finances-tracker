import Fastify, { FastifyRequest, FastifyReply } from "fastify";

import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";

import { authRoutes } from "./routes/auth.route";

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

export const server = Fastify({
  logger: true,
});

server.register(cors, {
  origin: ["*"],
});
server.register(fastifyJwt, {
  secret: String(process.env.JWT_SECRET),
});

server.decorate(
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

server.register(authRoutes, {
  prefix: "/api/auth",
});

async function bootstrap() {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

bootstrap();
