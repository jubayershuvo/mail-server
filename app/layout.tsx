import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/nav-bar";
import { Providers } from "./providers";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mailer Js",
  description: "Mail by google , zoho , outlook",
  verification: {
    google: "WP_kUEKdqz1jjoskj0TLW5w2Q3deaKQclfqqNRXDw2w",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </SessionWrapper>
      </body>
    </html>
  );
}
