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

{/* SEO Settings */}
<div className="rounded-xl border bg-white p-6 shadow-sm">
  <h2 className="mb-6 text-xl font-semibold text-gray-900">
    SEO Settings
  </h2>

  <div className="space-y-5">

    {/* SEO Title */}
    <div>
      <label
        htmlFor="seoTitle"
        className="mb-2 block text-sm font-semibold text-gray-900"
      >
        SEO Title
      </label>

      <input
        id="seoTitle"
        name="seoTitle"
        type="text"
        defaultValue={initialData?.seoTitle || ""}
        placeholder="Georgia Holiday Package from Dubai | Umrah Tours"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      />

      <p className="mt-1 text-xs text-gray-500">
        Used as the page title in search engines and browser tabs.
      </p>
    </div>

    {/* SEO Description */}
    <div>
      <label
        htmlFor="seoDescription"
        className="mb-2 block text-sm font-semibold text-gray-900"
      >
        SEO Description
      </label>

      <textarea
        id="seoDescription"
        name="seoDescription"
        rows={4}
        defaultValue={initialData?.seoDescription || ""}
        placeholder="Discover our Georgia holiday package from Dubai with hotels, sightseeing and travel support."
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      />

      <p className="mt-1 text-xs text-gray-500">
        Recommended length: around 150–160 characters.
      </p>
    </div>

    {/* SEO Keywords */}
    <div>
      <label
        htmlFor="seoKeywords"
        className="mb-2 block text-sm font-semibold text-gray-900"
      >
        SEO Keywords
      </label>

      <input
        id="seoKeywords"
        name="seoKeywords"
        type="text"
        defaultValue={initialData?.seoKeywords || ""}
        placeholder="Georgia holiday, Georgia tour package, Georgia from Dubai"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      />

      <p className="mt-1 text-xs text-gray-500">
        Enter relevant keywords separated by commas.
      </p>
    </div>

  </div>
</div>
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