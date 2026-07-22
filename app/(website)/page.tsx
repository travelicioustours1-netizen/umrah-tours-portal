import Hero from "@/components/home/Hero";
import SearchBox from "@/components/home/SearchBox";
import Services from "@/components/home/Services";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import Destinations from "@/components/home/Destinations";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <SearchBox />

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