import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import { sendOutlookMailWithRefreshToken } from "@/lib/outlook";
import { sendGmailMail } from "@/lib/gmail";
import { sendZohoMailWithRefreshToken } from "@/lib/zoho";
import Uses from "@/models/Uses";

export async function POST(req: Request) {
  try {
    const {
      userEmail,
      to,
      subject,
      text,
      provider,
      refreshToken: userRefreshToken,
    } = await req.json();

    // Validate input
    if (!userEmail || !to || !subject || !text) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    await connectToDB();

    const user = await User.findOne({ email: userEmail, provider });
    if (!user || !user.refreshToken || !user.provider) {
      return new Response(
        JSON.stringify({ error: "Missing OAuth tokens or provider" }),
        { status: 400 }
      );
    }

    if (user.refreshToken !== userRefreshToken) {
      return new Response(
        JSON.stringify({ error: "Unauthorized login again" }),
        { status: 401 }
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
        await Uses.create({
          userId: user._id,
          from: user.email,
          to,
          text,
          provider,
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
          provider,
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
          provider,
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
