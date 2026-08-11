"use client";

import Link from "next/link";
import {
  CheckCircle,
  Download,
  MessageCircle,
} from "lucide-react";

interface Props {
  pkg: {
    slug: string;
    title: string;
    price: number;
    brochure?: string | null;

    visa: boolean;
    meals: boolean;
    transport: boolean;
  };
}

export default function PackageSidebar({ pkg }: Props) {
  const whatsappNumber = "919797127500";

  const whatsappMessage = encodeURIComponent(
    `Assalamu Alaikum,

I'm interested in the package:

${pkg.title}

Please send me more information.`
  );

  return (
    <aside className="lg:sticky lg:top-24">

      <div className="bg-white rounded-2xl shadow-lg border p-6 space-y-6">

        <div>

          <p className="text-gray-500 text-sm">
            Starting From
          </p>

          <h2 className="text-4xl font-bold text-emerald-600">
            ₹{pkg.price.toLocaleString("en-IN")}
          </h2>

          <p className="text-sm text-gray-500">
            Per Person
          </p>

        </div>

        <Link
  href={`/booking/${pkg.slug}`}
  className="block w-full rounded-xl bg-emerald-600 py-4 text-center font-semibold text-white hover:bg-emerald-700 transition"
>
  Book Now
</Link>

        <Link
  href={`/booking/${pkg.slug}`}
>
          <MessageCircle size={20} />

          WhatsApp Enquiry
        </Link>

        {pkg.brochure && (
          <Link
            href={pkg.brochure}
            target="_blank"
            className="flex justify-center items-center gap-2 border rounded-xl py-3 hover:bg-gray-50 transition"
          >
            <Download size={18} />

            Download Brochure
          </Link>
        )}

        <div className="border-t pt-5 space-y-3">

          <Feature
            enabled={pkg.visa}
            title="Visa Included"
          />

          <Feature
            enabled={pkg.transport}
            title="Transport Included"
          />

          <Feature
            enabled={pkg.meals}
            title="Meals Included"
          />

        </div>

      </div>

    </aside>
  );
}

function Feature({
  enabled,
  title,
}: {
  enabled: boolean;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle
        className={
          enabled
            ? "text-green-600"
            : "text-gray-300"
        }
        size={20}
      />

      <span>{title}</span>

    </div>
  );
}