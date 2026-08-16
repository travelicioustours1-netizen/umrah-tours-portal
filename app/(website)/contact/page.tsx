import Link from "next/link";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-gray-50">
      <section className="bg-emerald-800 py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="font-semibold uppercase tracking-[4px] text-emerald-200">
            Contact UmrahTours
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Get a Quote
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-50">
            Tell us what you need and our travel team will get back to you
            with the best available options.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <MessageCircle size={24} />
            </div>

            <h2 className="mt-5 text-xl font-bold">WhatsApp</h2>

            <p className="mt-2 text-gray-600">
              Contact our travel team directly for quick assistance.
            </p>

            <a
              href="https://wa.me/971525657940"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-emerald-700"
            >
              WhatsApp Us
              <Send size={16} />
            </a>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Mail size={24} />
            </div>

            <h2 className="mt-5 text-xl font-bold">Email</h2>

            <p className="mt-2 text-gray-600">
              Send your travel requirements to our team.
            </p>

            <a
              href="mailto:bookings@umrahtours.co"
              className="mt-5 inline-block font-semibold text-emerald-700"
            >
              bookings@umrahtours.co
            </a>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Phone size={24} />
            </div>

            <h2 className="mt-5 text-xl font-bold">Travel Assistance</h2>

            <p className="mt-2 text-gray-600">
              Umrah, holidays, hotels, flights and visa assistance.
            </p>

            <Link
              href="/visa"
              className="mt-5 inline-block font-semibold text-emerald-700"
            >
              Explore Visa Services
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl px-6">
          <div className="rounded-2xl bg-white p-8 shadow-sm md:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Send Your Enquiry
              </h2>

              <p className="mt-2 text-gray-600">
                Share your requirements and our team will contact you.
              </p>
            </div>

            <form action="/api/enquiries" method="POST" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Name
                  </label>

                  <input
                    name="name"
                    required
                    className="w-full rounded-lg border p-3"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-lg border p-3"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Phone / WhatsApp
                  </label>

                  <input
                    name="phone"
                    required
                    className="w-full rounded-lg border p-3"
                    placeholder="+971..."
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Service
                  </label>

                  <select
                    name="service"
                    defaultValue="VISA"
                    className="w-full rounded-lg border p-3"
                  >
                    <option value="VISA">Visa Services</option>
                    <option value="UMRAH">Umrah</option>
                    <option value="HOLIDAY">Holiday</option>
                    <option value="HOTEL">Hotel</option>
                    <option value="FLIGHT">Flight</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Subject
                </label>

                <input
                  name="subject"
                  defaultValue="Visa Quote Request"
                  className="w-full rounded-lg border p-3"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Message
                </label>

                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full rounded-lg border p-3"
                  placeholder="Tell us your destination, nationality, travel dates and requirements..."
                />
              </div>

              <input type="hidden" name="source" value="website" />

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-4 font-semibold text-white hover:bg-emerald-700"
              >
                <Send size={18} />
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}