import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import nodemailer from "nodemailer";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const { userEmail, to, subject, text } = await req.json();

    // Connect to MongoDB
    await connectToDB();

    // Find user and their stored OAuth refresh token
    const user = await User.findOne({ email: userEmail });
    if (!user || !user.refreshToken) {
      return new Response(
        JSON.stringify({ error: "Missing OAuth tokens for user" }),
        { status: 400 }
      );
    }

    // Create OAuth2 client with your Google app credentials
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_CLIENT_SECRET!,
      "https://developers.google.com/oauthplayground"
    );

    // Set refresh token
    oauth2Client.setCredentials({
      refresh_token: user.refreshToken,
    });

    // Get access token
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token;

    if (!accessToken) {
      throw new Error("Failed to retrieve access token");
    }

    // Create Nodemailer transporter using OAuth2
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: "OAuth2",
        user: user.email,
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        refreshToken: user.refreshToken,
        accessToken,
      },
    });

    // Verify connection configuration
    await transporter.verify();

    // Send email
    await transporter.sendMail({
      from: `${user.name} <${userEmail}>`,
      to,
      subject,
      text,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    let errorMessage = "Failed to send mail";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error && typeof error === "object" && "details" in error) {
      errorMessage = (error as any).details;
    }

    return new Response(
      JSON.stringify({ error: errorMessage, details: error }),
      { status: 500 }
    );
  }
}
