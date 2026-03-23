import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/lib/theme-context";

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
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "SEVCO — Inspire",
    description: "Digital agency & music services firm. We build great products and help artists thrive.",
    url: "https://sevco.us",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
