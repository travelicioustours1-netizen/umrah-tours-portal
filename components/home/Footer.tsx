import Link from "next/link";
import {
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

export default function Footer() {
  const whatsappNumber = "971525657940";

  const whatsappMessage = `Assalamu Alaikum,

I would like to enquire about your travel services.

Please share today's best price, availability and package details.

Thank you.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-white">
              Umrah Tours
            </h2>

            <p className="text-sm leading-relaxed">
              Your trusted partner for comfortable and memorable Umrah
              journeys. We provide Umrah packages, visa assistance, hotels,
              flights, holidays and transportation services.
            </p>

            <p className="mt-4 text-xs leading-5 text-gray-500">
              An Umrah division of AL AFEEF TRAVELS AND TOURS – Sharjah.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/umrah" className="transition hover:text-white">
                  Umrah Packages
                </Link>
              </li>

              <li>
                <Link
                  href="/holidays"
                  className="transition hover:text-white"
                >
                  Holiday Packages
                </Link>
              </li>

              <li>
                <Link href="/visa" className="transition hover:text-white">
                  Visa Services
                </Link>
              </li>

              <li>
                <Link
                  href="/promotion"
                  className="transition hover:text-white"
                >
                  Promotions
                </Link>
              </li>

              <li>
                <Link href="/contact" className="transition hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Our Services
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/umrah"
                  className="transition hover:text-white"
                >
                  Umrah Packages
                </Link>
              </li>

              <li>
                <Link
                  href="/flights"
                  className="transition hover:text-white"
                >
                  Flight Booking
                </Link>
              </li>

              <li>
                <Link
                  href="/hotels"
                  className="transition hover:text-white"
                >
                  Hotel Booking
                </Link>
              </li>

              <li>
                <Link
                  href="/holidays"
                  className="transition hover:text-white"
                >
                  International Holidays
                </Link>
              </li>

              <li>
                <Link
                  href="/airport-transfers"
                  className="transition hover:text-white"
                >
                  Airport Transfers
                </Link>
              </li>

              <li>
                <Link
                  href="/tours-activities"
                  className="transition hover:text-white"
                >
                  Tours & Activities
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="tel:+971525657940"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Phone size={17} />
                  <span>+971 52 565 7940</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:bookings@umrahtours.co"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Mail size={17} />
                  <span>bookings@umrahtours.co</span>
                </a>
              </li>

              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-semibold text-emerald-400 transition hover:text-emerald-300"
                >
                  <MessageCircle size={17} />
                  <span>WhatsApp Us</span>
                </a>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <MapPin size={17} />
                  <span>Sharjah, UAE</span>
                </Link>
              </li>

              <li>
                <a
                  href="https://www.umrahtours.co"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Globe size={17} />
                  <span>www.umrahtours.co</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-sm">
          © {new Date().getFullYear()} Umrah Tours. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
