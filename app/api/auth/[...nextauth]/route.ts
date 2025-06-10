// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import MicrosoftProvider from "next-auth/providers/azure-ad";
import User from "@/models/User";
import { connectToDB } from "@/utils/db";
import crypto from "crypto";

const generateApiKey = () => crypto.randomBytes(32).toString("hex");

// Auth options
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/gmail.send",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),

    MicrosoftProvider({
      clientId: process.env.AZURE_CLIENT_ID!,
      clientSecret: process.env.AZURE_CLIENT_SECRET!,
      tenantId: process.env.AZURE_TENANT_ID!,
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
          // Find existing user
          const existingUser = await User.findOne({ email: user.email });

          // Prepare update data
          const updateData: any = {
            email: user.email,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            accessToken: account.access_token,
          };

          // Only update refreshToken if present (important for Google)
          if (account.refresh_token) {
            updateData.refreshToken = account.refresh_token;
          } else if (existingUser?.refreshToken) {
            // keep existing refreshToken if no new one provided
            updateData.refreshToken = existingUser.refreshToken;
          }

          // Use existing API key or generate a new one if user doesn't exist
          updateData.apiKey = existingUser?.apiKey || generateApiKey();

          // Upsert the user record
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

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
