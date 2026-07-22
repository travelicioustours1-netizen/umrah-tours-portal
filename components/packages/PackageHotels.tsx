import Image from "next/image";
import { Building2, MapPin, Star } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  city: string;
  stars: number;
  distance: string | null;
  thumbnail: string | null;
  images: {
    id: string;
    url: string;
  }[];
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
    <section className="bg-white rounded-2xl shadow-sm p-8">

      <h2 className="text-2xl font-bold mb-8">
        Accommodation
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

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
      <div className="border rounded-xl p-6 bg-gray-50">
        <h3 className="font-semibold text-lg mb-2">
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
    hotel.images[0]?.url ||
    "/images/hotel-placeholder.jpg";

  return (
    <div className="overflow-hidden rounded-xl border bg-white">

      <div className="relative h-56">

        <Image
          src={image}
          alt={hotel.name}
          fill
          className="object-cover"
          sizes="(max-width:768px)100vw,50vw"
        />

      </div>

      <div className="p-5 space-y-3">

        <div className="flex justify-between items-start">

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

            {hotel.distance}

          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-emerald-600">

          <Building2 size={16} />

          {title} Accommodation

        </div>

      </div>

    </div>
  );
}