import type { Metadata } from "next";

const baseUrl = "https://umrahtours.co";

export const metadata: Metadata = {
  title: "Visa Assistance UAE | UAE, Saudi & International Visas",
  description:
    "Get visa assistance in the UAE for UAE tourist visas, Saudi tourist visas, Umrah visa assistance and selected international destinations. Contact Umrah Tours for travel visa support.",

  keywords: [
    "visa assistance UAE",
    "UAE tourist visa",
    "UAE tourist visa assistance",
    "Saudi tourist visa UAE",
    "Saudi visa assistance",
    "Umrah visa assistance UAE",
    "Umrah visa UAE",
    "visa services Dubai",
    "visa services Sharjah",
    "international visa assistance UAE",
  ],

  alternates: {
    canonical: `${baseUrl}/visa`,
  },

  openGraph: {
    title: "Visa Assistance UAE | Umrah Tours",
    description:
      "Visa assistance for UAE, Saudi Arabia, Umrah and selected international destinations from the UAE.",
    url: `${baseUrl}/visa`,
    siteName: "Umrah Tours",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/hero/umrah-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Visa Assistance UAE - Umrah Tours",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Visa Assistance UAE | Umrah Tours",
    description:
      "Visa assistance for UAE, Saudi Arabia, Umrah and selected international destinations.",
    images: [`${baseUrl}/images/hero/umrah-hero.jpg`],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function VisaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}