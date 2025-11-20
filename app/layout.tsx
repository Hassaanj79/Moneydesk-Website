import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { TawkChat } from "@/components/TawkChat";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap", // Optimize font loading
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://moneydesk.co';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MoneyDesk - Personal Finance App | Budget Tracker & Expense Manager",
    template: "%s | MoneyDesk",
  },
  description: "Take control of your money with MoneyDesk. Track expenses, manage budgets, handle loans, and achieve financial goals. Free 30-day trial. No credit card required. Cancel anytime.",
  keywords: ["personal finance", "budget tracker", "expense tracking", "money management", "financial planning", "loan management", "savings goals", "budget app", "expense manager", "financial software"],
  authors: [{ name: "MoneyDesk" }],
  creator: "MoneyDesk",
  publisher: "MoneyDesk",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "MoneyDesk",
    title: "MoneyDesk - Personal Finance Management Made Simple",
    description: "Take control of your finances with MoneyDesk. Track expenses, manage budgets, handle loans, and achieve your financial goals.",
    images: [
      {
        url: `${siteUrl}/header-logo.png`,
        width: 1200,
        height: 630,
        alt: "MoneyDesk - Personal Finance Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoneyDesk - Personal Finance Management Made Simple",
    description: "Take control of your finances with MoneyDesk. Track expenses, manage budgets, handle loans, and achieve your financial goals.",
    images: [`${siteUrl}/header-logo.png`],
  },
  icons: {
    icon: "/header-logo.png",
    shortcut: "/header-logo.png",
    apple: "/header-logo.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your Google Search Console verification code here when available
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://moneydesk.co';
  
  // Structured Data (JSON-LD) for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MoneyDesk",
    "url": siteUrl,
    "logo": `${siteUrl}/header-logo.png`,
    "description": "Personal finance management app for tracking expenses, managing budgets, and achieving financial goals.",
    "sameAs": [
      // Add your social media links here when available
      // "https://twitter.com/moneydesk",
      // "https://facebook.com/moneydesk",
      // "https://linkedin.com/company/moneydesk",
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "url": `${siteUrl}/contact`,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MoneyDesk",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MoneyDesk",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "11.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150",
    },
  };

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <InteractiveBackground />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QSWTPNJ8VP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QSWTPNJ8VP');
          `}
        </Script>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
        <TawkChat />
      </body>
    </html>
  );
}

