import type { Metadata } from "next";
import Script from "next/script";
import {
  Car,
  Bike,
  CheckCircle,
  Globe2,
  ShieldCheck,
  Search,
  MapPin,
} from "lucide-react";

const SITE_URL = "https://umrahtours.co";

export const metadata: Metadata = {
  title: "Car Rentals",
  description:
    "Compare and search rental cars from leading travel providers including Localrent, EconomyBookings, QEEQ, Auto Europe and GetRentacar.",
  keywords: [
    "car rental",
    "car rental UAE",
    "car rental Dubai",
    "Dubai car rental",
    "rental cars",
    "EconomyBookings",
    "QEEQ",
    "Auto Europe",
    "GetRentacar",
    "Localrent",
    "Umrah Tours",
  ],
  alternates: {
    canonical: `${SITE_URL}/car-rentals`,
  },
  openGraph: {
    title: "Car Rentals | Umrah Tours",
    description:
      "Compare rental cars and find convenient car rental options for your next journey.",
    url: `${SITE_URL}/car-rentals`,
    siteName: "Umrah Tours",
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Car Rentals | Umrah Tours",
    description:
      "Search rental cars from leading travel providers with Umrah Tours.",
  },
};

export default function CarRentalsPage() {
  return (
    <main className="bg-gray-50">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-gray-950 to-gray-900" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Car size={17} />
              Car Rentals
            </div>

            <p className="mt-6 uppercase tracking-[5px] text-emerald-300">
              Drive With Freedom
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl">
              Find Your Perfect
              <span className="block text-emerald-300">
                Rental Car
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
              Search rental cars from trusted travel providers and find
              convenient options for your holidays, business trips and
              journeys around the world.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#car-rental-search"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
              >
                <Search size={18} />
                Search Rental Cars
              </a>

              <a
                href="#providers"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                View Providers
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST BAR
      ========================================================== */}
      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-3">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
              <Globe2 size={24} />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Worldwide Options
              </p>
              <p className="text-sm text-gray-500">
                Rental cars in destinations worldwide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
              <Search size={24} />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Compare Options
              </p>
              <p className="text-sm text-gray-500">
                Explore different rental providers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
              <ShieldCheck size={24} />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Flexible Travel
              </p>
              <p className="text-sm text-gray-500">
                Choose the option that suits your journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN CAR RENTAL SEARCH
      ========================================================== */}
      <section
        id="car-rental-search"
        className="scroll-mt-24 py-16 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-600">
              Search Rental Cars
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Start Your Car Rental Search
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Search available rental cars using our partner booking tools.
              Enter your destination and travel details to explore available
              options.
            </p>
          </div>

          {/* Localrent — Rental Cars Search Form */}
          <div className="rounded-2xl bg-white p-4 shadow-lg md:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <MapPin size={22} />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Search Rental Cars
                </h3>
                <p className="text-sm text-gray-500">
                  Find a vehicle for your destination
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl">
              <Script
                src="https://tpemb.com/content?trs=571731&shmarker=775245&locale=en&default_pick_up_location=Dubai%20Airport%20T3&default_drop_off_location=Dubai%20Deira&powered_by=true&border_radius=5&plain=true&show_logo=true&color_background=%23ffca28&color_button=%2355a539&color_text=%23000000&color_input_text=%23000000&color_button_text=%23ffffff&promo_id=4480&campaign_id=10"
                strategy="afterInteractive"
                charSet="utf-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROVIDERS
      ========================================================== */}
      <section id="providers" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-600">
              Our Rental Partners
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Explore More Car Rental Options
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Explore rental options from multiple providers to find the
              vehicle and destination that best matches your plans.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* =====================================================
                LOCALRENT — WHITE LABEL
            ====================================================== */}
            <div className="rounded-2xl border bg-gray-50 p-5 shadow-sm">
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                    <Car size={22} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Localrent.com
                    </h3>
                    <p className="text-sm text-gray-500">
                      White Label Rental Cars
                    </p>
                  </div>
                </div>
              </div>

              <div className="min-h-[220px] overflow-hidden rounded-xl bg-white">
                <Script
                  src="https://tpemb.com/content?trs=571731&shmarker=775245&locale=en&country=14&city=62821&powered_by=true&campaign_id=87&promo_id=2466"
                  strategy="afterInteractive"
                  charSet="utf-8"
                />
              </div>
            </div>

            {/* =====================================================
                GETRENTACAR
            ====================================================== */}
            <div className="rounded-2xl border bg-gray-50 p-5 shadow-sm">
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                    <Car size={22} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      GetRentacar.com
                    </h3>
                    <p className="text-sm text-gray-500">
                      Rental Cars Search Form
                    </p>
                  </div>
                </div>
              </div>

              <div className="min-h-[220px] overflow-hidden rounded-xl bg-white">
                <Script
                  src="https://tp.media/content?campaign_id=222&promo_id=8813&shmarker=775245&trs=571731"
                  strategy="afterInteractive"
                  charSet="utf-8"
                />
              </div>
            </div>

            {/* =====================================================
                ECONOMYBOOKINGS
            ====================================================== */}
            <div className="rounded-2xl border bg-gray-50 p-5 shadow-sm">
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                    <Car size={22} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      EconomyBookings.com
                    </h3>
                    <p className="text-sm text-gray-500">
                      Rental Cars
                    </p>
                  </div>
                </div>
              </div>

              <div className="min-h-[220px] overflow-hidden rounded-xl bg-white">
                <Script
                  src="https://tpemb.com/content?trs=571731&shmarker=775245&locale=en&width=100&height=100&powered_by=true&campaign_id=10&promo_id=2082"
                  strategy="afterInteractive"
                  charSet="utf-8"
                />
              </div>
            </div>

            {/* =====================================================
                QEEQ
            ====================================================== */}
            <div className="rounded-2xl border bg-gray-50 p-5 shadow-sm">
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                    <Car size={22} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      QEEQ
                    </h3>
                    <p className="text-sm text-gray-500">
                      Rental Cars Search Form
                    </p>
                  </div>
                </div>
              </div>

              <div className="min-h-[220px] overflow-hidden rounded-xl bg-white">
                <Script
                  src="https://tpemb.com/content?trs=571731&shmarker=775245&locale=en&powered_by=true&campaign_id=172&promo_id=4850"
                  strategy="afterInteractive"
                  charSet="utf-8"
                />
              </div>
            </div>

            {/* =====================================================
                AUTO EUROPE
            ====================================================== */}
            <div className="rounded-2xl border bg-gray-50 p-5 shadow-sm lg:col-span-2">
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                    <Car size={22} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Auto Europe
                    </h3>
                    <p className="text-sm text-gray-500">
                      Rental Cars — Europe & UK
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl bg-white">
                <Script
                  src="https://tpemb.com/content?trs=571731&shmarker=775245&locale=en&default_pick_up_location=DXB&powered_by=true&border_radius=5&plain=true&show_logo=true&color_background=%23ffca28&color_button=%2355a539&promo_id=4362&campaign_id=143"
                  strategy="afterInteractive"
                  charSet="utf-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LOCALRENT SECOND WIDGET
      ========================================================== */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-600">
                Localrent
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                More Local Rental Options
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                Explore another Localrent rental search experience for
                destinations and vehicles available through the platform.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border bg-gray-50 p-3">
              <Script
                src="https://tpemb.com/content?trs=571731&shmarker=775245&locale=en&country=14&city=62821&powered_by=true&campaign_id=87&promo_id=2466"
                strategy="afterInteractive"
                charSet="utf-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BIKES
      ========================================================== */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border bg-gray-50 p-6 shadow-sm md:p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Bike size={28} />
              </div>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[4px] text-emerald-600">
                Alternative Mobility
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                Rental Bikes
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                Prefer two wheels? Explore rental bike options through
                BikesBooking.com.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl bg-white">
              <Script
                src="https://tpemb.com/content?trs=571731&shmarker=775245&locale=en&default_pick_up_location=Dubai&powered_by=true&border_radius=5&plain=true&color_background=%23ffffff&color_button=%235080c5&promo_id=5472&campaign_id=57"
                strategy="afterInteractive"
                charSet="utf-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BENEFITS
      ========================================================== */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-600">
              Travel With Confidence
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Make Your Journey More Flexible
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <CheckCircle className="text-emerald-600" size={28} />

              <h3 className="mt-4 font-bold text-gray-900">
                Choose Your Vehicle
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Explore different vehicle types and rental options based on
                your destination and travel requirements.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <CheckCircle className="text-emerald-600" size={28} />

              <h3 className="mt-4 font-bold text-gray-900">
                Convenient Pickup
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Search for rental options that fit your preferred pickup
                location and travel schedule.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <CheckCircle className="text-emerald-600" size={28} />

              <h3 className="mt-4 font-bold text-gray-900">
                Travel Independently
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Enjoy greater flexibility when exploring your destination by
                having your own rental vehicle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}
      <section className="bg-emerald-700 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-200">
            Plan Your Journey
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Ready to Hit the Road?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-50">
            Search rental cars and explore mobility options for your next
            holiday, business trip or international adventure.
          </p>

          <a
            href="#car-rental-search"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-emerald-700 transition hover:bg-gray-100"
          >
            <Car size={18} />
            Search Rental Cars
          </a>
        </div>
      </section>
    </main>
  );
}
