import prisma from "../../utils/prisma";
import supabase from "../../utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { CreateNoteInput } from "./note.schema";

export async function createNote(input: CreateNoteInput & { userId: string }) {
  const filename = uuidv4();

  await supabase.storage
    .from("bam-bucket")
    .upload(`Notes/${filename}.json`, input.content);

  const { data } = supabase.storage
    .from("bam-bucket")
    .getPublicUrl(`Notes/${filename}.json`);

  return prisma.note.create({
    data: {
      title: input.title,
      userId: input.userId,
      contentUrl: data.publicUrl,
    },
  });
}

export function getNotes(input: { userId: string }) {
  return prisma.note.findMany({
    select: {
      id: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      title: true,
      contentUrl: true,
      modifiedDate: true,
      createdDate: true,
    },
  });
}

export function getNote(input: string & { userId: string }) {
  return prisma.note.findUnique({
    where: {
      id: input,
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      title: true,
      contentUrl: true,
      modifiedDate: true,
      createdDate: true,
    },
  });
}

export async function deleteNote(input: string & { userId: string }) {
  await prisma.note.delete({
    where: {
      id: input,
    },
  });
  return;
}
