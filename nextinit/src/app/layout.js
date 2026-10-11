import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cosmart — Beauty Without Limits | Luxury Cosmetics",
  description:
    "Cosmart — Discover premium luxury cosmetics that defy gravity. Shop lipstick, perfume, skincare, and exclusive gift sets.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
