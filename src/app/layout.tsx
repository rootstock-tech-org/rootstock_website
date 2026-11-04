import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./b2b.css";
import "./showcase.css";
import "./motion.css";

const departureMono = localFont({
  src: "./fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure-mono",
  display: "swap",
});
import "./carousel.css";
import HydrationSuppressor from "../components/HydrationSuppressor";
import ScrollReveal from "../components/ScrollReveal";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rootstocktech.co.in"),
  title: "RootStock Technology | Applied AI for enterprise teams",
  description: "RootStock builds AI assistants, vision systems and decision tools around client data and workflows for manufacturing, financial services and education.",
  keywords: "applied AI, manufacturing AI, financial services AI, education AI, enterprise AI, computer vision",
  authors: [{ name: "RootStock Technology" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "RootStock Technology | Applied AI for enterprise teams",
    description: "AI systems built around your data, processes and people.",
    url: "https://www.rootstocktech.co.in",
    siteName: "RootStock Technology",
    type: "website",
  },
  icons: {
    icon: '/RootStock.jpeg',
    apple: '/RootStock.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`antialiased ${departureMono.variable}`}>
        {/* Use HydrationSuppressor for content to avoid extension-related hydration issues */}
        <HydrationSuppressor>
          {children}
        </HydrationSuppressor>
        <ScrollReveal />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
