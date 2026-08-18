const faqs = [
  {
    question: "How much does an Umrah package from UAE cost?",
    answer:
      "Umrah package prices from the UAE vary depending on travel dates, hotel category, room occupancy, flights, visa requirements and package duration. Contact Umrah Tours for the latest package options and a personalized quotation.",
  },
  {
    question: "Can I book Umrah packages from Dubai?",
    answer:
      "Yes. Umrah Tours provides Umrah package assistance for travellers from Dubai and across the UAE, including package options with accommodation, flights and visa assistance.",
  },
  {
    question: "Do you offer Umrah packages from Sharjah?",
    answer:
      "Yes. Travellers from Sharjah can enquire about Umrah packages based on their preferred travel dates, accommodation category, room type and budget.",
  },
  {
    question: "What is included in an Umrah package?",
    answer:
      "Depending on the selected package, inclusions may include accommodation in Makkah and Madinah, flights, airport transfers, transportation, visa assistance and other travel services. Always check the individual package for its exact inclusions.",
  },
  {
    question: "Do Umrah packages include flights?",
    answer:
      "Some Umrah packages include flights while others are land-only packages. The exact inclusions are shown on each package or can be confirmed by our travel team before booking.",
  },
  {
    question: "Are Makkah and Madinah hotels included?",
    answer:
      "Many Umrah packages include accommodation in both Makkah and Madinah. Hotel category, location and number of nights depend on the selected package.",
  },
  {
    question: "Do you provide Umrah visa assistance?",
    answer:
      "Yes. Umrah Tours provides visa assistance as part of selected Umrah travel arrangements. Requirements and approval remain subject to the applicable Saudi authorities and regulations.",
  },
  {
    question: "How can I request an Umrah package quotation?",
    answer:
      "You can select an Umrah package on our website and submit an enquiry or quotation request. Our team can then provide availability, pricing and package details based on your travel requirements.",
  },
];

export default function UmrahFAQ() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <section
        className="bg-white py-16 md:py-20"
        aria-labelledby="umrah-faq-heading"
      >
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-[4px] text-emerald-600">
              Frequently Asked Questions
            </p>

            <h2
              id="umrah-faq-heading"
              className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl"
            >
              Umrah Packages From UAE
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Find answers to common questions about Umrah packages, hotels,
              flights, visa assistance and booking from the UAE.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-gray-200 bg-gray-50 p-6"
              >
                <summary className="cursor-pointer list-none pr-8 text-lg font-bold text-gray-900 marker:hidden">
                  {faq.question}
                </summary>

                <p className="mt-4 leading-7 text-gray-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </>
  );
}