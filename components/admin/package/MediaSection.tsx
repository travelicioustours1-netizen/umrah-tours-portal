"use client";

import { useState, useTransition } from "react";
import { uploadFile } from "@/lib/actions/upload";
import { deletePackageImage } from "@/lib/actions/package";

interface PackageImage {
  id: string;
  url: string;
}

export default function MediaSection({
  initialData,
}: {
  initialData?: any;
}) {
  const [brochure, setBrochure] = useState(
    initialData?.brochure || ""
  );

  const [images, setImages] = useState<PackageImage[]>(
    initialData?.images || []
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
      } catch (err: any) {
        console.error("BROCHURE UPLOAD ERROR:", err);

        alert(
          `Brochure upload failed: ${
            err?.message || "Unknown error"
          }`
        );
      }
    });
  }

  function handleImagesUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    startTransition(async () => {
      try {
        const uploaded: PackageImage[] = [];

        for (const file of Array.from(files)) {
          console.log(
            "Uploading:",
            file.name,
            file.type,
            `${(file.size / 1024 / 1024).toFixed(2)} MB`
          );

          const url = await uploadFile(
            file,
            "package-images"
          );

          uploaded.push({
            id: `new-${crypto.randomUUID()}`,
            url,
          });
        }

        setImages((prev) => [...prev, ...uploaded]);
      } catch (err: any) {
        console.error("IMAGE UPLOAD ERROR:", err);

        alert(
          `Image upload failed:\n\n${
            err?.message || "Unknown upload error"
          }`
        );
      }
    });
  }

  function handleDeleteImage(image: PackageImage) {
    if (image.id.startsWith("new-")) {
      setImages((prev) =>
        prev.filter((img) => img.id !== image.id)
      );

      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deletePackageImage(image.id);

        setImages((prev) =>
          prev.filter((img) => img.id !== image.id)
        );
      } catch (err: any) {
        console.error(
          "IMAGE DELETE ERROR:",
          err
        );

        alert(
          `Image deletion failed:\n\n${
            err?.message || "Unknown error"
          }`
        );
      }
    });
  }

  return (
    <div className="space-y-6 rounded-lg border bg-white p-6">
      <h2 className="text-lg font-semibold">
        Package Media
      </h2>

      <div>
        <label className="mb-2 block font-medium">
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
        <label className="mb-2 block font-medium">
          Package Images
        </label>

        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleImagesUpload}
        />

        <p className="mt-1 text-xs text-gray-500">
          JPG, PNG or WebP recommended. Upload images one at
          a time if needed.
        </p>

        <input
          type="hidden"
          name="images"
          value={JSON.stringify(
            images.map((image) => image.url)
          )}
        />
      </div>

      {isPending && (
        <p className="text-sm text-gray-500">
          Processing...
        </p>
      )}

      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="overflow-hidden rounded-lg border bg-white"
          >
            <img
              src={image.url}
              alt={`Package image ${index + 1}`}
              className="h-40 w-full object-cover"
            />

            <div className="p-2">
              <button
                type="button"
                onClick={() =>
                  handleDeleteImage(image)
                }
                disabled={isPending}
                className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}