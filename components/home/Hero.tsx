import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero/umrah-hero.jpg"
        alt="Umrah Tours"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-6 text-white">
          <p className="mb-5 uppercase tracking-[6px] text-emerald-300">
            Premium Umrah & Holiday Experiences
          </p>

          <h1 className="max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
            Your Trusted Partner For
            <span className="text-emerald-400"> Umrah</span>
            <br />
            & International Holidays
          </h1>

          <p className="mt-6 max-w-2xl text-xl text-gray-200">
            Complete travel solutions including Umrah packages, visa
            assistance, flights, hotels, transportation and customized
            holiday experiences.
          </p>

          {/* Main Navigation Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/umrah"
              className="rounded-lg bg-emerald-600 px-7 py-4 font-semibold transition hover:bg-emerald-700"
            >
              Umrah Packages
            </Link>

            <Link
              href="/holidays"
              className="rounded-lg bg-white px-7 py-4 font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Holidays
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-white px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Contact Us
            </Link>

            <Link
              href="/visa"
              className="rounded-lg border border-emerald-300 px-7 py-4 font-semibold text-emerald-300 transition hover:bg-emerald-300 hover:text-gray-900"
            >
              Visas
            </Link>
          </div>

          {/* Trust Points */}
          <div className="mt-12 flex flex-wrap gap-8 text-sm text-gray-200">
            <div>🕋 Trusted Umrah Experts</div>

            <div>🛂 Visa Assistance</div>

            <div>🏨 Hotel & Transport</div>
          </div>
        </div>
      </div>
    </section>
  );
}