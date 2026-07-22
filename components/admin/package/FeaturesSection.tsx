interface Props {
  initialData?: {
    visa?: boolean;
    transport?: boolean;
    meals?: boolean;
    featured?: boolean;
  };
}

export default function FeaturesSection({
  initialData,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Package Features
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="visa"
            defaultChecked={initialData?.visa ?? true}
          />
          <span>Visa Included</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="transport"
            defaultChecked={initialData?.transport ?? true}
          />
          <span>Transport</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="meals"
            defaultChecked={initialData?.meals ?? true}
          />
          <span>Meals</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={initialData?.featured ?? false}
          />
          <span>Featured Package</span>
        </label>

      </div>
    </div>
  );
}