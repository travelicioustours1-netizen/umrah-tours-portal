import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import Script from "next/script";

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

      <Script
        id="external-script"
        strategy="afterInteractive"
        src="https://emrldtp.com/NTcxNzMx.js?t=571731"
      />
    </>
  );
}