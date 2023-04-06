import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const noteInput = {
  title: z.string(),
  content: z.string(),
};

const noteGenerated = {
  id: z.number(),
  contentUrl: z.string(),
  createdDate: z.string(),
  modifiedDate: z.string(),
};

const createNoteSchema = z.object({});

const createNoteResponseSchema = z.object({});

const noteResponseSchema = z.object({});

const notesResponseSchema = z.array(noteResponseSchema);

export type CreateNoteInput = z.infer<typeof createNoteSchema>;

export const {} = buildJsonSchemas({
  createNoteSchema,
  createNoteResponseSchema,
  noteResponseSchema,
  notesResponseSchema,
});
