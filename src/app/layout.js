import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LanguageProvider } from "../context/LanguageContext";
import ScrollToTop from "../components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://iice.ge'),
  title: {
    default: "TSU IICE | Institute of Inorganic Chemistry and Electrochemistry",
    template: "%s | TSU IICE"
  },
  description: "Official Website for R. Agladze Institute of Inorganic Chemistry and Electrochemistry, TSU. Research, innovation, and education in chemistry since 1956.",
  keywords: ["TSU", "IICE", "Chemistry", "Electrochemistry", "Inorganic Chemistry", "Georgia Science", "Tbilisi State University", "რაფიელ აგლაძე", "არაორგანული ქიმია", "ელექტროქიმია"],
  authors: [{ name: "TSU IICE" }],
  creator: "Institute of Inorganic Chemistry and Electrochemistry",
  publisher: "Tbilisi State University",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TSU IICE | Institute of Inorganic Chemistry and Electrochemistry",
    description: "Official Website for R. Agladze Institute of Inorganic Chemistry and Electrochemistry, TSU. Discover our research, history, and scientific departments.",
    url: "https://iice.ge",
    siteName: "TSU IICE",
    locale: "ka_GE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TSU IICE | Institute of Inorganic Chemistry and Electrochemistry",
    description: "Discover our research, history, and scientific departments at TSU IICE.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-slate-50 overflow-x-hidden`}
      >
        <LanguageProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <Analytics />
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  );
}
