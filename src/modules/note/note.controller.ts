import { FastifyReply, FastifyRequest } from "fastify";
import { createNote } from "./note.service";
import { CreateNoteInput } from "./note.schema";

export async function createNoteHandler(
  request: FastifyRequest<{
    Body: CreateNoteInput;
  }>
) {
  const note = await createNote({
    ...request.body,
    userId: request.user.id,
  });

  return note;
}
