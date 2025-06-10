// app/api/send-mail-external/route.ts
import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { apiKey, to, subject, text } = await req.json();
  if (!apiKey) return new Response("Missing API key", { status: 400 });

  await connectToDB();
  const user = await User.findOne({ apiKey });
  if (!user) return new Response("Invalid API key", { status: 403 });

  const transporter = nodemailer.createTransport({
    service: user.provider === "google" ? "gmail" : undefined,
    host: user.provider === "azure-ad" ? "smtp.office365.com" : undefined,
    port: 587,
    secure: false,
    auth: {
      type: "OAuth2",
      user: user.email,
      clientId:
        user.provider === "google"
          ? process.env.GOOGLE_CLIENT_ID
          : process.env.AZURE_CLIENT_ID,
      clientSecret:
        user.provider === "google"
          ? process.env.GOOGLE_CLIENT_SECRET
          : process.env.AZURE_CLIENT_SECRET,
      refreshToken: user.refreshToken,
      accessToken: user.accessToken,
    },
  });

  await transporter.sendMail({ from: user.email, to, subject, text });
  return new Response(JSON.stringify({ success: true }));
}
