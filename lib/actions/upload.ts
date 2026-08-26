"use server";

import { randomUUID } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function uploadFile(
  file: File,
  bucket: "package-images" | "brochures" | "hotel-images"
) {
  console.log("========== UPLOAD START ==========");

  try {
    console.log("1. File received:", {
      name: file?.name,
      type: file?.type,
      size: file?.size,
      bucket,
    });

    if (!file || file.size === 0) {
      throw new Error("No file uploaded.");
    }

    console.log("2. Creating Supabase admin client...");

    const supabaseAdmin = getSupabaseAdmin();

    console.log("3. Supabase admin client created successfully.");

    console.log("4. Reading file ArrayBuffer...");

    const bytes = await file.arrayBuffer();

    console.log("5. File read successfully:", {
      bytes: bytes.byteLength,
    });

    const extension =
      file.type === "image/webp"
        ? "webp"
        : file.type === "image/png"
          ? "png"
          : file.type === "image/jpeg"
            ? "jpg"
            : file.type === "application/pdf"
              ? "pdf"
              : file.name.split(".").pop() || "bin";

    const fileName = `${randomUUID()}.${extension}`;

    console.log("6. Uploading to Supabase:", {
      bucket,
      fileName,
      contentType: file.type,
    });

    const { data: uploadData, error } =
      await supabaseAdmin.storage
        .from(bucket)
        .upload(fileName, Buffer.from(bytes), {
          contentType:
            file.type || "application/octet-stream",
          upsert: false,
        });

    if (error) {
      console.error(
        "7. SUPABASE UPLOAD ERROR:",
        JSON.stringify(error, null, 2)
      );

      throw new Error(
        `Supabase upload failed: ${error.message}`
      );
    }

    console.log("7. Upload successful:", uploadData);

    const { data } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(fileName);

    console.log("8. Public URL generated:", data.publicUrl);
    console.log("========== UPLOAD SUCCESS ==========");

    return data.publicUrl;
  } catch (error) {
    console.error("========== UPLOAD FAILED ==========");

    console.error(error);

    if (error instanceof Error) {
      console.error("ERROR NAME:", error.name);
      console.error("ERROR MESSAGE:", error.message);
      console.error("ERROR STACK:", error.stack);
    }

    console.error("===================================");

    throw new Error(
      error instanceof Error
        ? error.message
        : "Image upload failed."
    );
  }
}