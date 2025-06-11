"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status }:any = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-4 text-lg">Loading...</div>;
  }

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {session?.user?.name || session?.user?.email || "User"}!
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/send-mail")}
            className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Send Mail
          </button>
          <button
            onClick={() => router.push("/api-doc")}
            className="px-6 py-2 rounded-xl border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            API Docs
          </button>
        </div>
      </main>
    </>
  );
}
