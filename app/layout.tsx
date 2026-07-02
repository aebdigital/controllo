import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CookieBanner from "../components/CookieBanner";
import FloatingCta from "../components/FloatingCta";
import Header from "../components/Header";
import Footer from "../components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CONTROLLO | Kontrola vozidiel pred kúpou",
  description:
    "Nezávislá kontrola ojazdeného auta kdekoľvek na Slovensku za 159 eur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={`${outfit.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingCta />
        <CookieBanner />
      </body>
    </html>
  );
}


