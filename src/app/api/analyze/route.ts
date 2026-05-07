import { NextRequest, NextResponse } from "next/server";
import { analyzeSkin } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { image, mimeType } = await req.json();
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    const result = await analyzeSkin(image, mimeType || "image/jpeg");
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
