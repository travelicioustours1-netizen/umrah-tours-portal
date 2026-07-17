export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-4 gap-10">


          {/* Brand */}

          <div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Umrah Tours
            </h2>

            <p className="text-sm leading-relaxed">
              Your trusted partner for comfortable and memorable Umrah journeys.
              We provide complete Umrah packages, visa assistance, hotels and
              transportation services.
            </p>

          </div>



          {/* Quick Links */}

          <div>

            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">

              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>

              <li>
                <a href="/packages" className="hover:text-white">
                  Packages
                </a>
              </li>

              <li>
                <a href="/services" className="hover:text-white">
                  Services
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>

            </ul>

          </div>



          {/* Services */}

          <div>

            <h3 className="text-white font-semibold mb-4">
              Our Services
            </h3>

            <ul className="space-y-2 text-sm">

              <li>Umrah Packages</li>
              <li>Visa Assistance</li>
              <li>Hotel Booking</li>
              <li>Airport Transfers</li>

            </ul>

          </div>



          {/* Contact */}

          <div>

            <h3 className="text-white font-semibold mb-4">
              Contact Us
            </h3>


            <ul className="space-y-3 text-sm">

              <li>
                📞 +91 7977127500
              </li>

              <li>
                ✉ bookings@umrahtours.co
              </li>

              <li>
                🌐 www.umrahtours.co
              </li>

            </ul>


          </div>


        </div>


      </div>


      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-sm">

          © {new Date().getFullYear()} Umrah Tours. All Rights Reserved.

        </div>

      </div>


    </footer>
  );
}