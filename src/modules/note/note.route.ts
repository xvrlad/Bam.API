import { FastifyInstance } from "fastify";
import { createNoteHandler } from "./note.controller";
import { $ref } from "./note.schema";

async function noteRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createNoteSchema"),
        response: {
          201: $ref("noteResponseSchema"),
        },
      },
    },
    createNoteHandler
  );
}

export default noteRoutes;
