export default function CTA() {
  return (
    <section className="py-16 bg-green-800">

      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Ready To Begin Your Umrah Journey?
        </h2>

        <p className="text-green-100 mt-4 max-w-2xl mx-auto">
          Book your Umrah package today and experience a smooth,
          comfortable and spiritually fulfilling journey with our expert team.
        </p>


        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

          <a
            href="/contact"
            className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Book Your Umrah
          </a>


          <a
            href="https://wa.me/917977127500"
            target="_blank"
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition"
          >
            WhatsApp Us
          </a>

        </div>

      </div>

    </section>
  );
}