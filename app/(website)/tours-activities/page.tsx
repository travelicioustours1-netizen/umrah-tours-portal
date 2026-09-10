import type { Metadata } from "next";

import ToursActivitiesClient from "./ToursActivitiesClient";

const SITE_URL = "https://umrahtours.co";

export const metadata: Metadata = {
  title:
    "Tours & Activities Worldwide | Attractions & Experiences | Umrah Tours",
  description:
    "Discover tours, attractions, activities and memorable experiences worldwide. Explore popular destinations, local experiences and activities through trusted travel partners.",
  keywords: [
    "tours and activities worldwide",
    "tours worldwide",
    "activities worldwide",
    "travel activities",
    "tour attractions",
    "things to do worldwide",
    "things to do on holiday",
    "tourist attractions",
    "local experiences",
    "travel experiences",
    "attractions and activities",
    "Umrah Tours",
  ],
  alternates: {
    canonical: `${SITE_URL}/tours-activities`,
  },
  openGraph: {
    title:
      "Tours & Activities Worldwide | Attractions & Experiences | Umrah Tours",
    description:
      "Explore tours, attractions, activities and local experiences worldwide through trusted international travel partners.",
    url: `${SITE_URL}/tours-activities`,
    siteName: "Umrah Tours",
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tours & Activities Worldwide | Umrah Tours",
    description:
      "Discover tours, attractions, activities and memorable travel experiences worldwide.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const toursActivitiesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Tours & Activities Worldwide",
  description:
    "Discover tours, attractions, activities and memorable experiences worldwide through trusted international travel partners.",
  url: `${SITE_URL}/tours-activities`,
  isPartOf: {
    "@type": "WebSite",
    name: "Umrah Tours",
    url: SITE_URL,
  },
  about: {
    "@type": "Thing",
    name: "Tours, Attractions and Activities",
  },
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  mainEntity: {
    "@type": "Service",
    name: "Worldwide Tours & Activities",
    serviceType: "Tours and Activities",
    description:
      "Tours, attractions, activities and local travel experiences available across destinations worldwide.",
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  },
};

export default function ToursActivitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toursActivitiesSchema),
        }}
      />

      <ToursActivitiesClient />
    </>
  );
}