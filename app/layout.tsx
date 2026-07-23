import type { Metadata } from "next";
import { Suspense } from "react";
import { Manrope, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { HOME_DESCRIPTION, SITE_URL } from "@/lib/seo";
import "./globals.css";

const display = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-body", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "BloomShield CIC", template: "%s | BloomShield CIC" },
  description: HOME_DESCRIPTION,
  keywords: ["cancer prevention", "community health", "implementation science", "cancer screening", "health inequalities", "international health partnerships"],
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/bloomshield-favicon-512.png", type: "image/png" }], apple: "/bloomshield-favicon-512.png" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB" className={`${display.variable} ${body.variable}`}><body><a href="#main-content" className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-white px-4 py-2 font-bold text-teal-900 shadow-lg focus:translate-y-0">Skip to main content</a><Header/><main id="main-content">{children}</main><Footer/><Suspense fallback={null}><AnalyticsConsent/></Suspense></body></html>;
}
