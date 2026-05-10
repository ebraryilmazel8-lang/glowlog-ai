import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Glow Log — Free AI Skincare Analysis & Routine Builder",
  description:
    "Get a personalized AM/PM skincare routine in 10 seconds from one selfie. Powered by Google Gemini AI. Free first analysis — no app, no quiz, no signup.",
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
  verification: {
    google: ["mIowDI_4Vh_dM9ITqHJsdGxV8BwieNSQrnRVHgOvxtk", "JQFUYsH__R3bBf5-ayeg82hhbNEoEb30C7h4f0XUS9A"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  "name": "Glow Log",
                  "url": "https://www.glow-log.com",
                  "description": "AI-powered skin analysis and personalized skincare routine builder. Get your AM/PM routine in 10 seconds from one selfie.",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "Web",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "description": "Free skin analysis"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "2400"
                  }
                },
                {
                  "@type": "Organization",
                  "name": "Glow Log",
                  "url": "https://www.glow-log.com",
                  "logo": "https://www.glow-log.com/icon.svg",
                  "sameAs": [
                    "https://twitter.com/glowlog",
                    "https://instagram.com/glowlog"
                  ]
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "How does AI skin analysis work?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Take a selfie and our Google Gemini AI analyzes your skin type, concerns, and condition to generate a personalized AM/PM skincare routine in under 10 seconds."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is Glow Log free to use?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes! Your first skin analysis is completely free. Premium features including unlimited analyses and detailed ingredient breakdowns are available for $4.99/month."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is my selfie data private?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Absolutely. Your photos are analyzed in real-time and never stored on our servers. We take privacy seriously and never share your data with third parties."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SC51B8DXN7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SC51B8DXN7');
          `}
        </Script>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
