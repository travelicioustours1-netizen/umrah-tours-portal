import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const bucket = formData.get("bucket") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    if (
  bucket !== "package-images" &&
  bucket !== "brochures" &&
  bucket !== "hotel-images"
) {
  return NextResponse.json(
    { error: "Invalid bucket." },
    { status: 400 }
  );
}

    const extension = file.name.split(".").pop();
    const fileName = `${randomUUID()}.${extension}`;

    const bytes = await file.arrayBuffer();

    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(fileName, Buffer.from(bytes), {
        contentType: file.type,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const { data } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return NextResponse.json({
      url: data.publicUrl,
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}