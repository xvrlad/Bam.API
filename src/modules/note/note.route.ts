import { FastifyInstance } from "fastify";
import { createNoteHandler, getNotesHandler } from "./note.controller";
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

  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("notesResponseSchema"),
        },
      },
    },
    getNotesHandler
  );
}

export default noteRoutes;
