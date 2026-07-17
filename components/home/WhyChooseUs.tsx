const reasons = [
  {
    title: "Experienced Umrah Specialists",
    description:
      "Our dedicated team provides expert guidance to make your Umrah journey smooth and comfortable.",
    icon: "🕋",
  },
  {
    title: "Complete Visa Assistance",
    description:
      "From documentation to processing, we provide reliable visa support for pilgrims.",
    icon: "📄",
  },
  {
    title: "Premium Accommodation",
    description:
      "Choose from carefully selected hotels near Haram and Masjid an-Nabawi.",
    icon: "🏨",
  },
  {
    title: "24/7 Customer Support",
    description:
      "Our support team is available throughout your journey whenever you need assistance.",
    icon: "☎️",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">

          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose Umrah Tours?
          </h2>

          <p className="text-gray-600 mt-3">
            Making your spiritual journey simple, safe and memorable
          </p>

        </div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {reasons.map((item,index)=>(

            <div
              key={index}
              className="rounded-xl border p-6 text-center hover:shadow-lg transition"
            >

              <div className="text-4xl mb-4">
                {item.icon}
              </div>


              <h3 className="font-semibold text-lg mb-3">
                {item.title}
              </h3>


              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}