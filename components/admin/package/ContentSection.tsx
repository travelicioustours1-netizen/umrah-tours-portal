interface Props {
  initialData?: any;
}

export default function ContentSection({
  initialData,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Package Content
      </h2>

      <div className="space-y-6">
        {/* DESCRIPTION */}
        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            name="description"
            defaultValue={initialData?.description ?? ""}
            rows={4}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* ITINERARY */}
        <div>
          <label className="mb-2 block font-medium">
            Itinerary
          </label>

          <textarea
            name="itinerary"
            defaultValue={initialData?.itinerary ?? ""}
            rows={8}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* INCLUSIONS */}
        <div>
          <label className="mb-2 block font-medium">
            Inclusions
          </label>

          <textarea
            name="inclusions"
            defaultValue={initialData?.inclusions ?? ""}
            rows={5}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* EXCLUSIONS */}
        <div>
          <label className="mb-2 block font-medium">
            Exclusions
          </label>

          <textarea
            name="exclusions"
            defaultValue={initialData?.exclusions ?? ""}
            rows={5}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* SEO SETTINGS */}
        <div className="border-t pt-6">
          <h3 className="mb-4 text-lg font-semibold">
            SEO Settings
          </h3>

          <div className="space-y-5">
            {/* SEO TITLE */}
            <div>
              <label className="mb-2 block font-medium">
                SEO Title
              </label>

              <input
                type="text"
                name="seoTitle"
                defaultValue={initialData?.seoTitle ?? ""}
                placeholder="Example: Luxury Maasai Mara Safari Package | Kenya Tours"
                className="w-full rounded-lg border p-3"
              />

              <p className="mt-1 text-sm text-gray-500">
                Recommended: 50–60 characters.
              </p>
            </div>

            {/* SEO DESCRIPTION */}
            <div>
              <label className="mb-2 block font-medium">
                SEO Description
              </label>

              <textarea
                name="seoDescription"
                defaultValue={initialData?.seoDescription ?? ""}
                placeholder="Write a compelling search engine description for this package."
                rows={4}
                className="w-full rounded-lg border p-3"
              />

              <p className="mt-1 text-sm text-gray-500">
                Recommended: 150–160 characters.
              </p>
            </div>

            {/* SEO KEYWORDS */}
            <div>
              <label className="mb-2 block font-medium">
                SEO Keywords
              </label>

              <input
                type="text"
                name="seoKeywords"
                defaultValue={initialData?.seoKeywords ?? ""}
                placeholder="Kenya safari, Maasai Mara, Africa holidays, luxury safari"
                className="w-full rounded-lg border p-3"
              />

              <p className="mt-1 text-sm text-gray-500">
                Separate keywords with commas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}