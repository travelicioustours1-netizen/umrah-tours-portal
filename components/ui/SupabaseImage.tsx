import Image, { ImageProps } from "next/image";

const SUPABASE_HOST = "iukppiuuyldfzfnjpctz.supabase.co";

export default function SupabaseImage(props: ImageProps) {
  const src =
    typeof props.src === "string"
      ? props.src
      : "src" in props.src
        ? props.src.src
        : "";

  const isSupabaseImage =
    typeof src === "string" &&
    src.includes(
      `://${SUPABASE_HOST}/storage/v1/object/public/`
    );

  return (
    <Image
      {...props}
      unoptimized={isSupabaseImage}
    />
  );
}