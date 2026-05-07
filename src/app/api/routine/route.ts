import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getRoutineAdvice } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { skinType, concerns } = await req.json();
    const result = await getRoutineAdvice(skinType, concerns);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Routine advice error:", error);
    return NextResponse.json(
      { error: "Failed to get routine advice." },
      { status: 500 }
    );
  }
}
