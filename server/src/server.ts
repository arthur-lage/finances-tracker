import { build } from "./app";

export const server = build({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
    },
  },
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
