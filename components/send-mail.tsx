"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SendMailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({ to: "", subject: "", text: "" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  const sendMail = async () => {
    if (!form.to || !form.subject || !form.text) {
      setResult("⚠️ All fields are required.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          userEmail: session?.user?.email,
          provider: session?.user?.provider,
          refreshToken: session?.user?.refreshToken,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult("✅ Email sent successfully!");
        setForm({ to: "", subject: "", text: "" });
      } else {
        setResult(`❌ Failed: ${data?.error || "Server error"}`);
      }
    } catch (err) {
      setResult("❌ Error sending mail.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <p className="p-6 text-center">Loading session...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
          Send Email
        </h1>

        <input
          placeholder="To"
          type="email"
          className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
        />
        <input
          placeholder="Subject"
          className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <textarea
          placeholder="Message"
          rows={6}
          className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        />

        <div className="flex justify-between items-center">
          <button
            onClick={sendMail}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md disabled:opacity-50 transition"
          >
            {loading ? "Sending..." : "Send"}
          </button>
          <button
            onClick={() => router.back()}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-md disabled:opacity-50 transition"
          >
            Back
          </button>
        </div>

        {result && (
          <p className="mt-4 text-sm text-center text-gray-800 dark:text-gray-200">
            {result}
          </p>
        )}
      </div>
    </div>
  );
}
