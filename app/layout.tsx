import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Umrah Tours",
  description: "Premium Umrah and Holiday Packages",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}