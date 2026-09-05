"use client";

import { useState, useTransition } from "react";
import imageCompression from "browser-image-compression";

import { uploadFile } from "@/lib/actions/upload";
import {
  createPromotion,
  updatePromotion,
} from "@/lib/actions/promotion";

interface PromotionFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    buttonText?: string | null;
    whatsappUrl?: string | null;
    isActive: boolean;
    displayOrder: number;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
  };
}

function formatDateForInput(
  value?: Date | string | null
) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

export default function PromotionForm({
  initialData,
}: PromotionFormProps) {
  const [imageUrl, setImageUrl] = useState(
    initialData?.imageUrl || ""
  );

  const [isPending, startTransition] =
    useTransition();

  const isEdit = Boolean(initialData?.id);

  function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    startTransition(async () => {
      try {
        console.log(
          "Original promotion image:",
          file.name,
          file.type,
          `${(
            file.size /
            1024 /
            1024
          ).toFixed(2)} MB`
        );

        /*
         * Compress flyer before uploading.
         */
        const compressedFile =
          await imageCompression(file, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1600,
            useWebWorker: true,
            fileType: "image/webp",
            initialQuality: 0.82,
          });

        console.log(
          "Compressed promotion image:",
          `${(
            compressedFile.size /
            1024 /
            1024
          ).toFixed(2)} MB`,
          compressedFile.type
        );

        const url = await uploadFile(
          compressedFile,
          "promotion-images"
        );

        setImageUrl(url);

        /*
         * Allow selecting the same file again.
         */
        e.target.value = "";
      } catch (err: any) {
        console.error(
          "PROMOTION IMAGE UPLOAD ERROR:",
          err
        );

        alert(
          `Promotion image upload failed:\n\n${
            err?.message ||
            "Unknown upload error"
          }`
        );
      }
    });
  }

  function handleSubmit(
    formData: FormData
  ) {
    /*
     * Make sure the latest uploaded image
     * is included in the server action.
     */
    formData.set(
      "imageUrl",
      imageUrl
    );

    startTransition(async () => {
      try {
        if (isEdit && initialData?.id) {
          await updatePromotion(
            initialData.id,
            formData
          );
        } else {
          await createPromotion(
            formData
          );
        }
      } catch (error: any) {
        /*
         * Next.js redirect() throws internally.
         * Do not show that as an error.
         */
        if (
          error?.digest?.startsWith(
            "NEXT_REDIRECT"
          )
        ) {
          return;
        }

        console.error(
          "PROMOTION SAVE ERROR:",
          error
        );

        alert(
          `Could not save promotion:\n\n${
            error?.message ||
            "Unknown error"
          }`
        );
      }
    });
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-6"
    >
      {/* =================================================
          BASIC INFORMATION
      ================================================= */}

      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold">
          Promotion Details
        </h2>

        <div className="space-y-5">
          {/* Title */}

          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Promotion Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={
                initialData?.title || ""
              }
              placeholder="e.g. Special Umrah Offer"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          {/* Description */}

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Short Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={4}
              required
              defaultValue={
                initialData?.description || ""
              }
              placeholder="Write a short description for this promotion..."
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* =================================================
          FLYER IMAGE
      ================================================= */}

      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold">
          Promotional Flyer
        </h2>

        <div className="space-y-4">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleImageUpload}
            disabled={isPending}
            className="block w-full text-sm"
          />

          <p className="text-xs text-gray-500">
            Upload JPG, PNG or WebP.
            The image will automatically be
            compressed to WebP before upload.
            Maximum optimized size is approximately
            0.5 MB.
          </p>

          <input
            type="hidden"
            name="imageUrl"
            value={imageUrl}
          />

          {isPending && (
            <div className="rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
              Compressing and uploading flyer...
            </div>
          )}

          {imageUrl && (
            <div className="overflow-hidden rounded-lg border bg-gray-50">
              <div className="border-b px-4 py-2 text-sm font-medium text-gray-700">
                Flyer Preview
              </div>

              <div className="p-4">
                <img
                  src={imageUrl}
                  alt="Promotion flyer preview"
                  className="mx-auto max-h-[600px] w-auto max-w-full rounded-lg object-contain"
                />
              </div>
            </div>
          )}

          {!imageUrl && (
            <div className="rounded-lg border border-dashed p-10 text-center text-sm text-gray-500">
              No promotional flyer uploaded yet.
            </div>
          )}
        </div>
      </div>

      {/* =================================================
          CALL TO ACTION
      ================================================= */}

      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold">
          Call to Action
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="buttonText"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Button Text
            </label>

            <input
              id="buttonText"
              name="buttonText"
              type="text"
              defaultValue={
                initialData?.buttonText || ""
              }
              placeholder="e.g. Enquire Now"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="whatsappUrl"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              WhatsApp URL
            </label>

            <input
              id="whatsappUrl"
              name="whatsappUrl"
              type="url"
              defaultValue={
                initialData?.whatsappUrl || ""
              }
              placeholder="https://wa.me/..."
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-500"
            />

            <p className="mt-1 text-xs text-gray-500">
              Leave empty if this promotion
              does not need a button.
            </p>
          </div>
        </div>
      </div>

      {/* =================================================
          DISPLAY SETTINGS
      ================================================= */}

      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold">
          Display Settings
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {/* Active */}

          <div>
            <label
              htmlFor="isActive"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Status
            </label>

            <select
              id="isActive"
              name="isActive"
              defaultValue={
                initialData?.isActive === false
                  ? "false"
                  : "true"
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-500"
            >
              <option value="true">
                Active
              </option>

              <option value="false">
                Inactive
              </option>
            </select>
          </div>

          {/* Display Order */}

          <div>
            <label
              htmlFor="displayOrder"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Display Order
            </label>

            <input
              id="displayOrder"
              name="displayOrder"
              type="number"
              min="0"
              step="1"
              defaultValue={
                initialData?.displayOrder ?? 0
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* =================================================
          SCHEDULE
      ================================================= */}

      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold">
          Promotion Schedule
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>

            <input
              id="startDate"
              name="startDate"
              type="date"
              defaultValue={formatDateForInput(
                initialData?.startDate
              )}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              End Date
            </label>

            <input
              id="endDate"
              name="endDate"
              type="date"
              defaultValue={formatDateForInput(
                initialData?.endDate
              )}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Leave dates empty to keep the promotion
          active indefinitely when Status is Active.
        </p>
      </div>

      {/* =================================================
          SAVE
      ================================================= */}

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={
            isPending || !imageUrl
          }
          className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? "Saving..."
            : isEdit
              ? "Update Promotion"
              : "Create Promotion"}
        </button>
      </div>
    </form>
  );
}