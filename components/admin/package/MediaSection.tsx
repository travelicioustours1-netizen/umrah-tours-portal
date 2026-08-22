"use client";

import { useState, useTransition } from "react";
import imageCompression from "browser-image-compression";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { uploadFile } from "@/lib/actions/upload";
import { deletePackageImage } from "@/lib/actions/package";

interface PackageImage {
  id: string;
  url: string;
  alt?: string | null;
}

function SortableImage({
  image,
  index,
  onDelete,
  disabled,
}: {
  image: PackageImage;
  index: number;
  onDelete: (image: PackageImage) => void;
  disabled: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isCover = index === 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`overflow-hidden rounded-lg border bg-white ${
        isCover
          ? "border-emerald-500 ring-2 ring-emerald-100"
          : "border-gray-200"
      } ${
        isDragging
          ? "z-50 opacity-70 shadow-2xl"
          : ""
      }`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="block w-full cursor-grab touch-none active:cursor-grabbing"
        title="Drag to reorder"
      >
        <div className="relative">
          <img
            src={image.url}
            alt={
              image.alt ||
              `Package image ${index + 1}`
            }
            className="h-40 w-full object-cover"
          />

          <div className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs font-bold text-white">
            {index + 1}
          </div>

          {isCover && (
            <div className="absolute right-2 top-2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
              Cover Image
            </div>
          )}

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md bg-black/70 px-3 py-1 text-xs text-white">
            Drag to reorder
          </div>
        </div>
      </button>

      <div className="space-y-2 p-2">
        {isCover && (
          <div className="rounded-md bg-emerald-50 px-3 py-2 text-center text-xs font-semibold text-emerald-700">
            ★ This image is the package cover
          </div>
        )}

        <button
          type="button"
          onClick={() => onDelete(image)}
          disabled={disabled}
          className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function MediaSection({
  initialData,
}: {
  initialData?: any;
}) {
  const [brochure, setBrochure] = useState(
    initialData?.brochure || ""
  );

  const [images, setImages] = useState<
    PackageImage[]
  >(initialData?.images || []);

  const [isPending, startTransition] =
    useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleBrochureUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    startTransition(async () => {
      try {
        const url = await uploadFile(
          file,
          "brochures"
        );

        setBrochure(url);
      } catch (err: any) {
        console.error(
          "BROCHURE UPLOAD ERROR:",
          err
        );

        alert(
          `Brochure upload failed:\n\n${
            err?.message ||
            "Unknown error"
          }`
        );
      }
    });
  }

  function handleImagesUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    startTransition(async () => {
      try {
        const uploaded: PackageImage[] = [];

        for (const file of Array.from(files)) {
          console.log(
            "Original image:",
            file.name,
            file.type,
            `${(
              file.size /
              1024 /
              1024
            ).toFixed(2)} MB`
          );

          // Compress image before uploading
          const compressedFile =
            await imageCompression(file, {
              maxSizeMB: 0.5,
              maxWidthOrHeight: 1600,
              useWebWorker: true,
              fileType: "image/webp",
              initialQuality: 0.82,
            });

          console.log(
            "Compressed image:",
            `${(
              compressedFile.size /
              1024 /
              1024
            ).toFixed(2)} MB`,
            compressedFile.type
          );

          // Upload compressed WebP image
          const url = await uploadFile(
            compressedFile,
            "package-images"
          );

          uploaded.push({
            id: `new-${crypto.randomUUID()}`,
            url,
          });
        }

        // Add all uploaded images after
        // compression/upload is complete
        setImages((prev) => [
          ...prev,
          ...uploaded,
        ]);

        // Allow selecting the same file again
        e.target.value = "";
      } catch (err: any) {
        console.error(
          "IMAGE UPLOAD ERROR:",
          err
        );

        alert(
          `Image upload failed:\n\n${
            err?.message ||
            "Unknown upload error"
          }`
        );
      }
    });
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setImages((items) => {
      const oldIndex = items.findIndex(
        (item) => item.id === active.id
      );

      const newIndex = items.findIndex(
        (item) => item.id === over.id
      );

      if (
        oldIndex === -1 ||
        newIndex === -1
      ) {
        return items;
      }

      return arrayMove(
        items,
        oldIndex,
        newIndex
      );
    });
  }

  function handleDeleteImage(
    image: PackageImage
  ) {
    // Newly uploaded image that has not
    // been saved to the database yet.
    if (image.id.startsWith("new-")) {
      setImages((prev) =>
        prev.filter(
          (img) => img.id !== image.id
        )
      );

      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      try {
        await deletePackageImage(image.id);

        setImages((prev) =>
          prev.filter(
            (img) => img.id !== image.id
          )
        );
      } catch (err: any) {
        console.error(
          "IMAGE DELETE ERROR:",
          err
        );

        alert(
          `Image deletion failed:\n\n${
            err?.message ||
            "Unknown error"
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

      {/* Brochure */}
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

      {/* Package Images */}
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
          Upload JPG, PNG or WebP images.
          Images are automatically compressed
          to WebP before upload.
          Drag images to change their order.
        </p>

        <input
          type="hidden"
          name="images"
          value={JSON.stringify(
            images.map(
              (image) => image.url
            )
          )}
        />
      </div>

      {isPending && (
        <p className="text-sm font-medium text-gray-500">
          Compressing and uploading images...
        </p>
      )}

      {/* Image Gallery */}
      {images.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map(
              (image) => image.id
            )}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map(
                (image, index) => (
                  <SortableImage
                    key={image.id}
                    image={image}
                    index={index}
                    onDelete={
                      handleDeleteImage
                    }
                    disabled={isPending}
                  />
                )
              )}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {images.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-gray-500">
          No package images uploaded yet.
        </div>
      )}
    </div>
  );
}