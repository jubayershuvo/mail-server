'use client';

import { useEffect, useState } from "react";

export default function ApiDocPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApiKey() {
      try {
        const res = await fetch("/api/get-api-key");
        if (!res.ok) throw new Error("Failed to fetch API key");
        const data = await res.json();
        setApiKey(data.apiKey);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchApiKey();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-white text-gray-900 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📧 Email Sending API Documentation</h1>

      {loading ? (
        <p>Loading your API key...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">🔑 Your API Key</h2>
            <div className="bg-gray-100 p-4 rounded font-mono text-sm break-words">{apiKey}</div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">🚀 Send Email Endpoint</h2>
            <p className="mb-4">
              Send an email using your linked Gmail or Outlook account.
            </p>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
{`POST /api/send-mail-external
Content-Type: application/json

{
  "apiKey": "YOUR_API_KEY_HERE",
  "to": "recipient@example.com",
  "subject": "Test Email",
  "text": "Hello, this is a test email sent via API."
}`}
            </pre>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">📋 Parameters</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>apiKey</strong> (string, required): Your unique API key.</li>
              <li><strong>to</strong> (string, required): Recipient email address.</li>
              <li><strong>subject</strong> (string, required): Email subject line.</li>
              <li><strong>text</strong> (string, required): Plain text body of the email.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">✅ Success Response</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
{`Status: 200 OK
{
  "success": true
}`}
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">❌ Error Responses</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><code>400 Bad Request</code>: Missing API key or required fields.</li>
              <li><code>403 Forbidden</code>: Invalid API key.</li>
              <li><code>500 Internal Server Error</code>: Email sending failed.</li>
            </ul>
          </section>
        </>
      )}
    </main>
  );
}
