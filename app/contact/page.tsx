import Link from "next/link";


export default function ContactPage() {
  return (
    <main>


      {/* Hero */}

      <section className="bg-emerald-800 py-20 text-white">

        <div className="mx-auto max-w-7xl px-6 text-center">

          <p className="uppercase tracking-[5px] text-emerald-300">
            Contact Us
          </p>


          <h1 className="mt-4 text-5xl font-bold">
            Plan Your Journey With Us
          </h1>


          <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-100">
            Contact our travel experts for Umrah packages, visa assistance,
            hotels, flights and holiday bookings.
          </p>


        </div>

      </section>





      {/* Contact Form */}

      <section className="py-16">


        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">



          {/* Information */}

          <div>


            <h2 className="text-3xl font-bold text-gray-800">
              Get In Touch
            </h2>


            <p className="mt-5 text-gray-600">
              Our team will help you choose the best package according to
              your travel requirements.
            </p>




            <div className="mt-8 space-y-5">


              <div className="rounded-xl bg-gray-50 p-5">
                <h3 className="font-bold text-gray-800">
                  📞 Phone
                </h3>

                <p className="mt-2 text-gray-600">
                  +91 7977127500
                </p>
              </div>




              <div className="rounded-xl bg-gray-50 p-5">
                <h3 className="font-bold text-gray-800">
                  ✉ Email
                </h3>

                <p className="mt-2 text-gray-600">
                  bookings@umrahtours.co
                </p>
              </div>




              <div className="rounded-xl bg-gray-50 p-5">
                <h3 className="font-bold text-gray-800">
                  🌍 Services
                </h3>

                <p className="mt-2 text-gray-600">
                  Umrah | Visa | Hotels | Holidays
                </p>
              </div>



            </div>


          </div>





          {/* Form */}


          <div className="rounded-2xl bg-white p-8 shadow-xl">


            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              Booking Enquiry
            </h2>



            <form className="space-y-5">


              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-600"
              />



              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-600"
              />



              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-600"
              />



              <select
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-600"
              >

                <option>
                  Select Service
                </option>

                <option>
                  Umrah Package
                </option>

                <option>
                  Visa Assistance
                </option>

                <option>
                  Hotel Booking
                </option>

                <option>
                  Holiday Package
                </option>

              </select>




              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-600"
              />




              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-600 py-4 font-semibold text-white hover:bg-emerald-700"
              >
                Submit Enquiry
              </button>



            </form>


          </div>


        </div>


      </section>





      {/* WhatsApp CTA */}

      <section className="bg-gray-50 py-12 text-center">


        <h2 className="text-3xl font-bold text-gray-800">
          Need Quick Assistance?
        </h2>


        <p className="mt-3 text-gray-600">
          Chat directly with our travel consultant.
        </p>



        <Link
          href="https://wa.me/917977127500"
          className="mt-6 inline-block rounded-lg bg-green-600 px-8 py-4 text-white"
        >
          WhatsApp Now
        </Link>


      </section>


    </main>
  );
}