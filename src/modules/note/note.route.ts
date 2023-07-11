import { FastifyInstance } from "fastify";
import {
  createNoteHandler,
  deleteNoteHandler,
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

  server.delete(
    "/:noteId",
    {
      preHandler: [server.authenticate],
      schema: {
        response: {
          204: {
            description: "Deletion success",
            type: "null",
          },
        },
      },
    },
    deleteNoteHandler
  );
}

export default noteRoutes;
