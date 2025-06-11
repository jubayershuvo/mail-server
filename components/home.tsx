"use client";

import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 p-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">
          Welcome to Mail Server
        </h1>

        <p className="text-lg sm:text-xl text-center mb-8 max-w-2xl">
          Send emails on behalf of your users securely with Gmail or Outlook
          using our API platform. Integrate email services seamlessly with your
          apps.
        </p>

        {!loading && (
          <div className="flex gap-4">
            {session ? (
              <Link href="/dashboard">
                <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg text-lg shadow-md transition">
                  Go to Dashboard
                </button>
              </Link>
            ) : (
              <Link href="/signin">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg shadow-md transition">
                  Login
                </button>
              </Link>
            )}
          </div>
        )}

        <footer className="mt-16 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Mail Server by Md Jubayer
        </footer>
      </main>
    </>
  );
}
