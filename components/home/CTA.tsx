import HomeCTAWhatsAppButton from "@/components/home/HomeCTAWhatsAppButton";

export default function CTA() {
  return (
    <section className="bg-green-800 py-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Ready To Begin Your Umrah Journey?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-green-100">
          Book your Umrah package today and experience a smooth,
          comfortable and spiritually fulfilling journey with our expert team.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <HomeCTAWhatsAppButton />

          <a
            href="/contact"
            className="rounded-lg border border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-green-800"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </section>
  );
}