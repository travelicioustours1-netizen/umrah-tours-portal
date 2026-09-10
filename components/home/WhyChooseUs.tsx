import {
  Clock3,
  FileCheck2,
  Hotel,
  UserRoundCheck,
} from "lucide-react";

const reasons = [
  {
    title: "Experienced Umrah Specialists",
    description:
      "Our dedicated team provides expert guidance to help make your Umrah journey smooth and comfortable.",
    icon: UserRoundCheck,
  },
  {
    title: "Complete Visa Assistance",
    description:
      "From documentation to processing, we provide reliable visa support and guidance for pilgrims.",
    icon: FileCheck2,
  },
  {
    title: "Premium Accommodation",
    description:
      "Choose from carefully selected hotels near Haram and Masjid an-Nabawi for a comfortable stay.",
    icon: Hotel,
  },
  {
    title: "24/7 Customer Support",
    description:
      "Our support team is available throughout your journey whenever you need assistance.",
    icon: Clock3,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose Umrah Tours?
          </h2>

          <p className="mt-3 text-gray-600">
            Making your spiritual journey simple, safe and memorable
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border p-6 text-center transition hover:shadow-lg"
              >
                <div className="mb-4 flex justify-center">
                  <Icon
                    size={42}
                    strokeWidth={1.8}
                    className="text-emerald-600"
                  />
                </div>

                <h3 className="mb-3 text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}