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
  }, [status]);

  const sendMail = async () => {
    if (!form.to || !form.subject || !form.text) {
      setResult("All fields are required.");
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
      setResult("❌ Error sending mail");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <p className="p-6">Loading session...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Send Email</h1>
      <input
        placeholder="To"
        className="border p-2 w-full mb-2 rounded"
        value={form.to}
        onChange={(e) => setForm({ ...form, to: e.target.value })}
      />
      <input
        placeholder="Subject"
        className="border p-2 w-full mb-2 rounded"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <textarea
        placeholder="Message"
        className="border p-2 w-full mb-2 rounded"
        rows={5}
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      />
      <button
        onClick={sendMail}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send"}
      </button>
      <button
        onClick={() => router.back()}
        disabled={loading}
        className="float-right bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        Back
      </button>
      <p className="mt-3 text-sm text-gray-700">{result}</p>
    </div>
  );
}
