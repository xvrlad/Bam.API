import { FastifyInstance } from "fastify";
import {
  createNoteHandler,
  getNoteHandler,
  getNotesHandler,
} from "./note.controller";
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
      preHandler: [server.authenticate],
      schema: {
        response: {
          200: $ref("notesResponseSchema"),
        },
      },
    },
    getNotesHandler
  );

  server.get(
    "/:noteId",
    {
      preHandler: [server.authenticate],
      schema: {
        response: {
          200: $ref("noteResponseSchema"),
        },
      },
    },
    getNoteHandler
  );
}

export default noteRoutes;
