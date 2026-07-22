import Image from "next/image";
import { Plane, Hash, MapPin } from "lucide-react";

interface Airline {
  id: string;
  name: string;
  code: string | null;
  logo: string | null;
}

interface Props {
  airline: Airline | null;
  flightNumber: string | null;
  departureCity: string | null;
}

export default function PackageAirline({
  airline,
  flightNumber,
  departureCity,
}: Props) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-8">
      <h2 className="text-2xl font-bold mb-6">
        Flight Information
      </h2>

      {!airline ? (
        <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
          Airline information is not available.
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-6 p-6">

            <div className="relative h-20 w-40 flex-shrink-0">
              {airline.logo ? (
                <Image
                  src={airline.logo}
                  alt={airline.name}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
                  <Plane className="h-10 w-10 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex-1 grid gap-4 md:grid-cols-3">

              <div>
                <p className="text-sm text-gray-500">
                  Airline
                </p>

                <p className="font-semibold text-lg">
                  {airline.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Airline Code
                </p>

                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-emerald-600" />
                  <span>{airline.code || "-"}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Flight Number
                </p>

                <div className="flex items-center gap-2">
                  <Plane className="h-4 w-4 text-emerald-600" />
                  <span>{flightNumber || "-"}</span>
                </div>
              </div>

            </div>
          </div>

          {departureCity && (
            <div className="border-t bg-gray-50 px-6 py-4 flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="h-4 w-4 text-emerald-600" />
              Departure from <strong>{departureCity}</strong>
            </div>
          )}
        </div>
      )}
    </section>
  );
}