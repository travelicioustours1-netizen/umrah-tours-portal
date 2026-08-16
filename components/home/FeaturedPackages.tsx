import PackageCard from "@/components/packages/PackageCard";
import { getFeaturedPackages } from "@/lib/package-service";

export default async function FeaturedPackages() {
  const packages = await getFeaturedPackages("economy");

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">
            Featured Umrah Packages
          </h2>

          <p className="text-gray-500 mt-3">
            Best Selling Umrah Packages
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
            />
          ))}
        </div>
      </div>
    </section>
  );
}