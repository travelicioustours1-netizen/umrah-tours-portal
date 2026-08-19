import {
  createPackage,
  updatePackage,
} from "@/lib/actions/package";

import BasicInfoSection from "@/components/admin/package/BasicInfoSection";
import TravelSection from "@/components/admin/package/TravelSection";
import PricingSection from "@/components/admin/package/PricingSection";
import ContentSection from "@/components/admin/package/ContentSection";
import MediaSection from "@/components/admin/package/MediaSection";

interface PackageFormProps {
  initialData?: any;
  airlines: any[];
  hotels: any[];
}

export default function PackageForm({
  initialData,
  airlines,
  hotels,
}: PackageFormProps) {
  const action = initialData
    ? updatePackage.bind(null, initialData.id)
    : createPackage;

  return (
    <form action={action} className="space-y-6">

      <BasicInfoSection
        initialData={initialData}
        airlines={airlines}
      />

      {/* Package Status */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-2">
          <label
            htmlFor="status"
            className="block text-sm font-semibold text-gray-900"
          >
            Package Status
          </label>

          <p className="mt-1 text-sm text-gray-500">
            Inactive packages are hidden from the public website and sitemap.
          </p>
        </div>

        <select
          id="status"
          name="status"
          defaultValue={initialData?.status || "ACTIVE"}
          className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value="ACTIVE">
            Active
          </option>

          <option value="INACTIVE">
            Inactive
          </option>
        </select>
      </div>

      <TravelSection
        initialData={initialData}
        hotels={hotels}
      />

      <PricingSection
        initialData={initialData}
      />

      <ContentSection
        initialData={initialData}
      />

      <MediaSection
        initialData={initialData}
      />

      <div className="flex justify-end border-t pt-6">
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          {initialData
            ? "Update Package"
            : "Create Package"}
        </button>
      </div>

    </form>
  );
}