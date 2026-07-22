import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import HotelForm from "@/components/admin/HotelForm";

export default async function EditHotelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const hotel = await prisma.hotel.findUnique({
    where: { id },
  });

  if (!hotel) {
    notFound();
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Edit Hotel
      </h1>

      <HotelForm initialData={hotel} />

    </div>
  );
}