import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PREDDI — Tu centro de control inmobiliario",
  description:
    "Marketplace inmobiliario y plataforma de administración de propiedades. Un proyecto de Concepto Bizarro.",
  keywords: [
    "inmobiliario",
    "marketplace",
    "propiedades",
    "administración",
    "remates judiciales",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
