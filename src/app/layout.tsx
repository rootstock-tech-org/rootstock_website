import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./carousel.css";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import HydrationSuppressor from "../components/HydrationSuppressor";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Root Stock Tech - AI + EI: The Future of Investment Intelligence",
  description: "We humanize investment technology, bridging the gap between quantitative data and human emotional dynamics to give institutional investors a decisive edge.",
  keywords: "AI, emotional intelligence, investment intelligence, fintech, mutual funds, stock market analysis, AI evaluation tools",
  authors: [{ name: "Root Stock Tech" }],
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {/* Use HydrationSuppressor for content to avoid extension-related hydration issues */}
        <HydrationSuppressor>
          {children}
          <FloatingWhatsApp />
        </HydrationSuppressor>
      </body>
    </html>
  );
}
