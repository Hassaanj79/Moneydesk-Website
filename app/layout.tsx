import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { InteractiveBackground } from "@/components/InteractiveBackground";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap", // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  title: "MoneyDesk - Personal Finance App | Budget Tracker & Expense Manager",
  description: "Take control of your money with MoneyDesk. Track expenses, manage budgets, handle loans, and achieve financial goals. Free 14-day trial. No credit card required.",
  keywords: "personal finance, budget tracker, expense tracking, money management, financial planning, loan management, savings goals, budget app, expense manager, financial software",
  authors: [{ name: "MoneyDesk" }],
  openGraph: {
    title: "MoneyDesk - Personal Finance Management Made Simple",
    description: "Take control of your finances with MoneyDesk. Track expenses, manage budgets, handle loans, and achieve your financial goals.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoneyDesk - Personal Finance Management Made Simple",
    description: "Take control of your finances with MoneyDesk. Track expenses, manage budgets, handle loans, and achieve your financial goals.",
  },
  icons: {
    icon: "/header-logo.png",
    shortcut: "/header-logo.png",
    apple: "/header-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
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
      </body>
    </html>
  );
}

