"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe2, MessageCircle, Sparkles } from "lucide-react";

interface PackageImage {
  id: string;
  url: string;
  alt?: string | null;
}

interface Props {
  title: string;
  images: PackageImage[];
  price?: number;
}

function getDestination(title: string) {
  const value = title.toLowerCase();

  if (value.includes("azerbaijan")) return "Azerbaijan";
  if (value.includes("georgia")) return "Georgia";
  if (value.includes("dubai")) return "Dubai";

  return "International Holiday";
}

export default function PackageHero({
  title,
  images,
  price,
}: Props) {
  const fallback = "/images/package-placeholder.jpg";

  const gallery =
    images.length > 0
      ? images
      : [
          {
            id: "placeholder",
            url: fallback,
            alt: title,
          },
        ];

  const [selected, setSelected] = useState(0);

  const activeImage = gallery[selected] ?? gallery[0];

  const destination = getDestination(title);

  const whatsappNumber = "919797127500";

  const whatsappMessage = encodeURIComponent(
    `Assalamu Alaikum,

I'm interested in the ${title}.

Please share the availability, travel dates, complete package details and booking procedure.

Thank you.`
  );

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="space-y-4">

      {/* Main Hero */}
      <div className="relative h-[520px] overflow-hidden rounded-2xl">

        <Image
          src={activeImage.url}
          alt={activeImage.alt || title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Destination Badge */}
        <div className="absolute left-6 top-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
            <Globe2 size={16} />
            {destination}
          </div>
        </div>

        {/* Featured Label */}
        <div className="absolute right-6 top-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
            <Sparkles size={14} />
            International Holiday
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">

          <div className="max-w-4xl">

            <p className="text-sm font-semibold uppercase tracking-[4px] text-emerald-300">
              Explore {destination}
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">

              {price != null && (
                <div className="rounded-xl bg-white/95 px-5 py-3 shadow-lg">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Starting From
                  </p>

                  <p className="text-2xl font-bold text-emerald-600">
                    AED {price.toLocaleString("en-AE")}
                  </p>

                  <p className="text-xs text-gray-500">
                    Per Person
                  </p>
                </div>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white shadow-lg transition hover:bg-green-700"
              >
                <MessageCircle size={20} />
                Check Availability
              </a>

            </div>

          </div>
        </div>
      </div>

      {/* Gallery */}
      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">

          {gallery.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`View image ${index + 1}`}
              className={`relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                selected === index
                  ? "border-emerald-600"
                  : "border-transparent"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || title}
                fill
                className="object-cover"
                sizes="128px"
              />
            </button>
          ))}

        </div>
      )}

    </section>
  );
}