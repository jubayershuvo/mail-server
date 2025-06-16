"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGoogle,
  FaMicrosoft,
  FaEnvelope,
  FaCodeBranch,
  FaRocket,
  FaLock,
} from "react-icons/fa";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  return (
    <main className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-800 py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Unified Email API for Gmail, Outlook & Zoho
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-200"
        >
          Send, receive, and manage emails through a single API gateway with
          secure OAuth2 bindings and full user control.
        </motion.p>

        {!loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Link href={session ? "/dashboard" : "/api/auth/signin"}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-md text-lg transition">
                {session ? "Go to Dashboard" : "Get Started"}
              </button>
            </Link>
          </motion.div>
        )}
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: <FaLock size={30} />,
              title: "OAuth2 Binding",
              desc: "Bind user Gmail, Outlook, or Zoho accounts with secure OAuth2 flow.",
            },
            {
              icon: <FaCodeBranch size={30} />,
              title: "Unified API",
              desc: "Send and manage emails from multiple providers via a single REST API.",
            },
            {
              icon: <FaRocket size={30} />,
              title: "Fast Delivery",
              desc: "High-speed delivery with logging and retry management.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ delay: i * 0.2 }}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4 text-indigo-600 dark:text-indigo-400">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-blue-50 dark:bg-blue-900 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center text-sm">
          {[
            "1. User logs in via Google, Microsoft or Zoho.",
            "2. OAuth2 tokens are stored securely in MongoDB.",
            "3. Admin uses API key to call `/api/send-mail-external`.",
            "4. Email is sent on behalf of that user via the bound provider.",
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 shadow rounded-xl text-gray-800 dark:text-gray-100"
            >
              {step}
            </motion.div>
          ))}
        </div>
      </section>

      {/* API Reference */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">API Overview</h2>
        <div className="text-left text-sm bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <pre className="overflow-x-auto text-gray-800 dark:text-gray-100">
{`POST ${process.env.NEXT_PUBLIC_BASE_URL}/api/send-mail-external

Headers:
  Content-Type: application/json

Body:
{
  "apiKey": "your_api_key",
  "to": "recipient@example.com",
  "subject": "Hello from Mail Server",
  "text": "<strong>Hello</strong> World!"
}`}
          </pre>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Use this endpoint to send email on behalf of any user who has
            bound their email account.
          </p>
        </div>
      </section>

      {/* Supported Providers */}
      <section className="bg-purple-50 dark:bg-purple-900 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Supported Providers</h2>
        <div className="flex justify-center gap-10 text-gray-700 dark:text-white text-4xl">
          <FaGoogle title="Gmail" />
          <FaMicrosoft title="Outlook" />
          <FaEnvelope title="Zoho" />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white dark:bg-gray-900 py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "Is this safe for production use?",
              a: "Yes, we use secure OAuth2 flows and never store user passwords. All tokens are encrypted and stored in MongoDB.",
            },
            {
              q: "How do I generate an API key?",
              a: "After login, visit your dashboard and click 'Generate API Key'. It will be tied to your account.",
            },
            {
              q: "Can I revoke OAuth access?",
              a: "Yes. Users can revoke access from their Gmail, Outlook, or Zoho settings at any time.",
            },
          ].map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold text-lg">{faq.q}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white text-center py-20 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Start Sending Emails in Minutes
        </h2>
        <p className="mb-6 text-sm">
          Bind your accounts and integrate mail-sending with just one API call.
        </p>
        <Link href={session ? "/dashboard" : "/api/auth/signin"}>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
            {session ? "Open Dashboard" : "Get Started Now"}
          </button>
        </Link>
      </section>

    </main>
  );
}
