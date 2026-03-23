import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEVCO — Inspire",
  description: "SEVCO is a digital agency and music services firm dedicated to driving progress through great products. Web design, digital architecture, creative consulting, and artist services.",
  keywords: ["SEVCO", "digital agency", "music services", "web design", "Seve", "artist services"],
  openGraph: {
    title: "SEVCO — Inspire",
    description: "Digital agency & music services firm. We build great products and help artists thrive.",
    url: "https://sevelovesyou.com",
    siteName: "SEVCO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
