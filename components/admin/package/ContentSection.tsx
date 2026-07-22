interface Props {
  initialData?: any;
}

export default function ContentSection({ initialData }: Props) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Package Content
      </h2>

      <div className="space-y-6">
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

        <div>
          <label className="mb-2 block font-medium">
            Itinerary
          </label>

          <textarea
            name="itinerary"
            defaultValue={initialData?.itinerary ?? ""}
            rows={6}
            className="w-full rounded-lg border p-3"
          />
        </div>

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
      </div>
    </div>
  );
}