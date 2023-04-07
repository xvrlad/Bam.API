import prisma from "../../utils/prisma";
import supabase from "../../utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { promises as fsPromises } from "fs";
import { join } from "path";
import { CreateNoteInput } from "./note.schema";

export async function createNote(input: CreateNoteInput & { userId: string }) {
  const filename = `${uuidv4()}.json`;
  const jsonFile = await writeJsonFile(filename, input.content);
  await supabase.storage
    .from("bam-bucket")
    .upload(`Notes/${filename}.json`, jsonFile);

  const { data } = supabase.storage
    .from("bam-bucket")
    .getPublicUrl(`Notes/${filename}.json`);

  return prisma.note.create({
    data: {
      ...input,
      contentUrl: data.publicUrl,
    },
  });
}

export function getNotes() {
  return prisma.note.findMany({
    select: {
      id: true,
      title: true,
      contentUrl: true,
      modifiedDate: true,
      createdDate: true,
    },
  });
}

async function writeJsonFile(filename: string, data: any) {
  try {
    await fsPromises.writeFile(join(__dirname, filename), data, {
      flag: "w",
    });

    const contents = await fsPromises.readFile(
      join(__dirname, filename),
      "utf-8"
    );
    console.log(contents); // 👉️ Tiptap JSON content

    return contents;
  } catch (err) {
    console.log(err);
    return "Something went wrong";
  }
}
