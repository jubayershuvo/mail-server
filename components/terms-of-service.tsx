'use client';

export default function TermsOfServicePage() {
  return (
    <main className="p-6 min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>

        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400 text-center">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <p className="mb-6">
          By using our services, you agree to the following terms and conditions. Please read them carefully.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Use of the Service</h2>
          <p>
            You must use the service in compliance with all applicable laws and regulations. Unauthorized or unlawful use is prohibited.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Account Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your API key, OAuth credentials, and account information. Do not share these with others.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Prohibited Usage</h2>
          <p>
            You must not use this service to send spam, malicious emails, phishing attempts, or any unlawful communications.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access if you violate these terms or engage in harmful behavior.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Changes to Terms</h2>
          <p>
            These terms may be updated occasionally. We will post changes here and notify users when major updates occur.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Contact Us</h2>
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
