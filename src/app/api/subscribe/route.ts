import { NextResponse } from "next/server";

// Simple email subscription endpoint
// TODO: Connect to your email service (Mailchimp, ConvertKit, Resend, etc.)
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // For now, log the email (visible in Vercel logs)
    // Replace this with your email service integration
    console.log("[SUBSCRIBE]", email, new Date().toISOString());

    // TODO: Integrate with one of these services:
    // - Mailchimp: await addToMailchimp(email)
    // - ConvertKit: await addToConvertKit(email)
    // - Resend: await addToResend(email)
    // - SendGrid: await addToSendGrid(email)

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
