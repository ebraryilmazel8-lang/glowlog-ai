import { NextRequest, NextResponse } from "next/server";
import { analyzeSkin } from "@/lib/gemini";

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // max requests per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
        rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
  }

  entry.count++;
    if (entry.count > RATE_LIMIT_MAX) {
          return true;
    }
    return false;
}

// Clean up old entries every 10 minutes
if (typeof globalThis !== "undefined") {
    setInterval(() => {
          const now = Date.now();
          for (const [key, val] of rateLimit.entries()) {
                  if (now > val.resetTime) rateLimit.delete(key);
          }
    }, 10 * 60 * 1000);
}

export async function POST(req: NextRequest) {
    // Get client IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        "unknown";

  // Check rate limit
  if (isRateLimited(ip)) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
              );
  }

  try {
        const { image, mimeType, userInfo } = await req.json();
        if (!image) {
                return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }
        const result = await analyzeSkin(image, mimeType || "image/jpeg", userInfo);
        return NextResponse.json(result);
  } catch (error: any) {
        console.error("Analysis error:", error);
        return NextResponse.json(
          { error: "Analysis failed. Please try again." },
          { status: 500 }
              );
  }
}
