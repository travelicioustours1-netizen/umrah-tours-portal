import Providers from "./providers";
import OrganizationSchema from "@/components/SEO/OrganizationSchema";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.umrahtours.co"),

  title: {
    default: "Umrah Tours | Umrah Packages & International Holidays UAE",
    template: "%s | Umrah Tours",
  },

  description:
    "Book Umrah packages, Umrah visas, flights, hotels and international holiday packages from UAE. Umrah Tours is your trusted partner for Umrah and international holidays.",

  keywords: [
    "Umrah Packages UAE",
    "Umrah Packages Dubai",
    "Umrah Packages Sharjah",
    "Umrah Travel Agency UAE",
    "Umrah Visa UAE",
    "Umrah Tours",
    "Umrah Packages",
    "Umrah Visa",
    "Makkah Hotels",
    "Madinah Hotels",
    "Holiday Packages UAE",
    "International Holidays UAE",
  ],

  authors: [
    {
      name: "Umrah Tours",
    },
  ],

  alternates: {
    canonical: "https://www.umrahtours.co/",
  },

  openGraph: {
    title: "Umrah Tours | Umrah Packages & International Holidays UAE",

    description:
      "Premium Umrah packages, Umrah visa assistance, flights, hotels and international holiday experiences from UAE.",

    url: "https://www.umrahtours.co/",

    siteName: "Umrah Tours",

    locale: "en_AE",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Umrah Tours | Umrah Packages & International Holidays",

    description:
      "Book Umrah packages and international holidays from UAE with Umrah Tours.",
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
        <Providers>
          <OrganizationSchema />
          {children}
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}