import { CalendarDays } from "lucide-react";

interface Props {
  itinerary: string | null;
}

export default function PackageItinerary({
  itinerary,
}: Props) {
  if (!itinerary?.trim()) {
    return null;
  }

  const items = itinerary
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <section className="bg-white rounded-2xl shadow-sm p-8">

      <h2 className="text-2xl font-bold mb-8">
        Travel Itinerary
      </h2>

      <div className="relative">

        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-emerald-200" />

        <div className="space-y-8">

          {items.map((item, index) => (
            <div
              key={index}
              className="relative flex gap-5"
            >
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow">
                <CalendarDays size={18} />
              </div>

              <div className="flex-1 rounded-xl border bg-gray-50 p-5">
                <h3 className="font-semibold text-emerald-700 mb-2">
                  Day {index + 1}
                </h3>

                <p className="leading-7 text-gray-700">
                  {item}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}