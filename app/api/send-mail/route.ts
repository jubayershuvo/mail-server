import { connectToDB } from '@/utils/db';
import User from '@/models/User';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { userEmail, to, subject, text } = await req.json();

  await connectToDB();

  const user = await User.findOne({ email: userEmail });
  if (!user || !user.refreshToken) {
    return new Response(JSON.stringify({ error: 'Missing OAuth tokens for user' }), { status: 400 });
  }

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!
  );

  oAuth2Client.setCredentials({ refresh_token: user.refreshToken });


  try {
    const accessTokenResponse = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token;
   

    if (!accessToken) {
      throw new Error('Failed to retrieve access token');
    }



    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: userEmail,
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        refreshToken: user.refreshToken,
        accessToken,
      },
    });


    await transporter.sendMail({
      from: userEmail,
      to,
      subject,
      text,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    // console.error('Send mail error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to send mail', details: err.message }),
      { status: 500 }
    );
  }
}
