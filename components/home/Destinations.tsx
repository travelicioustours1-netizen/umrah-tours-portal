import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const destinations = [
  {
    name: "Makkah",
    description:
      "Experience the spiritual journey of Umrah near Masjid Al Haram.",
    image: "/images/destinations/makkah.jpg",
    href: "/umrah",
    label: "Explore Umrah",
  },
  {
    name: "Madinah",
    description:
      "Visit the blessed city of the Prophet Muhammad (peace be upon him) with comfort and ease.",
    image: "/images/destinations/madinah.jpg",
    href: "/umrah",
    label: "Explore Umrah",
  },
  {
    name: "Dubai",
    description:
      "Discover luxury shopping, adventure and modern attractions.",
    image: "/images/destinations/dubai.jpg",
    href: "/holidays",
    label: "Explore Holidays",
  },
  {
    name: "Turkey",
    description:
      "Explore historical landmarks and beautiful Turkish landscapes.",
    image: "/images/destinations/turkey.jpg",
    href: "/holidays",
    label: "Explore Holidays",
  },
];

export default function Destinations() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <MapPin size={18} className="text-emerald-600" />

            <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
              Popular Destinations
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Explore Beautiful Places
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
            From the holy cities of Makkah and Madinah to exciting
            international destinations, discover travel experiences
            designed around your journey.
          </p>
        </div>

        {/* Destination Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={`${destination.name} travel destination`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <p className="text-2xl font-bold text-white">
                    {destination.name}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex min-h-[190px] flex-col p-5">
                <p className="flex-1 text-sm leading-6 text-gray-600">
                  {destination.description}
                </p>

                <Link
                  href={destination.href}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  {destination.label}
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/holidays"
            className="inline-flex items-center gap-2 font-semibold text-emerald-700 transition hover:text-emerald-800"
          >
            Explore All Holiday Destinations
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}