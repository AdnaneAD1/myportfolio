import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Adnane SIDI-AMADOU — Software Developer",
  description: "Software Developer spécialisé Backend — Laravel, Python, FastAPI, Next.js",
  openGraph: {
    title: "Adnane SIDI-AMADOU — Software Developer",
    description: "Software Developer spécialisé Backend — Laravel, Python, FastAPI, Next.js",
    type: "website",
    locale: "fr_FR",
    url: "https://portfolio-adnane.vercel.app", // Placeholder URL
  },
  icons: {
    icon: "/icon.png",
  },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${syne.variable} ${dmMono.variable} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
