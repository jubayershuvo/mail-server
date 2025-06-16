// app/api/send-mail-external/route.ts
import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import { sendGmailMail } from "@/lib/gmail";
import { sendOutlookMailWithRefreshToken } from "@/lib/outlook";
import { sendZohoMailWithRefreshToken } from "@/lib/zoho";
import Uses from "@/models/Uses";

export async function POST(req: Request) {
  const { apiKey, to, subject, text } = await req.json();
  if (!apiKey) return new Response("Missing API key", { status: 400 });
  if (!to) return new Response("Missing recipient", { status: 400 });
  if (!subject) return new Response("Missing subject", { status: 400 });
  if (!text) return new Response("Missing text", { status: 400 });

  await connectToDB();
  const user = await User.findOne({ apiKey });
  if (!user) return new Response("Invalid API key", { status: 403 });

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
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: any) {
      console.error("Send mail error:", error);
      return new Response(
        JSON.stringify({
          error: error.message || "Failed to send mail",
          details: error,
        }),
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
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: any) {
      console.error("Send mail error:", error);
      return new Response(
        JSON.stringify({
          error: error.message || "Failed to send mail",
          details: error,
        }),
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

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: any) {
      console.error("Send mail error:", error);
      return new Response(
        JSON.stringify({
          error: error.message || "Failed to send mail",
          details: error,
        }),
        { status: 500 }
      );
    }
  } else {
    return new Response(
      JSON.stringify({
        error: "Sending mail is not available with this provider",
      }),
      { status: 501 }
    );
  }
}
