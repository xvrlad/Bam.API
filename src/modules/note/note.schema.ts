import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const noteInput = {
  title: z.string(),
  content: z.string(),
};

const noteGenerated = {
  id: z.string(),
  contentUrl: z.string(),
  createdDate: z.string(),
  modifiedDate: z.string(),
};

const createNoteSchema = z.object({
  ...noteInput,
});

const noteResponseSchema = z.object({
  id: noteGenerated.id,
  title: z.string(),
  contentUrl: noteGenerated.contentUrl,
  createdDate: noteGenerated.createdDate,
  modifiedDate: noteGenerated.modifiedDate,
});

const notesResponseSchema = z.array(noteResponseSchema);

export type CreateNoteInput = z.infer<typeof createNoteSchema>;

export const { schemas: noteSchemas, $ref } = buildJsonSchemas(
  {
    createNoteSchema,
    noteResponseSchema,
    notesResponseSchema,
  },
  { $id: "Note" }
);
