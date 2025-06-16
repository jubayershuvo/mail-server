"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaBook,
  FaSignOutAlt,
  FaUser,
  FaIdBadge,
  FaGoogle,
  FaMicrosoft,
  FaKey,
  FaChartLine,
  FaCloud,
} from "react-icons/fa";

export default function DashboardPage() {
  const { data: session, status }: any = useSession();
  const router = useRouter();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [usesData, setUsesData] = useState<any>({});

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `/api/uses?userEmail=${session.user.email}&provider=${session.user.provider}`
        );
        if (!res.ok) throw new Error("Failed to fetch API key");
        const data = await res.json();
        setUsesData(data);
      } catch (err: any) {
        console.log(err)
      }
    }

    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  useEffect(() => {
    async function fetchApiKey() {
      try {
        const res = await fetch("/api/get-api-key");
        if (!res.ok) throw new Error("Failed to fetch API key");
        const data = await res.json();
        setApiKey(data.apiKey);
      } catch (err: any) {
        console.log(err)
      }
    }

    if (status === "authenticated") {
      fetchApiKey();
    }
  }, [status]);

  const handleCopy = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const user = session?.user;
  const dummyStats = {
    emailsSentToday: 14,
    emailsSentMonth: 243,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 px-6 py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-2">
            Welcome, {user?.name || user?.email || "User"}!
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-300">
            Your centralized dashboard for email management and API access.
          </p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            icon={<FaEnvelope className="text-blue-600 text-3xl" />}
            title="Send Emails"
            desc="Send transactional or bulk emails via Gmail, Outlook or Zoho."
          />

          <Card
            icon={<FaBook className="text-indigo-600 text-3xl" />}
            title="API Documentation"
            desc="Access integration guides, examples, and complete API reference."
          />

          <div className="bg-white dark:bg-gray-900 overflow-hidden p-6 rounded-2xl shadow hover:shadow-lg transition space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Your Profile
              </h2>
              <FaUser className="text-purple-600 text-2xl" />
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              {user?.image && (
                <img
                  src={user?.image}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border object-cover mb-2"
                />
              )}
              <p className="flex items-center gap-2">
                <FaIdBadge /> Name:{" "}
                <strong>{user?.name || "Not available"}</strong>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope /> Email: <strong>{user?.email}</strong>
              </p>
              {session?.user?.provider && (
                <p className="flex items-center gap-2">
                  {session.user.provider === "google" ? (
                    <FaGoogle className="text-red-500" />
                  ) : session.user.provider === "azure-ad" ? (
                    <FaMicrosoft className="text-blue-600" />
                  ) : session.user.provider === "zoho" ? (
                    <FaKey className="text-orange-600" />
                  ) : (
                    <FaEnvelope className="text-blue-600" />
                  )}
                  Provider:{" "}
                  <strong className="capitalize">
                    {session.user.provider}
                  </strong>
                </p>
              )}
            </div>
          </div>

          <Card
            icon={<FaChartLine className="text-green-500 text-3xl" />}
            title="Usage Stats"
            desc={
              <>
                <p>
                  Today: <strong>{usesData?.todayUses || 0}</strong>
                </p>
                <p>
                  This Month: <strong>{usesData?.thisMonthUses || 0}</strong>
                </p>
                <p>
                  Total: <strong>{usesData?.totalUses || 0}</strong>
                </p>
              </>
            }
          />

          <Card
            icon={<FaKey className="text-yellow-500 text-3xl" />}
            title="API Key"
            desc={
              <>
                <p className="break-words">
                  {apiKey?.slice(0, apiKey.length / 2)}$
                  {"*".repeat(apiKey?.length! / 2) || "Loading..."}
                </p>
                <button
                  onClick={handleCopy}
                  className="mt-1 text-sm text-blue-600 dark:text-blue-400 cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </>
            }
          />

          <Card
            icon={<FaCloud className="text-sky-500 text-3xl" />}
            title="Provider Status"
            desc={`Provider: ${
              session?.user?.provider ? "Connected" : "Not connected"
            }`}
          />
        </section>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button
            onClick={() => router.push("/send-mail")}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            <FaEnvelope /> Send Mail
          </button>

          <button
            onClick={() => router.push("/api-doc")}
            className="flex items-center gap-2 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
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

// Reusable card
function Card({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}) {
  return (
    <div className="bg-white overflow-hidden dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
        {icon}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{desc}</div>
    </div>
  );
}
