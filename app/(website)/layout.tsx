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

      {/* Travelpayouts global script - temporarily disabled while testing widgets */}
      {/*
      <Script
        id="external-script"
        strategy="afterInteractive"
        src="https://emrldtp.com/NTcxNzMx.js?t=571731"
      />
      */}
    </>
  );
}