import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import userRoutes from "./modules/user/user.route";
import config from "config";
import logger from "./utils/logger";
import { userSchemas } from "./modules/user/user.schema";

const port = config.get<number>("port");

const server = Fastify();

server.register(fjwt, {
  secret: config.get<string>("jwtSecret"),
});

server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {}
);

server.get("/healthcheck", async function () {
  return { status: "OK" };
});

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/users" });

  try {
    await server.listen({ port: port, host: "0.0.0.0" });
    logger.info(`Server ready at http://localhost:${port}`);
  } catch (error) {
    logger.info(error);
    process.exit(1);
  }
}

main();
