import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${brand.name} — Inteligencia artificial, atención humana`,
  description: brand.description,
  applicationName: brand.name,
  robots: { index: true, follow: true },
  openGraph: {
    title: `${brand.name} — Todos tus canales. Todo tu conocimiento.`,
    description: brand.description,
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
