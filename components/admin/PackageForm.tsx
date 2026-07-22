"use client";

import { createPackage, updatePackage } from "@/lib/actions/package";

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
    <form action={action} className="space-y-8">
      <BasicInfoSection
        initialData={initialData}
        airlines={airlines}
      />

      <TravelSection initialData={initialData} />

      <PricingSection initialData={initialData} />

      <ContentSection initialData={initialData} />

      <MediaSection initialData={initialData} />

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
        >
          {initialData ? "Update Package" : "Create Package"}
        </button>
      </div>
    </form>
  );
}