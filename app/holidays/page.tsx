import Image from "next/image";
import Link from "next/link";


const holidays = [
  {
    title: "Dubai Holiday Package",
    duration: "5 Days / 4 Nights",
    description:
      "Experience luxury shopping, desert safari, city tours and unforgettable Dubai attractions.",
    image: "/images/holidays/dubai.jpg",
  },
  {
    title: "Turkey Holiday Package",
    duration: "7 Days / 6 Nights",
    description:
      "Explore Istanbul, historical places, beautiful landscapes and Turkish culture.",
    image: "/images/holidays/turkey.jpg",
  },
  {
    title: "Maldives Package",
    duration: "5 Days / 4 Nights",
    description:
      "Enjoy a relaxing beach holiday with premium resorts and beautiful ocean views.",
    image: "/images/holidays/maldives.jpg",
  },
];


export default function HolidaysPage() {
  return (
    <main>


      {/* Hero */}

      <section className="relative h-[55vh]">


        <Image
          src="/images/hero/holiday-hero.jpg"
          alt="International Holidays"
          fill
          sizes="100vw"
          className="object-cover"
        />


        <div className="absolute inset-0 bg-black/60" />


        <div className="relative z-10 flex h-full items-center">


          <div className="mx-auto max-w-7xl px-6 text-white">


            <p className="uppercase tracking-[5px] text-emerald-300">
              International Holidays
            </p>


            <h1 className="mt-4 text-5xl font-bold md:text-6xl">
              Explore The World With Us
            </h1>


            <p className="mt-5 max-w-2xl text-lg text-gray-200">
              Customized holiday packages for families, couples and groups.
            </p>


          </div>


        </div>


      </section>





      {/* Holiday Packages */}


      <section className="py-16">


        <div className="mx-auto max-w-7xl px-6">


          <div className="mb-12 text-center">


            <p className="uppercase tracking-[4px] text-emerald-600">
              Popular Tours
            </p>


            <h2 className="mt-3 text-4xl font-bold text-gray-800">
              International Holiday Packages
            </h2>


          </div>





          <div className="grid gap-8 md:grid-cols-3">


            {holidays.map((holiday) => (


              <div
                key={holiday.title}
                className="overflow-hidden rounded-2xl bg-white shadow-lg"
              >


                <div className="relative h-64">


                  <Image
                    src={holiday.image}
                    alt={holiday.title}
                    fill
                    sizes="(max-width:768px)100vw,33vw"
                    className="object-cover transition hover:scale-105"
                  />


                </div>




                <div className="p-6">


                  <h2 className="text-2xl font-bold text-gray-800">
                    {holiday.title}
                  </h2>



                  <p className="mt-3 text-emerald-700 font-semibold">
                    📅 {holiday.duration}
                  </p>



                  <p className="mt-4 text-gray-600">
                    {holiday.description}
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






      {/* Services */}


      <section className="bg-emerald-50 py-16">


        <div className="mx-auto max-w-7xl px-6">


          <h2 className="text-center text-4xl font-bold text-gray-800">
            Our Holiday Services
          </h2>




          <div className="mt-10 grid gap-6 md:grid-cols-4">


            <div className="rounded-xl bg-white p-6 text-center shadow">
              ✈️
              <h3 className="mt-3 font-bold">
                Flight Booking
              </h3>
            </div>



            <div className="rounded-xl bg-white p-6 text-center shadow">
              🏨
              <h3 className="mt-3 font-bold">
                Hotel Reservation
              </h3>
            </div>




            <div className="rounded-xl bg-white p-6 text-center shadow">
              🚐
              <h3 className="mt-3 font-bold">
                Transfers
              </h3>
            </div>




            <div className="rounded-xl bg-white p-6 text-center shadow">
              🌍
              <h3 className="mt-3 font-bold">
                Custom Tours
              </h3>
            </div>


          </div>


        </div>


      </section>






      {/* CTA */}


      <section className="bg-emerald-800 py-14 text-center text-white">


        <h2 className="text-4xl font-bold">
          Plan Your Dream Holiday Today
        </h2>


        <p className="mt-4 text-lg">
          Contact our travel experts for customized packages.
        </p>



        <Link
          href="/contact"
          className="mt-8 inline-block rounded-lg bg-white px-8 py-4 font-semibold text-emerald-800"
        >
          Start Planning
        </Link>


      </section>



    </main>
  );
}