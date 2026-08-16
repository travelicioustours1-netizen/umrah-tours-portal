import {
  CalendarDays,
  MapPin,
  Clock3,
  ChevronRight,
} from "lucide-react";

interface Props {
  itinerary?: string | null;
  title?: string | null;
}

function getDestination(title?: string | null) {
  if (!title) return "Holiday";

  return title
    .replace(/\brelaxation\b/gi, "")
    .replace(/\bholiday\b/gi, "")
    .replace(/\bpackage\b/gi, "")
    .replace(/\btour\b/gi, "")
    .replace(/\btravel\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseItinerary(itinerary: string) {
  const lines = itinerary
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const days: {
    day: string;
    title: string;
    details: string[];
  }[] = [];

  let current:
    | {
        day: string;
        title: string;
        details: string[];
      }
    | null = null;

  for (const line of lines) {
    const dayMatch = line.match(
      /^Day\s*\d+\s*[-:]?/i
    );

    if (dayMatch) {
      if (current) {
        days.push(current);
      }

      const dayNumber =
        line.match(/^Day\s*(\d+)/i)?.[1] || "";

      const cleanLine = line
        .replace(/^Day\s*\d+\s*[-:]?\s*/i, "")
        .trim();

      current = {
        day: dayNumber
          ? `Day ${dayNumber}`
          : "Day",
        title: cleanLine || "Holiday Program",
        details: [],
      };
    } else if (current) {
      current.details.push(line);
    } else {
      current = {
        day: "Day 1",
        title: "Holiday Program",
        details: [line],
      };
    }
  }

  if (current) {
    days.push(current);
  }

  return days;
}

export default function HolidayItinerary({
  itinerary,
  title,
}: Props) {
  if (!itinerary) {
    return null;
  }

  const destination = getDestination(title);
  const days = parseItinerary(itinerary);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <CalendarDays size={23} />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
              Your Journey
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
              {destination} Itinerary
            </h2>
          </div>

        </div>

        <p className="mt-4 text-gray-500">
          Explore {destination} with a carefully planned holiday itinerary.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">

        {/* Vertical line */}
        <div className="absolute bottom-5 left-[19px] top-5 hidden w-px bg-emerald-100 sm:block" />

        <div className="space-y-7">

          {days.map((day, index) => (
            <div
              key={`${day.day}-${index}`}
              className="relative sm:pl-14"
            >

              {/* Day marker */}
              <div className="absolute left-0 top-0 hidden h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-xs font-bold text-white shadow sm:flex">
                {index + 1}
              </div>

              {/* Day Card */}
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50">

                <div className="flex flex-col gap-3 border-b border-gray-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
                      {day.day}
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                      {day.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin
                      size={17}
                      className="text-emerald-600"
                    />
                    {destination}
                  </div>

                </div>

                <div className="p-5">

                  {day.details.length > 0 ? (
                    <div className="space-y-3">

                      {day.details.map(
                        (detail, detailIndex) => (
                          <div
                            key={detailIndex}
                            className="flex items-start gap-3"
                          >
                            <ChevronRight
                              size={18}
                              className="mt-0.5 shrink-0 text-emerald-600"
                            />

                            <p className="text-sm leading-6 text-gray-700">
                              {detail}
                            </p>
                          </div>
                        )
                      )}

                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Clock3 size={17} />
                      Details available from our travel team.
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-8 rounded-xl bg-emerald-50 p-5">
        <p className="text-sm leading-6 text-emerald-900">
          <strong>Please note:</strong> The itinerary may be adjusted
          depending on flight schedules, weather, local conditions and
          operational requirements.
        </p>
      </div>

    </section>
  );
}
