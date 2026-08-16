import { getPackageFilters } from "@/lib/filter-service";
import { getPackages } from "@/lib/package-service";
import PackageCard from "@/components/packages/PackageCard";
import PackageFilters from "@/components/packages/PackageFilters";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";

interface Props {
  searchParams: Promise<{
    search?: string;
    category?: string;
    departureCity?: string;
    airline?: string;
    featured?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function UmrahPackagesPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const [result, filters] = await Promise.all([
    getPackages({
      search: params.search,
      category: "economy",
      departureCity: params.departureCity,
      airlineId: params.airline,
      featured:
        params.featured === "true"
          ? true
          : undefined,
      sort: params.sort as
        | "departure"
        | "price-low"
        | "price-high"
        | "newest"
        | undefined,
      page: Number(params.page ?? 1),
    }),

    getPackageFilters(),
  ]);

  return (
    <main className="bg-gray-50">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h1 className="text-4xl font-bold">
            Umrah Packages
          </h1>

          <p className="mt-2 text-gray-600">
            Discover our premium Umrah packages with
            flights, hotels and guided services.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <PackageFilters filters={filters} />

        <div className="mb-6 mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold">
              {result.packages.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold">
              {result.total}
            </span>{" "}
            packages
          </p>
        </div>

        {result.packages.length === 0 ? (
          <EmptyState
            title="No packages found"
            description="Try adjusting your search or filters."
            actionHref="/umrah"
            actionLabel="Clear Filters"
          />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {result.packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
              />
            ))}
          </div>
        )}

        <div className="mt-10">
          <Pagination
            page={result.page}
            totalPages={result.totalPages}
          />
        </div>
      </section>
    </main>
  );
}