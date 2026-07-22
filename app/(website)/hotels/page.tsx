import Image from "next/image";
import Link from "next/link";

const hotels = [
  {
    name: "Premium Makkah Hotel",
    location: "Near Masjid Al Haram, Makkah",
    category: "5 Star Accommodation",
    image: "/images/hotels/makkah-hotel.jpg",
  },
  {
    name: "Comfort Makkah Stay",
    location: "Makkah, Saudi Arabia",
    category: "3-4 Star Accommodation",
    image: "/images/hotels/makkah-hotel2.jpg",
  },
  {
    name: "Madinah Blessed Hotel",
    location: "Near Masjid An Nabawi, Madinah",
    category: "4 Star Accommodation",
    image: "/images/hotels/madinah-hotel.jpg",
  },
];


export default function HotelsPage() {
  return (
    <main>


      {/* Hero */}
      <section className="relative h-[55vh]">

        <Image
          src="/images/hero/umrah-hero.jpg"
          alt="Hotels"
          fill
          sizes="100vw"
          className="object-cover"
        />


        <div className="absolute inset-0 bg-black/60" />


        <div className="relative z-10 flex h-full items-center">

          <div className="mx-auto max-w-7xl px-6 text-white">

            <p className="uppercase tracking-[5px] text-emerald-300">
              Accommodation
            </p>


            <h1 className="mt-4 text-5xl font-bold md:text-6xl">
              Makkah & Madinah Hotels
            </h1>


            <p className="mt-5 max-w-2xl text-lg text-gray-200">
              Comfortable stays near the holy sites with options
              suitable for every budget.
            </p>

          </div>

        </div>

      </section>




      {/* Hotels */}
      <section className="py-16">

        <div className="mx-auto max-w-7xl px-6">


          <div className="grid gap-8 md:grid-cols-3">


            {hotels.map((hotel) => (

              <div
                key={hotel.name}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-xl"
              >


                <div className="relative h-64">

                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    sizes="(max-width:768px)100vw,33vw"
                    className="object-cover"
                  />

                </div>



                <div className="p-6">


                  <h2 className="text-2xl font-bold text-gray-800">
                    {hotel.name}
                  </h2>


                  <p className="mt-3 text-gray-600">
                    📍 {hotel.location}
                  </p>


                  <p className="mt-2 text-emerald-700 font-semibold">
                    ⭐ {hotel.category}
                  </p>



                  <Link
                    href="/contact"
                    className="mt-6 block rounded-lg bg-emerald-600 px-5 py-3 text-center text-white hover:bg-emerald-700"
                  >
                    Enquire Now
                  </Link>


                </div>


              </div>

            ))}


          </div>


        </div>

      </section>





      {/* Features */}
      <section className="bg-emerald-50 py-16">


        <div className="mx-auto max-w-7xl px-6">


          <h2 className="text-center text-4xl font-bold text-gray-800">
            Hotel Booking Benefits
          </h2>


          <div className="mt-10 grid gap-6 md:grid-cols-4">


            <div className="rounded-xl bg-white p-6 text-center shadow">
              🕋
              <h3 className="mt-3 font-bold">
                Near Haram
              </h3>
            </div>


            <div className="rounded-xl bg-white p-6 text-center shadow">
              🏨
              <h3 className="mt-3 font-bold">
                Quality Hotels
              </h3>
            </div>


            <div className="rounded-xl bg-white p-6 text-center shadow">
              💰
              <h3 className="mt-3 font-bold">
                Best Rates
              </h3>
            </div>


            <div className="rounded-xl bg-white p-6 text-center shadow">
              🤝
              <h3 className="mt-3 font-bold">
                Full Support
              </h3>
            </div>


          </div>


        </div>


      </section>





      {/* CTA */}
      <section className="bg-emerald-800 py-14 text-center text-white">


        <h2 className="text-4xl font-bold">
          Need Hotel Reservation Assistance?
        </h2>


        <p className="mt-4 text-lg">
          Let our team arrange comfortable accommodation for your journey.
        </p>


        <Link
          href="/contact"
          className="mt-8 inline-block rounded-lg bg-white px-8 py-4 font-semibold text-emerald-800"
        >
          Book Hotel
        </Link>


      </section>


    </main>
  );
}