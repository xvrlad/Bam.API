import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import userRoutes from "./modules/user/user.route";
import config from "config";
import logger from "./utils/logger";
import { userSchemas } from "./modules/user/user.schema";
import { noteSchemas } from "./modules/note/note.schema";

const port = config.get<number>("port");

export const server = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

server.register(fjwt, {
  secret: config.get<string>("jwtSecret"),
});

server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.send(error);
    }
  }
);

server.get("/healthcheck", async function () {
  return { status: "OK" };
});

async function main() {
  for (const schema of [...userSchemas, ...noteSchemas]) {
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
