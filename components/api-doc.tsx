"use client";

import { useEffect, useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ApiDocPage() {
  const { data: session, status }: any = useSession();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.email) {
      return;
    }
    async function fetchApiKey() {
      try {
        const res = await fetch("/api/get-api-key");
        if (!res.ok) throw new Error("Failed to fetch API key");
        const data = await res.json();
        setApiKey(data.apiKey);
      } catch (err: any) {
        setApiKey(null);
      } finally {
        setLoading(false);
      }
    }

    fetchApiKey();
  }, [status]);

  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <main className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 px-6 py-10 sm:px-10 md:px-20 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8">
        📧 Email Sending API Documentation
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🔑 Your API Key</h2>

        {apiKey ? (
          <div className="relative bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm break-words w-full flex items-center justify-between transition-colors duration-300">
            <span className="break-all">
              {apiKey &&
                `${apiKey.slice(0, 8)}${"*".repeat(apiKey.length - 8)}`}
            </span>

            <button
              onClick={handleCopy}
              className="ml-4 p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              title="Copy API Key"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <ClipboardCopy className="w-5 h-5" />
              )}
            </button>
          </div>
        ) : (
          <Link
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-300 shadow-md"
            href="/api/auth/signin"
          >
            Get Api Key
          </Link>
        )}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🚀 Send Email Endpoint</h2>
        <p className="mb-4">
          Send an email using your linked Gmail, Outlook and Zoho account.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto text-sm whitespace-pre-wrap transition-colors duration-300">
          {`POST ${baseUrl}/api/send-mail-external
Content-Type: application/json

{
  "apiKey": ${
    apiKey
      ? `${apiKey.slice(0, apiKey.length / 2)}${"*".repeat(apiKey.length / 2)}`
      : `"apiKey"`
  },
  "to": "freind@example.com",
  "subject": "Greetings from ${session?.user?.name || "JSCoder"}",
  "text": "Hello, this is a test email sent via API."
}`}
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">📋 Parameters</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>apiKey</strong> (string, required): Your unique API key.
          </li>
          <li>
            <strong>to</strong> (string, required): Recipient email address.
          </li>
          <li>
            <strong>subject</strong> (string, required): Email subject line.
          </li>
          <li>
            <strong>text</strong> (string, required): Plain text body of the
            email.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">✅ Success Response</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto text-sm whitespace-pre-wrap transition-colors duration-300">
          {`Status: 200 OK
{
  "success": true
}`}
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">❌ Error Responses</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <code>400 Bad Request</code>: Missing API key or required fields.
          </li>
          <li>
            <code>403 Forbidden</code>: Invalid API key.
          </li>
          <li>
            <code>500 Internal Server Error</code>: Email sending failed.
          </li>
        </ul>
      </section>

      <button
        onClick={() => router.back()}
        disabled={loading}
        className="m-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 transition-colors duration-300"
      >
        Back
      </button>
    </main>
  );
}
