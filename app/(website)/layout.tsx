import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />

      {/* Travelpayouts Drive */}
      <Script
        id="travelpayouts-drive"
        strategy="afterInteractive"
        src="https://emrldtp.com/NTcxNzMx.js?t=571731"
      />
    </>
  );
}
