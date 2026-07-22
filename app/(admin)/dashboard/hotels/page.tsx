import Link from "next/link";
import { prisma } from "@/lib/prisma";
import HotelTable from "@/components/admin/HotelTable";

export default async function HotelsPage() {

  const hotels = await prisma.hotel.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Hotels
          </h1>

          <p className="text-gray-500">
            Manage hotel suppliers
          </p>
        </div>

        <Link
          href="/dashboard/hotels/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          + Add Hotel
        </Link>

      </div>

      <HotelTable hotels={hotels} />

    </div>
  );
}