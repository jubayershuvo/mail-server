import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import User from "@/models/User";
import { connectToDB } from "@/utils/db";
import crypto from "crypto";

const generateApiKey = () => crypto.randomBytes(32).toString("hex");

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://mail.google.com https://www.googleapis.com/auth/gmail.send",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),

    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: "openid email profile user.read Mail.Send",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
      }
      return token;
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.provider = token.provider;
        session.user.providerAccountId = token.providerAccountId;
      }
      return session;
    },
  },

  events: {
    async signIn({ account, user }: any) {
      try {
        await connectToDB();

        if (account?.provider && user?.email) {
          const existingUser = await User.findOne({ email: user.email });

          const updateData: any = {
            email: user.email,
            name: user.name, // ✅ Store full name
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            accessToken: account.access_token,
          };

          if (account.refresh_token) {
            updateData.refreshToken = account.refresh_token;
          } else if (existingUser?.refreshToken) {
            updateData.refreshToken = existingUser.refreshToken;
          }

          updateData.apiKey = existingUser?.apiKey || generateApiKey();

          await User.findOneAndUpdate({ email: user.email }, updateData, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
          });

          console.log("User saved or updated in DB");
        }
      } catch (error) {
        console.error("Error saving user during signIn:", error);
      }
    },
  },
};
