import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Khan",
    location: "Dubai, UAE",
    text:
      "Excellent Umrah experience. The team handled everything from visa to hotel arrangements perfectly.",
  },
  {
    name: "Fatima Ali",
    location: "Mumbai, India",
    text:
      "Very professional service. Our family Umrah journey was comfortable and stress-free.",
  },
  {
    name: "Mohammed Hassan",
    location: "London, UK",
    text:
      "Great packages, reliable support and smooth travel arrangements throughout the journey.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Pilgrims Say
          </h2>

          <p className="mt-3 text-gray-600">
            Hear from pilgrims and travelers who chose our services
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={`${item.name}-${item.location}`}
              className="rounded-xl bg-white p-6 shadow"
            >
              <div className="mb-4 flex gap-1" aria-label="5 star rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className="fill-current text-yellow-500"
                  />
                ))}
              </div>

              <p className="mb-6 text-gray-600">
                &quot;{item.text}&quot;
              </p>

              <h3 className="font-semibold text-gray-900">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500">
                {item.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}