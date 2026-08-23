import Link from "next/link";
import {
  CheckCircle2,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const whatsappNumber = "971525657940";

const whatsappMessage = encodeURIComponent(
  `Assalamu Alaikum,

I'm interested in the Awwal Umrah Package.

Please share the availability, travel dates, complete package details and booking procedure.

Thank you.`
);

const whatsappUrl =
  `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const highlights = [
  "Premium Accommodation",
  "Full Board Indian Buffet",
  "Unlimited Laundry",
  "Umrah Visa & Insurance",
  "Makkah & Madinah Stay",
];

export default function AwwalPromo() {
  return (
    <section className="bg-emerald-950 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="grid lg:grid-cols-2">

            {/* Promotional Content */}
            <div className="p-6 sm:p-8 md:p-12">
              <div className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2">
                <span className="text-xs font-bold uppercase tracking-[3px] text-emerald-700">
                  Featured Umrah Package
                </span>
              </div>

              <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Awwal Umrah Package
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
                Experience a comfortable and well-organised Umrah journey
                with carefully arranged accommodation, meals and essential
                travel services.
              </p>

              {/* Starting Price */}
              <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <p className="text-sm font-medium text-gray-500">
                  Starting From
                </p>

                <div className="mt-1 flex flex-wrap items-end gap-2">
                  <p className="text-4xl font-bold text-emerald-700 md:text-5xl">
                    AED 1,400
                  </p>

                  <p className="mb-1 text-sm text-gray-500">
                    per person
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  Package Pricing
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Price label="Quad" price="AED 1,400" />
                  <Price label="Triple" price="AED 1,500" />
                  <Price label="Double" price="AED 1,700" />
                  <Price label="Single" price="AED 2,000" />
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition duration-200 hover:bg-green-700 hover:shadow-lg"
                >
                  <MessageCircle size={20} />
                  Enquire on WhatsApp
                </a>

                <Link
                  href="/umrah/awwal-package"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-600 px-6 py-4 font-semibold text-emerald-700 transition duration-200 hover:bg-emerald-50"
                >
                  View Full Package
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Trust / Company */}
              <p className="mt-6 text-xs leading-5 text-gray-500">
                Umrah Tours — An Umrah Division of{" "}
                <span className="font-semibold text-gray-700">
                  AL AFEEF TRAVELS AND TOURS
                </span>
              </p>
            </div>

            {/* Visual / Package Highlights */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 p-8 text-white md:p-12">
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full border border-white/10" />

              <div className="relative flex h-full flex-col justify-center">
                <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-200">
                  Premium Umrah Experience
                </p>

                <h3 className="mt-5 max-w-md text-3xl font-bold leading-tight md:text-4xl">
                  Begin your journey to the Holy Cities with comfort and peace of mind.
                </h3>

                <p className="mt-4 max-w-md leading-7 text-emerald-100">
                  A carefully arranged Umrah package designed to make your
                  journey smoother from accommodation to essential travel
                  arrangements.
                </p>

                <div className="mt-8 space-y-4">
                  {highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2
                        size={20}
                        className="shrink-0 text-emerald-300"
                      />

                      <span className="text-sm font-medium text-white md:text-base">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 inline-flex w-fit items-center rounded-xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm">
                  <span className="text-sm font-semibold text-emerald-100">
                    Starting from AED 1,400 per person
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function Price({
  label,
  price,
}: {
  label: string;
  price: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 transition hover:border-emerald-200 hover:bg-emerald-50">
      <p className="text-xs font-medium text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-gray-900">
        {price}
      </p>
    </div>
  );
}