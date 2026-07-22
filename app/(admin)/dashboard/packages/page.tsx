import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PackageTable from "@/components/admin/PackageTable";

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    include: {
      airline: true,
      makkahHotel: true,
      madinahHotel: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const rows = packages.map((pkg) => ({
    id: pkg.id,
    packageCode: pkg.packageCode,
    title: pkg.title,
    airline: pkg.airline?.name ?? "-",
    makkahHotel: pkg.makkahHotel?.name ?? "-",
    madinahHotel: pkg.madinahHotel?.name ?? "-",
    duration: pkg.duration,
    departureCity: pkg.departureCity ?? "-",
    price: pkg.price,
    quadPrice: pkg.quadPrice,
    triplePrice: pkg.triplePrice,
    doublePrice: pkg.doublePrice,
    singlePrice: pkg.singlePrice,
    status: pkg.status,
    featured: pkg.featured,
    createdAt: pkg.createdAt,
  }));

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Packages
          </h1>

          <p className="text-gray-500">
            Manage Umrah and Holiday Packages
          </p>
        </div>

        <Link
          href="/dashboard/packages/new"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          + Add Package
        </Link>

      </div>

      <div className="flex items-center justify-between">

        <input
          type="search"
          placeholder="Search packages..."
          className="w-80 rounded-lg border p-3"
        />

      </div>

      <PackageTable packages={rows} />

    </div>
  );
}