// app/api/send-mail-external/route.ts
import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import { sendGmailMail } from "@/lib/gmail";
import { sendOutlookMailWithRefreshToken } from "@/lib/outlook";
import { sendZohoMailWithRefreshToken } from "@/lib/zoho";
import Uses from "@/models/Uses";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { apiKey, to, subject, text } = await req.json();
  if (!apiKey) return NextResponse.json({ error: "Missing API key" }, { status: 400 });
  if (!to) return NextResponse.json({ error: "Missing recipient" }, { status: 400 });
  if (!subject) return NextResponse.json({ error: "Missing subject" }, { status: 400 });
  if (!text) return NextResponse.json({ error: "Missing text" }, { status: 400 });

  await connectToDB();
  const user = await User.findOne({ apiKey });
  if (!user) return NextResponse.json({ error: "Invalid API key" }, { status: 403 });

  if (user.provider === "google") {
    try {
      await sendGmailMail({
        userEmail: user.email,
        refreshToken: user.refreshToken,
        to,
        subject,
        text,
      });
      await Uses.create({
        userId: user._id,
        from: user.email,
        to,
        text,
        provider: user.provider,
      });
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
      console.error("Send mail error:", error);
      return NextResponse.json(
        {
          error: error.message || "Failed to send mail",
          details: error,
        },
        { status: 500 }
      );
    }
  } else if (user.provider === "azure-ad") {
    try {
      await sendOutlookMailWithRefreshToken({
        refreshToken: user.refreshToken,
        recipient: to,
        subject,
        content: text,
      });
      await Uses.create({
        userId: user._id,
        from: user.email,
        to,
        text,
        provider: user.provider,
      });
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
      console.error("Send mail error:", error);
      return NextResponse.json(
        {
          error: error.message || "Failed to send mail",
          details: error,
        },
        { status: 500 }
      );
    }
  } else if (user.provider === "zoho") {
    try {
      await sendZohoMailWithRefreshToken({
        refreshToken: user.refreshToken,
        recipient: to,
        subject,
        content: text,
      });
      await Uses.create({
        userId: user._id,
        from: user.email,
        to,
        text,
        provider: user.provider,
      });

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
      console.error("Send mail error:", error);
      return NextResponse.json(
        {
          error: error.message || "Failed to send mail",
          details: error,
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        error: "Sending mail is not available with this provider",
      },
      { status: 501 }
    );
  }
}