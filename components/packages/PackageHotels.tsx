import Image from "next/image";
import { Building2, MapPin, Star } from "lucide-react";

interface HotelImage {
  id?: string;
  url: string;
}

interface Hotel {
  id: string;
  name: string;
  city: string;
  stars: number;
  distance?: string | null;
  thumbnail?: string | null;
  images?: HotelImage[];
}

interface Props {
  makkahHotel: Hotel | null;
  madinahHotel: Hotel | null;
}

export default function PackageHotels({
  makkahHotel,
  madinahHotel,
}: Props) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold">
        Accommodation
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <HotelCard
          title="Makkah"
          hotel={makkahHotel}
        />

        <HotelCard
          title="Madinah"
          hotel={madinahHotel}
        />
      </div>
    </section>
  );
}

function HotelCard({
  title,
  hotel,
}: {
  title: string;
  hotel: Hotel | null;
}) {
  if (!hotel) {
    return (
      <div className="rounded-xl border bg-gray-50 p-6">
        <h3 className="mb-2 text-lg font-semibold">
          {title}
        </h3>

        <p className="text-gray-500">
          Hotel not assigned.
        </p>
      </div>
    );
  }

  const image =
    hotel.thumbnail ||
    hotel.images?.[0]?.url ||
    "/images/hotel-placeholder.jpg";

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="relative h-56">
        <Image
          src={image}
          alt={hotel.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">
              {hotel.name}
            </h3>

            <p className="text-gray-500">
              {hotel.city}
            </p>
          </div>

          <div className="flex">
            {Array.from({
              length: hotel.stars,
            }).map((_, index) => (
              <Star
                key={index}
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>

        {hotel.distance && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} />
            <span>{hotel.distance}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-emerald-600">
          <Building2 size={16} />
          <span>{title} Accommodation</span>
        </div>
      </div>
    </div>
  );
}