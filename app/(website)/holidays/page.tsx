import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle,
  Globe2,
  MessageCircle,
  Plane,
  Sparkles,
} from "lucide-react";
import { getPackages } from "@/lib/package-service";

const whatsappNumber = "971525657940";

function getWhatsAppUrl(title: string) {
  const message = encodeURIComponent(
    `Assalamu Alaikum,

I'm interested in the ${title}.

Please share the availability, travel dates, complete package details and booking procedure.

Thank you.`
  );

  return `https://wa.me/${whatsappNumber}?text=${message}`;
}

export default async function HolidaysPage() {
  const { packages } = await getPackages({
    category: "HOLIDAY",
    limit: 50,
    sort: "newest",
  });

  const featuredPackages = packages.filter(
    (holiday) => holiday.featured
  );

  const regularPackages = packages.filter(
    (holiday) => !holiday.featured
  );

  return (
    <main className="bg-gray-50">

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative min-h-[560px] overflow-hidden">

        <Image
          src="/images/hero/umrah-hero.jpg"
          alt="International holiday destinations"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-20">

          <div className="max-w-3xl text-white">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Globe2 size={17} />
              International Holidays
            </div>

            <p className="mt-6 uppercase tracking-[5px] text-emerald-300">
              Travel Beyond Boundaries
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Explore The World
              <span className="block text-emerald-300">
                With Umrah Tours
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
              Discover carefully selected international holiday packages
              designed for families, couples, friends and groups.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              <a
                href="#holiday-packages"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >
                Explore Packages
                <ArrowRight size={19} />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/50 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-gray-900"
              >
                Plan My Holiday
              </Link>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          INTRO / TRUST BAR
      ========================================================== */}
      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-3">

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
              <Plane size={24} />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                International Flights
              </p>
              <p className="text-sm text-gray-500">
                Convenient flight options
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
              <CheckCircle size={24} />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Handpicked Packages
              </p>
              <p className="text-sm text-gray-500">
                Selected for quality and value
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
              <Globe2 size={24} />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Travel Assistance
              </p>
              <p className="text-sm text-gray-500">
                Support throughout your journey
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================
          HOLIDAY PACKAGES
      ========================================================== */}
      <section
        id="holiday-packages"
        className="py-20"
      >
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">

            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[4px] text-emerald-600">
              <Sparkles size={16} />
              Our Collection
            </div>

            <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
              International Holiday Packages
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              From relaxing escapes to exciting city adventures, find the
              right holiday for your next journey.
            </p>

          </div>


          {/* =====================================================
              NO PACKAGES
          ====================================================== */}
          {packages.length === 0 ? (

            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Globe2 size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Holiday Packages Coming Soon
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-gray-600">
                Our holiday collection is currently being updated.
                Contact our travel experts for a customized international
                holiday.
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Enquire Now
                <ArrowRight size={18} />
              </Link>

            </div>

          ) : (

            <>

              {/* =================================================
                  FEATURED PACKAGES
              ================================================== */}
              {featuredPackages.length > 0 && (

                <div className="mb-16">

                  <div className="mb-7 flex items-center justify-between">

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                        Featured
                      </p>

                      <h3 className="mt-2 text-3xl font-bold text-gray-900">
                        Recommended Holidays
                      </h3>
                    </div>

                  </div>

                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {featuredPackages.map((holiday) => (
                      <HolidayCard
                        key={holiday.id}
                        holiday={holiday}
                        featured
                      />
                    ))}

                  </div>

                </div>

              )}


              {/* =================================================
                  ALL PACKAGES
              ================================================== */}
              {regularPackages.length > 0 && (

                <div>

                  <div className="mb-7">

                    <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                      Explore
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-gray-900">
                      More Holiday Packages
                    </h3>

                  </div>

                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {regularPackages.map((holiday) => (
                      <HolidayCard
                        key={holiday.id}
                        holiday={holiday}
                      />
                    ))}

                  </div>

                </div>

              )}

            </>
          )}

        </div>
      </section>


      {/* =========================================================
          CUSTOM HOLIDAY CTA
      ========================================================== */}
      <section className="bg-emerald-950 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-950 p-8 text-white shadow-2xl md:p-14">

            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-300">
                  Can't Find What You're Looking For?
                </p>

                <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                  Let Us Plan Your Dream Holiday
                </h2>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50">
                  Tell us your destination, travel dates, number of
                  travellers and budget. Our travel team will create a
                  suitable holiday option for you.
                </p>

              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-emerald-900 transition hover:bg-gray-100"
                >
                  Get a Quote
                  <ArrowRight size={18} />
                </Link>

                <a
                  href={getWhatsAppUrl("a customized international holiday")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-4 font-semibold text-white transition hover:bg-green-700"
                >
                  <MessageCircle size={19} />
                  WhatsApp Us
                </a>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          HOLIDAY SERVICES
      ========================================================== */}
      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-600">
              Travel Support
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-900">
              Everything You Need For Your Holiday
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              From flights and hotels to transfers and customized tours,
              our team can help arrange your complete holiday.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <ServiceCard
              icon={<Plane size={28} />}
              title="Flight Booking"
              description="International flight options tailored to your travel dates."
            />

            <ServiceCard
              icon={<Globe2 size={28} />}
              title="Hotel Reservation"
              description="Comfortable accommodation selected for your destination."
            />

            <ServiceCard
              icon={<CalendarDays size={28} />}
              title="Custom Holidays"
              description="Flexible itineraries designed around your preferences."
            />

          </div>

        </div>
      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="bg-gray-100 py-16 text-center">

        <div className="mx-auto max-w-3xl px-6">

          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Ready For Your Next Adventure?
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            Start planning your international holiday with Umrah Tours.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Start Planning
              <ArrowRight size={18} />
            </Link>

            <a
              href={getWhatsAppUrl("an international holiday")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-600 bg-white px-8 py-4 font-semibold text-green-700 transition hover:bg-green-50"
            >
              <MessageCircle size={19} />
              WhatsApp Enquiry
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}


/* ===============================================================
   HOLIDAY CARD
================================================================ */

function HolidayCard({
  holiday,
  featured = false,
}: {
  holiday: any;
  featured?: boolean;
}) {
  const image =
    holiday.images?.[0]?.url ||
    "/images/package-placeholder.jpg";

  const whatsappUrl = getWhatsAppUrl(holiday.title);

  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Image */}
      <div className="relative h-72 overflow-hidden">

        <Image
          src={image}
          alt={holiday.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />


        {/* Featured */}
        {featured && (
          <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
            <Sparkles size={13} />
            Featured
          </div>
        )}


        {/* Duration */}
        {holiday.duration && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-2 text-sm font-medium text-white backdrop-blur">
            <CalendarDays size={15} />
            {holiday.duration}
          </div>
        )}

      </div>


      {/* Content */}
      <div className="p-6">

        <p className="text-xs font-semibold uppercase tracking-[2px] text-emerald-600">
          International Holiday
        </p>

        <h2 className="mt-2 min-h-[58px] text-2xl font-bold leading-tight text-gray-900">
          {holiday.title}
        </h2>


        {/* Description */}
        {holiday.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
            {holiday.description}
          </p>
        )}


        {/* Price */}
        <div className="mt-5 border-t pt-5">

          <p className="text-sm text-gray-500">
            Starting From
          </p>

          <div className="mt-1 flex items-end justify-between gap-3">

            <div>

              <p className="text-3xl font-bold text-emerald-600">
                AED{" "}
                {Number(holiday.price || 0).toLocaleString("en-AE")}
              </p>

              <p className="text-xs text-gray-500">
                Per Person
              </p>

            </div>

          </div>

        </div>


        {/* Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">

          <Link
            href={`/holidays/${holiday.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            View Holiday
            <ArrowRight size={16} />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-600 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>

        </div>

      </div>

    </article>
  );
}


/* ===============================================================
   SERVICE CARD
================================================================ */

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-gray-600">
        {description}
      </p>

    </div>
  );
}