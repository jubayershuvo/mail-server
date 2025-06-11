'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-orange-100 p-6 text-center">
      <h1 className="text-5xl font-extrabold text-red-600 mb-4">⚠️ Something went wrong</h1>
      <p className="text-lg text-gray-700 mb-8">An unexpected error has occurred. Please try again later.</p>

      <button
        onClick={() => router.push('/')}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-base shadow-md transition"
      >
        ⬅️ Go to Home
      </button>
    </div>
  );
}
