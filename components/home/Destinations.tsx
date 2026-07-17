import Image from "next/image";
import Link from "next/link";


const destinations = [
  {
    name: "Makkah",
    description:
      "Experience the spiritual journey of Umrah near Masjid Al Haram.",
    image: "/images/destinations/makkah.jpg",
  },
  {
    name: "Madinah",
    description:
      "Visit the blessed city of Prophet Muhammad ﷺ with comfort and ease.",
    image: "/images/destinations/madinah.jpg",
  },
  {
    name: "Dubai",
    description:
      "Discover luxury shopping, adventure and modern attractions.",
    image: "/images/destinations/dubai.jpg",
  },
  {
    name: "Turkey",
    description:
      "Explore historical landmarks and beautiful Turkish landscapes.",
    image: "/images/destinations/turkey.jpg",
  },
];


export default function Destinations() {

  return (

    <section className="bg-gray-50 py-20">


      <div className="mx-auto max-w-7xl px-6">


        <div className="mb-14 text-center">


          <p className="uppercase tracking-[5px] text-emerald-600">
            Popular Destinations
          </p>


          <h2 className="mt-3 text-4xl font-bold text-gray-800 md:text-5xl">
            Explore Beautiful Places
          </h2>


          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            From holy cities to international destinations,
            we create memorable travel experiences.
          </p>


        </div>





        <div className="grid gap-8 md:grid-cols-4">


          {destinations.map((destination) => (

            <div
              key={destination.name}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
            >


              <div className="relative h-72 overflow-hidden">


                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width:768px)100vw,25vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />


                <div className="absolute inset-0 bg-black/30" />


                <h3 className="absolute bottom-5 left-5 text-3xl font-bold text-white">
                  {destination.name}
                </h3>


              </div>





              <div className="p-6">


                <p className="text-gray-600">
                  {destination.description}
                </p>



                <Link
                  href="/contact"
                  className="mt-5 block text-center rounded-lg bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                  Plan Trip
                </Link>


              </div>


            </div>

          ))}


        </div>


      </div>


    </section>

  );
}