"use server";

import { randomUUID } from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function uploadFile(
  file: File,
  bucket: "package-images" | "brochures"
) {
  if (!file || file.size === 0) {
    throw new Error("No file uploaded.");
  }

  const bytes = await file.arrayBuffer();

  const extension = file.name.split(".").pop();

  const fileName = `${randomUUID()}.${extension}`;

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(fileName, Buffer.from(bytes), {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return data.publicUrl;
}