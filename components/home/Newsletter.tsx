export default function Newsletter() {
  return (
    <section className="bg-emerald-700 py-20 text-white">

      <div className="mx-auto max-w-5xl px-6 text-center">

        <h2 className="text-4xl font-bold">
          Plan Your Umrah Journey Today
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
          Get the best Umrah packages, visa assistance, flights,
          hotels and complete travel support from our experts.
        </p>


        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

          <input
            type="email"
            placeholder="Enter your email address"
            className="rounded-lg px-5 py-3 text-gray-800 outline-none"
          />


          <button
            className="rounded-lg bg-white px-8 py-3 font-semibold text-emerald-700 hover:bg-gray-100"
          >
            Get Offers
          </button>

        </div>


        <div className="mt-8">

          <a
            href="https://wa.me/917977127500"
            target="_blank"
            className="inline-block rounded-lg bg-green-500 px-8 py-3 font-semibold text-white hover:bg-green-600"
          >
            Chat on WhatsApp
          </a>

        </div>

      </div>

    </section>
  );
}