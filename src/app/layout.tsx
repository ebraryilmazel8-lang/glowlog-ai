import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Glow Log — AI Skincare Companion",
  description:
    "Analyze your skin with AI, get personalized routines, and track your skincare journey. Powered by Gemini.",
  keywords: ["skincare", "AI", "skin analysis", "routine tracker", "beauty"],
  openGraph: {
    title: "Glow Log — AI Skincare Companion",
    description: "Analyze your skin with AI, get personalized routines, and track your skincare journey.",
    url: "https://glowlog-ai.vercel.app",
    siteName: "Glow Log",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glow Log — AI Skincare Companion",
    description: "Analyze your skin with AI, get personalized routines, and track your skincare journey.",
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
