"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  FaEnvelope,
  FaBook,
  FaSignOutAlt,
  FaUser,
  FaIdBadge,
  FaGoogle,
  FaMicrosoft,
} from "react-icons/fa";

export default function DashboardPage() {
  const { data: session, status }: any = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-6 text-lg">Loading...</div>;
  }

  const user = session?.user;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome, {user?.name || user?.email || "User"}!
          </h1>
          <p className="text-gray-600">
            Manage your email integrations and API usage here.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <FaEnvelope className="text-3xl text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Send Emails</h2>
            <p className="text-gray-600 text-sm">
              Easily send transactional or bulk emails via Gmail, Outlook or Zoho.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <FaBook className="text-3xl text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">API Documentation</h2>
            <p className="text-gray-600 text-sm">
              View detailed API reference and examples to integrate into your app.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <FaUser className="text-3xl text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
            <div className="flex flex-col gap-1 text-sm text-gray-700 mt-2">
              {user?.image && (
                <img
                  src={user?.image}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border object-cover mb-2"
                />
              )}
              <p className="flex items-center gap-2">
                <FaIdBadge /> <span>Name:</span>{" "}
                <strong>{user?.name || "Not available"}</strong>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope /> <span>Email:</span>{" "}
                <strong>{user?.email}</strong>
              </p>
              {session?.token?.provider && (
                <p className="flex items-center gap-2">
                  {session.token.provider === "google" ? (
                    <FaGoogle className="text-red-500" />
                  ) : (
                    <FaMicrosoft className="text-blue-600" />
                  )}
                  <span>Provider:</span>{" "}
                  <strong className="capitalize">{session.token.provider}</strong>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button
            onClick={() => router.push("/send-mail")}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            <FaEnvelope /> Send Mail
          </button>

          <button
            onClick={() => router.push("/api-doc")}
            className="flex items-center gap-2 border border-gray-400 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            <FaBook /> API Docs
          </button>

          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </main>
  );
}
