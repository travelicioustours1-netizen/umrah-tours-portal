import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const bucket = formData.get("bucket") as string | null;

    if (!file) {
      return NextResponse.json(
        {
          error: "No file uploaded.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      bucket !== "package-images" &&
      bucket !== "brochures" &&
      bucket !== "hotel-images"
    ) {
      return NextResponse.json(
        {
          error: "Invalid bucket.",
        },
        {
          status: 400,
        }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    const extension =
      file.name.split(".").pop()?.toLowerCase() || "bin";

    const fileName = `${randomUUID()}.${extension}`;

    const bytes = await file.arrayBuffer();

    const { error: uploadError } =
      await supabaseAdmin.storage
        .from(bucket)
        .upload(
          fileName,
          Buffer.from(bytes),
          {
            contentType:
              file.type || "application/octet-stream",
            upsert: false,
          }
        );

    if (uploadError) {
      return NextResponse.json(
        {
          error: uploadError.message,
        },
        {
          status: 500,
        }
      );
    }

    const { data } =
      supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: data.publicUrl,
      fileName,
      bucket,
    });
  } catch (error) {
    console.error(
      "Supabase upload error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "File upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}