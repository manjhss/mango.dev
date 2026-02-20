import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { MangoProvider } from "@/components/providers";
import { LANGS } from "@/lib/constants";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mango — Multilingual Blog",
  description: "A demo of the Mango translation library powering a multilingual blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MangoProvider langs={[...LANGS]} defaultLang="en">
          {children}
        </MangoProvider>
      </body>
    </html>
  );
}
