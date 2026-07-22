"use client";

import { useState } from "react";
import Image from "next/image";

interface PackageImage {
  id: string;
  url: string;
  alt?: string | null;
}

interface Props {
  title: string;
  images: PackageImage[];
}

export default function PackageHero({
  title,
  images,
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

  return (
    <section className="space-y-4">
      <div className="relative h-[500px] overflow-hidden rounded-2xl">
        <Image
          src={activeImage.url}
          alt={activeImage.alt || title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute bottom-8 left-8">
          <h1 className="text-5xl font-bold text-white">
            {title}
          </h1>
        </div>
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {gallery.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelected(index)}
              className={`relative h-24 w-32 overflow-hidden rounded-lg border-2 transition ${
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