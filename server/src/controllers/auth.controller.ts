import { hash } from "argon2";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { authService } from "../services/auth.service";

export const authController = {
  async auth(req: FastifyRequest, reply: FastifyReply) {
    const { id } = await req.jwtVerify<{ id: string; iat: number }>();

    const user = await authService.auth({ id });

    return reply.status(200).send({
      user,
    });
  },

  async register(req: FastifyRequest, reply: FastifyReply) {
    try {
      const registerUserBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z
          .string()
          .min(6, "Password should have at least 6 characters")
          .max(24, "Password should have up to 24 characters"),
      });

      const result = registerUserBody.safeParse(req.body);

      if (!result.success) {
        return reply.status(400).send({
          message: result.error.errors[0].message,
        });
      }

      const { name, email, password } = result.data;

      const hashedPassword = await hash(password);

      const token = await authService.register({
        name,
        email,
        password: hashedPassword,
      });

      return reply.status(201).send({
        token,
      });
    } catch (error: any) {
      console.error(error);

      return reply.status(400).send({
        message: error.message,
      });
    }
  },

  async login(req: FastifyRequest, reply: FastifyReply) {
    try {
      const loginBody = z.object({
        email: z.string().email(),
        password: z
          .string()
          .min(6, "Password should have at least 6 characters")
          .max(24, "Password should have up to 24 characters"),
      });

      const result = loginBody.safeParse(req.body);

      if (!result.success) {
        return reply.status(400).send({
          message: result.error.errors[0].message,
        });
      }

      const { email, password } = result.data;

      const token = await authService.login({ email, password });

      return reply.status(200).send({
        token,
      });
    } catch (error: any) {
      console.error(error);

      return reply.status(400).send({
        message: error.message,
      });
    }
  },
};
