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
    google: 'FkYxPdfh6VrbteXLzmOAGlQfxSyraREKSfoU0yzBm2o',
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

  // Google Tag Manager Container ID
  const gtmId = 'GTM-KQL75GQ4';

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="FkYxPdfh6VrbteXLzmOAGlQfxSyraREKSfoU0yzBm2o" />
        {/* Google Tag Manager - Required for GTM verification - Must be in <head> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
        {/* Google tag (gtag.js) - Required for Google Analytics verification - Must be in <head> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QSWTPNJ8VP"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QSWTPNJ8VP');
            `,
          }}
        />
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
        {/* Google Tag Manager (noscript) - Required for GTM verification - Must be immediately after opening <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <InteractiveBackground />
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

