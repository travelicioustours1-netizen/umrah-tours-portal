import Link from "next/link";
import { notFound } from "next/navigation";

import { getPromotionById } from "@/lib/promotion-service";
import PromotionForm from "@/components/admin/promotion/PromotionForm";

interface EditPromotionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPromotionPage({
  params,
}: EditPromotionPageProps) {
  const { id } = await params;

  const promotion =
    await getPromotionById(id);

  if (!promotion) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Edit Promotion
          </h1>

          <p className="text-gray-500">
            Update your promotional flyer and
            promotion details.
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
      <PromotionForm
        initialData={{
          id: promotion.id,
          title: promotion.title,
          description: promotion.description,
          imageUrl: promotion.imageUrl,
          buttonText: promotion.buttonText,
          whatsappUrl: promotion.whatsappUrl,
          isActive: promotion.isActive,
          displayOrder: promotion.displayOrder,
          startDate: promotion.startDate,
          endDate: promotion.endDate,
        }}
      />
    </div>
  );
}