import type { Metadata } from "next";
import { Fraunces, Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Book of Adnane — Adnane SIDI-AMADOU, Software Developer",
  description: "Portfolio interactif en livre 3D d'Adnane SIDI-AMADOU, Software Developer & Tech Lead spécialisé Backend, Architecture logicielle & IA.",
  keywords: ["Adnane SIDI-AMADOU", "Software Developer", "Tech Lead", "Backend", "Laravel", "FastAPI", "Python", "Next.js", "Portfolio 3D", "Livre interactif"],
  authors: [{ name: "Adnane SIDI-AMADOU", url: "https://github.com/AdnaneAD1" }],
  openGraph: {
    title: "The Book of Adnane — Software Developer & Tech Lead",
    description: "Feuilletez le livre-objet interactif de mon parcours, mes compétences et mes réalisations en ingénierie logicielle.",
    type: "book",
    locale: "fr_FR",
    siteName: "The Book of Adnane",
  },
  icons: {
    icon: "/file.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${sourceSerif.variable} ${inter.variable}`}>
      <body className="antialiased bg-[var(--paper)] text-[var(--ink)]">
        {children}
      </body>
    </html>
  );
}
