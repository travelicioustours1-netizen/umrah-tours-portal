import { Plane, CalendarDays, Hash, Info } from "lucide-react";

interface Airline {
  name: string;
  logo?: string | null;
}

interface PackageFlightProps {
  airline: Airline | null;
  flightNumber?: string | null;
  departureDate?: Date | string | null;
  returnDate?: Date | string | null;
}

function formatDate(date?: Date | string | null) {
  if (!date) return "To Be Announced";

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return "To Be Announced";
  }

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PackageFlight({
  airline,
  flightNumber,
  departureDate,
  returnDate,
}: PackageFlightProps) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm border">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-full bg-emerald-100 p-3">
          <Plane className="h-6 w-6 text-emerald-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Flight Information
          </h2>

          <p className="text-sm text-gray-500">
            Flight schedule for this package
          </p>
        </div>
      </div>

      {airline || flightNumber || departureDate || returnDate ? (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Airline */}

          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2 text-emerald-600">
              <Plane className="h-5 w-5" />

              <span className="font-semibold">
                Airline
              </span>
            </div>

            <p className="text-lg font-bold">
              {airline?.name ?? "To Be Announced"}
            </p>
          </div>

          {/* Flight Number */}

          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2 text-emerald-600">
              <Hash className="h-5 w-5" />

              <span className="font-semibold">
                Flight Number
              </span>
            </div>

            <p className="text-lg font-bold">
              {flightNumber || "To Be Announced"}
            </p>
          </div>

          {/* Departure */}

          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2 text-emerald-600">
              <CalendarDays className="h-5 w-5" />

              <span className="font-semibold">
                Departure
              </span>
            </div>

            <p className="text-lg font-bold">
              {formatDate(departureDate)}
            </p>
          </div>

          {/* Return */}

          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2 text-emerald-600">
              <CalendarDays className="h-5 w-5" />

              <span className="font-semibold">
               Return
              </span>
            </div>

            <p className="text-lg font-bold">
              {formatDate(returnDate)}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <Info className="mx-auto mb-4 h-10 w-10 text-emerald-600" />

          <h3 className="mb-2 text-xl font-semibold">
            Flight Details Coming Soon
          </h3>

          <p className="text-gray-600">
            Flight schedules are finalized closer to the departure date.
            Confirmed airline, flight numbers, and timings will be shared with
            all travelers before departure.
          </p>
        </div>
      )}

      <div className="mt-8 rounded-xl bg-emerald-50 p-5">
        <h3 className="mb-3 font-semibold text-emerald-700">
          Package Includes
        </h3>

        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ Economy Class Return Airfare</li>
          <li>✓ Airport Transfers</li>
          <li>✓ Meet & Assist (Subject to Package)</li>
          <li>✓ Flight details confirmed before departure</li>
        </ul>
      </div>
    </section>
  );
}