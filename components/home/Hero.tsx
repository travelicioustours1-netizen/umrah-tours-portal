import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[680px] overflow-hidden md:min-h-[760px]">
      {/* Background Image */}
      <Image
        src="/images/hero/umrah-hero.jpg"
        alt="Umrah Tours - Umrah and International Holiday Travel"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[680px] items-center md:min-h-[760px]">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="max-w-5xl text-white">

            {/* Eyebrow */}
            <p className="mb-5 text-sm font-semibold uppercase tracking-[5px] text-emerald-300 md:text-base">
              Premium Umrah & Holiday Experiences
            </p>

            {/* Main Heading */}
            <h1 className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Your Trusted Partner For
              <span className="text-emerald-400"> Umrah</span>
              <br />
              & International Holidays
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
              Complete travel solutions including Umrah packages, visa
              assistance, flights, hotels, transportation and customized
              holiday experiences.
            </p>

            {/* Main CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/umrah"
                className="rounded-lg bg-emerald-600 px-7 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >
                Explore Umrah Packages
              </Link>

              <Link
                href="/holidays"
                className="rounded-lg bg-white px-7 py-4 font-semibold text-gray-900 transition hover:bg-gray-100"
              >
                Explore Holidays
              </Link>

              <Link
                href="/contact"
                className="rounded-lg border border-white px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Get a Quote
              </Link>

              <Link
                href="/visa"
                className="rounded-lg border border-emerald-300 px-7 py-4 font-semibold text-emerald-300 transition hover:bg-emerald-300 hover:text-gray-900"
              >
                Visa Services
              </Link>
            </div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-200 md:text-base">
              <div>✓ Trusted Umrah Experts</div>
              <div>✓ Visa Assistance</div>
              <div>✓ Hotels & Transport</div>
              <div>✓ Customized Holidays</div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}