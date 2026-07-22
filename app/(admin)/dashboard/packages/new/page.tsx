import { prisma } from "@/lib/prisma";
import PackageForm from "@/components/admin/PackageForm";

export default async function NewPackagePage() {
  const airlines = await prisma.airline.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const hotels = await prisma.hotel.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Create New Package
      </h1>

      <PackageForm
        airlines={airlines}
        hotels={hotels}
      />
    </div>
  );
}