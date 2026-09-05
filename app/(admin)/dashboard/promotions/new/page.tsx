import Link from "next/link";

import PromotionForm from "@/components/admin/promotion/PromotionForm";

export default function NewPromotionPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Add Promotion
          </h1>

          <p className="text-gray-500">
            Upload a promotional flyer and add
            its details.
          </p>
        </div>

        <Link
          href="/dashboard/promotions"
          className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          ← Back to Promotions
        </Link>
      </div>

      {/* Form */}
      <PromotionForm />
    </div>
  );
}