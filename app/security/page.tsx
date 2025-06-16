"use client";

export default function SecurityPolicyPage() {
  return (
    <main className="p-6 min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Security Policy</h1>

        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400 text-center">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Data Protection</h2>
          <p>
            We implement industry-standard security measures to protect your
            personal data and OAuth tokens from unauthorized access, alteration,
            disclosure, or destruction.
          </p>
        </section>

        {/* ... other sections ... */}

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, you
            can contact us at:
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
