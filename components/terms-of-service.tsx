'use client';
export default function TermsOfServicePage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">
        By using our services, you agree to the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">1. Use of the Service</h2>
      <p>You must use the service in compliance with all applicable laws.</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">2. Account Responsibilities</h2>
      <p>You are responsible for safeguarding your API key and access credentials.</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">3. Prohibited Usage</h2>
      <p>You must not use this service for spamming or sending malicious emails.</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">4. Termination</h2>
      <p>We reserve the right to suspend or terminate access if terms are violated.</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">5. Changes</h2>
      <p>These terms may change and updates will be posted here.</p>
    </main>
  );
}
