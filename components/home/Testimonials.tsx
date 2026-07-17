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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Pilgrims Say
          </h2>

          <p className="text-gray-600 mt-3">
            Trusted by thousands of pilgrims worldwide
          </p>
        </div>


        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item,index)=>(
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6"
            >

              <div className="text-yellow-500 text-xl mb-4">
                ★★★★★
              </div>

              <p className="text-gray-600 mb-6">
                "{item.text}"
              </p>

              <h3 className="font-semibold">
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