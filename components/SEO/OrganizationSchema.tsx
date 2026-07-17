export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",

    name: "Umrah Tours",

    url: "https://www.umrahtours.co",

    logo: "https://www.umrahtours.co/logo.png",

    description:
      "Umrah Tours provides premium Umrah packages, visa assistance, hotel booking and complete pilgrimage travel services.",


    contactPoint: {
      "@type": "ContactPoint",

      telephone: "+91-7977127500",

      contactType: "customer service",

      availableLanguage: [
        "English",
        "Hindi",
        "Arabic"
      ]
    },


    areaServed: [
      "India",
      "UAE",
      "UK",
      "Worldwide"
    ],


    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/"
    ]

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