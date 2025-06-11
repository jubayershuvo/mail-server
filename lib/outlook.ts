import axios, { AxiosError, AxiosResponse } from "axios";

interface SendMailResponse {
  value: unknown[];
}

export async function sendOutlookMailWithRefreshToken({
  refreshToken,
  recipient,
  subject,
  content,
}: {
  refreshToken: string;
  recipient: string;
  subject: string;
  content: string;
}): Promise<AxiosResponse<SendMailResponse>> {
  try {
    // Step 1: Refresh Access Token
    const tokenRes = await axios.post<Record<string, string>>(
      `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: process.env.AZURE_AD_CLIENT_ID!,
        client_secret: process.env.AZURE_AD_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
        scope: "Mail.Send",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Refresh token response:", tokenRes.data.access_token)

    const accessToken = tokenRes.data.access_token;
    if (!accessToken) throw new Error("Failed to obtain access token");

    // Step 2: Send Email
    const sendMailResponse:any = await fetch(
      "https://graph.microsoft.com/v1.0/me/sendMail",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject,
            body: {
              contentType: "Text",
              content,
            },
            toRecipients: [
              {
                emailAddress: {
                  address: recipient,
                },
              },
            ],
          },
          saveToSentItems: true,
        }),
      }
    );

    if (!sendMailResponse.ok) {
      throw new Error(
        `Failed to send mail: ${sendMailResponse.status} ${sendMailResponse.statusText}`
      );
    }

    console.log("Mail sent successfully");
    return sendMailResponse;
  } catch (err: unknown) {
    const error = err as AxiosError;
    console.error("Send mail error:", error.response?.data || error.message);
    throw error;
  }
}
