import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LanguageProvider } from "../context/LanguageContext";
import ScrollToTop from "../components/ScrollToTop";
import PageTransition from "../components/PageTransition";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const googleSans = localFont({
  src: [
    {
      path: "../fonts/static/GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/static/GoogleSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/static/GoogleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/static/GoogleSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/static/GoogleSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/static/GoogleSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/static/GoogleSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/static/GoogleSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://iice.ge'),
  title: {
    default: "რ. აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი | IICE",
    template: "%s | IICE"
  },
  description: "რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის ოფიციალური ვებ-გვერდი. სამეცნიერო კვლევები, ინოვაციები და განათლება ქიმიის დარგში 1956 წლიდან.",
  keywords: [
    "აგლაძის ინსტიტუტი",
    "არაორგანული ქიმია",
    "ელექტროქიმია",
    "რაფიელ აგლაძე",
    "ქიმიის ინსტიტუტი",
    "საქართველოს მეცნიერება",
    "IICE",
    "Institute of Inorganic Chemistry and Electrochemistry",
    "Rafael Agladze Institute",
    "Inorganic Chemistry Georgia",
    "Electrochemistry Georgia"
  ],
  authors: [{ name: "IICE", url: "https://iice.ge" }],
  creator: "Institute of Inorganic Chemistry and Electrochemistry",
  publisher: "R. Agladze Institute of Inorganic Chemistry and Electrochemistry",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "რ. აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი | IICE",
    description: "რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის ოფიციალური ვებ-გვერდი. სამეცნიერო კვლევები, ინოვაციები და განათლება ქიმიის დარგში 1956 წლიდან.",
    url: "https://iice.ge/",
    siteName: "IICE",
    locale: "ka_GE",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი - IICE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "რ. აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი | IICE",
    description: "სამეცნიერო კვლევები, ინოვაციები და განათლება ქიმიის დარგში 1956 წლიდან.",
    images: ["/images/og-image.png"],
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

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['EducationalOrganization', 'ResearchOrganization'],
      '@id': 'https://iice.ge/#organization',
      name: 'რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი',
      alternateName: [
        'IICE',
        'R. Agladze Institute of Inorganic Chemistry and Electrochemistry',
        'რ. აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი',
        'აგლაძის ინსტიტუტი'
      ],
      url: 'https://iice.ge',
      logo: {
        '@type': 'ImageObject',
        url: 'https://iice.ge/logo.png',
        width: 754,
        height: 764
      },
      image: 'https://iice.ge/images/og-image.png',
      parentOrganization: {
        '@type': 'CollegeOrUniversity',
        name: 'ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი',
        alternateName: 'Ivane Javakhishvili Tbilisi State University (TSU)',
        url: 'https://tsu.ge'
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ელიზბარ მინდელის ქუჩა #11',
        addressLocality: 'თბილისი',
        postalCode: '0186',
        addressCountry: 'GE'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+995-32-212-34-56',
        contactType: 'general',
        email: 'info@iice.ge',
        availableLanguage: ['ka', 'en']
      },
      sameAs: [
        'https://tsu.ge'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://iice.ge/#website',
      url: 'https://iice.ge',
      name: 'IICE - R. Agladze Institute of Inorganic Chemistry and Electrochemistry',
      description: 'Official Website of R. Agladze Institute of Inorganic Chemistry and Electrochemistry.',
      publisher: {
        '@id': 'https://iice.ge/#organization'
      },
      inLanguage: ['ka', 'en']
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="ka" className="overflow-x-clip" suppressHydrationWarning>
      <body
        className={`${googleSans.variable} antialiased min-h-screen flex flex-col bg-slate-50 overflow-x-clip`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        <LanguageProvider>
          <Header />
          <main className="flex-grow">
            <PageTransition>
              {children}
            </PageTransition>
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
