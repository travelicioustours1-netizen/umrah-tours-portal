const services = [
  {
    icon: "🕋",
    title: "Umrah Packages",
    description:
      "Complete Umrah solutions including visa, hotels, transport and guided assistance.",
  },
  {
    icon: "🛂",
    title: "Visa Assistance",
    description:
      "Professional visa processing support for Umrah and international travel.",
  },
  {
    icon: "✈️",
    title: "Flight Booking",
    description:
      "Affordable flight options with flexible travel arrangements.",
  },
  {
    icon: "🏨",
    title: "Hotel Booking",
    description:
      "Comfortable accommodation in Makkah, Madinah and worldwide destinations.",
  },
  {
    icon: "🚐",
    title: "Transport Services",
    description:
      "Private transfers and transportation solutions for your journey.",
  },
  {
    icon: "⭐",
    title: "VIP Services",
    description:
      "Premium assistance and special arrangements for a comfortable experience.",
  },
];


export default function Services() {
  return (
    <section className="py-20 bg-white">


      <div className="mx-auto max-w-7xl px-6">


        <div className="text-center mb-14">


          <p className="uppercase tracking-[5px] text-emerald-600">
            Our Services
          </p>


          <h2 className="mt-3 text-4xl font-bold text-gray-800 md:text-5xl">
            Everything You Need For Your Journey
          </h2>


          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            From Umrah planning to international holidays, we provide
            complete travel solutions under one roof.
          </p>


        </div>




        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">


          {services.map((service) => (

            <div
              key={service.title}
              className="group rounded-3xl bg-gray-50 p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >


              <div className="text-5xl transition group-hover:scale-110">
                {service.icon}
              </div>


              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                {service.title}
              </h3>


              <p className="mt-4 text-gray-600">
                {service.description}
              </p>


            </div>

          ))}


        </div>


      </div>


    </section>
  );
}