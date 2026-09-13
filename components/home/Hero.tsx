import Image from "next/image";
import Link from "next/link";
import { CarFront, PlaneTakeoff, Ticket } from "lucide-react";

import HeroWhatsAppButton from "@/components/home/HeroWhatsAppButton";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-emerald-300"
    >
      <path
        d="M5 10.5L8.5 14L15 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
              <HeroWhatsAppButton />

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

              <Link
                href="/promotion"
                className="rounded-lg bg-emerald-500 px-7 py-4 font-semibold text-white shadow-lg transition hover:bg-emerald-600"
              >
                Offers
              </Link>
            </div>

            {/* Travel Services */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-gray-300">
                Travel Services
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/car-rentals"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-black/30 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:border-emerald-300 hover:bg-emerald-600"
                >
                  <CarFront size={18} />
                  Car Rental
                </Link>

                <Link
                  href="/airport-transfers"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-black/30 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:border-emerald-300 hover:bg-emerald-600"
                >
                  <PlaneTakeoff size={18} />
                  Airport Transfers
                </Link>

                <Link
                  href="/tours-activities"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-black/30 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:border-emerald-300 hover:bg-emerald-600"
                >
                  <Ticket size={18} />
                  Activities
                </Link>
              </div>
            </div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-200 md:text-base">
              <div className="inline-flex items-center gap-2">
                <CheckIcon />
                <span>Trusted Umrah Experts</span>
              </div>

              <div className="inline-flex items-center gap-2">
                <CheckIcon />
                <span>Visa Assistance</span>
              </div>

              <div className="inline-flex items-center gap-2">
                <CheckIcon />
                <span>Hotels & Transport</span>
              </div>

              <div className="inline-flex items-center gap-2">
                <CheckIcon />
                <span>Customized Holidays</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
