import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Glow Log — AI Skincare Companion",
  description:
    "Analyze your skin with AI, get personalized routines, and track your skincare journey. Powered by Gemini.",
  keywords: ["skincare", "AI", "skin analysis", "routine tracker", "beauty"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
