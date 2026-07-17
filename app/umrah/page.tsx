import Image from "next/image";
import Link from "next/link";

const packages = [
  {
    title: "3 Days Economy Umrah Package",
    duration: "3 Days / 2 Nights",
    hotel: "Economy Hotel Accommodation",
    transport: "Shared Transportation",
    price: "AED 999",
    image: "/images/packages/umrah1.jpg",
  },
  {
    title: "7 Days Standard Umrah Package",
    duration: "7 Days / 6 Nights",
    hotel: "3 Star Hotel Near Haram",
    transport: "Airport Transfers Included",
    price: "AED 1499",
    image: "/images/packages/umrah2.jpg",
  },
  {
    title: "15 Days Premium Umrah Package",
    duration: "15 Days / 14 Nights",
    hotel: "4 Star Hotel Accommodation",
    transport: "Private Transport Option",
    price: "AED 2499",
    image: "/images/packages/umrah3.jpg",
  },
];

export default function UmrahPage() {
  return (
    <main>

      {/* Hero */}
      <section className="relative h-[60vh]">

        <Image
          src="/images/hero/umrah-hero.jpg"
          alt="Umrah Packages"
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />


        <div className="relative z-10 flex h-full items-center">

          <div className="mx-auto max-w-7xl px-6 text-white">

            <p className="mb-4 uppercase tracking-[5px] text-emerald-300">
              Umrah Packages
            </p>

            <h1 className="text-5xl font-bold md:text-6xl">
              Complete Umrah Travel Solutions
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-gray-200">
              Choose from affordable and premium Umrah packages
              designed for a comfortable spiritual journey.
            </p>

          </div>

        </div>

      </section>



      {/* Packages */}
      <section className="py-16">

        <div className="mx-auto max-w-7xl px-6">


          <div className="grid gap-8 md:grid-cols-3">


            {packages.map((pkg) => (

              <div
                key={pkg.title}
                className="overflow-hidden rounded-2xl bg-white shadow-lg"
              >

                <div className="relative h-60">

                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width:768px)100vw,33vw"
                    className="object-cover"
                  />

                </div>


                <div className="p-6">


                  <h2 className="text-2xl font-bold text-gray-800">
                    {pkg.title}
                  </h2>


                  <div className="mt-4 space-y-2 text-gray-600">

                    <p>
                      📅 {pkg.duration}
                    </p>

                    <p>
                      🏨 {pkg.hotel}
                    </p>

                    <p>
                      🚐 {pkg.transport}
                    </p>

                  </div>


                  <p className="mt-5 text-2xl font-bold text-emerald-700">
                    {pkg.price}
                  </p>


                  <Link
                    href="/contact"
                    className="mt-6 block rounded-lg bg-emerald-600 px-5 py-3 text-center font-semibold text-white hover:bg-emerald-700"
                  >
                    Book Now
                  </Link>


                </div>

              </div>

            ))}


          </div>


        </div>

      </section>



      {/* Benefits */}
      <section className="bg-emerald-50 py-16">

        <div className="mx-auto max-w-7xl px-6 text-center">

          <h2 className="text-4xl font-bold text-gray-800">
            Why Book Umrah With Us?
          </h2>


          <div className="mt-10 grid gap-6 md:grid-cols-4">


            <div className="rounded-xl bg-white p-6 shadow">
              🛂
              <h3 className="mt-3 font-bold">
                Visa Assistance
              </h3>
            </div>


            <div className="rounded-xl bg-white p-6 shadow">
              🏨
              <h3 className="mt-3 font-bold">
                Hotel Booking
              </h3>
            </div>


            <div className="rounded-xl bg-white p-6 shadow">
              ✈️
              <h3 className="mt-3 font-bold">
                Flight Support
              </h3>
            </div>


            <div className="rounded-xl bg-white p-6 shadow">
              🚐
              <h3 className="mt-3 font-bold">
                Transport
              </h3>
            </div>


          </div>

        </div>

      </section>


    </main>
  );
}