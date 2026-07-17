import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">


        {/* Company */}
        <div>

          <h2 className="mb-5 text-2xl font-bold text-white">
            Umrah Tours
          </h2>

          <p className="leading-relaxed">
            Your trusted partner for Umrah packages, visa assistance,
            flights, hotels and international holiday experiences.
          </p>

        </div>



        {/* Quick Links */}
        <div>

          <h3 className="mb-5 text-lg font-bold text-white">
            Quick Links
          </h3>


          <ul className="space-y-3">

            <li>
              <Link href="/" className="hover:text-emerald-400">
                Home
              </Link>
            </li>

            <li>
              <Link href="/umrah" className="hover:text-emerald-400">
                Umrah Packages
              </Link>
            </li>

            <li>
              <Link href="/visa" className="hover:text-emerald-400">
                Visa Services
              </Link>
            </li>

            <li>
              <Link href="/hotels" className="hover:text-emerald-400">
                Hotels
              </Link>
            </li>

            <li>
              <Link href="/holidays" className="hover:text-emerald-400">
                Holidays
              </Link>
            </li>

          </ul>

        </div>



        {/* Services */}
        <div>

          <h3 className="mb-5 text-lg font-bold text-white">
            Services
          </h3>


          <ul className="space-y-3">

            <li>Umrah Packages</li>
            <li>Umrah Visa Assistance</li>
            <li>Hotel Booking</li>
            <li>Flight Reservation</li>
            <li>Private Transport</li>

          </ul>

        </div>



        {/* Contact */}
        <div>

          <h3 className="mb-5 text-lg font-bold text-white">
            Contact Us
          </h3>


          <ul className="space-y-3">

            <li>
              📞 +91 7977127500
            </li>

            <li>
              ✉ bookings@umrahtours.co
            </li>

            <li>
              🌍 Serving Worldwide
            </li>

          </ul>


          <a
            href="https://wa.me/917977127500"
            target="_blank"
            className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
          >
            WhatsApp Booking
          </a>

        </div>


      </div>



      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-5 text-center text-sm">

        © {new Date().getFullYear()} Umrah Tours. All Rights Reserved.

      </div>


    </footer>
  );
}