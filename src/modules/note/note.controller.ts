import { FastifyReply, FastifyRequest } from "fastify";
import { createNote, deleteNote, getNote, getNotes } from "./note.service";
import { CreateNoteInput } from "./note.schema";

export async function createNoteHandler(
  request: FastifyRequest<{
    Body: CreateNoteInput;
  }>,
  reply: FastifyReply
) {
  const note = await createNote({
    ...request.body,
    userId: request.user.id,
  });

  return reply.code(201).send(note);
}

export async function getNotesHandler(request: FastifyRequest<{}>) {
  const notes = await getNotes({ userId: request.user.id });

  return notes;
}

export async function getNoteHandler(request: any) {
  const { noteId } = request.params;
  const note = await getNote(noteId);

  return note;
}

export async function deleteNoteHandler(request: any) {
  const { noteId } = request.params;
  await deleteNote(noteId);

  return;
}
