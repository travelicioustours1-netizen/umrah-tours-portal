import Providers from "./providers";
import OrganizationSchema from "@/components/SEO/OrganizationSchema";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Metadata } from "next";
import "./globals.css";

const baseUrl = "https://umrahtours.co";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default:
      "Umrah Packages & International Holidays from UAE | Umrah Tours",
    template: "%s | Umrah Tours",
  },

  description:
    "Explore Umrah packages, visa assistance, flights, hotels and international holiday packages with Umrah Tours. Your trusted travel partner for Umrah and holidays from the UAE.",

  keywords: [
    "Umrah packages UAE",
    "Umrah packages Dubai",
    "Umrah packages Sharjah",
    "Umrah travel agency UAE",
    "Umrah visa UAE",
    "Umrah packages from UAE",
    "Umrah Tours",
    "Makkah hotel packages",
    "Madinah hotel packages",
    "holiday packages from UAE",
    "international holidays UAE",
    "Azerbaijan holiday packages",
    "Kazakhstan holiday packages",
  ],

  authors: [
    {
      name: "Umrah Tours",
    },
  ],

  creator: "Umrah Tours",
  publisher: "Umrah Tours",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "Umrah Packages & International Holidays from UAE | Umrah Tours",

    description:
      "Explore premium Umrah packages, visa assistance, flights, hotels and international holiday experiences from the UAE.",

    url: baseUrl,
    siteName: "Umrah Tours",
    locale: "en_AE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Umrah Packages & International Holidays from UAE | Umrah Tours",
    description:
      "Explore Umrah packages and international holiday experiences with Umrah Tours.",
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