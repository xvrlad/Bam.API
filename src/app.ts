// import express from "express";
// import config from "config";
// import logger from "./utils/logger";
// import routes from "./routes";

// const port = config.get<number>("port");

// const app = express();

// app.listen(port, () => {
//   logger.info(`App is running at http://localhost:${port}`);

//   routes(app);
// });

import Fastify from "fastify";
import userRoutes from "./modules/user/user.route";
import config from "config";
import logger from "./utils/logger";

const port = config.get<number>("port");

const server = Fastify();

server.get("/healthcheck", async function () {
  return { status: "OK" };
});

async function main() {
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
