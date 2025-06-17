"use client";

import { useEffect, useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ApiDocPage() {
  const { data: session, status }: any = useSession();
  const [apiKey, setApiKey] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [npmCopied, setNpmCopied] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
  const handleNpmCopy = () => {
    navigator.clipboard.writeText("npm install @jubayer_shuvo/mailer-js");
    setNpmCopied(true);
    setTimeout(() => setNpmCopied(false), 1500);
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
  apiKey: ${
    apiKey
      ? `${apiKey.slice(0, apiKey.length / 2)}${"*".repeat(apiKey.length / 2)}`
      : `"apiKey"`
  },
  to: "freind@example.com",
  subject": "Greetings from ${session?.user?.name || "JSCoder"}",
  text: "Hello, this is a test email sent via API."
}`}
        </pre>
      </section>

      <h1 className="text-3xl font-bold mb-6">📄 Package Documentation</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold dark:text-white mb-2">
          📦 Installation
        </h2>
        <div className="relative bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden p-4 flex items-center justify-between transition-colors duration-300">
          <code className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            npm install @jubayer_shuvo/mailer-js
          </code>

          <button
            onClick={handleNpmCopy}
            className="ml-4 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Copy command"
            aria-label="Copy npm install command"
          >
            {npmCopied ? (
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <ClipboardCopy className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </section>

      <section className="mb-6 dark:bg-gray-800 rounded-md dark:text-gray-200">
        <h2 className="text-2xl font-semibold">🚀 Usage</h2>
        <h3 className="text-xl font-medium mt-4 dark:text-gray-300">
          ✅ CommonJS
        </h3>
        <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded mt-2 overflow-auto text-sm">
          {`const sendMail = require("@jubayer_shuvo/mailer-js");

sendMail({
  apiKey: ${
    apiKey
      ? `${apiKey.slice(0, apiKey.length / 2)}${"*".repeat(apiKey.length / 2)}`
      : `"apiKey"`
  },
  to: "freind@example.com",
  subject: "Greetings from ${session?.user?.name || "JSCoder"}",
  text: "Hello, this is a test email sent via API.",
}).then(() => console.log("Email sent!")).catch(console.error);`}
        </pre>

        <h3 className="text-xl font-medium mt-6 dark:text-gray-300">
          ✅ ESModules / TypeScript
        </h3>
        <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded mt-2 overflow-auto text-sm">
          {`import sendMail from "@jubayer_shuvo/mailer-js";

await sendMail({
  apiKey: ${
    apiKey
      ? `${apiKey.slice(0, apiKey.length / 2)}${"*".repeat(apiKey.length / 2)}`
      : `"apiKey"`
  },
  to: "freind@example.com",
  subject: "Greetings from ${session?.user?.name || "JSCoder"}",
  text: "Hello, this is a test email sent via API."
}).then(() => console.log("Email sent!")).catch(console.error);`}
        </pre>
      </section>

      <section className="mb-6 dark:bg-gray-800 dark:text-gray-200">
        <h2 className="text-2xl font-semibold">📋 API Parameters</h2>
        <ul className="list-disc ml-6 mt-2 dark:text-gray-300">
          <li>
            <strong>apiKey</strong>{" "}
            <code className="dark:text-gray-400">(string, required)</code>: Your
            API key.
          </li>
          <li>
            <strong>to</strong>{" "}
            <code className="dark:text-gray-400">(string, required)</code>:
            Recipient's email address.
          </li>
          <li>
            <strong>subject</strong>{" "}
            <code className="dark:text-gray-400">(string, required)</code>:
            Email subject.
          </li>
          <li>
            <strong>text</strong>{" "}
            <code className="dark:text-gray-400">(string, required)</code>:
            Email body text.
          </li>
        </ul>
      </section>

      <section className="mb-6 dark:bg-gray-800 dark:text-gray-200">
        <h2 className="text-2xl font-semibold">✅ Success Response</h2>
        <pre className="bg-green-100 dark:bg-green-700 p-4 rounded mt-2 overflow-auto text-sm">
          {`{
  "success": true
}`}
        </pre>
      </section>

      <section className="dark:bg-gray-800 dark:text-gray-200">
        <h2 className="text-2xl font-semibold">❌ Error Responses</h2>
        <ul className="list-disc ml-6 mt-2 dark:text-gray-300">
          <li>
            <strong>400</strong> - Missing fields or parameters.
          </li>
          <li>
            <strong>403</strong> - Invalid API Key.
          </li>
          <li>
            <strong>500</strong> - Internal Server Error.
          </li>
        </ul>
      </section>
    </main>
  );
}
