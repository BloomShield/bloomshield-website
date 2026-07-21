import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Manrope, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const display = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bloomshield.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "BloomShield CIC | Cancer prevention, powered by communities", template: "%s | BloomShield CIC" },
  description: "BloomShield CIC advances equitable cancer prevention through community engagement, implementation science, innovation and international partnerships.",
  keywords: ["cancer prevention", "community health", "implementation science", "cancer screening", "health inequalities", "international health partnerships"],
  openGraph: { type: "website", locale: "en_GB", siteName: "BloomShield CIC", title: "Cancer prevention, powered by communities", description: "Protect lives. Prevent cancer. Empower communities." },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/bloomshield-favicon-512.png", type: "image/png" }], apple: "/bloomshield-favicon-512.png" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB" className={`${display.variable} ${body.variable}`}><body><a href="#main-content" className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-white px-4 py-2 font-bold text-teal-900 shadow-lg focus:translate-y-0">Skip to main content</a><Header/><main id="main-content">{children}</main><Footer/><Analytics/></body></html>;
}
