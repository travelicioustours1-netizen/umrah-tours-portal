"use client";

import { useState, useTransition } from "react";
import { uploadFile } from "@/lib/actions/upload";

export default function MediaSection({
  initialData,
}: {
  initialData?: any;
}) {
  const [brochure, setBrochure] = useState(
    initialData?.brochure || ""
  );

  const [images, setImages] = useState<string[]>(
    initialData?.images?.map((img: any) => img.url) || []
  );

  const [isPending, startTransition] = useTransition();

  function handleBrochureUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    startTransition(async () => {
      try {
        const url = await uploadFile(file, "brochures");
        setBrochure(url);
      } catch (err) {
        console.error(err);
        alert("Brochure upload failed.");
      }
    });
  }

  function handleImagesUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = e.target.files;

    if (!files) return;

    startTransition(async () => {
      try {
        const uploaded = await Promise.all(
          Array.from(files).map((file) =>
            uploadFile(file, "package-images")
          )
        );

        setImages((prev) => [...prev, ...uploaded]);
      } catch (err) {
        console.error(err);
        alert("Image upload failed.");
      }
    });
  }

  return (
    <div className="rounded-lg border bg-white p-6 space-y-6">
      <h2 className="text-lg font-semibold">
        Package Media
      </h2>

      <div>
        <label className="block mb-2 font-medium">
          Brochure PDF
        </label>

        <input
          type="file"
          accept=".pdf"
          onChange={handleBrochureUpload}
        />

        <input
          type="hidden"
          name="brochure"
          value={brochure}
        />

        {brochure && (
          <a
            href={brochure}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-emerald-600 underline"
          >
            View Brochure
          </a>
        )}
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Package Images
        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImagesUpload}
        />

        <input
          type="hidden"
          name="images"
          value={JSON.stringify(images)}
        />
      </div>

      {isPending && (
        <p className="text-sm text-gray-500">
          Uploading...
        </p>
      )}

      <div className="grid grid-cols-3 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Package"
            className="rounded-lg border"
          />
        ))}
      </div>
    </div>
  );
}