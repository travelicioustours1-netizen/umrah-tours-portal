interface Props {
  initialData?: {
    description?: string;
    itinerary?: string;
    inclusions?: string;
    exclusions?: string;
    image?: string;
  };
}

export default function DetailsSection({
  initialData,
}: Props) {
  return (
    <>
      {/* Package Image */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Package Image
        </h2>

        <div>
          <label className="block mb-2 font-medium">
            Image URL
          </label>

          <input
            type="url"
            name="image"
            defaultValue={initialData?.image ?? ""}
            placeholder="https://example.com/image.jpg"
            className="w-full border rounded-lg p-3"
          />

          <p className="mt-2 text-sm text-gray-500">
            Cloudinary upload will be added later.
          </p>
        </div>
      </div>

      {/* Package Details */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Package Details
        </h2>

        <div className="space-y-6">

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              name="description"
              rows={5}
              defaultValue={initialData?.description}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Itinerary
            </label>

            <textarea
              name="itinerary"
              rows={6}
              defaultValue={initialData?.itinerary}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Inclusions
            </label>

            <textarea
              name="inclusions"
              rows={5}
              defaultValue={initialData?.inclusions}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Exclusions
            </label>

            <textarea
              name="exclusions"
              rows={5}
              defaultValue={initialData?.exclusions}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

        </div>
      </div>
    </>
  );
}