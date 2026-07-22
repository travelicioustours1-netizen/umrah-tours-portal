export async function uploadFile(
  bucket: "package-images" | "brochures",
  file: File
) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("bucket", bucket);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Upload failed");
  }

  return data.url;
}