import Image from "next/image";
import Link from "next/link";

const visaServices = [
  {
    title: "Umrah Visa Assistance",
    description:
      "Complete support for Umrah visa processing with proper guidance and documentation assistance.",
    icon: "🕋",
  },
  {
    title: "Saudi Tourist Visa",
    description:
      "Explore Saudi Arabia with professional tourist visa assistance and application support.",
    icon: "🌍",
  },
  {
    title: "Family & Group Visa Support",
    description:
      "Special assistance for families, groups and corporate travellers.",
    icon: "👨‍👩‍👧‍👦",
  },
];


const documents = [
  "Passport with minimum validity",
  "Passport size photographs",
  "National ID / required identification documents",
  "Travel details and booking information",
  "Additional documents as required",
];


export default function VisaPage() {
  return (
    <main>


      {/* Hero */}
      <section className="relative h-[55vh]">

        <Image
          src="/images/hero/umrah-hero.jpg"
          alt="Visa Services"
          fill
          sizes="100vw"
          className="object-cover"
        />


        <div className="absolute inset-0 bg-black/60" />


        <div className="relative z-10 flex h-full items-center">

          <div className="mx-auto max-w-7xl px-6 text-white">

            <p className="uppercase tracking-[5px] text-emerald-300">
              Visa Services
            </p>


            <h1 className="mt-4 text-5xl font-bold md:text-6xl">
              Hassle-Free Visa Assistance
            </h1>


            <p className="mt-5 max-w-2xl text-lg text-gray-200">
              Professional visa support services for Umrah and
              international travel.
            </p>

          </div>

        </div>

      </section>



      {/* Services */}
      <section className="py-16">

        <div className="mx-auto max-w-7xl px-6">


          <div className="grid gap-8 md:grid-cols-3">


            {visaServices.map((service) => (

              <div
                key={service.title}
                className="rounded-2xl bg-white p-8 text-center shadow-lg"
              >

                <div className="text-5xl">
                  {service.icon}
                </div>


                <h2 className="mt-5 text-2xl font-bold text-gray-800">
                  {service.title}
                </h2>


                <p className="mt-4 text-gray-600">
                  {service.description}
                </p>


              </div>

            ))}


          </div>


        </div>

      </section>




      {/* Process */}
      <section className="bg-emerald-50 py-16">

        <div className="mx-auto max-w-7xl px-6">


          <h2 className="text-center text-4xl font-bold text-gray-800">
            Simple Visa Process
          </h2>


          <div className="mt-10 grid gap-6 md:grid-cols-4">


            <div className="rounded-xl bg-white p-6 text-center shadow">
              <span className="text-3xl">1</span>
              <h3 className="mt-3 font-bold">
                Submit Documents
              </h3>
            </div>


            <div className="rounded-xl bg-white p-6 text-center shadow">
              <span className="text-3xl">2</span>
              <h3 className="mt-3 font-bold">
                Verification
              </h3>
            </div>


            <div className="rounded-xl bg-white p-6 text-center shadow">
              <span className="text-3xl">3</span>
              <h3 className="mt-3 font-bold">
                Visa Processing
              </h3>
            </div>


            <div className="rounded-xl bg-white p-6 text-center shadow">
              <span className="text-3xl">4</span>
              <h3 className="mt-3 font-bold">
                Travel Ready
              </h3>
            </div>


          </div>

        </div>

      </section>




      {/* Documents */}
      <section className="py-16">

        <div className="mx-auto max-w-4xl px-6">


          <h2 className="text-center text-4xl font-bold text-gray-800">
            Required Documents
          </h2>


          <ul className="mt-8 space-y-4">

            {documents.map((doc) => (

              <li
                key={doc}
                className="rounded-lg bg-gray-50 p-4 shadow-sm"
              >
                ✓ {doc}
              </li>

            ))}

          </ul>


        </div>

      </section>




      {/* CTA */}
      <section className="bg-emerald-800 py-14 text-center text-white">

        <h2 className="text-4xl font-bold">
          Need Visa Assistance?
        </h2>


        <p className="mt-4 text-lg">
          Contact our team today for quick guidance.
        </p>


        <Link
          href="/contact"
          className="mt-8 inline-block rounded-lg bg-white px-8 py-4 font-semibold text-emerald-800"
        >
          Contact Us
        </Link>


      </section>


    </main>
  );
}