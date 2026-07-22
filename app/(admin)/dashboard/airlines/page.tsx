import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AirlineTable from "@/components/admin/AirlineTable";

export default async function AirlinesPage() {
  const airlines = await prisma.airline.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Airlines
          </h1>

          <p className="text-gray-500">
            Manage airline companies
          </p>
        </div>

        <Link
          href="/dashboard/airlines/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          + Add Airline
        </Link>

      </div>

      <AirlineTable airlines={airlines} />

    </div>
  );
}