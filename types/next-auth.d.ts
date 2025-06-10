// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      accessToken: string;
      refreshToken: string;
      provider: string;
      providerAccountId: string;
    };
  }

  interface JWT {
    accessToken: string;
    refreshToken: string;
    provider: string;
    providerAccountId: string;
  }
}
