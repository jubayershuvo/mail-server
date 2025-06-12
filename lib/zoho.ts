import axios, { AxiosError } from "axios";

export async function sendZohoMailWithRefreshToken({
  refreshToken,
  recipient,
  subject,
  content,
}: {
  refreshToken: string;
  recipient: string;
  subject: string;
  content: string;
}) {
  try {
    // Step 1: Get access token
    const tokenResponse = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      null,
      {
        params: {
          refresh_token: refreshToken,
          client_id: process.env.ZOHO_CLIENT_ID,
          client_secret: process.env.ZOHO_CLIENT_SECRET,
          grant_type: "refresh_token",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Step 2: Get account info (accountId and fromAddress)
    const accountResponse = await axios.get(
      "https://mail.zoho.com/api/accounts",
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );

    const account = accountResponse.data.data?.[0];

    if (!account) {
      throw new Error("Failed to get account info from Zoho. Visit https://mail.zoho.com");
    }

    const accountId = account.accountId;
    const fromAddress = account.mailboxAddress;

    // Step 3: Send the email
    const mailResponse = await axios.post(
      `https://mail.zoho.com/api/accounts/${accountId}/messages`,
      {
        fromAddress,
        toAddress: recipient,
        subject,
        content,
        mailFormat: "html",
      },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return mailResponse;
  } catch (err: unknown) {
    const error = err as AxiosError;
    console.error(
      "Zoho Mail send error:",
      error.response?.data || error.message
    );
    throw error;
  }
}
