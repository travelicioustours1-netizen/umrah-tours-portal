import OrganizationSchema from "@/components/SEO/OrganizationSchema";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Umrah Tours | Premium Umrah Packages, Visa & Travel Services",

  description:
    "Book reliable Umrah packages with Umrah Tours. Complete Umrah services including visa assistance, hotels, transportation and guided pilgrimage support.",

  keywords: [
    "Umrah Tours",
    "Umrah Packages",
    "Umrah Visa",
    "Hajj and Umrah",
    "Makkah Hotels",
    "Madinah Hotels",
    "Umrah Travel Agency",
  ],

  authors: [
    {
      name: "Umrah Tours",
    },
  ],

  openGraph: {
    title:
      "Umrah Tours | Your Trusted Partner For A Blessed Umrah Journey",

    description:
      "Experience a smooth and comfortable Umrah journey with premium packages, visa assistance and complete travel support.",

    url: "https://www.umrahtours.co",

    siteName: "Umrah Tours",

    locale: "en_US",

    type: "website",
  },


  twitter: {
    card: "summary_large_image",

    title:
      "Umrah Tours | Premium Umrah Packages",

    description:
      "Book your Umrah journey with trusted travel experts.",
  },


  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body>
        <OrganizationSchema />
        {children}
        <WhatsAppButton />
      </body>

    </html>
  );
}