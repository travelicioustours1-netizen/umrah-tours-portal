import {
  Plane,
  Hotel,
  Utensils,
  Bus,
  Map,
  FileCheck,
  Headphones,
  ShieldCheck,
  XCircle,
} from "lucide-react";

interface Props {
  inclusions?: string | null;
  exclusions?: string | null;
  destination?: string;
}

function getDestinationName(destination?: string) {
  const value = destination?.toLowerCase() || "";

  if (value.includes("azerbaijan")) return "Azerbaijan";
  if (value.includes("georgia")) return "Georgia";
  if (value.includes("dubai")) return "Dubai";

  return destination || "your destination";
}

function getDefaultInclusions(destination: string) {
  return [
    {
      icon: Plane,
      title: "Return Flights",
      description:
        "International return airfare according to the selected package.",
    },
    {
      icon: Hotel,
      title: "Hotel Accommodation",
      description:
        `Comfortable hotel accommodation in ${destination} for the complete holiday duration.`,
    },
    {
      icon: Utensils,
      title: "Meals",
      description:
        "Meals or breakfast according to the selected package.",
    },
    {
      icon: Bus,
      title: "Airport Transfers",
      description:
        `Airport pickup and drop-off arrangements in ${destination} as specified.`,
    },
    {
      icon: Map,
      title: "Sightseeing",
      description:
        `${destination} sightseeing and tour arrangements according to the itinerary.`,
    },
    {
      icon: FileCheck,
      title: "Visa Assistance",
      description:
        `Assistance with the applicable ${destination} visa requirements and process.`,
    },
    {
      icon: Headphones,
      title: "Travel Support",
      description:
        "Travel assistance before and during your holiday.",
    },
    {
      icon: ShieldCheck,
      title: "Travel Assistance",
      description:
        "Support with your holiday arrangements and coordination.",
    },
  ];
}

export default function HolidayInclusions({
  inclusions,
  exclusions,
  destination,
}: Props) {
  const destinationName = getDestinationName(destination);
  const defaultInclusions = getDefaultInclusions(destinationName);

  return (
    <div className="space-y-8">

      {/* Inclusions */}
      <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-emerald-600">
            What's Included
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
            Holiday Package Inclusions
          </h2>

          <p className="mt-2 text-gray-500">
            Your {destinationName} holiday package can include the following
            services.
          </p>
        </div>

        {inclusions ? (
          <div className="whitespace-pre-line rounded-xl bg-gray-50 p-5 text-gray-700">
            {inclusions}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {defaultInclusions.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Exclusions */}
      <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-gray-500">
            Please Note
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Package Exclusions
          </h2>
        </div>

        {exclusions ? (
          <div className="whitespace-pre-line rounded-xl bg-gray-50 p-5 text-gray-700">
            {exclusions}
          </div>
        ) : (
          <div className="space-y-3">
            <Exclusion text="Personal expenses are not included." />
            <Exclusion text="Additional meals not mentioned in the package are excluded." />
            <Exclusion text="Optional tours and activities are excluded unless specifically mentioned." />
            <Exclusion text="Travel insurance is subject to the selected package." />
            <Exclusion text="Any services not specifically mentioned under inclusions are excluded." />
          </div>
        )}
      </section>
    </div>
  );
}

function Exclusion({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
      <XCircle
        size={20}
        className="mt-0.5 shrink-0 text-gray-400"
      />

      <p className="text-sm leading-6 text-gray-700">
        {text}
      </p>
    </div>
  );
}