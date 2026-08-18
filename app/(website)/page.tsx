import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import SearchBox from "@/components/home/SearchBox";
import AwwalPromo from "@/components/home/AwwalPromo";
import Services from "@/components/home/Services";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import Destinations from "@/components/home/Destinations";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Umrah Packages & Holiday Packages from UAE",
  description:
    "Book Umrah packages, Umrah visas, flights, hotels and international holiday packages from the UAE with Umrah Tours. Explore Makkah, Madinah and worldwide holiday destinations.",

  alternates: {
    canonical: "https://umrahtours.co/",
  },

  openGraph: {
    title: "Umrah Packages & Holiday Packages from UAE | Umrah Tours",
    description:
      "Discover Umrah packages, flights, hotels, visa assistance and international holidays from the UAE with Umrah Tours.",
    url: "https://umrahtours.co/",
    siteName: "Umrah Tours",
    locale: "en_AE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Umrah Packages & Holiday Packages from UAE | Umrah Tours",
    description:
      "Book Umrah packages and international holidays from the UAE with Umrah Tours.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />

      <SearchBox />

      <AwwalPromo />

      <Services />

      <FeaturedPackages />

      <Destinations />

      <Testimonials />

      <WhyChooseUs />

      <CTA />

      <Footer />
    </>
  );
}