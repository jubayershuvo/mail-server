import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import ZohoProvider from "next-auth/providers/zoho";
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
      tenantId: "common",
      authorization: {
        params: {
          scope: "openid profile email offline_access Mail.Send",
          prompt: "consent",
        },
      },
    }),
    ZohoProvider({
      clientId: process.env.ZOHO_CLIENT_ID!,
      clientSecret: process.env.ZOHO_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "Aaaserver.profile.Read ZohoMail.messages.CREATE ZohoMail.accounts.READ",
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
    async signIn({ account, user }: { account: any; user: any }) {
      try {
        await connectToDB();

        if (!account?.provider || !user?.email) return;

        const existingUser = await User.findOne({
          email: user.email,
          provider: account.provider,
        });

       

        if (!existingUser) {
          // Create new user
          const newUser = new User({
            email: user.email,
            name: user.name,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            refreshToken: account.refresh_token,
            apiKey: generateApiKey(),
          });
          await newUser.save();
        } else {
          // Update refresh token if changed
          if (
            account.refresh_token &&
            existingUser.refreshToken !== account.refresh_token
          ) {
            existingUser.refreshToken = account.refresh_token;
            await existingUser.save();
          }
        }
      } catch (error) {
        console.error("Error saving user during signIn:", error);
      }
    },
  },
};
