'use client';

import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">🔐 Sign In</h1>
        <p className="text-gray-600 mb-8">Access your Mail Dashboard securely.</p>

        <div className="space-y-4">
          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg shadow transition"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 533.5 544.3">
              <path d="M533.5 278.4c0-18.4-1.6-36.2-4.6-53.3H272v100.9h146.6c-6.3 33.6-25.2 62-53.9 81.1l87 67.5c50.8-46.8 81.8-115.7 81.8-196.2z" />
              <path d="M272 544.3c72.6 0 133.6-23.8 178.1-64.6l-87-67.5c-24.1 16.2-54.9 25.7-91.1 25.7-70 0-129.3-47.2-150.5-110.6H31.2v69.3C75.5 478 167.9 544.3 272 544.3z" />
              <path d="M121.5 327.3c-10.3-30.6-10.3-63.6 0-94.2v-69.3H31.2c-32.8 65.8-32.8 143 0 208.8l90.3-69.3z" />
              <path d="M272 107.7c39.5-.6 77.2 13.5 106.3 39.6l79.5-79.5C416.8 23.2 345.9-1.1 272 0 167.9 0 75.5 66.3 31.2 160.8l90.3 69.3C142.7 154.9 202 107.7 272 107.7z" />
            </svg>
            Sign in with Google
          </button>

          <button
            onClick={() => signIn('azure_ad')}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow transition"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.057 3.156 9.355 7.582 11.091l.157-2.071c-.917-.213-1.782-.548-2.582-1.003L4.3 19.24C3.21 17.72 2.5 15.917 2.5 14c0-5.238 4.262-9.5 9.5-9.5S21.5 8.762 21.5 14c0 1.917-.71 3.72-1.8 5.24l-1.857 1.777c-.8.455-1.665.79-2.582 1.003l.157 2.071C20.844 21.355 24 17.057 24 12 24 5.373 18.627 0 12 0z"/>
            </svg>
            Sign in with Microsoft
          </button>
        </div>
      </div>
    </div>
  );
}
