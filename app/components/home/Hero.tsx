import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[90vh] overflow-hidden">

      <Image
        src="/images/hero/kaaba.jpg"
        alt="Kaaba Makkah"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-6 text-white">

          <p className="mb-4 text-lg uppercase tracking-[5px] text-emerald-300">
            Premium Umrah & Holiday Experiences
          </p>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Your Trusted Partner For
            <span className="text-emerald-400">
              {" "}Umrah{" "}
            </span>
            & International Holidays
          </h1>

          <p className="mt-6 max-w-2xl text-xl text-gray-200">
            Complete travel solutions including visa assistance,
            flights, hotels, transportation and customized packages.
          </p>


          <div className="mt-10 flex gap-5">

            <button className="rounded-lg bg-emerald-600 px-8 py-4 font-semibold hover:bg-emerald-700">
              Explore Packages
            </button>

            <button className="rounded-lg border border-white px-8 py-4 hover:bg-white hover:text-black">
              Contact Us
            </button>

          </div>

        </div>
      </div>

    </section>
  );
}