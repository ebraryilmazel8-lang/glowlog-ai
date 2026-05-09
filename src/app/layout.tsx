import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Glow Log — Free AI Skincare Analysis & Routine Builder",
  description:
    "Get a personalized AM/PM skincare routine in 10 seconds from one selfie. Powered by Google Gemini AI. Free first analysis — no app, no quiz, no sign-up. Your photo is never stored.",
  keywords: [
    "AI skin analysis",
    "AI skin analysis free",
    "skincare routine builder",
    "AM PM skincare routine",
    "skincare ingredient checker",
    "skin analysis app",
    "free skin type quiz",
    "best skincare app 2026",
    "Glow Log",
    "Gemini AI skincare",
    "personalized skincare",
    "skin type detection",
  ],
  openGraph: {
    title: "Glow Log — Free AI Skincare Analysis in 10 Seconds",
    description:
      "Upload a selfie, get a personalized AM/PM routine. Powered by Google Gemini AI. Free, private, no app needed.",
    url: "https://glow-log.com",
    siteName: "Glow Log",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glow Log — Free AI Skincare Analysis in 10 Seconds",
    description:
      "Upload a selfie, get a personalized AM/PM routine. Powered by Google Gemini AI. Free, private, no app needed.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
