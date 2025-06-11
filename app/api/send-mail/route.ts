import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import { sendOutlookMailWithRefreshToken } from "@/lib/outlook";
import { sendGmailMail } from "@/lib/gmail";

export async function POST(req: Request) {
  try {
    const { userEmail, to, subject, text } = await req.json();

    // Validate input
    if (!userEmail || !to || !subject || !text) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    await connectToDB();

    const user = await User.findOne({ email: userEmail });
    if (!user || !user.refreshToken || !user.provider) {
      return new Response(
        JSON.stringify({ error: "Missing OAuth tokens or provider" }),
        { status: 400 }
      );
    }

    if (user.provider === "google") {
      try {
        await sendGmailMail({
          userEmail: user.email,
          refreshToken: user.refreshToken,
          to,
          subject,
          text,
          senderName: user.name,
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
      return new Response(
        JSON.stringify({ error: "Zoho provider not supported" }),
        { status: 400 }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Unsupported provider: " + user.provider }),
        { status: 400 }
      );
    }
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
}
