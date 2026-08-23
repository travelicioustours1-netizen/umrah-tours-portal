import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import PackageCard from "@/components/packages/PackageCard";
import { getFeaturedPackages } from "@/lib/package-service";

export default async function FeaturedPackages() {
  const packages = await getFeaturedPackages("UMRAH_ALL");

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles
              size={18}
              className="text-amber-500"
            />

            <p className="text-sm font-semibold uppercase tracking-[3px] text-amber-600">
              Featured Packages
            </p>

            <Sparkles
              size={18}
              className="text-amber-500"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Featured Umrah Packages
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
            Explore our selected Umrah packages with accommodation,
            transportation and travel arrangements designed for a
            comfortable pilgrimage journey.
          </p>
        </div>

        {/* Packages */}
        {packages.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">
              Umrah Packages Coming Soon
            </h3>

            <p className="mt-3 text-gray-600">
              Our latest Umrah packages are being updated.
              Contact our travel team for current availability.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Get a Quote
              <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {/* View All */}
        {packages.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/umrah"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-600 px-7 py-3.5 font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
            >
              View All Umrah Packages
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}