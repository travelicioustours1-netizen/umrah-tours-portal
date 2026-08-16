import Link from "next/link";
import { MessageCircle } from "lucide-react";

const whatsappNumber = "971525657940";

const whatsappMessage = encodeURIComponent(
  `Assalamu Alaikum,

I'm interested in the Awwal Umrah Package.

Please share the availability, travel dates, complete package details and booking procedure.

Thank you.`
);

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export default function AwwalPromo() {
  return (
    <section className="bg-emerald-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="grid lg:grid-cols-2">

            {/* Promotional Content */}
            <div className="p-8 md:p-12">

              <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
                Featured Umrah Package
              </p>

              <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
                Awwal Umrah Package
              </h2>

              <p className="mt-4 text-lg text-gray-600">
                Experience a comfortable and well-organised Umrah journey
                with Umrah Tours.
              </p>

              {/* Starting Price */}
              <div className="mt-7">
                <p className="text-sm text-gray-500">
                  Starting From
                </p>

                <p className="text-4xl font-bold text-emerald-600">
                  AED 1,400
                  <span className="ml-2 text-base font-normal text-gray-500">
                    / person
                  </span>
                </p>
              </div>

              {/* Pricing */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <Price label="Quad" price="AED 1,400" />
                <Price label="Triple" price="AED 1,500" />
                <Price label="Double" price="AED 1,700" />
                <Price label="Single" price="AED 2,000" />
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700"
                >
                  <MessageCircle size={20} />
                  WhatsApp Enquiry
                </a>

                <Link
                  href="/umrah/awwal-package"
                  className="flex items-center justify-center rounded-xl border border-emerald-600 px-6 py-4 font-semibold text-emerald-700 transition hover:bg-emerald-50"
                >
                  View Package
                </Link>

              </div>

              {/* Company */}
              <p className="mt-6 text-xs text-gray-500">
                Umrah Tours — An Umrah Division of{" "}
                <span className="font-semibold">
                  AL AFEEF TRAVELS AND TOURS
                </span>
              </p>

            </div>

            {/* Visual Panel */}
            <div className="relative min-h-[320px] bg-gradient-to-br from-emerald-800 to-emerald-950 p-8 text-white md:p-12">

              <div className="flex h-full flex-col justify-center">

                <p className="text-sm uppercase tracking-[3px] text-emerald-200">
                  Premium Umrah Experience
                </p>

                <h3 className="mt-4 text-3xl font-bold md:text-4xl">
                  Begin your journey to the Holy Cities.
                </h3>

                <div className="mt-8 space-y-4 text-sm text-emerald-50">
                  <p>✓ Premium Accommodation</p>
                  <p>✓ Full Board Indian Buffet</p>
                  <p>✓ Unlimited Laundry</p>
                  <p>✓ Umrah Visa & Insurance</p>
                  <p>✓ Makkah & Madinah Stay</p>
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
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="text-gray-500">{label}</p>
      <p className="font-bold text-gray-900">{price}</p>
    </div>
  );
}