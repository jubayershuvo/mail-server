"use client";

export default function PrivacyPolicyPage() {
  return (
    <main className="p-6 min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400 text-center">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when using our services at <strong>Mailer</strong>, a unified email platform.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <p>
            When you use our service, we collect basic account information such as:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Email address</li>
            <li>OAuth tokens from Gmail, Outlook, or Zoho (encrypted)</li>
            <li>User metadata like name and profile picture (optional)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p>
            We only use your information to:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Authenticate you via OAuth</li>
            <li>Send emails through your authorized provider</li>
            <li>Display basic account data in your dashboard</li>
          </ul>
          <p className="mt-2">We do not use your information for advertising or resale.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Security</h2>
          <p>
            We implement modern encryption, access control, and token security practices to protect your data. OAuth tokens are encrypted in transit and at rest. However, no system is 100% immune to breaches.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Data Sharing & Third-Party Access</h2>
          <p>
            We do <strong>not</strong> share, sell, or rent your personal data to any third parties. All email operations are performed directly through the APIs of Gmail, Outlook, or Zoho using the access you grant.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Data Retention</h2>
          <p>
            We retain your OAuth tokens only while your account is active. If you revoke access or delete your account, all associated data is purged automatically within 24 hours.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time to reflect changes to our practices. We will notify you via dashboard alerts or email if the changes are significant.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, you can contact us at:
          </p>
          <ul className="list-none ml-2 mt-2 text-sm">
            <li>
              Email:{" "}
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                className="underline text-blue-600 dark:text-blue-400"
              >
                 {process.env.NEXT_PUBLIC_EMAIL}
              </a>
            </li>
            <li>
              Project:{" "}
              <a
                href={process.env.NEXT_PUBLIC_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 dark:text-blue-400"
              >
                {process.env.NEXT_PUBLIC_BASE_URL}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
