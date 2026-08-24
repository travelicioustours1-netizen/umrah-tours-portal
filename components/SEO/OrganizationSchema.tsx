export default function OrganizationSchema() {
  const baseUrl = "https://umrahtours.co";

  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",

    "@id": `${baseUrl}/#organization`,

    name: "Umrah Tours",

    url: baseUrl,

    image: `${baseUrl}/images/hero/umrah-hero.jpg`,

    telephone: "+971-52-565-7940",

    priceRange: "$$",

    description:
      "Umrah Tours provides Umrah packages, visa assistance, hotel booking, flights and international holiday packages from the UAE.",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Beside Ministry of Health, Al Ghubaiba",
      addressLocality: "Sharjah",
      addressCountry: "AE",
      postOfficeBoxNumber: "28569",
    },

    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971-52-565-7940",
      contactType: "customer service",
      availableLanguage: [
        "English",
        "Hindi",
        "Arabic",
      ],
    },

    areaServed: [
      {
        "@type": "Country",
        name: "United Arab Emirates",
      },
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "Country",
        name: "United Kingdom",
      },
    ],

    knowsAbout: [
      "Umrah Packages",
      "Umrah Travel",
      "Umrah Visa Assistance",
      "Flights",
      "Hotel Booking",
      "Makkah Hotels",
      "Madinah Hotels",
      "International Holiday Packages",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}